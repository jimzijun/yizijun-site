import projectsPinnedRaw from '../data/projects-pinned.json';

export type CuratedProject = {
  repo: string;
  title: string;
  impact: string;
  role: string;
  link: string;
  blurb?: string;
  tags?: string[];
};

export type ProjectCard = {
  repo?: string;
  title: string;
  impact: string;
  role: string;
  link: string;
  description: string;
  language: string;
  tags?: string[];
  highlights?: string[];
};

type GithubRepoMetadata = {
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  name: string;
};

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const values = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return values.length > 0 ? values : undefined;
}

function parseCuratedProject(item: unknown, idx: number): CuratedProject {
  if (!item || typeof item !== 'object') {
    throw new Error(`Invalid project at index ${idx}: expected object.`);
  }

  const obj = item as Record<string, unknown>;
  const { repo, title, impact, role, link } = obj;

  if (!isString(repo) || !isString(title) || !isString(impact) || !isString(role) || !isString(link)) {
    throw new Error(
      `Invalid project at index ${idx}: required fields are repo, title, impact, role, link (non-empty strings).`,
    );
  }

  return {
    repo,
    title,
    impact,
    role,
    link,
    blurb: isString(obj.blurb) ? obj.blurb : undefined,
    tags: asStringArray(obj.tags),
  };
}

export function getPinnedProjects(): CuratedProject[] {
  if (!Array.isArray(projectsPinnedRaw)) {
    throw new Error('Pinned projects source must be an array.');
  }

  return projectsPinnedRaw.map((item, idx) => parseCuratedProject(item, idx));
}

async function fetchRepo(repo: string): Promise<GithubRepoMetadata | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'yizijun-site-projects-section',
      },
    });

    if (!response.ok) return null;
    return (await response.json()) as GithubRepoMetadata;
  } catch {
    return null;
  }
}

async function fetchRecentRepos(owner: string): Promise<GithubRepoMetadata[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${owner}/repos?sort=pushed&per_page=20`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'yizijun-site-projects-section',
      },
    });
    if (!response.ok) return [];
    return (await response.json()) as GithubRepoMetadata[];
  } catch {
    return [];
  }
}

export async function getHybridProjects(owner = 'jimzijun'): Promise<ProjectCard[]> {
  const curated = getPinnedProjects();

  const curatedResolved = await Promise.all(
    curated.map(async (project): Promise<ProjectCard> => {
      const repoMeta = await fetchRepo(project.repo);
      return {
        repo: project.repo,
        title: project.title,
        impact: project.impact,
        role: project.role,
        link: project.link || repoMeta?.html_url || `https://github.com/${project.repo}`,
        description: project.blurb ?? repoMeta?.description ?? 'Project description unavailable.',
        language: repoMeta?.language ?? 'Not specified',
        tags: project.tags,
      };
    }),
  );

  const curatedSet = new Set(curated.map((p) => p.repo.toLowerCase()));
  const recentRepos = await fetchRecentRepos(owner);

  const recentCards: ProjectCard[] = recentRepos
    .filter((repo) => !curatedSet.has(repo.full_name.toLowerCase()))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 6)
    .map((repo) => ({
      repo: repo.full_name,
      title: repo.name,
      impact: 'Recent repository activity from GitHub.',
      role: 'Builder',
      link: repo.html_url,
      description: repo.description ?? 'No description available.',
      language: repo.language ?? 'Not specified',
    }));

  return [...curatedResolved, ...recentCards];
}
