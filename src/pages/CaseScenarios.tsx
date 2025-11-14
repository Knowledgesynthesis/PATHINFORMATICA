import { useState } from 'react'
import { FileText, CheckCircle2, Circle, Info, AlertTriangle } from 'lucide-react'
import { sampleCases } from '../data/caseScenarios'
import { cn } from '../lib/utils'

export default function CaseScenarios() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const selectedCase = sampleCases.find(c => c.id === selectedCaseId)

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(new Set([...completedSteps, stepId]))
    if (selectedCase && currentStep < selectedCase.workflow.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId)
    setCurrentStep(0)
    setCompletedSteps(new Set())
  }

  if (!selectedCase) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10 text-primary-400" />
            <h1 className="text-4xl font-bold">Case Scenarios</h1>
          </div>

          <div className="p-4 rounded-lg bg-primary-900/20 border border-primary-700 flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-dark-text-secondary">
              <p className="font-semibold text-primary-400 mb-1">Educational Cases - No Real Patient Data</p>
              <p>
                Work through integrated case scenarios that demonstrate complete digital pathology
                workflows, metadata management, coding, and regulatory considerations. All cases are
                synthetic and for educational purposes only.
              </p>
            </div>
          </div>
        </div>

        {/* Case Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Select a Case</h2>

          <div className="grid gap-6">
            {sampleCases.map((caseScenario) => (
              <button
                key={caseScenario.id}
                onClick={() => handleCaseSelect(caseScenario.id)}
                className="p-6 rounded-xl bg-dark-surface border border-dark-border hover:border-primary-700 transition-all text-left group"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {caseScenario.title}
                </h3>
                <p className="text-dark-text-secondary mb-4">
                  {caseScenario.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm">
                    {caseScenario.context.caseType}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 text-sm">
                    {caseScenario.context.specimenType}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm">
                    {caseScenario.workflow.length} workflow steps
                  </span>
                </div>

                <div className="text-sm text-dark-text-secondary">
                  <div className="font-semibold mb-1">Learning Objectives:</div>
                  <ul className="space-y-1">
                    {caseScenario.learningObjectives.slice(0, 2).map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary-400">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentWorkflowStep = selectedCase.workflow[currentStep]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <button
          onClick={() => setSelectedCaseId(null)}
          className="text-dark-text-secondary hover:text-primary-400 transition-colors"
        >
          ← Back to cases
        </button>

        <div className="flex items-center gap-3">
          <FileText className="w-10 h-10 text-primary-400" />
          <div>
            <h1 className="text-3xl font-bold">{selectedCase.title}</h1>
            <p className="text-dark-text-secondary">{selectedCase.description}</p>
          </div>
        </div>

        {/* Clinical Context */}
        <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
          <h3 className="font-semibold mb-2">Clinical Context</h3>
          <p className="text-sm text-dark-text-secondary">{selectedCase.context.clinicalContext}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-dark-text-secondary">Case Progress</span>
          <span className="font-semibold">
            Step {currentStep + 1} of {selectedCase.workflow.length}
          </span>
        </div>
        <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
            style={{ width: `${((completedSteps.size) / selectedCase.workflow.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Workflow Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Workflow Steps</h2>

          <div className="space-y-3">
            {selectedCase.workflow.map((step, idx) => {
              const isCompleted = completedSteps.has(step.id)
              const isCurrent = idx === currentStep

              return (
                <div
                  key={step.id}
                  className={cn(
                    'p-4 rounded-lg border transition-all',
                    isCurrent && 'bg-primary-900/20 border-primary-700 ring-2 ring-primary-700',
                    isCompleted && !isCurrent && 'bg-green-900/10 border-green-700',
                    !isCurrent && !isCompleted && 'bg-dark-surface border-dark-border'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                      isCompleted && 'bg-green-900/30 text-green-400',
                      isCurrent && !isCompleted && 'bg-primary-900/30 text-primary-400',
                      !isCurrent && !isCompleted && 'bg-dark-border text-dark-text-secondary'
                    )}>
                      {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className={cn(
                        'font-semibold',
                        isCurrent && 'text-primary-400'
                      )}>
                        {step.name}
                      </h3>
                      <p className="text-sm text-dark-text-secondary mt-1">
                        {step.description}
                      </p>
                      {step.qcRequired && (
                        <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded bg-yellow-900/30 text-yellow-400 border border-yellow-700">
                          QC Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Current Step Details */}
        <div className="space-y-6 lg:sticky lg:top-8 h-fit">
          <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{currentWorkflowStep.name}</h3>
              <span className="px-3 py-1 rounded-full bg-primary-900/30 text-primary-400 text-sm">
                Step {currentStep + 1}
              </span>
            </div>

            <p className="text-dark-text-secondary mb-6">{currentWorkflowStep.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Assigned Role</h4>
                <p className="text-sm text-dark-text-secondary">{currentWorkflowStep.assignedRole}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Estimated Duration</h4>
                <p className="text-sm text-dark-text-secondary">
                  ~{Math.round(currentWorkflowStep.estimatedDuration / 60)} minutes
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Inputs</h4>
                <div className="space-y-1">
                  {Object.entries(currentWorkflowStep.inputs).map(([key, value]) => (
                    <div key={key} className="text-sm text-dark-text-secondary flex items-start gap-2">
                      <Circle size={12} className="text-primary-400 mt-1 flex-shrink-0" />
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Outputs</h4>
                <div className="space-y-1">
                  {Object.entries(currentWorkflowStep.outputs).map(([key, value]) => (
                    <div key={key} className="text-sm text-dark-text-secondary flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-green-400 mt-1 flex-shrink-0" />
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {currentWorkflowStep.validationRules.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-yellow-400" />
                    Validation Requirements
                  </h4>
                  <div className="space-y-1">
                    {currentWorkflowStep.validationRules.map((rule, idx) => (
                      <div key={idx} className="text-sm text-dark-text-secondary">
                        • {rule.errorMessage}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleStepComplete(currentWorkflowStep.id)}
              disabled={completedSteps.has(currentWorkflowStep.id)}
              className="w-full mt-6 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {completedSteps.has(currentWorkflowStep.id) ? (
                <>
                  <CheckCircle2 size={20} />
                  Completed
                </>
              ) : (
                'Mark Step Complete'
              )}
            </button>
          </div>

          {/* Metadata Preview */}
          {selectedCase.metadata && (
            <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
              <h3 className="font-semibold mb-3">WSI Metadata</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Case ID:</span>
                  <span className="font-mono">{selectedCase.metadata.caseId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Scanner:</span>
                  <span>{selectedCase.metadata.scanner?.manufacturer} {selectedCase.metadata.scanner?.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Magnification:</span>
                  <span>{selectedCase.metadata.magnification}x</span>
                </div>
              </div>
            </div>
          )}

          {/* Coding Challenge */}
          {selectedCase.codingChallenge && completedSteps.size >= selectedCase.workflow.length - 1 && (
            <div className="p-6 rounded-xl bg-primary-900/10 border border-primary-700/50">
              <h3 className="font-semibold mb-3 text-primary-400">Coding Challenge</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold mb-2">Required LOINC Codes:</div>
                  <div className="space-y-1">
                    {selectedCase.codingChallenge.requiredCodes.LOINC.map((code, idx) => (
                      <div key={idx} className="text-dark-text-secondary font-mono text-xs">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-2">Required SNOMED CT Codes:</div>
                  <div className="space-y-1">
                    {selectedCase.codingChallenge.requiredCodes.SNOMED.map((code, idx) => (
                      <div key={idx} className="text-dark-text-secondary font-mono text-xs">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reflection Questions */}
          {completedSteps.size === selectedCase.workflow.length && (
            <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
              <h3 className="font-semibold mb-3">Reflection Questions</h3>
              <ul className="space-y-2 text-sm">
                {selectedCase.reflection.map((question, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-dark-text-secondary">
                    <span className="text-primary-400">{idx + 1}.</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
