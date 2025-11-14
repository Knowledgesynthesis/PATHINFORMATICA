import { useParams, Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { ArrowLeft, CheckCircle2, Circle, Clock, BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'

export default function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { modules, userProgress } = useAppStore()

  const module = modules.find((m) => m.id === moduleId)

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-dark-text-secondary">Module not found</h1>
          <Link to="/" className="text-primary-400 hover:text-primary-300 mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  const completedLessons = module.lessons.filter((lesson) =>
    userProgress.completedLessons.includes(lesson.id)
  ).length

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-dark-text-secondary hover:text-primary-400 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to modules</span>
      </Link>

      {/* Module Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/30 border border-primary-700 text-primary-400 text-sm">
          Module {module.order}
        </div>

        <h1 className="text-4xl font-bold">{module.title}</h1>

        <p className="text-lg text-dark-text-secondary leading-relaxed">
          {module.description}
        </p>

        {/* Module Stats */}
        <div className="flex flex-wrap gap-6 text-sm text-dark-text-secondary">
          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>{module.lessons.length} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>~{module.estimatedMinutes} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{completedLessons} / {module.lessons.length} completed</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
            style={{ width: `${(completedLessons / module.lessons.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Prerequisites */}
      {module.prerequisiteIds.length > 0 && (
        <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
          <h3 className="font-semibold mb-2 text-sm text-dark-text-secondary">Prerequisites</h3>
          <div className="flex flex-wrap gap-2">
            {module.prerequisiteIds.map((prereqId) => {
              const prereqModule = modules.find((m) => m.id === prereqId)
              const isCompleted = userProgress.completedModules.includes(prereqId)

              return prereqModule ? (
                <Link
                  key={prereqId}
                  to={`/module/${prereqId}`}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm border transition-colors',
                    isCompleted
                      ? 'bg-primary-900/20 border-primary-700 text-primary-400'
                      : 'bg-dark-bg border-dark-border text-dark-text-secondary hover:border-primary-700'
                  )}
                >
                  {prereqModule.title}
                  {isCompleted && ' ✓'}
                </Link>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Lessons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Lessons</h2>

        <div className="space-y-3">
          {module.lessons.map((lesson, index) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id)

            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className="block p-4 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-primary-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-dark-text-secondary group-hover:text-primary-400 transition-colors" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary-400 transition-colors">
                          {index + 1}. {lesson.title}
                        </h3>

                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-dark-text-secondary">
                          <span className="px-2 py-1 rounded bg-dark-bg border border-dark-border">
                            {lesson.bloomLevel}
                          </span>
                          <span className="px-2 py-1 rounded bg-dark-bg border border-dark-border">
                            {lesson.learnerLevels.join(', ')}
                          </span>
                        </div>
                      </div>

                      {isCompleted && (
                        <span className="px-2 py-1 text-xs rounded bg-primary-900/30 text-primary-400 border border-primary-700 flex-shrink-0">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
