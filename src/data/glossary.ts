import type { GlossaryTerm } from '../types'

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'wsi',
    term: 'Whole-Slide Imaging (WSI)',
    definition: 'The comprehensive digitization of glass microscope slides, creating high-resolution digital images that can be viewed, analyzed, and archived electronically.',
    category: 'Pathology',
    relatedTerms: ['DICOM', 'Digital Pathology', 'Pyramidal Image'],
    examples: [
      'A pathology department implements WSI for primary diagnosis after validation studies.',
      'WSI enables remote consultation between pathologists at different institutions.'
    ],
    references: [
      'FDA guidance on Digital Pathology',
      'CAP validation guidelines'
    ]
  },
  {
    id: 'dicom-wsi',
    term: 'DICOM WSI',
    definition: 'The Digital Imaging and Communications in Medicine (DICOM) standard adapted for whole-slide imaging (Supplement 145), enabling vendor-neutral storage and exchange of digital pathology images.',
    category: 'Data Standards',
    relatedTerms: ['WSI', 'Interoperability', 'VL Whole Slide Microscopy Image IOD'],
    examples: [
      'A DICOM-compliant scanner exports images that can be viewed on any DICOM-compatible viewer.',
      'An archive system stores slides from multiple scanner vendors using DICOM WSI format.'
    ],
    references: [
      'DICOM Standard - Supplement 145',
      'IHE Pathology Technical Framework'
    ]
  },
  {
    id: 'loinc',
    term: 'LOINC',
    definition: 'Logical Observation Identifiers Names and Codes - a universal standard for identifying medical laboratory observations, including pathology tests and measurements.',
    category: 'Data Standards',
    relatedTerms: ['SNOMED CT', 'HL7', 'Interoperability'],
    examples: [
      'Code 33717-0 represents "Microscopic observation [Identifier] in Specimen by Cytology stain"',
      'Laboratory orders and results use LOINC codes for standardized communication.'
    ],
    references: [
      'Regenstrief Institute - LOINC Database',
      'HL7 FHIR Observation Resource'
    ]
  },
  {
    id: 'snomed-ct',
    term: 'SNOMED CT',
    definition: 'Systematized Nomenclature of Medicine - Clinical Terms, a comprehensive clinical terminology system for encoding medical concepts, diagnoses, procedures, and findings.',
    category: 'Data Standards',
    relatedTerms: ['LOINC', 'ICD-10', 'Terminology'],
    examples: [
      'SNOMED code 369774006 represents "Microscopic examination of tissue (procedure)"',
      'Pathology diagnoses are encoded using SNOMED CT morphology and topography codes.'
    ],
    references: [
      'SNOMED International',
      'CAP eCC Cancer Checklists'
    ]
  },
  {
    id: 'ap-lis',
    term: 'AP-LIS',
    definition: 'Anatomic Pathology Laboratory Information System - specialized software for managing pathology workflows, case tracking, reporting, and integration with hospital information systems.',
    category: 'Informatics',
    relatedTerms: ['LIS', 'EMR', 'HL7', 'Workflow'],
    examples: [
      'The AP-LIS tracks specimens from accessioning through diagnosis and reporting.',
      'Barcode scanning in the grossing area updates case status in the AP-LIS.'
    ],
    references: [
      'CAP Accreditation Checklists - Laboratory Information Systems',
      'HL7 Version 2.x Implementation Guide for Anatomic Pathology'
    ]
  },
  {
    id: 'samd',
    term: 'SaMD (Software as a Medical Device)',
    definition: 'Software intended to be used for medical purposes that performs these purposes without being part of a hardware medical device, as defined by the FDA and IMDRF.',
    category: 'Regulatory',
    relatedTerms: ['FDA', 'Medical Device', 'AI/ML', 'Risk Classification'],
    examples: [
      'An AI algorithm that detects metastatic cancer in lymph nodes is classified as SaMD.',
      'Software that only archives images without analysis is not considered SaMD.'
    ],
    references: [
      'FDA Guidance - Software as a Medical Device',
      'IMDRF SaMD Framework'
    ]
  },
  {
    id: 'cnn',
    term: 'Convolutional Neural Network (CNN)',
    definition: 'A deep learning architecture particularly effective for image analysis, using convolutional layers to automatically learn hierarchical features from images.',
    category: 'AI/ML',
    relatedTerms: ['Deep Learning', 'Feature Extraction', 'Image Analysis'],
    examples: [
      'CNNs can learn to identify cellular patterns in histopathology images.',
      'A CNN trained on H&E images learns features like nuclear morphology and tissue architecture.'
    ],
    references: [
      'ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)',
      'Deep Learning in Digital Pathology'
    ]
  },
  {
    id: 'validation',
    term: 'Clinical Validation',
    definition: 'The process of demonstrating that a test or system performs as intended for its specified clinical use, meeting predefined acceptance criteria through empirical evidence.',
    category: 'Regulatory',
    relatedTerms: ['Verification', 'CAP', 'CLIA', 'Performance Metrics'],
    examples: [
      'A digital pathology system undergoes validation comparing digital diagnoses to glass slide diagnoses.',
      'An AI algorithm is validated on an independent test set representing the target patient population.'
    ],
    references: [
      'CAP Laboratory Accreditation Program - Validation Checklists',
      'FDA Guidance on Clinical Decision Support Software'
    ]
  },
  {
    id: 'pyramidal-image',
    term: 'Pyramidal Image',
    definition: 'A multi-resolution image representation where the full-resolution image is stored along with progressively lower-resolution versions, enabling efficient viewing at different zoom levels.',
    category: 'Informatics',
    relatedTerms: ['WSI', 'Tiling', 'Image Compression'],
    examples: [
      'A WSI pyramid has 5-8 levels, with each level at half the resolution of the previous.',
      'Viewers load appropriate pyramid levels based on zoom level to optimize performance.'
    ],
    references: [
      'DICOM WSI Specification',
      'TIFF Image File Format Specification'
    ]
  },
  {
    id: 'fhir',
    term: 'FHIR (Fast Healthcare Interoperability Resources)',
    definition: 'A modern standard for electronic healthcare information exchange developed by HL7, using RESTful APIs and contemporary web technologies for interoperability.',
    category: 'Data Standards',
    relatedTerms: ['HL7', 'Interoperability', 'API', 'DiagnosticReport'],
    examples: [
      'A FHIR DiagnosticReport resource represents a pathology report.',
      'Specimen tracking uses FHIR Specimen and Task resources.'
    ],
    references: [
      'HL7 FHIR Standard',
      'IHE Pathology and Laboratory Medicine Profile'
    ]
  },
  {
    id: 'bias-ml',
    term: 'Algorithmic Bias',
    definition: 'Systematic errors in machine learning models that produce unfair outcomes, often reflecting biases in training data or algorithm design, potentially leading to health disparities.',
    category: 'AI/ML',
    relatedTerms: ['Fairness', 'Generalization', 'Dataset Diversity'],
    examples: [
      'A model trained primarily on one population may perform poorly on underrepresented groups.',
      'Staining variation across institutions can introduce bias in WSI analysis algorithms.'
    ],
    references: [
      'FDA Guidance on Algorithmic Bias',
      'WHO Ethics and Governance of Artificial Intelligence for Health'
    ]
  },
  {
    id: 'clia',
    term: 'CLIA (Clinical Laboratory Improvement Amendments)',
    definition: 'Federal regulatory standards ensuring quality laboratory testing in the United States, establishing requirements for laboratory certification, quality control, and personnel qualifications.',
    category: 'Regulatory',
    relatedTerms: ['CAP', 'Quality Assurance', 'Laboratory Regulation'],
    examples: [
      'A laboratory performing digital pathology primary diagnosis must meet CLIA requirements.',
      'CLIA mandates quality control procedures for all clinical testing.'
    ],
    references: [
      'CMS CLIA Regulations (42 CFR Part 493)',
      'CAP Laboratory Accreditation Program'
    ]
  },
  {
    id: 'roi',
    term: 'Region of Interest (ROI)',
    definition: 'A specific area within a digital image designated for analysis, annotation, or measurement, defined by coordinates or boundaries.',
    category: 'Pathology',
    relatedTerms: ['Annotation', 'Image Analysis', 'Coordinates'],
    examples: [
      'A pathologist annotates tumor regions as ROIs for quantitative analysis.',
      'AI algorithms analyze multiple ROIs to generate diagnostic predictions.'
    ],
    references: [
      'DICOM Supplement 222 - Microscopy Bulk Simple Annotations',
      'Digital Pathology Image Analysis Guidelines'
    ]
  }
]
