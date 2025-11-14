import { useState } from 'react'
import { Shield, AlertCircle, CheckCircle2, Search, Info } from 'lucide-react'
import { cn } from '../lib/utils'

interface DataRecord {
  id: string
  accessionNumber: string
  specimenId: string
  patientId: string
  collectionDate: string
  receivedDate: string
  scanDate: string
  barcode: string
  errors: string[]
}

const sampleData: DataRecord[] = [
  {
    id: '1',
    accessionNumber: 'S24-12345',
    specimenId: 'A1',
    patientId: 'MRN-98765',
    collectionDate: '2024-01-15',
    receivedDate: '2024-01-16',
    scanDate: '2024-01-17',
    barcode: 'S2412345-A1',
    errors: [] // Clean record
  },
  {
    id: '2',
    accessionNumber: 'S24-12346',
    specimenId: 'B2',
    patientId: 'MRN-98766',
    collectionDate: '2024-01-16',
    receivedDate: '2024-01-15', // ERROR: Received before collected
    scanDate: '2024-01-17',
    barcode: 'S2412346-B2',
    errors: ['Received date is before collection date']
  },
  {
    id: '3',
    accessionNumber: 'S24-12347',
    specimenId: 'C1',
    patientId: 'MRN-98767',
    collectionDate: '2024-01-17',
    receivedDate: '2024-01-18',
    scanDate: '2024-01-16', // ERROR: Scanned before received
    barcode: 'S2412347-C1',
    errors: ['Scan date is before received date']
  },
  {
    id: '4',
    accessionNumber: 'S24-12348',
    specimenId: 'D1',
    patientId: 'MRN-98768',
    collectionDate: '2024-01-18',
    receivedDate: '2024-01-19',
    scanDate: '2024-01-20',
    barcode: 'S2412349-D1', // ERROR: Barcode doesn't match accession
    errors: ['Barcode does not match accession number pattern']
  },
  {
    id: '5',
    accessionNumber: 'S24-12349',
    specimenId: 'E-1', // ERROR: Invalid specimen ID format
    patientId: 'MRN-98769',
    collectionDate: '2024-01-19',
    receivedDate: '2024-01-20',
    scanDate: '2024-01-21',
    barcode: 'S2412349-E1',
    errors: ['Specimen ID contains invalid character (hyphen)']
  },
  {
    id: '6',
    accessionNumber: 'S24-123450', // ERROR: Invalid accession format (6 digits instead of 5)
    specimenId: 'F1',
    patientId: 'MRN-98770',
    collectionDate: '2024-01-20',
    receivedDate: '2024-01-21',
    scanDate: '2024-01-22',
    barcode: 'S24123450-F1',
    errors: ['Accession number format invalid (should be S##-#####)']
  },
  {
    id: '7',
    accessionNumber: 'S24-12351',
    specimenId: 'G1',
    patientId: '', // ERROR: Missing patient ID
    collectionDate: '2024-01-21',
    receivedDate: '2024-01-22',
    scanDate: '2024-01-23',
    barcode: 'S2412351-G1',
    errors: ['Patient ID is missing']
  },
  {
    id: '8',
    accessionNumber: 'S24-12352',
    specimenId: 'H1',
    patientId: 'MRN-98772',
    collectionDate: '2024-01-22',
    receivedDate: '2024-01-23',
    scanDate: '2024-01-23',
    barcode: 'S2412352-H1',
    errors: [] // Clean record
  },
  {
    id: '9',
    accessionNumber: 'S24-12345', // ERROR: Duplicate accession number
    specimenId: 'I1',
    patientId: 'MRN-98773',
    collectionDate: '2024-01-23',
    receivedDate: '2024-01-24',
    scanDate: '2024-01-25',
    barcode: 'S2412345-I1',
    errors: ['Duplicate accession number found']
  },
  {
    id: '10',
    accessionNumber: 'S24-12354',
    specimenId: 'J1',
    patientId: 'MRN-98774',
    collectionDate: '2024-01-24',
    receivedDate: '2024-01-25',
    scanDate: '2025-01-26', // ERROR: Future date
    barcode: 'S2412354-J1',
    errors: ['Scan date is in the future']
  }
]

export default function DataIntegrityInspector() {
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const [foundErrors, setFoundErrors] = useState<Set<string>>(new Set())
  const [showAnswers, setShowAnswers] = useState(false)

  const recordsWithErrors = sampleData.filter(r => r.errors.length > 0).length

  const handleRecordClick = (recordId: string) => {
    setSelectedRecord(recordId)
  }

  const handleMarkError = (recordId: string) => {
    setFoundErrors(new Set([...foundErrors, recordId]))
  }

  const selectedRecordData = sampleData.find(r => r.id === selectedRecord)
  const hasErrors = selectedRecordData && selectedRecordData.errors.length > 0
  const isMarkedAsError = selectedRecord && foundErrors.has(selectedRecord)

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">Data Integrity Inspector</h1>
        </div>

        <div className="p-4 rounded-lg bg-primary-900/20 border border-primary-700 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-dark-text-secondary">
            <p className="font-semibold text-primary-400 mb-1">Quality Assurance Training</p>
            <p>
              Review pathology specimen data for integrity issues. Identify records with errors in
              identifiers, timestamps, formatting, or logical inconsistencies. This simulates real-world
              QA processes critical for laboratory accreditation.
            </p>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
          <div className="text-sm text-dark-text-secondary mb-1">Total Records</div>
          <div className="text-2xl font-bold">{sampleData.length}</div>
        </div>
        <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
          <div className="text-sm text-dark-text-secondary mb-1">Records with Errors</div>
          <div className="text-2xl font-bold text-red-400">{recordsWithErrors}</div>
        </div>
        <div className="p-4 rounded-lg bg-dark-surface border border-dark-border">
          <div className="text-sm text-dark-text-secondary mb-1">Errors Found</div>
          <div className="text-2xl font-bold text-primary-400">
            {foundErrors.size} / {recordsWithErrors}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-dark-text-secondary">
          <Search size={16} />
          <span>Click a record to inspect details</span>
        </div>
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="px-4 py-2 rounded-lg bg-dark-surface border border-dark-border hover:border-primary-700 text-sm font-medium transition-colors"
        >
          {showAnswers ? 'Hide Answers' : 'Show Answers'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Data Table */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Specimen Records</h2>

          <div className="space-y-2">
            {sampleData.map((record) => {
              const isSelected = selectedRecord === record.id
              const isMarked = foundErrors.has(record.id)
              const actuallyHasErrors = record.errors.length > 0

              return (
                <button
                  key={record.id}
                  onClick={() => handleRecordClick(record.id)}
                  className={cn(
                    'w-full p-4 rounded-lg border text-left transition-all',
                    isSelected && 'ring-2 ring-primary-700',
                    isMarked && actuallyHasErrors && 'bg-green-900/10 border-green-700',
                    isMarked && !actuallyHasErrors && 'bg-red-900/10 border-red-700',
                    !isMarked && !isSelected && 'bg-dark-surface border-dark-border hover:border-primary-700',
                    !isMarked && isSelected && 'bg-primary-900/10 border-primary-700'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold">{record.accessionNumber}</span>
                        {showAnswers && actuallyHasErrors && (
                          <AlertCircle size={16} className="text-red-400" />
                        )}
                        {isMarked && actuallyHasErrors && (
                          <CheckCircle2 size={16} className="text-green-400" />
                        )}
                      </div>
                      <div className="text-xs text-dark-text-secondary">
                        Specimen: {record.specimenId} | Patient: {record.patientId || 'Missing'}
                      </div>
                      <div className="text-xs text-dark-text-secondary font-mono">
                        Collected: {record.collectionDate} | Scanned: {record.scanDate}
                      </div>
                    </div>

                    {showAnswers && actuallyHasErrors && (
                      <span className="px-2 py-1 text-xs rounded bg-red-900/30 text-red-400 border border-red-700">
                        {record.errors.length} error{record.errors.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: Record Details */}
        <div className="space-y-6 lg:sticky lg:top-8 h-fit">
          {selectedRecordData ? (
            <>
              <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Record Details</h3>
                  <span className="px-3 py-1 rounded-full bg-primary-900/30 text-primary-400 text-sm font-mono">
                    {selectedRecordData.accessionNumber}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-dark-text-secondary">Accession Number:</span>
                    <span className="font-mono">{selectedRecordData.accessionNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-dark-text-secondary">Specimen ID:</span>
                    <span className="font-mono">{selectedRecordData.specimenId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-dark-text-secondary">Patient ID:</span>
                    <span className="font-mono">{selectedRecordData.patientId || '(MISSING)'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-dark-text-secondary">Collection Date:</span>
                    <span className="font-mono">{selectedRecordData.collectionDate}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-dark-text-secondary">Received Date:</span>
                    <span className="font-mono">{selectedRecordData.receivedDate}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-dark-text-secondary">Scan Date:</span>
                    <span className="font-mono">{selectedRecordData.scanDate}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-dark-text-secondary">Barcode:</span>
                    <span className="font-mono">{selectedRecordData.barcode}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dark-border">
                  {!isMarkedAsError ? (
                    <button
                      onClick={() => handleMarkError(selectedRecordData.id)}
                      className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <AlertCircle size={20} />
                      Flag as Error
                    </button>
                  ) : (
                    <div className={cn(
                      'p-4 rounded-lg border flex items-center gap-3',
                      hasErrors
                        ? 'bg-green-900/10 border-green-700'
                        : 'bg-red-900/10 border-red-700'
                    )}>
                      {hasErrors ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-semibold">Correct! This record has errors.</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-semibold">Incorrect. This record is clean.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Show errors if answers are revealed */}
              {showAnswers && selectedRecordData.errors.length > 0 && (
                <div className="p-6 rounded-xl bg-red-900/10 border border-red-700">
                  <h3 className="font-semibold mb-3 text-red-400 flex items-center gap-2">
                    <AlertCircle size={18} />
                    Identified Errors
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {selectedRecordData.errors.map((error, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-dark-text-secondary">
                        <span className="text-red-400">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Points */}
              <div className="p-6 rounded-xl bg-primary-900/10 border border-primary-700/50">
                <h3 className="font-semibold mb-3 text-primary-400">Quality Control Checks</h3>
                <ul className="space-y-2 text-sm text-dark-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Temporal logic: Dates must follow collection → receipt → scanning order</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Format validation: Identifiers must match institutional standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Completeness: Required fields must be present</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Uniqueness: Accession numbers must not be duplicated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>Cross-field consistency: Related fields must align logically</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="p-12 rounded-xl bg-dark-surface border-2 border-dashed border-dark-border text-center">
              <Search className="w-12 h-12 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary">
                Select a record to inspect for data integrity issues
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {foundErrors.size === recordsWithErrors && (
        <div className="p-6 rounded-xl bg-green-900/10 border border-green-700">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-400 mb-2">Excellent Work!</h3>
              <p className="text-sm text-dark-text-secondary leading-relaxed">
                You've identified all {recordsWithErrors} records with data integrity issues out of {sampleData.length} total records.
                In real-world practice, these types of QC checks are essential for maintaining laboratory
                accreditation and ensuring patient safety.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
