import { useState } from 'react'
import { BookMarked, Search } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

const categories = ['All', 'Pathology', 'Informatics', 'AI/ML', 'Regulatory', 'Data Standards'] as const

export default function Glossary() {
  const { glossaryTerms } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory

    return matchesSearch && matchesCategory
  }).sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookMarked className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">Glossary</h1>
        </div>
        <p className="text-dark-text-secondary">
          Comprehensive terminology for digital pathology, informatics, AI/ML, and regulatory concepts.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-text-secondary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search terms and definitions..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-dark-text focus:border-primary-400 focus:outline-none"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors text-sm',
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-dark-surface border border-dark-border hover:border-primary-700'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-dark-text-secondary">
        Showing {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
      </div>

      {/* Terms Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="p-6 rounded-xl bg-dark-surface border border-dark-border hover:border-primary-700 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-xl font-bold">{term.term}</h3>
              <span className={cn(
                'px-2 py-1 text-xs rounded font-medium flex-shrink-0',
                term.category === 'Pathology' && 'bg-blue-900/30 text-blue-400',
                term.category === 'Informatics' && 'bg-purple-900/30 text-purple-400',
                term.category === 'AI/ML' && 'bg-pink-900/30 text-pink-400',
                term.category === 'Regulatory' && 'bg-yellow-900/30 text-yellow-400',
                term.category === 'Data Standards' && 'bg-green-900/30 text-green-400'
              )}>
                {term.category}
              </span>
            </div>

            {/* Definition */}
            <p className="text-dark-text-secondary leading-relaxed mb-4">
              {term.definition}
            </p>

            {/* Examples */}
            {term.examples.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-dark-text-secondary mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {term.examples.map((example, index) => (
                    <li key={index} className="text-sm text-dark-text-secondary flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Terms */}
            {term.relatedTerms.length > 0 && (
              <div className="pt-4 border-t border-dark-border">
                <h4 className="text-sm font-semibold text-dark-text-secondary mb-2">Related:</h4>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((related, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded bg-dark-bg border border-dark-border text-dark-text-secondary"
                    >
                      {related}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <BookMarked className="w-16 h-16 text-dark-text-secondary mx-auto mb-4" />
          <p className="text-dark-text-secondary">
            No terms found matching your search.
          </p>
        </div>
      )}
    </div>
  )
}
