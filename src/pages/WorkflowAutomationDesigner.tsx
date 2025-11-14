import { useState } from 'react'
import { Network, Plus, ArrowRight, Trash2, Info } from 'lucide-react'
import { cn } from '../lib/utils'

interface WorkflowNode {
  id: string
  type: 'LIS' | 'Scanner' | 'PACS' | 'AI' | 'Viewer' | 'Reporter' | 'EMR'
  label: string
  description: string
  inputs: string[]
  outputs: string[]
}

const availableNodes: WorkflowNode[] = [
  {
    id: 'lis',
    type: 'LIS',
    label: 'LIS/AP-LIS',
    description: 'Laboratory Information System - manages orders and results',
    inputs: ['HL7 ORM (orders)', 'Manual entry'],
    outputs: ['Case metadata', 'HL7 ORU (results)', 'Accession numbers']
  },
  {
    id: 'scanner',
    type: 'Scanner',
    label: 'WSI Scanner',
    description: 'Whole-slide imaging scanner',
    inputs: ['Glass slides', 'Case metadata', 'Scan parameters'],
    outputs: ['Digital WSI files', 'DICOM metadata', 'QC metrics']
  },
  {
    id: 'pacs',
    type: 'PACS',
    label: 'PACS/VNA',
    description: 'Picture Archiving and Communication System',
    inputs: ['DICOM WSI', 'Metadata', 'Storage requests'],
    outputs: ['Archived images', 'Retrieval services', 'Backup confirmation']
  },
  {
    id: 'ai',
    type: 'AI',
    label: 'AI Analysis',
    description: 'AI-based image analysis system (conceptual)',
    inputs: ['WSI files', 'Analysis parameters', 'Training models'],
    outputs: ['Analysis results', 'Confidence scores', 'Heatmaps', 'QA flags']
  },
  {
    id: 'viewer',
    type: 'Viewer',
    label: 'Digital Viewer',
    description: 'Pathologist viewing workstation',
    inputs: ['WSI from PACS', 'Case information', 'AI results (optional)'],
    outputs: ['Diagnostic annotations', 'Measurements', 'Viewing logs']
  },
  {
    id: 'reporter',
    type: 'Reporter',
    label: 'Report Generator',
    description: 'Structured reporting system',
    inputs: ['Diagnosis', 'Synoptic data', 'SNOMED/LOINC codes'],
    outputs: ['Final report', 'Coded data', 'HL7 ORU message']
  },
  {
    id: 'emr',
    type: 'EMR',
    label: 'EMR/EHR',
    description: 'Electronic Medical Record system',
    inputs: ['HL7 ORU (results)', 'Report PDFs', 'Critical value alerts'],
    outputs: ['Results posted to chart', 'Clinician notifications']
  }
]

export default function WorkflowAutomationDesigner() {
  const [selectedNodes, setSelectedNodes] = useState<WorkflowNode[]>([])
  const [connections, setConnections] = useState<Array<{ from: number; to: number }>>([])

  const addNode = (node: WorkflowNode) => {
    setSelectedNodes([...selectedNodes, { ...node, id: `${node.id}-${Date.now()}` }])
  }

  const removeNode = (index: number) => {
    setSelectedNodes(selectedNodes.filter((_, i) => i !== index))
    // Remove connections involving this node
    setConnections(connections.filter(c => c.from !== index && c.to !== index))
  }

  const addConnection = (fromIndex: number, toIndex: number) => {
    // Don't add duplicate connections
    if (connections.some(c => c.from === fromIndex && c.to === toIndex)) {
      return
    }
    setConnections([...connections, { from: fromIndex, to: toIndex }])
  }

  const clearWorkflow = () => {
    setSelectedNodes([])
    setConnections([])
  }

  const validateWorkflow = () => {
    const issues: string[] = []

    if (selectedNodes.length === 0) {
      return ['No nodes in workflow']
    }

    // Check for orphaned nodes (no connections)
    selectedNodes.forEach((node, idx) => {
      const hasIncoming = connections.some(c => c.to === idx)
      const hasOutgoing = connections.some(c => c.from === idx)

      if (!hasIncoming && !hasOutgoing && selectedNodes.length > 1) {
        issues.push(`${node.label} is not connected to the workflow`)
      }
    })

    // Check for typical workflow patterns
    const hasLIS = selectedNodes.some(n => n.type === 'LIS')
    const hasScanner = selectedNodes.some(n => n.type === 'Scanner')
    const hasViewer = selectedNodes.some(n => n.type === 'Viewer')

    if (hasScanner && !hasLIS) {
      issues.push('Scanner typically requires LIS for case metadata')
    }

    if (selectedNodes.some(n => n.type === 'AI') && !hasViewer) {
      issues.push('AI results should be reviewed by pathologist in viewer')
    }

    return issues.length > 0 ? issues : ['Workflow appears valid']
  }

  const validationResults = validateWorkflow()
  const isValid = validationResults.length === 1 && validationResults[0] === 'Workflow appears valid'

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Network className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">Workflow Automation Designer</h1>
        </div>

        <div className="p-4 rounded-lg bg-primary-900/20 border border-primary-700 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-dark-text-secondary">
            <p className="font-semibold text-primary-400 mb-1">Educational Workflow Designer</p>
            <p>
              Design and visualize digital pathology workflow automation. Connect systems (LIS, scanners,
              PACS, AI, viewers, EMR) to understand data flow and integration patterns. This is a
              conceptual tool for learning workflow design principles.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-dark-text-secondary">
          {selectedNodes.length} nodes, {connections.length} connections
        </div>
        {selectedNodes.length > 0 && (
          <button
            onClick={clearWorkflow}
            className="px-4 py-2 rounded-lg bg-dark-surface border border-dark-border hover:border-red-700 text-sm font-medium transition-colors text-red-400"
          >
            Clear Workflow
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Available Nodes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">System Components</h2>

          <div className="grid gap-3">
            {availableNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => addNode(node)}
                className="p-4 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 transition-all text-left group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        'px-2 py-0.5 text-xs rounded font-medium',
                        node.type === 'LIS' && 'bg-blue-900/30 text-blue-400',
                        node.type === 'Scanner' && 'bg-purple-900/30 text-purple-400',
                        node.type === 'PACS' && 'bg-green-900/30 text-green-400',
                        node.type === 'AI' && 'bg-pink-900/30 text-pink-400',
                        node.type === 'Viewer' && 'bg-yellow-900/30 text-yellow-400',
                        node.type === 'Reporter' && 'bg-orange-900/30 text-orange-400',
                        node.type === 'EMR' && 'bg-cyan-900/30 text-cyan-400'
                      )}>
                        {node.type}
                      </span>
                      <h3 className="font-semibold group-hover:text-primary-400 transition-colors">
                        {node.label}
                      </h3>
                    </div>
                    <p className="text-sm text-dark-text-secondary mb-2">{node.description}</p>

                    <div className="text-xs text-dark-text-secondary">
                      <div className="mb-1">Inputs: {node.inputs.join(', ')}</div>
                      <div>Outputs: {node.outputs.join(', ')}</div>
                    </div>
                  </div>

                  <Plus className="w-5 h-5 text-dark-text-secondary group-hover:text-primary-400 transition-colors flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Workflow Canvas */}
        <div className="space-y-6 lg:sticky lg:top-8 h-fit">
          <h2 className="text-2xl font-bold">Your Workflow</h2>

          {selectedNodes.length === 0 ? (
            <div className="p-12 rounded-xl bg-dark-surface border-2 border-dashed border-dark-border text-center">
              <Network className="w-12 h-12 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary">
                Add system components to design your workflow
              </p>
            </div>
          ) : (
            <>
              {/* Workflow Nodes */}
              <div className="space-y-3">
                {selectedNodes.map((node, idx) => (
                  <div key={node.id}>
                    <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-dark-text-secondary">
                              {idx + 1}.
                            </span>
                            <span className={cn(
                              'px-2 py-0.5 text-xs rounded font-medium',
                              node.type === 'LIS' && 'bg-blue-900/30 text-blue-400',
                              node.type === 'Scanner' && 'bg-purple-900/30 text-purple-400',
                              node.type === 'PACS' && 'bg-green-900/30 text-green-400',
                              node.type === 'AI' && 'bg-pink-900/30 text-pink-400',
                              node.type === 'Viewer' && 'bg-yellow-900/30 text-yellow-400',
                              node.type === 'Reporter' && 'bg-orange-900/30 text-orange-400',
                              node.type === 'EMR' && 'bg-cyan-900/30 text-cyan-400'
                            )}>
                              {node.type}
                            </span>
                            <h3 className="font-semibold">{node.label}</h3>
                          </div>

                          {/* Connection Controls */}
                          {idx < selectedNodes.length - 1 && (
                            <button
                              onClick={() => addConnection(idx, idx + 1)}
                              disabled={connections.some(c => c.from === idx && c.to === idx + 1)}
                              className="mt-2 px-3 py-1 text-xs rounded-lg bg-primary-900/20 border border-primary-700 text-primary-400 hover:bg-primary-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                              <ArrowRight size={12} />
                              Connect to next
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => removeNode(idx)}
                          className="text-dark-text-secondary hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Connection Arrow */}
                    {connections.some(c => c.from === idx) && idx < selectedNodes.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowRight size={24} className="text-primary-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Validation Results */}
              <div className={cn(
                'p-6 rounded-xl border',
                isValid
                  ? 'bg-green-900/10 border-green-700'
                  : 'bg-yellow-900/10 border-yellow-700'
              )}>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  {isValid ? (
                    <><Network size={18} className="text-green-400" /> Workflow Validation</>
                  ) : (
                    <><Info size={18} className="text-yellow-400" /> Workflow Suggestions</>
                  )}
                </h3>
                <ul className="space-y-2 text-sm">
                  {validationResults.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-dark-text-secondary">
                      <span className={isValid ? 'text-green-400' : 'text-yellow-400'}>•</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Workflow Summary */}
              {selectedNodes.length > 1 && (
                <div className="p-6 rounded-xl bg-primary-900/10 border border-primary-700/50">
                  <h3 className="font-semibold mb-3 text-primary-400">Workflow Summary</h3>
                  <div className="space-y-2 text-sm text-dark-text-secondary">
                    <div className="flex justify-between">
                      <span>Total Systems:</span>
                      <span className="font-semibold">{selectedNodes.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Connections:</span>
                      <span className="font-semibold">{connections.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Includes AI:</span>
                      <span className="font-semibold">
                        {selectedNodes.some(n => n.type === 'AI') ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>LIS Integration:</span>
                      <span className="font-semibold">
                        {selectedNodes.some(n => n.type === 'LIS') ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Learning Points */}
              <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
                <h3 className="font-semibold mb-3">Workflow Design Principles</h3>
                <ul className="space-y-2 text-sm text-dark-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>LIS should be upstream - it generates case metadata for other systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>PACS/VNA provides central storage and retrieval services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>AI analysis results should always be reviewed by pathologist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>EMR integration closes the loop - results back to ordering clinician</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Each connection represents data exchange (HL7, DICOM, FHIR, etc.)</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
