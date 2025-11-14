// Core educational content types
export type LearnerLevel = 'MS3' | 'MS4' | 'Resident' | 'Fellow' | 'Attending'
export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create'

export interface Module {
  id: string
  title: string
  description: string
  icon: string
  order: number
  prerequisiteIds: string[]
  estimatedMinutes: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  content: string
  bloomLevel: BloomLevel
  learnerLevels: LearnerLevel[]
  order: number
  completed: boolean
}

// Digital Pathology WSI Metadata
export interface WSIMetadata {
  id: string
  caseId: string
  specimenId: string
  slideId: string
  scanDate: string
  scanner: {
    manufacturer: string
    model: string
    serialNumber: string
  }
  magnification: number
  resolution: {
    x: number
    y: number
    unit: 'µm/pixel'
  }
  dimensions: {
    width: number
    height: number
    depth: number
  }
  compression: 'JPEG' | 'JPEG2000' | 'PNG' | 'Uncompressed'
  colorSpace: 'RGB' | 'YCbCr' | 'Grayscale'
  focusMethod: 'Single' | 'Multi' | 'Extended'
  validated: boolean
  validationErrors: string[]
}

// LOINC Code System
export interface LOINCCode {
  code: string
  component: string
  property: string
  timing: string
  system: string
  scale: string
  method: string
  displayName: string
  category: 'LAB' | 'CLINICAL' | 'SURVEY' | 'CLAIMS'
}

// SNOMED CT Code System
export interface SNOMEDCode {
  conceptId: string
  term: string
  fullySpecifiedName: string
  semanticTag: string
  hierarchy: string[]
  relationships: {
    type: string
    target: string
  }[]
}

// Workflow Step
export interface WorkflowStep {
  id: string
  name: string
  description: string
  order: number
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped'
  inputs: Record<string, any>
  outputs: Record<string, any>
  validationRules: ValidationRule[]
  estimatedDuration: number
  actualDuration?: number
  assignedRole: string
  qcRequired: boolean
}

export interface ValidationRule {
  field: string
  rule: 'required' | 'format' | 'range' | 'reference'
  parameters: Record<string, any>
  errorMessage: string
}

// AI Concept (Conceptual only - no actual ML)
export interface AIConceptBlock {
  id: string
  type: 'input' | 'preprocessing' | 'feature-extraction' | 'model' | 'postprocessing' | 'output' | 'qa'
  label: string
  description: string
  parameters: Record<string, any>
  connections: string[]
  limitations: string[]
}

export interface AIWorkflow {
  id: string
  name: string
  description: string
  blocks: AIConceptBlock[]
  dataRequirements: {
    minSamples: number
    requiredFeatures: string[]
    qualityCriteria: string[]
  }
  limitations: string[]
  regulatoryConsiderations: string[]
}

// Regulatory Classification
export type RegulatoryClass = 'SaMD_Class_I' | 'SaMD_Class_II' | 'SaMD_Class_III' | 'LDT' | 'RUO' | 'IVD'

export interface RegulatoryScenario {
  id: string
  name: string
  description: string
  system: {
    purpose: string
    userType: string
    autonomy: 'Autonomous' | 'Semi-Autonomous' | 'Assistive'
    criticalityLevel: 'Informative' | 'Diagnostic' | 'Treatment'
  }
  classification: RegulatoryClass
  requirements: {
    FDA: string[]
    CLIA: string[]
    CAP: string[]
  }
  rationale: string
}

// Assessment Question
export interface AssessmentQuestion {
  id: string
  moduleId: string
  type: 'multiple-choice' | 'multiple-select' | 'true-false' | 'matching' | 'scenario'
  question: string
  options: AssessmentOption[]
  correctAnswers: string[]
  explanation: string
  bloomLevel: BloomLevel
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
}

export interface AssessmentOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface AssessmentResult {
  questionId: string
  userAnswers: string[]
  isCorrect: boolean
  timestamp: Date
}

// Glossary Term
export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: 'Pathology' | 'Informatics' | 'AI/ML' | 'Regulatory' | 'Data Standards'
  relatedTerms: string[]
  examples: string[]
  references: string[]
}

// User Progress
export interface UserProgress {
  userId: string
  completedLessons: string[]
  completedModules: string[]
  assessmentResults: AssessmentResult[]
  lastAccessedLesson?: string
  totalTimeSpent: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
}

// Case Scenario (Conceptual - no real diagnosis)
export interface CaseScenario {
  id: string
  title: string
  description: string
  learningObjectives: string[]
  context: {
    caseType: string
    specimenType: string
    clinicalContext: string
  }
  workflow: WorkflowStep[]
  metadata: Partial<WSIMetadata>
  codingChallenge?: {
    diagnoses: string[]
    requiredCodes: {
      LOINC: string[]
      SNOMED: string[]
    }
  }
  aiConsiderations?: {
    applicable: boolean
    algorithmType?: string
    limitations: string[]
  }
  regulatoryConsiderations: string[]
  reflection: string[]
}
