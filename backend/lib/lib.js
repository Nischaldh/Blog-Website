export const normalizeTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(t => t.trim());
  if (typeof tags === "string") {
    return tags.split(",").map(t => t.trim());
  }
  return [];
};
