// Product name, wording and persona strings come from brand/brand.json (see brand/README.md).
// The default file reproduces the Mr. Mak texts; a distribution replaces it before building.
import { createElement } from 'react'
import data from '../brand/brand.json'

export const brand = data

// Fill {placeholders} in a brand template, e.g. fill(brand.settings.shortcutLabel, { shortcut: '⌃⌥Space' }).
export function fill(template: string, values: Record<string, string> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => key === 'name' ? brand.name : values[key] ?? match)
}

// Brand strings use \n for line breaks; render them as <br /> separated lines.
export function lines(text: string) {
  return text.split('\n').flatMap((line, index) => index ? [createElement('br', { key: index }), line] : [line])
}
