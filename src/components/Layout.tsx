import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  BookOpen,
  Database,
  Brain,
  Network,
  FlaskConical,
  Workflow,
  FileCode,
  Scale,
  ClipboardList,
  BookMarked,
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Modules', href: '#modules', icon: BookOpen, isSection: true },
  { name: 'Interactive Tools', href: '#tools', icon: FlaskConical, isSection: true },
  { name: 'Metadata Builder', href: '/metadata-builder', icon: Database, indent: true },
  { name: 'WSI Workflow', href: '/wsi-workflow', icon: Workflow, indent: true },
  { name: 'AI Concept Explorer', href: '/ai-explorer', icon: Brain, indent: true },
  { name: 'Coding Mapper', href: '/coding-mapper', icon: FileCode, indent: true },
  { name: 'Regulatory Lab', href: '/regulatory-lab', icon: Scale, indent: true },
  { name: 'Assessment', href: '/assessment', icon: ClipboardList },
  { name: 'Glossary', href: '/glossary', icon: BookMarked },
  { name: 'Settings', href: '/settings', icon: Settings }
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { sidebarOpen, toggleSidebar } = useAppStore()

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-dark-surface border border-dark-border hover:bg-dark-border transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-dark-surface border-r border-dark-border transform transition-transform duration-300 ease-in-out z-40',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-dark-border">
            <h1 className="text-2xl font-bold text-primary-400 flex items-center gap-2">
              <Network className="w-7 h-7" />
              PathInformatica
            </h1>
            <p className="text-xs text-dark-text-secondary mt-1">
              Digital Pathology Meets AI
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              const isSection = item.isSection

              if (isSection) {
                return (
                  <div
                    key={item.name}
                    className="pt-4 pb-2 text-xs font-semibold text-dark-text-secondary uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={14} />
                      {item.name}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    item.indent && 'ml-4',
                    isActive
                      ? 'bg-primary-900/30 text-primary-400 border border-primary-700'
                      : 'text-dark-text-secondary hover:bg-dark-border hover:text-dark-text'
                  )}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-dark-border text-xs text-dark-text-secondary">
            <p>Educational Platform</p>
            <p className="mt-1">No diagnostic use</p>
            <p className="mt-2 text-[10px]">v1.0.0 - Offline Ready</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
        )}
      >
        <div className="min-h-screen p-6 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  )
}
