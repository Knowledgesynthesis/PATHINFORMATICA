import { useState } from 'react'
import { Brain, AlertTriangle, Lightbulb } from 'lucide-react'
import { cn } from '../lib/utils'
import type { AIConceptBlock } from '../types'

const availableBlocks: AIConceptBlock[] = [
  {
    id: 'input',
    type: 'input',
    label: 'WSI Input',
    description: 'Whole-slide image data from scanner',
    parameters: { format: 'DICOM WSI', resolution: '0.5 µm/pixel' },
    connections: [],
    limitations: ['Quality dependent on scan parameters', 'Stain variation affects downstream analysis']
  },
  {
    id: 'preprocessing',
    type: 'preprocessing',
    label: 'Preprocessing',
    description: 'Color normalization, tissue detection, artifact removal',
    parameters: { normalization: 'Macenko', tissueDetection: 'Otsu threshold' },
    connections: [],
    limitations: ['Cannot correct poor slide quality', 'May miss subtle tissue regions']
  },
  {
    id: 'patch-extraction',
    type: 'preprocessing',
    label: 'Patch Extraction',
    description: 'Divide WSI into smaller tiles for processing',
    parameters: { patchSize: '256x256', overlap: '0%' },
    connections: [],
    limitations: ['Loses spatial context between patches', 'Optimal size varies by task']
  },
  {
    id: 'feature-extraction',
    type: 'feature-extraction',
    label: 'Feature Extraction (CNN)',
    description: 'Conceptual: Neural network learns visual patterns',
    parameters: { architecture: 'ResNet-50', pretrained: 'ImageNet' },
    connections: [],
    limitations: ['Requires large training dataset', 'Black box - features not interpretable', 'Biased by training data']
  },
  {
    id: 'classification',
    type: 'model',
    label: 'Classification Model',
    description: 'Conceptual: Predicts categories (e.g., tumor/normal)',
    parameters: { classes: 2, threshold: 0.5 },
    connections: [],
    limitations: ['Confidence ≠ certainty', 'Cannot detect what it wasn\'t trained on', 'Requires validation']
  },
  {
    id: 'heatmap',
    type: 'postprocessing',
    label: 'Heatmap Generation',
    description: 'Visualize predictions spatially',
    parameters: { colormap: 'Red-Blue', opacity: 0.5 },
    connections: [],
    limitations: ['Visualization choice affects interpretation', 'May give false sense of precision']
  },
  {
    id: 'qa',
    type: 'qa',
    label: 'Quality Assurance',
    description: 'Validation checks and uncertainty quantification',
    parameters: { checks: ['confidence threshold', 'tissue coverage', 'artifact detection'] },
    connections: [],
    limitations: ['Cannot catch all failures', 'Requires ongoing monitoring']
  },
  {
    id: 'output',
    type: 'output',
    label: 'Clinical Output',
    description: 'Results for pathologist review',
    parameters: { format: 'HL7 FHIR', integration: 'AP-LIS' },
    connections: [],
    limitations: ['Requires pathologist interpretation', 'Not autonomous decision-making']
  }
]

export default function AIConceptExplorer() {
  const [selectedBlocks, setSelectedBlocks] = useState<AIConceptBlock[]>([])
  const [datasetSize, setDatasetSize] = useState(1000)
  const [dataQuality, setDataQuality] = useState(80)

  const addBlock = (block: AIConceptBlock) => {
    setSelectedBlocks([...selectedBlocks, { ...block, id: `${block.id}-${Date.now()}` }])
  }

  const removeBlock = (index: number) => {
    setSelectedBlocks(selectedBlocks.filter((_, i) => i !== index))
  }

  const clearWorkflow = () => {
    setSelectedBlocks([])
  }

  // Conceptual performance estimation
  const estimatedPerformance = () => {
    if (selectedBlocks.length < 3) return 'Incomplete workflow'

    let score = 50
    if (datasetSize >= 5000) score += 20
    else if (datasetSize >= 1000) score += 10

    if (dataQuality >= 90) score += 20
    else if (dataQuality >= 70) score += 10

    if (selectedBlocks.some(b => b.type === 'qa')) score += 10

    return `Conceptual accuracy: ~${score}%`
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Brain className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">AI Concept Explorer</h1>
        </div>

        <div className="p-4 rounded-lg bg-red-900/20 border border-red-700 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-red-400 mb-1">Educational Only - No Real AI Implementation</p>
            <p className="text-dark-text-secondary">
              This tool teaches AI concepts conceptually. No actual machine learning or image
              analysis is performed. All "predictions" are simulated for educational purposes only.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Available Blocks */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">AI Pipeline Components</h2>
            <p className="text-dark-text-secondary text-sm mb-4">
              Drag conceptual blocks to build an AI workflow. Learn how different components interact
              and their inherent limitations.
            </p>
          </div>

          <div className="grid gap-3">
            {availableBlocks.map((block) => (
              <button
                key={block.id}
                onClick={() => addBlock(block)}
                className="p-4 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 transition-all text-left group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        'px-2 py-0.5 text-xs rounded font-medium',
                        block.type === 'input' && 'bg-blue-900/30 text-blue-400',
                        block.type === 'preprocessing' && 'bg-purple-900/30 text-purple-400',
                        block.type === 'feature-extraction' && 'bg-pink-900/30 text-pink-400',
                        block.type === 'model' && 'bg-primary-900/30 text-primary-400',
                        block.type === 'postprocessing' && 'bg-green-900/30 text-green-400',
                        block.type === 'qa' && 'bg-yellow-900/30 text-yellow-400',
                        block.type === 'output' && 'bg-orange-900/30 text-orange-400'
                      )}>
                        {block.type}
                      </span>
                      <h3 className="font-semibold group-hover:text-primary-400 transition-colors">
                        {block.label}
                      </h3>
                    </div>
                    <p className="text-sm text-dark-text-secondary">{block.description}</p>
                  </div>
                  <span className="text-2xl text-dark-text-secondary group-hover:text-primary-400 transition-colors">+</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Workflow Builder */}
        <div className="space-y-6 lg:sticky lg:top-8 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your AI Workflow</h2>
            {selectedBlocks.length > 0 && (
              <button
                onClick={clearWorkflow}
                className="text-sm text-dark-text-secondary hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {selectedBlocks.length === 0 ? (
            <div className="p-12 rounded-xl bg-dark-surface border-2 border-dashed border-dark-border text-center">
              <Brain className="w-12 h-12 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary">
                Add components to build your conceptual AI workflow
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedBlocks.map((block, index) => (
                <div
                  key={block.id}
                  className="p-4 rounded-lg bg-dark-surface border border-dark-border"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-dark-text-secondary">
                          {index + 1}.
                        </span>
                        <span className={cn(
                          'px-2 py-0.5 text-xs rounded font-medium',
                          block.type === 'input' && 'bg-blue-900/30 text-blue-400',
                          block.type === 'preprocessing' && 'bg-purple-900/30 text-purple-400',
                          block.type === 'feature-extraction' && 'bg-pink-900/30 text-pink-400',
                          block.type === 'model' && 'bg-primary-900/30 text-primary-400',
                          block.type === 'postprocessing' && 'bg-green-900/30 text-green-400',
                          block.type === 'qa' && 'bg-yellow-900/30 text-yellow-400',
                          block.type === 'output' && 'bg-orange-900/30 text-orange-400'
                        )}>
                          {block.type}
                        </span>
                        <h3 className="font-semibold">{block.label}</h3>
                      </div>

                      {block.limitations.length > 0 && (
                        <div className="text-xs text-dark-text-secondary space-y-1 mt-2">
                          <div className="flex items-start gap-2">
                            <AlertTriangle size={12} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Limitations:</span>
                          </div>
                          {block.limitations.slice(0, 2).map((limitation, i) => (
                            <div key={i} className="ml-5">• {limitation}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeBlock(index)}
                      className="text-dark-text-secondary hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dataset Parameters */}
          {selectedBlocks.length > 0 && (
            <>
              <div className="p-6 rounded-xl bg-dark-surface border border-dark-border space-y-4">
                <h3 className="font-semibold">Conceptual Dataset Parameters</h3>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label>Training Dataset Size</label>
                    <span className="text-primary-400 font-medium">{datasetSize} cases</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={datasetSize}
                    onChange={(e) => setDatasetSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-dark-text-secondary mt-1">
                    Larger datasets generally improve model performance but require more resources
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label>Data Quality</label>
                    <span className="text-primary-400 font-medium">{dataQuality}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={dataQuality}
                    onChange={(e) => setDataQuality(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-dark-text-secondary mt-1">
                    Quality includes accurate labels, consistent staining, and minimal artifacts
                  </p>
                </div>
              </div>

              {/* Conceptual Results */}
              <div className="p-6 rounded-xl bg-primary-900/10 border border-primary-700/50">
                <h3 className="font-semibold mb-3 text-primary-400">Conceptual Analysis</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">Workflow completeness</span>
                    <span className="font-semibold">
                      {selectedBlocks.length >= 5 ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">Estimated performance</span>
                    <span className="font-semibold">{estimatedPerformance()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">QA checks included</span>
                    <span className="font-semibold">
                      {selectedBlocks.some(b => b.type === 'qa') ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Learnings */}
              <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">Key Concepts</h3>
                    <ul className="space-y-2 text-sm text-dark-text-secondary">
                      <li>• AI models learn patterns from training data, not universal truth</li>
                      <li>• Every component has limitations and failure modes</li>
                      <li>• Validation is essential before clinical deployment</li>
                      <li>• Human oversight (pathologist review) is critical</li>
                      <li>• Performance varies with dataset quality and diversity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
