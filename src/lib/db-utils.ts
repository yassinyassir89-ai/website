export function parseProduct(p: any) {
  if (!p) return p
  return {
    ...p,
    images: typeof p.images === 'string' ? JSON.parse(p.images) : (p.images ?? []),
    tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags ?? []),
    category: p.category ? parseCategory(p.category) : p.category,
    variants: p.variants ?? [],
    reviews: p.reviews ?? [],
  }
}

export function parseCategory(c: any) {
  if (!c) return c
  return {
    ...c,
    children: c.children?.map(parseCategory) ?? [],
  }
}

export function serializeProduct(data: any) {
  return {
    ...data,
    images: Array.isArray(data.images) ? JSON.stringify(data.images) : data.images,
    tags: Array.isArray(data.tags) ? JSON.stringify(data.tags) : data.tags,
  }
}
