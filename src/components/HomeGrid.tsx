import type { WorkspaceEntity } from '../types'
import { categoryIcon } from '../lib/categories'
import MakCard from './MakCard'
import MakLogo from './MakLogo'
import { brand } from '../brand'

interface HomeGridProps {
  entities: WorkspaceEntity[]
  pinned: WorkspaceEntity[]
  grouped: Map<string, WorkspaceEntity[]>
  offline: boolean
  searching: boolean
  query: string
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 5) return brand.greetings.late
  if (h < 12) return brand.greetings.morning
  if (h < 18) return brand.greetings.afternoon
  return brand.greetings.evening
}

export default function HomeGrid({
  entities,
  pinned,
  grouped,
  offline,
  searching,
  query,
}: HomeGridProps) {
  const activeCount = entities.filter(e => e.status === 'active').length
  const categoryCount = new Set(entities.map(e => e.category || 'other')).size
  const shown = pinned.length + [...grouped.values()].reduce((n, list) => n + list.length, 0)

  return (
    <div className="home">
      <header className="home-hero">
        <MakLogo size={84} />
        <div>
          <h1 className="home-title">{greeting()}</h1>
          <p className="home-sub">
            <b>{activeCount}</b> active · <b>{entities.length}</b> entities ·{' '}
            <b>{categoryCount}</b> categories
            {offline && <span className="home-offline"> · workspace.json unreachable</span>}
          </p>
        </div>
      </header>

      {searching && (
        <p className="home-filter">
          {shown === 0 ? 'No matches for' : `${shown} match${shown === 1 ? '' : 'es'} for`}{' '}
          “{query.trim()}” — archive included
        </p>
      )}

      {pinned.length > 0 && (
        <section className="home-section">
          <div className="section-head">
            <span className="section-title">{brand.pinned.emoji && '\u{1F4CC} '}{brand.pinned.label}</span>
            <span className="section-count">{pinned.length}</span>
          </div>
          <div className="card-grid">
            {pinned.map(e => (
              <MakCard key={e.id} entity={e} />
            ))}
          </div>
        </section>
      )}

      {[...grouped.entries()].map(([cat, list]) => (
        <section key={cat} className="home-section">
          <div className="section-head">
            <span className="section-title">
              {categoryIcon(cat)} {cat.replace(/-/g, ' ')}
            </span>
            <span className="section-count">{list.length}</span>
          </div>
          <div className="card-grid">
            {list.map(e => (
              <MakCard key={e.id} entity={e} />
            ))}
          </div>
        </section>
      ))}

      {shown === 0 && !searching && (
        <div className="home-empty">
          {offline
            ? brand.home.loadError
            : brand.home.empty}
        </div>
      )}
    </div>
  )
}
