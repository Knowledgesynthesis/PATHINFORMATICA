import { Settings as SettingsIcon, Database, Download, Trash2, Info } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { db } from '../lib/db'

export default function Settings() {
  const { userProgress } = useAppStore()

  const handleClearProgress = async () => {
    if (confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      await db.clearAll()
      window.location.reload()
    }
  }

  const handleExportData = () => {
    const data = {
      progress: userProgress,
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pathinformatica-progress-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
      </div>

      {/* App Info */}
      <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
        <h2 className="text-xl font-bold mb-4">Application Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Version</span>
            <span className="font-semibold">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Mode</span>
            <span className="font-semibold">Offline-Ready PWA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Storage Type</span>
            <span className="font-semibold">IndexedDB + LocalStorage</span>
          </div>
        </div>
      </div>

      {/* User Progress */}
      <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Completed Lessons</span>
            <span className="font-semibold">{userProgress.completedLessons.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Completed Modules</span>
            <span className="font-semibold">{userProgress.completedModules.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Assessment Questions Answered</span>
            <span className="font-semibold">{userProgress.assessmentResults.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Total Time Spent</span>
            <span className="font-semibold">{userProgress.totalTimeSpent} minutes</span>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="p-6 rounded-xl bg-dark-surface border border-dark-border space-y-4">
        <h2 className="text-xl font-bold">Data Management</h2>

        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-dark-bg border border-dark-border hover:border-primary-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-primary-400" />
              <div className="text-left">
                <div className="font-semibold">Export Progress Data</div>
                <div className="text-sm text-dark-text-secondary">Download your progress as JSON</div>
              </div>
            </div>
          </button>

          <button
            onClick={handleClearProgress}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-dark-bg border border-red-700 hover:bg-red-900/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-400" />
              <div className="text-left">
                <div className="font-semibold text-red-400">Clear All Progress</div>
                <div className="text-sm text-dark-text-secondary">Reset all lessons, modules, and assessments</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="p-6 rounded-xl bg-primary-900/10 border border-primary-700/50">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <h3 className="font-semibold text-primary-400 mb-2">About PathInformatica</h3>
            <p className="text-dark-text-secondary leading-relaxed mb-2">
              PathInformatica is an educational platform designed to teach the intersection of
              digital pathology, clinical informatics, and AI workflows. This application:
            </p>
            <ul className="space-y-1 text-dark-text-secondary">
              <li>• Works completely offline after initial load</li>
              <li>• Contains no real patient data or diagnostic images</li>
              <li>• Provides conceptual AI education without actual ML implementation</li>
              <li>• Follows FDA, CLIA, and CAP guidelines in educational content</li>
              <li>• Is designed for medical students through attending pathologists</li>
            </ul>
            <p className="text-dark-text-secondary mt-3 font-semibold">
              For Educational Use Only - Not for Diagnostic Purposes
            </p>
          </div>
        </div>
      </div>

      {/* Storage Info */}
      <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
        <div className="flex items-start gap-3">
          <Database className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <h3 className="font-semibold mb-2">Offline Storage</h3>
            <p className="text-dark-text-secondary leading-relaxed">
              This app uses browser storage (IndexedDB and LocalStorage) to save your progress
              and enable offline functionality. Your data stays on your device and is never
              transmitted to external servers. Clearing your browser data will reset your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
