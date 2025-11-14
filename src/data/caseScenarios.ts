import type { CaseScenario } from '../types'

export const sampleCases: CaseScenario[] = [
  {
    id: 'case-breast-biopsy',
    title: 'Breast Core Biopsy with Digital Workflow',
    description: 'A routine breast core biopsy case demonstrating complete digital pathology workflow integration.',
    learningObjectives: [
      'Understand complete digital pathology workflow from accessioning to reporting',
      'Apply appropriate LOINC and SNOMED CT codes',
      'Recognize metadata requirements for breast pathology',
      'Identify appropriate regulatory considerations'
    ],
    context: {
      caseType: 'Surgical Pathology',
      specimenType: 'Breast core biopsy',
      clinicalContext: '52-year-old female with screening mammogram showing BIRADS 4 lesion in left breast, upper outer quadrant'
    },
    workflow: [
      {
        id: 'accessioning',
        name: 'Specimen Accessioning',
        description: 'Receive specimen and assign identifiers',
        order: 1,
        status: 'pending',
        inputs: {
          requisition: 'Paper or electronic order',
          specimen: 'Physical specimen container'
        },
        outputs: {
          accessionNumber: 'S24-12345',
          specimenId: 'A1',
          barcode: 'Generated specimen barcode'
        },
        validationRules: [
          {
            field: 'accessionNumber',
            rule: 'format',
            parameters: { pattern: '^S[0-9]{2}-[0-9]{5}$' },
            errorMessage: 'Accession number must follow format S##-#####'
          }
        ],
        estimatedDuration: 300,
        assignedRole: 'Pathology Assistant',
        qcRequired: true
      },
      {
        id: 'grossing',
        name: 'Gross Examination',
        description: 'Describe and sample the specimen',
        order: 2,
        status: 'pending',
        inputs: {
          specimen: 'Fixed tissue',
          requisition: 'Clinical information'
        },
        outputs: {
          grossDescription: 'Documented findings',
          blocks: 'Tissue cassettes A1-A3'
        },
        validationRules: [
          {
            field: 'measurements',
            rule: 'required',
            parameters: {},
            errorMessage: 'Specimen measurements required'
          }
        ],
        estimatedDuration: 600,
        assignedRole: 'Pathology Assistant',
        qcRequired: true
      },
      {
        id: 'processing',
        name: 'Tissue Processing',
        description: 'Automated tissue processing and embedding',
        order: 3,
        status: 'pending',
        inputs: {
          blocks: 'Tissue cassettes'
        },
        outputs: {
          processedBlocks: 'Paraffin-embedded tissue'
        },
        validationRules: [],
        estimatedDuration: 28800,
        assignedRole: 'Histotechnologist',
        qcRequired: false
      },
      {
        id: 'sectioning',
        name: 'Microtomy & Staining',
        description: 'Cut sections and perform H&E staining',
        order: 4,
        status: 'pending',
        inputs: {
          blocks: 'Paraffin blocks'
        },
        outputs: {
          slides: 'H&E stained slides A1-A3'
        },
        validationRules: [
          {
            field: 'slideQuality',
            rule: 'required',
            parameters: {},
            errorMessage: 'Slide quality check required before scanning'
          }
        ],
        estimatedDuration: 1800,
        assignedRole: 'Histotechnologist',
        qcRequired: true
      },
      {
        id: 'scanning',
        name: 'Whole-Slide Imaging',
        description: 'Digital scanning of glass slides',
        order: 5,
        status: 'pending',
        inputs: {
          slides: 'Glass slides with barcodes'
        },
        outputs: {
          digitalSlides: 'WSI files with metadata'
        },
        validationRules: [
          {
            field: 'focusQuality',
            rule: 'range',
            parameters: { min: 0.7, max: 1.0 },
            errorMessage: 'Focus quality below acceptable threshold'
          }
        ],
        estimatedDuration: 900,
        assignedRole: 'Scanner Operator',
        qcRequired: true
      },
      {
        id: 'diagnosis',
        name: 'Digital Diagnosis',
        description: 'Pathologist review using digital viewer',
        order: 6,
        status: 'pending',
        inputs: {
          digitalSlides: 'WSI files',
          clinicalHistory: 'Patient context'
        },
        outputs: {
          diagnosis: 'Pathology diagnosis',
          report: 'Structured report'
        },
        validationRules: [
          {
            field: 'diagnosis',
            rule: 'required',
            parameters: {},
            errorMessage: 'Diagnosis required before sign-out'
          }
        ],
        estimatedDuration: 600,
        assignedRole: 'Pathologist',
        qcRequired: false
      },
      {
        id: 'reporting',
        name: 'Report Generation',
        description: 'Generate and transmit structured report',
        order: 7,
        status: 'pending',
        inputs: {
          diagnosis: 'Pathologist interpretation',
          coding: 'SNOMED CT codes'
        },
        outputs: {
          finalReport: 'Signed pathology report',
          hl7Message: 'ORU message to EMR'
        },
        validationRules: [
          {
            field: 'electronicSignature',
            rule: 'required',
            parameters: {},
            errorMessage: 'Electronic signature required'
          }
        ],
        estimatedDuration: 300,
        assignedRole: 'Pathologist',
        qcRequired: false
      }
    ],
    metadata: {
      caseId: 'S24-12345',
      specimenId: 'A1',
      slideId: 'A1-H&E',
      scanDate: '2024-01-15',
      scanner: {
        manufacturer: 'Aperio',
        model: 'GT 450',
        serialNumber: 'SN-2024-001'
      },
      magnification: 40,
      resolution: {
        x: 0.25,
        y: 0.25,
        unit: 'µm/pixel'
      },
      compression: 'JPEG2000',
      validated: true,
      validationErrors: []
    },
    codingChallenge: {
      diagnoses: [
        'Invasive ductal carcinoma, breast',
        'Nottingham Grade 2 (tubule formation: 3, nuclear pleomorphism: 2, mitotic count: 1)'
      ],
      requiredCodes: {
        LOINC: [
          '22637-3 - Pathology report final diagnosis',
          '85337-4 - Estrogen receptor'
        ],
        SNOMED: [
          '408643008 - Infiltrating duct carcinoma of breast',
          '76752008 - Breast structure',
          '281319009 - Hematoxylin and eosin stain'
        ]
      }
    },
    aiConsiderations: {
      applicable: true,
      algorithmType: 'Tumor detection and grading support',
      limitations: [
        'AI cannot replace pathologist diagnosis',
        'Requires validation on breast tissue specifically',
        'Performance varies with tissue preparation quality',
        'Must be reviewed by board-certified pathologist',
        'Not for primary diagnosis without FDA clearance'
      ]
    },
    regulatoryConsiderations: [
      'Digital pathology for primary diagnosis requires CAP validation',
      'Scanner must be used within validated parameters',
      'CLIA high-complexity testing requirements apply',
      'If AI is used, must comply with FDA SaMD regulations',
      'Quality assurance program required per CAP checklist'
    ],
    reflection: [
      'How does digital workflow improve turnaround time?',
      'What are the critical quality control checkpoints?',
      'Why is metadata accuracy important for retrieval and legal compliance?',
      'What regulatory requirements must be met before implementing digital primary diagnosis?',
      'How would you validate an AI algorithm for this case type?'
    ]
  },
  {
    id: 'case-colon-biopsy',
    title: 'Colon Biopsy with LIS Integration',
    description: 'GI biopsy demonstrating LIS/AP-LIS data flow and coding requirements.',
    learningObjectives: [
      'Map LIS data flow from order to result',
      'Apply appropriate GI pathology codes',
      'Understand HL7 message structure',
      'Recognize interoperability requirements'
    ],
    context: {
      caseType: 'GI Biopsy',
      specimenType: 'Colon biopsy',
      clinicalContext: '45-year-old male with chronic diarrhea, colonoscopy with multiple biopsies'
    },
    workflow: [
      {
        id: 'order-entry',
        name: 'Electronic Order Entry',
        description: 'Clinician places order in EMR',
        order: 1,
        status: 'pending',
        inputs: {
          emrOrder: 'Pathology order from EMR'
        },
        outputs: {
          hl7ORM: 'HL7 ORM message to LIS',
          accessionNumber: 'Auto-generated'
        },
        validationRules: [
          {
            field: 'orderingProvider',
            rule: 'required',
            parameters: {},
            errorMessage: 'Ordering provider NPI required'
          }
        ],
        estimatedDuration: 120,
        assignedRole: 'Clinician',
        qcRequired: false
      }
    ],
    metadata: {
      caseId: 'S24-12346',
      specimenId: 'B1-B4',
      slideId: 'B1-H&E',
      scanDate: '2024-01-16',
      scanner: {
        manufacturer: 'Philips',
        model: 'UFS',
        serialNumber: 'SN-2024-002'
      },
      magnification: 20,
      resolution: {
        x: 0.5,
        y: 0.5,
        unit: 'µm/pixel'
      },
      compression: 'JPEG',
      validated: true,
      validationErrors: []
    },
    codingChallenge: {
      diagnoses: [
        'Chronic active colitis with crypt architectural distortion',
        'Consistent with inflammatory bowel disease'
      ],
      requiredCodes: {
        LOINC: [
          '33717-0 - Microscopic observation',
          '60568-3 - Pathology synoptic report'
        ],
        SNOMED: [
          '64766004 - Chronic colitis',
          '71854001 - Colon structure',
          '127785005 - Biopsy of colon'
        ]
      }
    },
    aiConsiderations: {
      applicable: true,
      algorithmType: 'Chronic colitis classification support',
      limitations: [
        'Requires correlation with clinical and endoscopic findings',
        'Cannot distinguish between IBD subtypes without clinical context',
        'Pattern recognition aids only - not diagnostic',
        'Must account for sampling limitations'
      ]
    },
    regulatoryConsiderations: [
      'HL7 interface requires validation testing',
      'LOINC codes must match laboratory compendium',
      'Result transmission timing per CLIA requirements',
      'Interoperability testing with EMR system'
    ],
    reflection: [
      'How does HL7 messaging enable laboratory-EMR communication?',
      'What happens if LOINC codes are incorrect or missing?',
      'Why is standardized coding essential for population health analytics?',
      'How do you ensure data integrity across system interfaces?'
    ]
  }
]
