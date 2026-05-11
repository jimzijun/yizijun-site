import projectsPinnedRaw from '../data/projects-pinned.json';

export type ProjectCard = {
  title: string;
  impact: string;
  role: string;
  link: string;
  tags?: string[];
  highlights?: string[];
};

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const values = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return values.length > 0 ? values : undefined;
}

function parseProjectCard(item: unknown, idx: number): ProjectCard {
  if (!item || typeof item !== 'object') {
    throw new Error(`Invalid project at index ${idx}: expected object.`);
  }

  const obj = item as Record<string, unknown>;
  const { title, impact, role, link } = obj;

  if (!isString(title) || !isString(impact) || !isString(role) || !isString(link)) {
    throw new Error(
      `Invalid project at index ${idx}: required fields are title, impact, role, link (non-empty strings).`,
    );
  }

  return {
    title,
    impact,
    role,
    link,
    tags: asStringArray(obj.tags),
    highlights: asStringArray(obj.highlights),
  };
}

export function getPinnedProjects(): ProjectCard[] {
  if (!Array.isArray(projectsPinnedRaw)) {
    throw new Error('Pinned projects source must be an array.');
  }

  return projectsPinnedRaw.map((item, idx) => parseProjectCard(item, idx));
}
