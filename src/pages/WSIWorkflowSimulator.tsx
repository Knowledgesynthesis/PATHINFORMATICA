import { useState } from 'react'
import { Workflow, Play, CheckCircle2, ArrowRight, AlertTriangle, Info } from 'lucide-react'
import { cn } from '../lib/utils'
import type { WorkflowStep } from '../types'

const workflowSteps: WorkflowStep[] = [
  {
    id: 'scanning',
    name: 'Slide Scanning',
    description: 'Physical glass slide is placed in the scanner and digitized',
    order: 1,
    status: 'pending',
    inputs: { slide: 'Physical glass slide', barcode: 'Specimen ID' },
    outputs: { rawImage: 'Unprocessed WSI' },
    validationRules: [
      { field: 'focus', rule: 'required', parameters: {}, errorMessage: 'Focus quality must be adequate' },
      { field: 'tissueDetection', rule: 'required', parameters: {}, errorMessage: 'Tissue must be detected on slide' }
    ],
    estimatedDuration: 180,
    assignedRole: 'Scanner Operator',
    qcRequired: true
  },
  {
    id: 'qc-focus',
    name: 'Quality Control - Focus',
    description: 'Automated and manual verification of image focus quality',
    order: 2,
    status: 'pending',
    inputs: { rawImage: 'Unprocessed WSI' },
    outputs: { qcReport: 'Focus QC metrics', pass: 'boolean' },
    validationRules: [
      { field: 'focusScore', rule: 'range', parameters: { min: 0.7, max: 1.0 }, errorMessage: 'Focus score below threshold' }
    ],
    estimatedDuration: 30,
    assignedRole: 'Pathologist/Tech',
    qcRequired: true
  },
  {
    id: 'metadata-attachment',
    name: 'Metadata Attachment',
    description: 'Link clinical metadata from LIS to the digital slide',
    order: 3,
    status: 'pending',
    inputs: { image: 'QC-passed WSI', lisData: 'Case metadata' },
    outputs: { enrichedImage: 'WSI with metadata' },
    validationRules: [
      { field: 'caseId', rule: 'required', parameters: {}, errorMessage: 'Case ID must match LIS' },
      { field: 'specimenId', rule: 'reference', parameters: { source: 'LIS' }, errorMessage: 'Specimen ID not found in LIS' }
    ],
    estimatedDuration: 15,
    assignedRole: 'Automated System',
    qcRequired: false
  },
  {
    id: 'compression',
    name: 'Image Compression',
    description: 'Apply compression algorithm to reduce file size',
    order: 4,
    status: 'pending',
    inputs: { enrichedImage: 'WSI with metadata' },
    outputs: { compressedImage: 'Compressed WSI' },
    validationRules: [
      { field: 'compressionRatio', rule: 'range', parameters: { min: 5, max: 30 }, errorMessage: 'Compression ratio out of acceptable range' }
    ],
    estimatedDuration: 60,
    assignedRole: 'Automated System',
    qcRequired: false
  },
  {
    id: 'dicom-conversion',
    name: 'DICOM Conversion',
    description: 'Convert to DICOM WSI standard format',
    order: 5,
    status: 'pending',
    inputs: { compressedImage: 'Compressed WSI' },
    outputs: { dicomImage: 'DICOM WSI file' },
    validationRules: [
      { field: 'dicomCompliance', rule: 'required', parameters: {}, errorMessage: 'Must conform to DICOM Supplement 145' }
    ],
    estimatedDuration: 45,
    assignedRole: 'Automated System',
    qcRequired: true
  },
  {
    id: 'archive',
    name: 'Archive Storage',
    description: 'Store in long-term archive with redundancy',
    order: 6,
    status: 'pending',
    inputs: { dicomImage: 'DICOM WSI file' },
    outputs: { archiveLocation: 'Storage path', checksum: 'File integrity hash' },
    validationRules: [
      { field: 'checksumVerification', rule: 'required', parameters: {}, errorMessage: 'Checksum verification failed' }
    ],
    estimatedDuration: 30,
    assignedRole: 'Archive System',
    qcRequired: true
  },
  {
    id: 'access',
    name: 'Viewer Access',
    description: 'Make available to authorized users via viewer',
    order: 7,
    status: 'pending',
    inputs: { archiveLocation: 'Storage path' },
    outputs: { viewerUrl: 'Access link', permissions: 'User access list' },
    validationRules: [],
    estimatedDuration: 5,
    assignedRole: 'Viewer System',
    qcRequired: false
  }
]

export default function WSIWorkflowSimulator() {
  const [steps, setSteps] = useState<WorkflowStep[]>(workflowSteps)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const runWorkflow = () => {
    if (isRunning) return

    setIsRunning(true)
    setCurrentStepIndex(0)
    setSteps(workflowSteps.map(s => ({ ...s, status: 'pending' })))

    let index = 0
    const interval = setInterval(() => {
      if (index >= workflowSteps.length) {
        clearInterval(interval)
        setIsRunning(false)
        return
      }

      setSteps(prev => prev.map((step, i) => ({
        ...step,
        status: i === index ? 'in-progress' : i < index ? 'completed' : 'pending'
      })))

      setCurrentStepIndex(index)
      index++
    }, 1500)
  }

  const resetWorkflow = () => {
    setSteps(workflowSteps.map(s => ({ ...s, status: 'pending' })))
    setCurrentStepIndex(0)
    setIsRunning(false)
  }

  const currentStep = steps[currentStepIndex]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Workflow className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">WSI Workflow Simulator</h1>
        </div>

        <div className="p-4 rounded-lg bg-primary-900/20 border border-primary-700 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-dark-text-secondary">
            <p className="font-semibold text-primary-400 mb-1">Educational Simulation</p>
            <p>
              Explore the complete digital pathology workflow from physical slide scanning
              through archival and access. This simulation demonstrates real-world steps,
              timing, and quality control checkpoints.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={runWorkflow}
          disabled={isRunning}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2',
            isRunning
              ? 'bg-dark-border text-dark-text-secondary cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-500 text-white'
          )}
        >
          <Play size={20} />
          {isRunning ? 'Running...' : 'Run Workflow'}
        </button>

        <button
          onClick={resetWorkflow}
          disabled={isRunning}
          className="px-6 py-3 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>

      {/* Workflow Visualization */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Step Timeline */}
        <div className="space-y-3">
          {steps.map((step) => {
            const isActive = step.status === 'in-progress'
            const isCompleted = step.status === 'completed'

            return (
              <div
                key={step.id}
                className={cn(
                  'p-4 rounded-lg border transition-all',
                  isActive && 'bg-primary-900/20 border-primary-700 ring-2 ring-primary-700',
                  isCompleted && 'bg-green-900/10 border-green-700',
                  !isActive && !isCompleted && 'bg-dark-surface border-dark-border'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                    isCompleted && 'bg-green-900/30 text-green-400',
                    isActive && 'bg-primary-900/30 text-primary-400',
                    !isActive && !isCompleted && 'bg-dark-border text-dark-text-secondary'
                  )}>
                    {isCompleted ? <CheckCircle2 size={18} /> : step.order}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={cn(
                        'font-semibold',
                        isActive && 'text-primary-400'
                      )}>
                        {step.name}
                      </h3>
                      {step.qcRequired && (
                        <span className="px-2 py-0.5 text-xs rounded bg-yellow-900/30 text-yellow-400 border border-yellow-700 flex-shrink-0">
                          QC Required
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-dark-text-secondary mt-1">
                      {step.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-dark-text-secondary">
                      <span>~{step.estimatedDuration}s</span>
                      <span>•</span>
                      <span>{step.assignedRole}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Current Step Details */}
        {currentStep && (
          <div className="space-y-6 lg:sticky lg:top-8 h-fit">
            <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary-900/30 text-primary-400 text-sm font-medium">
                  Step {currentStep.order} / {steps.length}
                </span>
                {currentStep.status === 'in-progress' && (
                  <span className="flex items-center gap-2 text-primary-400 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                    In Progress
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-3">{currentStep.name}</h3>
              <p className="text-dark-text-secondary mb-6">{currentStep.description}</p>

              {/* Inputs */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-dark-text-secondary mb-2">Inputs</h4>
                <div className="space-y-1">
                  {Object.entries(currentStep.inputs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <ArrowRight size={14} className="text-primary-400" />
                      <span className="text-dark-text-secondary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outputs */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-dark-text-secondary mb-2">Outputs</h4>
                <div className="space-y-1">
                  {Object.entries(currentStep.outputs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <ArrowRight size={14} className="text-green-400" />
                      <span className="text-dark-text-secondary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation Rules */}
              {currentStep.validationRules.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-dark-text-secondary mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-yellow-400" />
                    Validation Rules
                  </h4>
                  <div className="space-y-1">
                    {currentStep.validationRules.map((rule, index) => (
                      <div key={index} className="text-sm text-dark-text-secondary">
                        • {rule.errorMessage}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Progress Summary */}
            <div className="p-6 rounded-xl bg-primary-900/10 border border-primary-700/50">
              <h4 className="font-semibold mb-3 text-primary-400">Workflow Progress</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Completed</span>
                  <span className="font-semibold">{steps.filter(s => s.status === 'completed').length} / {steps.length}</span>
                </div>
                <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                    style={{ width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-dark-text-secondary">
                  <span>Total estimated time: ~{steps.reduce((acc, s) => acc + s.estimatedDuration, 0)}s</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
