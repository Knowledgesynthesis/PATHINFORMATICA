import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Module,
  UserProgress,
  AssessmentResult,
  GlossaryTerm,
  CaseScenario
} from '../types'

interface AppState {
  // UI State
  currentModule: string | null
  currentLesson: string | null
  sidebarOpen: boolean

  // User Progress
  userProgress: UserProgress

  // Content
  modules: Module[]
  glossaryTerms: GlossaryTerm[]
  caseScenarios: CaseScenario[]

  // Actions
  setCurrentModule: (moduleId: string | null) => void
  setCurrentLesson: (lessonId: string | null) => void
  toggleSidebar: () => void

  // Progress Actions
  markLessonComplete: (lessonId: string) => void
  markModuleComplete: (moduleId: string) => void
  submitAssessmentResult: (result: AssessmentResult) => void
  updateTimeSpent: (minutes: number) => void

  // Content Actions
  setModules: (modules: Module[]) => void
  setGlossaryTerms: (terms: GlossaryTerm[]) => void
  setCaseScenarios: (scenarios: CaseScenario[]) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial UI State
      currentModule: null,
      currentLesson: null,
      sidebarOpen: true,

      // Initial User Progress
      userProgress: {
        userId: 'default-user',
        completedLessons: [],
        completedModules: [],
        assessmentResults: [],
        totalTimeSpent: 0,
        achievements: []
      },

      // Initial Content
      modules: [],
      glossaryTerms: [],
      caseScenarios: [],

      // UI Actions
      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Progress Actions
      markLessonComplete: (lessonId) => set((state) => {
        const completedLessons = new Set(state.userProgress.completedLessons)
        completedLessons.add(lessonId)

        return {
          userProgress: {
            ...state.userProgress,
            completedLessons: Array.from(completedLessons),
            lastAccessedLesson: lessonId
          }
        }
      }),

      markModuleComplete: (moduleId) => set((state) => {
        const completedModules = new Set(state.userProgress.completedModules)
        completedModules.add(moduleId)

        return {
          userProgress: {
            ...state.userProgress,
            completedModules: Array.from(completedModules)
          }
        }
      }),

      submitAssessmentResult: (result) => set((state) => ({
        userProgress: {
          ...state.userProgress,
          assessmentResults: [...state.userProgress.assessmentResults, result]
        }
      })),

      updateTimeSpent: (minutes) => set((state) => ({
        userProgress: {
          ...state.userProgress,
          totalTimeSpent: state.userProgress.totalTimeSpent + minutes
        }
      })),

      // Content Actions
      setModules: (modules) => set({ modules }),
      setGlossaryTerms: (terms) => set({ glossaryTerms: terms }),
      setCaseScenarios: (scenarios) => set({ caseScenarios: scenarios })
    }),
    {
      name: 'pathinformatica-storage',
      partialize: (state) => ({
        userProgress: state.userProgress,
        currentModule: state.currentModule,
        currentLesson: state.currentLesson
      })
    }
  )
)
