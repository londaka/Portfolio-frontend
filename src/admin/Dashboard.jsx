import { createElement, useState } from 'react'
import { FolderKanban, Mail } from 'lucide-react'
import ProjectManger from './ProjectManger'
import MessageInbox from './MessageInbox'

const navigationItems = [
  { id: 'projects', label: 'Projects', Icon: FolderKanban },
  { id: 'messages', label: 'Messages', Icon: Mail }
]

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('projects')

  const navigation = (compact = false) => (
    <nav aria-label="Admin dashboard sections" className={compact ? 'flex gap-2 overflow-x-auto' : 'space-y-2'}>
      {navigationItems.map(({ id, label, Icon }) => {
        const active = activeSection === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => setActiveSection(id)}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              active
                ? 'bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/20'
                : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
            } ${compact ? 'flex-1 justify-center whitespace-nowrap' : 'w-full text-left'}`}
          >
            {createElement(Icon, { size: 18 })}
            {label}
          </button>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#080d19] text-white md:flex">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0a1020] p-5 md:sticky md:top-0 md:flex md:h-screen md:flex-col">
        <a href="/" className="mb-10 flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 font-bold text-blue-300">
            S
          </span>
          <span>
            <span className="block font-semibold">Portfolio</span>
            <span className="mt-0.5 block text-xs text-slate-500">Admin dashboard</span>
          </span>
        </a>

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Manage
        </p>
        {navigation()}

        <a
          href="/"
          className="mt-auto rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
        >
          View portfolio
        </a>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080d19]/95 px-4 py-4 backdrop-blur md:hidden">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 font-bold text-blue-300">
              S
            </span>
            <div>
              <p className="font-semibold">Portfolio Admin</p>
              <p className="text-xs text-slate-500">Dashboard</p>
            </div>
          </div>
          {navigation(true)}
        </header>

        <main className="min-h-screen">
          {activeSection === 'projects' ? <ProjectManger /> : <MessageInbox />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard