import { useState } from 'react'
import { Shield, Info, CheckCircle2 } from 'lucide-react'
import { cn } from '../lib/utils'
import type { RegulatoryClass } from '../types'

interface ScenarioInputs {
  purpose: 'screening' | 'diagnosis' | 'monitoring' | 'research'
  autonomy: 'autonomous' | 'semi-autonomous' | 'assistive'
  criticalityLevel: 'informative' | 'diagnostic' | 'treatment'
  userType: 'pathologist' | 'technologist' | 'clinician' | 'researcher'
}

export default function RegulatoryLab() {
  const [inputs, setInputs] = useState<ScenarioInputs>({
    purpose: 'diagnosis',
    autonomy: 'assistive',
    criticalityLevel: 'diagnostic',
    userType: 'pathologist'
  })

  const [evaluated, setEvaluated] = useState(false)

  const evaluateClassification = (): {
    classification: RegulatoryClass
    fdaRequirements: string[]
    cliaRequirements: string[]
    capRequirements: string[]
    rationale: string
  } => {
    let classification: RegulatoryClass = 'RUO'
    const fdaRequirements: string[] = []
    const cliaRequirements: string[] = []
    const capRequirements: string[] = []
    let rationale = ''

    // Simplified regulatory logic (educational)
    if (inputs.purpose === 'research') {
      classification = 'RUO'
      rationale = 'Research Use Only (RUO) - not for clinical diagnostic use. No FDA clearance required, but must be clearly labeled.'
      fdaRequirements.push('Label as "For Research Use Only"')
      fdaRequirements.push('Not subject to FDA review')
    } else if (inputs.autonomy === 'autonomous' && inputs.criticalityLevel === 'treatment') {
      classification = 'SaMD_Class_III'
      rationale = 'High-risk Software as a Medical Device (SaMD). Autonomous decision-making for treatment-critical applications requires highest regulatory scrutiny.'
      fdaRequirements.push('510(k) clearance or PMA approval required')
      fdaRequirements.push('Clinical validation studies')
      fdaRequirements.push('Post-market surveillance')
      cliaRequirements.push('High-complexity test certification')
      cliaRequirements.push('Proficiency testing')
      capRequirements.push('Validation per CAP checklists')
      capRequirements.push('Ongoing quality assurance')
    } else if (inputs.criticalityLevel === 'diagnostic') {
      classification = 'SaMD_Class_II'
      rationale = 'Moderate-risk SaMD. Diagnostic applications with pathologist oversight typically require FDA clearance.'
      fdaRequirements.push('510(k) clearance likely required')
      fdaRequirements.push('Demonstration of substantial equivalence or clinical validation')
      cliaRequirements.push('Moderate to high-complexity certification')
      cliaRequirements.push('Personnel qualifications')
      cliaRequirements.push('Quality control procedures')
      capRequirements.push('Validation before clinical use')
      capRequirements.push('Documented QC and competency assessment')
    } else if (inputs.autonomy === 'assistive') {
      classification = 'SaMD_Class_I'
      rationale = 'Lower-risk SaMD. Assistive tools that support but do not replace pathologist judgment may qualify for Class I.'
      fdaRequirements.push('May be exempt from premarket notification')
      fdaRequirements.push('General controls apply')
      cliaRequirements.push('Laboratory must validate for clinical use')
      cliaRequirements.push('Follow CLIA quality standards')
      capRequirements.push('Document validation and performance')
    } else {
      classification = 'LDT'
      rationale = 'May qualify as Laboratory Developed Test (LDT) if developed and used within a single CLIA-certified laboratory.'
      fdaRequirements.push('Currently subject to enforcement discretion')
      fdaRequirements.push('May require future FDA oversight')
      cliaRequirements.push('CLIA high-complexity certification')
      cliaRequirements.push('Laboratory validation required')
      capRequirements.push('CAP accreditation standards')
      capRequirements.push('Validation documentation')
    }

    return {
      classification,
      fdaRequirements,
      cliaRequirements,
      capRequirements,
      rationale
    }
  }

  const result = evaluateClassification()

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-10 h-10 text-primary-400" />
          <h1 className="text-4xl font-bold">Regulatory Scenario Lab</h1>
        </div>

        <div className="p-4 rounded-lg bg-primary-900/20 border border-primary-700 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-dark-text-secondary">
            <p className="font-semibold text-primary-400 mb-1">Educational Simulation</p>
            <p>
              Explore how different system characteristics affect regulatory classification.
              This is a simplified educational model - actual regulatory determinations are complex
              and require expert consultation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Scenario Builder */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">System Characteristics</h2>

          <div className="space-y-6">
            {/* Purpose */}
            <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
              <label className="block font-semibold mb-3">Primary Purpose</label>
              <div className="space-y-2">
                {[
                  { value: 'screening', label: 'Screening/Triage', desc: 'Identify cases for review' },
                  { value: 'diagnosis', label: 'Diagnostic Support', desc: 'Aid in diagnosis' },
                  { value: 'monitoring', label: 'Monitoring', desc: 'Track disease progression' },
                  { value: 'research', label: 'Research Only', desc: 'Not for clinical use' }
                ].map(option => (
                  <label
                    key={option.value}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                      inputs.purpose === option.value
                        ? 'bg-primary-900/20 border-primary-700'
                        : 'border-dark-border hover:border-primary-700'
                    )}
                  >
                    <input
                      type="radio"
                      name="purpose"
                      value={option.value}
                      checked={inputs.purpose === option.value}
                      onChange={(e) => setInputs({ ...inputs, purpose: e.target.value as any })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-dark-text-secondary">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Autonomy */}
            <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
              <label className="block font-semibold mb-3">Level of Autonomy</label>
              <div className="space-y-2">
                {[
                  { value: 'autonomous', label: 'Autonomous', desc: 'Makes decisions independently' },
                  { value: 'semi-autonomous', label: 'Semi-Autonomous', desc: 'Recommends, user confirms' },
                  { value: 'assistive', label: 'Assistive', desc: 'Provides information only' }
                ].map(option => (
                  <label
                    key={option.value}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                      inputs.autonomy === option.value
                        ? 'bg-primary-900/20 border-primary-700'
                        : 'border-dark-border hover:border-primary-700'
                    )}
                  >
                    <input
                      type="radio"
                      name="autonomy"
                      value={option.value}
                      checked={inputs.autonomy === option.value}
                      onChange={(e) => setInputs({ ...inputs, autonomy: e.target.value as any })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-dark-text-secondary">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Criticality */}
            <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
              <label className="block font-semibold mb-3">Clinical Criticality</label>
              <div className="space-y-2">
                {[
                  { value: 'informative', label: 'Informative', desc: 'Provides general information' },
                  { value: 'diagnostic', label: 'Diagnostic', desc: 'Influences diagnosis' },
                  { value: 'treatment', label: 'Treatment-Critical', desc: 'Directly affects treatment decisions' }
                ].map(option => (
                  <label
                    key={option.value}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                      inputs.criticalityLevel === option.value
                        ? 'bg-primary-900/20 border-primary-700'
                        : 'border-dark-border hover:border-primary-700'
                    )}
                  >
                    <input
                      type="radio"
                      name="criticality"
                      value={option.value}
                      checked={inputs.criticalityLevel === option.value}
                      onChange={(e) => setInputs({ ...inputs, criticalityLevel: e.target.value as any })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-dark-text-secondary">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setEvaluated(true)}
            className="w-full px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
          >
            Evaluate Regulatory Classification
          </button>
        </div>

        {/* Right: Results */}
        <div className="space-y-6 lg:sticky lg:top-8 h-fit">
          {evaluated ? (
            <>
              <div className={cn(
                'p-6 rounded-xl border',
                result.classification.includes('III') ? 'bg-red-900/10 border-red-700' :
                result.classification.includes('II') ? 'bg-yellow-900/10 border-yellow-700' :
                'bg-green-900/10 border-green-700'
              )}>
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Classification Result</h3>
                    <div className="text-2xl font-bold text-primary-400 mb-2">
                      {result.classification.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-dark-text-secondary leading-relaxed">
                  {result.rationale}
                </p>
              </div>

              {/* FDA Requirements */}
              {result.fdaRequirements.length > 0 && (
                <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary-400" />
                    FDA Requirements
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {result.fdaRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-dark-text-secondary">
                        <span className="text-primary-400">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CLIA Requirements */}
              {result.cliaRequirements.length > 0 && (
                <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
                  <h3 className="font-semibold mb-3">CLIA Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    {result.cliaRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-dark-text-secondary">
                        <span className="text-primary-400">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CAP Requirements */}
              {result.capRequirements.length > 0 && (
                <div className="p-6 rounded-xl bg-dark-surface border border-dark-border">
                  <h3 className="font-semibold mb-3">CAP Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    {result.capRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-dark-text-secondary">
                        <span className="text-primary-400">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 rounded-xl bg-dark-surface border-2 border-dashed border-dark-border text-center">
              <Shield className="w-12 h-12 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary">
                Configure system characteristics and click "Evaluate" to see regulatory classification
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
