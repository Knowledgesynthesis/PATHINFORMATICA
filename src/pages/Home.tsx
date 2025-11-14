import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import {
  Microscope,
  Database,
  Brain,
  Network,
  Shield,
  ArrowRight,
  BookOpen,
  Target,
  Award
} from 'lucide-react'
import { cn } from '../lib/utils'

const features = [
  {
    icon: Target,
    title: 'Comprehensive Curriculum',
    description: 'From medical students to attending pathologists - structured learning for all levels'
  },
  {
    icon: BookOpen,
    title: 'Offline-First Design',
    description: 'Study anywhere, anytime - full functionality without internet connection'
  },
  {
    icon: Award,
    title: 'Evidence-Based',
    description: 'Aligned with FDA, CLIA, CAP standards and real-world clinical workflows'
  }
]

export default function Home() {
  const { modules, userProgress } = useAppStore()
  const completedModules = userProgress.completedModules.length
  const totalModules = modules.length

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900/30 border border-primary-700 text-primary-400 text-sm">
          <Network className="w-4 h-4" />
          <span>Educational Platform - Not for Diagnostic Use</span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
          PathInformatica
        </h1>

        <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
          Master the intersection of <span className="text-primary-400 font-semibold">Digital Pathology</span>,
          {' '}<span className="text-primary-400 font-semibold">Clinical Informatics</span>, and
          {' '}<span className="text-primary-400 font-semibold">AI Workflows</span> -
          no real image recognition, just deep conceptual understanding.
        </p>

        {totalModules > 0 && (
          <div className="flex items-center justify-center gap-4 text-sm text-dark-text-secondary">
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-dark-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                  style={{ width: `${(completedModules / totalModules) * 100}%` }}
                />
              </div>
              <span>{completedModules} / {totalModules} modules</span>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-dark-surface border border-dark-border hover:border-primary-700 transition-all group"
            >
              <Icon className="w-10 h-10 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-dark-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Core Modules */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Learning Modules</h2>
          <span className="text-sm text-dark-text-secondary">
            Foundational to Advanced
          </span>
        </div>

        <div className="grid gap-6">
          {modules.slice(0, 5).map((module) => {
            const icons: Record<string, any> = {
              Microscope,
              Database,
              Brain,
              Network,
              Shield
            }
            const Icon = icons[module.icon] || BookOpen
            const isCompleted = userProgress.completedModules.includes(module.id)
            const prerequisitesMet = module.prerequisiteIds.every((prereqId) =>
              userProgress.completedModules.includes(prereqId)
            )

            return (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                className={cn(
                  'block p-6 rounded-xl border transition-all group',
                  isCompleted
                    ? 'bg-primary-900/20 border-primary-700'
                    : prerequisitesMet
                    ? 'bg-dark-surface border-dark-border hover:border-primary-700'
                    : 'bg-dark-surface border-dark-border opacity-60 cursor-not-allowed'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className={cn(
                      'p-3 rounded-lg transition-colors',
                      isCompleted ? 'bg-primary-900/30' : 'bg-dark-border group-hover:bg-primary-900/20'
                    )}>
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold group-hover:text-primary-400 transition-colors">
                          {module.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-1 text-xs rounded bg-primary-900/30 text-primary-400 border border-primary-700">
                            Completed
                          </span>
                        )}
                      </div>

                      <p className="text-dark-text-secondary text-sm leading-relaxed">
                        {module.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-dark-text-secondary">
                        <span>{module.lessons.length} lessons</span>
                        <span>•</span>
                        <span>~{module.estimatedMinutes} min</span>
                        {module.prerequisiteIds.length > 0 && (
                          <>
                            <span>•</span>
                            <span>Prerequisites: {module.prerequisiteIds.length}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-dark-text-secondary group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Interactive Tools */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Interactive Learning Tools</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Metadata Builder',
              description: 'Build and validate WSI metadata structures with real-time validation',
              href: '/metadata-builder',
              icon: Database
            },
            {
              title: 'WSI Workflow Simulator',
              description: 'Explore the complete digital pathology workflow from scan to archive',
              href: '/wsi-workflow',
              icon: Network
            },
            {
              title: 'AI Concept Explorer',
              description: 'Understand AI algorithms conceptually - no actual ML implementation',
              href: '/ai-explorer',
              icon: Brain
            },
            {
              title: 'Regulatory Scenario Lab',
              description: 'Navigate FDA, CLIA, and CAP requirements through interactive scenarios',
              href: '/regulatory-lab',
              icon: Shield
            }
          ].map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.title}
                to={tool.href}
                className="p-6 rounded-xl bg-dark-surface border border-dark-border hover:border-primary-700 transition-all group"
              >
                <Icon className="w-8 h-8 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-dark-text-secondary text-sm leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-primary-400 text-sm font-medium">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-primary-900/20 to-primary-800/20 border border-primary-700">
        <h2 className="text-2xl font-bold mb-4">Ready to Master Digital Pathology Informatics?</h2>
        <p className="text-dark-text-secondary mb-6 max-w-2xl mx-auto">
          Start with the foundations and work your way through comprehensive modules covering
          digital pathology systems, AI concepts, regulatory frameworks, and real-world workflows.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/module/foundations-digital-pathology"
            className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
          >
            Start Learning
          </Link>
          <Link
            to="/glossary"
            className="px-6 py-3 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 font-medium transition-colors"
          >
            Browse Glossary
          </Link>
        </div>
      </div>
    </div>
  )
}
