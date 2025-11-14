import { useState } from 'react'
import { FileCode, Search } from 'lucide-react'
import { sampleLOINCCodes, sampleSNOMEDCodes } from '../data/codingSystems'
import { cn } from '../lib/utils'

type CodeSystem = 'LOINC' | 'SNOMED'

export default function CodingMapper() {
  const [selectedSystem, setSelectedSystem] = useState<CodeSystem>('LOINC')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLOINC = sampleLOINCCodes.filter(code =>
    code.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.component.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSNOMED = sampleSNOMEDCodes.filter(code =>
    code.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.conceptId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    code.fullySpecifiedName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FileCode className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">Coding System Mapper</h1>
        </div>
        <p className="text-dark-text-secondary">
          Explore LOINC and SNOMED CT coding systems used in pathology informatics.
          Learn how tests and diagnoses are standardized for interoperability.
        </p>
      </div>

      {/* System Selector */}
      <div className="flex gap-4">
        <button
          onClick={() => setSelectedSystem('LOINC')}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-all',
            selectedSystem === 'LOINC'
              ? 'bg-primary-600 text-white'
              : 'bg-dark-surface border border-dark-border hover:border-primary-700'
          )}
        >
          LOINC Codes
        </button>
        <button
          onClick={() => setSelectedSystem('SNOMED')}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-all',
            selectedSystem === 'SNOMED'
              ? 'bg-primary-600 text-white'
              : 'bg-dark-surface border border-dark-border hover:border-primary-700'
          )}
        >
          SNOMED CT
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-text-secondary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${selectedSystem} codes...`}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
        />
      </div>

      {/* Results */}
      {selectedSystem === 'LOINC' ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            LOINC Codes ({filteredLOINC.length})
          </h2>
          <div className="grid gap-4">
            {filteredLOINC.map((code) => (
              <div
                key={code.code}
                className="p-6 rounded-xl bg-dark-surface border border-dark-border hover:border-primary-700 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-primary-900/30 text-primary-400 text-sm font-mono">
                      {code.code}
                    </span>
                  </div>
                  <span className="px-2 py-1 text-xs rounded bg-dark-bg border border-dark-border">
                    {code.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3">{code.displayName}</h3>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-dark-text-secondary">Component:</span>
                    <p className="font-medium mt-1">{code.component}</p>
                  </div>
                  <div>
                    <span className="text-dark-text-secondary">System:</span>
                    <p className="font-medium mt-1">{code.system}</p>
                  </div>
                  <div>
                    <span className="text-dark-text-secondary">Method:</span>
                    <p className="font-medium mt-1">{code.method || 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-dark-border">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-dark-bg border border-dark-border">
                      Property: {code.property}
                    </span>
                    <span className="px-2 py-1 rounded bg-dark-bg border border-dark-border">
                      Scale: {code.scale}
                    </span>
                    <span className="px-2 py-1 rounded bg-dark-bg border border-dark-border">
                      Timing: {code.timing}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            SNOMED CT Concepts ({filteredSNOMED.length})
          </h2>
          <div className="grid gap-4">
            {filteredSNOMED.map((code) => (
              <div
                key={code.conceptId}
                className="p-6 rounded-xl bg-dark-surface border border-dark-border hover:border-primary-700 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-primary-900/30 text-primary-400 text-sm font-mono">
                      {code.conceptId}
                    </span>
                  </div>
                  <span className="px-2 py-1 text-xs rounded bg-dark-bg border border-dark-border">
                    {code.semanticTag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{code.term}</h3>
                <p className="text-sm text-dark-text-secondary mb-4">
                  {code.fullySpecifiedName}
                </p>

                {code.hierarchy.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm text-dark-text-secondary block mb-2">Hierarchy:</span>
                    <div className="flex flex-wrap gap-2">
                      {code.hierarchy.map((level, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {index > 0 && <span className="text-dark-text-secondary">→</span>}
                          <span className="px-2 py-1 text-xs rounded bg-dark-bg border border-dark-border">
                            {level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {code.relationships.length > 0 && (
                  <div className="pt-4 border-t border-dark-border">
                    <span className="text-sm text-dark-text-secondary block mb-2">Relationships:</span>
                    <div className="space-y-1 text-sm">
                      {code.relationships.map((rel, index) => (
                        <div key={index} className="text-dark-text-secondary">
                          <span className="font-medium text-primary-400">{rel.type}:</span> {rel.target}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
