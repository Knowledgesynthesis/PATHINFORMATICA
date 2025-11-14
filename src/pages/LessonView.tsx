import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react'

export default function LessonView() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { modules, userProgress, markLessonComplete, setCurrentLesson } = useAppStore()

  // Find the lesson and its module
  let currentLesson = null
  let currentModule = null

  for (const module of modules) {
    const lesson = module.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      currentLesson = lesson
      currentModule = module
      break
    }
  }

  if (!currentLesson || !currentModule) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-dark-text-secondary">Lesson not found</h1>
          <Link to="/" className="text-primary-400 hover:text-primary-300 mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  const isCompleted = userProgress.completedLessons.includes(currentLesson.id)

  // Find next lesson
  const currentLessonIndex = currentModule.lessons.findIndex((l) => l.id === lessonId)
  const nextLesson = currentModule.lessons[currentLessonIndex + 1]

  const handleComplete = () => {
    markLessonComplete(currentLesson.id)
    setCurrentLesson(currentLesson.id)

    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`)
    } else {
      navigate(`/module/${currentModule.id}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      {/* Back Navigation */}
      <Link
        to={`/module/${currentModule.id}`}
        className="inline-flex items-center gap-2 text-dark-text-secondary hover:text-primary-400 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to {currentModule.title}</span>
      </Link>

      {/* Lesson Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-primary-900/30 border border-primary-700 text-primary-400 text-sm">
            {currentModule.title}
          </span>
          {isCompleted && (
            <span className="px-3 py-1 rounded-full bg-primary-900/30 border border-primary-700 text-primary-400 text-sm flex items-center gap-2">
              <CheckCircle2 size={14} />
              Completed
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold">{currentLesson.title}</h1>

        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-dark-surface border border-dark-border text-dark-text-secondary">
            {currentLesson.bloomLevel}
          </span>
          <span className="px-3 py-1 rounded-full bg-dark-surface border border-dark-border text-dark-text-secondary">
            {currentLesson.learnerLevels.join(', ')}
          </span>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="prose prose-invert prose-primary max-w-none">
        <div className="p-8 rounded-xl bg-dark-surface border border-dark-border">
          <div className="markdown-content text-dark-text leading-relaxed space-y-4">
            {currentLesson.content.split('\n').map((paragraph, index) => {
              // Handle headers
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-primary-400">{paragraph.substring(2)}</h1>
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.substring(4)}</h3>
              }

              // Handle bold text
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <p key={index} className="font-semibold text-primary-300 mt-4">{paragraph.replace(/\*\*/g, '')}</p>
              }

              // Handle lists
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="ml-4 text-dark-text-secondary">{paragraph.substring(2)}</li>
              }
              if (paragraph.match(/^\d+\. /)) {
                return <li key={index} className="ml-4 text-dark-text-secondary">{paragraph.replace(/^\d+\. /, '')}</li>
              }

              // Regular paragraphs
              if (paragraph.trim()) {
                return <p key={index} className="text-dark-text-secondary leading-relaxed">{paragraph}</p>
              }

              return <br key={index} />
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 pt-8 border-t border-dark-border">
        <Link
          to={`/module/${currentModule.id}`}
          className="px-6 py-3 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 font-medium transition-colors"
        >
          Back to Module
        </Link>

        <div className="flex gap-4">
          {!isCompleted && (
            <button
              onClick={handleComplete}
              className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors flex items-center gap-2"
            >
              <CheckCircle2 size={20} />
              Mark as Complete
            </button>
          )}

          {nextLesson && (
            <Link
              to={`/lesson/${nextLesson.id}`}
              className="px-6 py-3 rounded-lg bg-primary-900/30 border border-primary-700 text-primary-400 hover:bg-primary-900/50 font-medium transition-colors flex items-center gap-2"
            >
              Next Lesson
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
