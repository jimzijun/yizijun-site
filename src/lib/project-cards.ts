export type ProjectCard = {
  title: string;
  impact: string;
  role: string;
  link: string;
  stack?: string;
  summary?: string;
  highlights?: string[];
};

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

export function parsePinnedProjectCards(raw: unknown): ProjectCard[] {
  if (!Array.isArray(raw)) {
    throw new Error('Pinned project data must be an array.');
  }

  return raw.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Project at index ${index} must be an object.`);
    }

    const card = item as Record<string, unknown>;

    if (!isString(card.title)) {
      throw new Error(`Project at index ${index} is missing required field: title.`);
    }

    if (!isString(card.impact)) {
      throw new Error(`Project \"${card.title}\" is missing required field: impact.`);
    }

    if (!isString(card.role)) {
      throw new Error(`Project \"${card.title}\" is missing required field: role.`);
    }

    if (!isString(card.link)) {
      throw new Error(`Project \"${card.title}\" is missing required field: link.`);
    }

    const parsed: ProjectCard = {
      title: card.title,
      impact: card.impact,
      role: card.role,
      link: card.link,
    };

    if (card.stack !== undefined) {
      if (!isString(card.stack)) {
        throw new Error(`Project \"${card.title}\": optional field stack must be a non-empty string.`);
      }
      parsed.stack = card.stack;
    }

    if (card.summary !== undefined) {
      if (!isString(card.summary)) {
        throw new Error(`Project \"${card.title}\": optional field summary must be a non-empty string.`);
      }
      parsed.summary = card.summary;
    }

    if (card.highlights !== undefined) {
      if (!isStringArray(card.highlights)) {
        throw new Error(`Project \"${card.title}\": optional field highlights must be a string array.`);
      }
      parsed.highlights = card.highlights;
    }

    return parsed;
  });
}
