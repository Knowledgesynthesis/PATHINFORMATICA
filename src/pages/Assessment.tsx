import { useState } from 'react'
import { ClipboardList, CheckCircle2, XCircle, Info } from 'lucide-react'
import { cn } from '../lib/utils'
import type { AssessmentQuestion } from '../types'

const sampleQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    moduleId: 'foundations-digital-pathology',
    type: 'multiple-choice',
    question: 'What is the typical spatial resolution for whole-slide imaging at 40x magnification?',
    options: [
      { id: 'a', text: '0.25-0.5 µm/pixel', isCorrect: true },
      { id: 'b', text: '1-2 µm/pixel', isCorrect: false },
      { id: 'c', text: '5-10 µm/pixel', isCorrect: false },
      { id: 'd', text: '20-40 µm/pixel', isCorrect: false }
    ],
    correctAnswers: ['a'],
    explanation: 'At 40x magnification, typical WSI systems achieve 0.25-0.5 µm/pixel resolution, which is sufficient to visualize cellular details needed for diagnostic interpretation.',
    bloomLevel: 'Remember',
    difficulty: 'Easy',
    tags: ['WSI', 'Resolution', 'Technical Specifications']
  },
  {
    id: 'q2',
    moduleId: 'metadata-archiving',
    type: 'multiple-choice',
    question: 'Which of the following is NOT a required component of DICOM WSI metadata structure?',
    options: [
      { id: 'a', text: 'Patient identifier', isCorrect: false },
      { id: 'b', text: 'Scanner manufacturer', isCorrect: false },
      { id: 'c', text: "Pathologist's diagnostic interpretation", isCorrect: true },
      { id: 'd', text: 'Specimen identifier', isCorrect: false }
    ],
    correctAnswers: ['c'],
    explanation: "While patient ID, scanner information, and specimen ID are required DICOM metadata elements, the pathologist's diagnostic interpretation is stored separately in structured reports, not in the image metadata itself.",
    bloomLevel: 'Understand',
    difficulty: 'Medium',
    tags: ['DICOM', 'Metadata', 'Standards']
  },
  {
    id: 'q3',
    moduleId: 'ai-concepts',
    type: 'multiple-select',
    question: 'Which of the following are important limitations of AI algorithms in digital pathology? (Select all that apply)',
    options: [
      { id: 'a', text: 'Cannot detect conditions not represented in training data', isCorrect: true },
      { id: 'b', text: 'Performance may vary with staining differences', isCorrect: true },
      { id: 'c', text: 'Always provide 100% accurate results if properly trained', isCorrect: false },
      { id: 'd', text: 'Require validation for each specific clinical use case', isCorrect: true }
    ],
    correctAnswers: ['a', 'b', 'd'],
    explanation: 'AI algorithms have several important limitations: they can only recognize patterns from training data, are sensitive to staining and technical variations, and require validation for each use case. They do NOT provide 100% accuracy - all AI systems have error rates.',
    bloomLevel: 'Analyze',
    difficulty: 'Hard',
    tags: ['AI/ML', 'Limitations', 'Validation']
  },
  {
    id: 'q4',
    moduleId: 'ethics-regulatory',
    type: 'multiple-choice',
    question: 'A software tool that automatically measures tumor area on H&E slides and provides quantitative measurements for pathologist review would most likely be classified as:',
    options: [
      { id: 'a', text: 'Research Use Only (RUO)', isCorrect: false },
      { id: 'b', text: 'Software as a Medical Device (SaMD) requiring FDA clearance', isCorrect: true },
      { id: 'c', text: 'Not regulated because it only provides measurements', isCorrect: false },
      { id: 'd', text: 'Class III medical device requiring PMA', isCorrect: false }
    ],
    correctAnswers: ['b'],
    explanation: 'Quantitative measurement tools intended for clinical diagnostic use are typically classified as SaMD and require FDA clearance (usually Class II). While they assist rather than replace pathologists, they still influence clinical decision-making.',
    bloomLevel: 'Apply',
    difficulty: 'Medium',
    tags: ['Regulatory', 'FDA', 'SaMD']
  },
  {
    id: 'q5',
    moduleId: 'data-integrity',
    type: 'true-false',
    question: 'LOINC codes are used to standardize laboratory test orders and results, while SNOMED CT codes are used for clinical diagnoses and findings.',
    options: [
      { id: 'true', text: 'True', isCorrect: true },
      { id: 'false', text: 'False', isCorrect: false }
    ],
    correctAnswers: ['true'],
    explanation: 'True. LOINC (Logical Observation Identifiers Names and Codes) standardizes laboratory tests and measurements, while SNOMED CT provides comprehensive clinical terminology including diagnoses, procedures, and findings.',
    bloomLevel: 'Understand',
    difficulty: 'Easy',
    tags: ['LOINC', 'SNOMED', 'Standards']
  }
]

export default function Assessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const isCorrect = submitted && results[currentQuestion.id]

  const handleAnswerSelect = (optionId: string) => {
    if (submitted) return

    if (currentQuestion.type === 'multiple-select') {
      setSelectedAnswers(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      )
    } else {
      setSelectedAnswers([optionId])
    }
  }

  const handleSubmit = () => {
    const correct = currentQuestion.correctAnswers.sort().join(',') === selectedAnswers.sort().join(',')
    setResults({ ...results, [currentQuestion.id]: correct })
    setSubmitted(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswers([])
      setSubmitted(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswers([])
      setSubmitted(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">Knowledge Assessment</h1>
        </div>
        <p className="text-dark-text-secondary">
          Test your understanding of digital pathology informatics concepts.
        </p>
      </div>

      {/* Progress */}
      <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-dark-text-secondary">Progress</span>
          <span className="font-semibold">
            Question {currentQuestionIndex + 1} of {sampleQuestions.length}
          </span>
        </div>
        <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / sampleQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-8 rounded-xl bg-dark-surface border border-dark-border space-y-6">
        {/* Question Header */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-primary-900/30 text-primary-400 text-sm">
            {currentQuestion.bloomLevel}
          </span>
          <span className={cn(
            'px-3 py-1 rounded-full text-sm',
            currentQuestion.difficulty === 'Easy' && 'bg-green-900/30 text-green-400',
            currentQuestion.difficulty === 'Medium' && 'bg-yellow-900/30 text-yellow-400',
            currentQuestion.difficulty === 'Hard' && 'bg-red-900/30 text-red-400'
          )}>
            {currentQuestion.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full bg-dark-bg border border-dark-border text-dark-text-secondary text-sm">
            {currentQuestion.type === 'multiple-select' ? 'Select all that apply' : 'Single answer'}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-semibold leading-relaxed">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.id)
            const showCorrect = submitted && option.isCorrect
            const showIncorrect = submitted && isSelected && !option.isCorrect

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={submitted}
                className={cn(
                  'w-full p-4 rounded-lg border text-left transition-all flex items-start gap-3',
                  !submitted && isSelected && 'bg-primary-900/20 border-primary-700',
                  !submitted && !isSelected && 'border-dark-border hover:border-primary-700',
                  showCorrect && 'bg-green-900/20 border-green-700',
                  showIncorrect && 'bg-red-900/20 border-red-700',
                  submitted && !showCorrect && !showIncorrect && 'border-dark-border opacity-60'
                )}
              >
                <div className={cn(
                  'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5',
                  currentQuestion.type === 'multiple-select' && 'rounded',
                  isSelected && !submitted && 'border-primary-400 bg-primary-400',
                  showCorrect && 'border-green-400 bg-green-400',
                  showIncorrect && 'border-red-400 bg-red-400',
                  !isSelected && !submitted && 'border-dark-border'
                )}>
                  {isSelected && !submitted && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                  {showCorrect && <CheckCircle2 size={16} className="text-white" />}
                  {showIncorrect && <XCircle size={16} className="text-white" />}
                </div>

                <span className={cn(
                  'flex-1',
                  showCorrect && 'text-green-400 font-medium',
                  showIncorrect && 'text-red-400'
                )}>
                  {option.text}
                </span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div className={cn(
            'p-4 rounded-lg border flex items-start gap-3',
            isCorrect
              ? 'bg-green-900/10 border-green-700'
              : 'bg-red-900/10 border-red-700'
          )}>
            <Info className={cn(
              'w-5 h-5 flex-shrink-0 mt-0.5',
              isCorrect ? 'text-green-400' : 'text-red-400'
            )} />
            <div>
              <h3 className={cn(
                'font-semibold mb-2',
                isCorrect ? 'text-green-400' : 'text-red-400'
              )}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              <p className="text-sm text-dark-text-secondary leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-dark-border">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 rounded-lg bg-dark-bg border border-dark-border hover:border-primary-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers.length === 0}
              className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === sampleQuestions.length - 1}
              className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Question
            </button>
          )}
        </div>
      </div>

      {/* Summary */}
      {Object.keys(results).length > 0 && (
        <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
          <h3 className="font-semibold mb-3">Your Progress</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-dark-text-secondary">Score</span>
                <span className="font-semibold">
                  {Object.values(results).filter(Boolean).length} / {Object.keys(results).length} correct
                </span>
              </div>
              <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                  style={{
                    width: `${(Object.values(results).filter(Boolean).length / Object.keys(results).length) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
