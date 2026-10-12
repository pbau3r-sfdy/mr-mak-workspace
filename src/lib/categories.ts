import { brand } from '../brand'

export const CATEGORY_ICONS: Record<string, string> = {
  'image-gen': '\u{1F3A8}',
  'analytics': '\u{1F4CA}',
  'research': '\u{1F50D}',
  'lead-magnet': '\u{1F9F2}',
  'game': '\u{1F3AE}',
  'dev': '\u{1F6E0}\u{FE0F}',
}

// Brand display name for a category id (brand.json `categories`); ids stay unchanged in workspace.json.
// Undefined when the brand keeps the default label, which each view derives from the id.
export function categoryLabel(category: string): string | undefined {
  return (brand.categories as Record<string, string>)[category]
}

export function categoryIcon(category: string): string {
  if (!brand.categoryEmoji) return ''
  return CATEGORY_ICONS[category] ?? '\u{1F4C1}'
}
