import { useState } from 'react'
import { Database, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '../lib/utils'
import type { WSIMetadata } from '../types'

const initialMetadata: Partial<WSIMetadata> = {
  caseId: '',
  specimenId: '',
  slideId: '',
  scanDate: '',
  scanner: {
    manufacturer: '',
    model: '',
    serialNumber: ''
  },
  magnification: 20,
  resolution: {
    x: 0.5,
    y: 0.5,
    unit: 'µm/pixel'
  },
  compression: 'JPEG2000',
  validated: false,
  validationErrors: []
}

export default function MetadataBuilder() {
  const [metadata, setMetadata] = useState<Partial<WSIMetadata>>(initialMetadata)
  const [errors, setErrors] = useState<string[]>([])

  const validateMetadata = (): string[] => {
    const newErrors: string[] = []

    if (!metadata.caseId) newErrors.push('Case ID is required')
    if (!metadata.specimenId) newErrors.push('Specimen ID is required')
    if (!metadata.slideId) newErrors.push('Slide ID is required')
    if (!metadata.scanDate) newErrors.push('Scan date is required')
    if (!metadata.scanner?.manufacturer) newErrors.push('Scanner manufacturer is required')
    if (!metadata.scanner?.model) newErrors.push('Scanner model is required')

    // Format validation
    if (metadata.caseId && !/^[A-Z0-9-]+$/.test(metadata.caseId)) {
      newErrors.push('Case ID must contain only uppercase letters, numbers, and hyphens')
    }

    // Range validation
    if (metadata.magnification && (metadata.magnification < 1 || metadata.magnification > 100)) {
      newErrors.push('Magnification must be between 1x and 100x')
    }

    if (metadata.resolution && metadata.resolution.x > 1) {
      newErrors.push('Resolution seems too high - typical values are 0.25-0.5 µm/pixel')
    }

    return newErrors
  }

  const handleValidate = () => {
    const validationErrors = validateMetadata()
    setErrors(validationErrors)
    setMetadata({ ...metadata, validated: validationErrors.length === 0, validationErrors })
  }

  const handleReset = () => {
    setMetadata(initialMetadata)
    setErrors([])
  }

  const isValid = errors.length === 0 && metadata.validated

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">WSI Metadata Builder</h1>
        </div>

        <div className="p-4 rounded-lg bg-primary-900/20 border border-primary-700 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-dark-text-secondary">
            <p className="font-semibold text-primary-400 mb-1">Educational Tool - No Real Data</p>
            <p>
              Build and validate whole-slide imaging metadata structures. This interactive tool
              demonstrates the hierarchical organization and validation rules for digital pathology metadata.
            </p>
          </div>
        </div>
      </div>

      {/* Metadata Form */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Case Level */}
          <div className="p-6 rounded-xl bg-dark-surface border border-dark-border space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-400"></span>
              Case Level Metadata
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Case ID *</label>
                <input
                  type="text"
                  value={metadata.caseId}
                  onChange={(e) => setMetadata({ ...metadata, caseId: e.target.value.toUpperCase() })}
                  placeholder="S24-12345"
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specimen ID *</label>
                <input
                  type="text"
                  value={metadata.specimenId}
                  onChange={(e) => setMetadata({ ...metadata, specimenId: e.target.value })}
                  placeholder="SPEC-001"
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slide ID *</label>
                <input
                  type="text"
                  value={metadata.slideId}
                  onChange={(e) => setMetadata({ ...metadata, slideId: e.target.value })}
                  placeholder="SLIDE-A1"
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Scan Date *</label>
                <input
                  type="date"
                  value={metadata.scanDate}
                  onChange={(e) => setMetadata({ ...metadata, scanDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Scanner Information */}
          <div className="p-6 rounded-xl bg-dark-surface border border-dark-border space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-400"></span>
              Scanner Information
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Manufacturer *</label>
                <select
                  value={metadata.scanner?.manufacturer}
                  onChange={(e) => setMetadata({
                    ...metadata,
                    scanner: { ...metadata.scanner!, manufacturer: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                >
                  <option value="">Select manufacturer</option>
                  <option value="Aperio">Aperio</option>
                  <option value="Philips">Philips</option>
                  <option value="Hamamatsu">Hamamatsu</option>
                  <option value="3DHISTECH">3DHISTECH</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Model *</label>
                <input
                  type="text"
                  value={metadata.scanner?.model}
                  onChange={(e) => setMetadata({
                    ...metadata,
                    scanner: { ...metadata.scanner!, model: e.target.value }
                  })}
                  placeholder="GT 450"
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Serial Number</label>
                <input
                  type="text"
                  value={metadata.scanner?.serialNumber}
                  onChange={(e) => setMetadata({
                    ...metadata,
                    scanner: { ...metadata.scanner!, serialNumber: e.target.value }
                  })}
                  placeholder="SN-123456"
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Technical Parameters */}
          <div className="p-6 rounded-xl bg-dark-surface border border-dark-border space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-400"></span>
              Technical Parameters
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">Magnification</label>
                <select
                  value={metadata.magnification}
                  onChange={(e) => setMetadata({ ...metadata, magnification: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                >
                  <option value={20}>20x</option>
                  <option value={40}>40x</option>
                  <option value={60}>60x</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Compression</label>
                <select
                  value={metadata.compression}
                  onChange={(e) => setMetadata({ ...metadata, compression: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                >
                  <option value="JPEG">JPEG</option>
                  <option value="JPEG2000">JPEG2000</option>
                  <option value="PNG">PNG</option>
                  <option value="Uncompressed">Uncompressed</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Resolution (µm/pixel)</label>
                <input
                  type="number"
                  step="0.01"
                  value={metadata.resolution?.x}
                  onChange={(e) => setMetadata({
                    ...metadata,
                    resolution: {
                      x: Number(e.target.value),
                      y: Number(e.target.value),
                      unit: 'µm/pixel'
                    }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark-bg border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
                />
                <p className="text-xs text-dark-text-secondary mt-1">Typical: 0.25-0.5 for 40x</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Validation & Preview */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleValidate}
              className="flex-1 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
            >
              Validate Metadata
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 font-medium transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Validation Results */}
          {metadata.validated !== undefined && (
            <div className={cn(
              'p-6 rounded-xl border',
              isValid
                ? 'bg-green-900/20 border-green-700'
                : 'bg-red-900/20 border-red-700'
            )}>
              <div className="flex items-start gap-3">
                {isValid ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {isValid ? 'Validation Passed' : 'Validation Failed'}
                  </h3>

                  {isValid ? (
                    <p className="text-sm text-dark-text-secondary">
                      All required metadata fields are present and properly formatted. This metadata
                      structure is ready for DICOM WSI export.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-dark-text-secondary">
                        Please fix the following errors:
                      </p>
                      <ul className="space-y-1 text-sm">
                        {errors.map((error, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-400">•</span>
                            <span className="text-dark-text-secondary">{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* JSON Preview */}
          <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
            <h3 className="font-semibold mb-3">Metadata Structure Preview</h3>
            <pre className="text-xs bg-dark-bg p-4 rounded-lg overflow-x-auto text-dark-text-secondary border border-dark-border">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </div>

          {/* Learning Points */}
          <div className="p-6 rounded-xl bg-primary-900/10 border border-primary-700/50">
            <h3 className="font-semibold mb-3 text-primary-400">Learning Points</h3>
            <ul className="space-y-2 text-sm text-dark-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-primary-400">•</span>
                <span>Metadata is hierarchical: Case → Specimen → Slide → Region</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">•</span>
                <span>Unique identifiers are critical for tracking and retrieval</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">•</span>
                <span>Technical parameters affect image quality and file size</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">•</span>
                <span>DICOM WSI requires specific metadata structure and validation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
