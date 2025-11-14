import type { LOINCCode, SNOMEDCode } from '../types'

export const sampleLOINCCodes: LOINCCode[] = [
  {
    code: '33717-0',
    component: 'Microscopic observation',
    property: 'Find',
    timing: 'Pt',
    system: 'XXX',
    scale: 'Nom',
    method: 'Cytology stain',
    displayName: 'Microscopic observation [Identifier] in Specimen by Cytology stain',
    category: 'LAB'
  },
  {
    code: '22637-3',
    component: 'Pathology report',
    property: 'Find',
    timing: 'Pt',
    system: 'XXX',
    scale: 'Doc',
    method: '',
    displayName: 'Pathology report final diagnosis Narrative',
    category: 'LAB'
  },
  {
    code: '60568-3',
    component: 'Pathology Synoptic report',
    property: 'Find',
    timing: 'Pt',
    system: 'XXX',
    scale: 'Doc',
    method: '',
    displayName: 'Pathology Synoptic report',
    category: 'LAB'
  },
  {
    code: '85337-4',
    component: 'Estrogen receptor',
    property: 'PrThr',
    timing: 'Pt',
    system: 'Tiss',
    scale: 'Ord',
    method: 'Immune stain',
    displayName: 'Estrogen receptor [Interpretation] in Tissue by Immune stain',
    category: 'LAB'
  },
  {
    code: '85339-0',
    component: 'PD-L1',
    property: 'NFr',
    timing: 'Pt',
    system: 'Tiss',
    scale: 'Qn',
    method: 'Immune stain',
    displayName: 'PD-L1 by Immune stain [Interpretation] in Tissue Nominal',
    category: 'LAB'
  },
  {
    code: '94076-7',
    component: 'Pathology study',
    property: 'Imp',
    timing: 'Pt',
    system: 'Specimen',
    scale: 'Narrative',
    method: '',
    displayName: 'Pathology study comment',
    category: 'LAB'
  }
]

export const sampleSNOMEDCodes: SNOMEDCode[] = [
  {
    conceptId: '396152003',
    term: 'Adenocarcinoma',
    fullySpecifiedName: 'Adenocarcinoma (morphologic abnormality)',
    semanticTag: 'morphologic abnormality',
    hierarchy: ['Morphologically abnormal structure', 'Neoplasm', 'Malignant neoplasm', 'Adenocarcinoma'],
    relationships: [
      { type: 'Is a', target: '372087000 - Primary malignant neoplasm' }
    ]
  },
  {
    conceptId: '253007',
    term: 'Squamous cell carcinoma',
    fullySpecifiedName: 'Squamous cell carcinoma (morphologic abnormality)',
    semanticTag: 'morphologic abnormality',
    hierarchy: ['Morphologically abnormal structure', 'Neoplasm', 'Malignant neoplasm', 'Squamous cell carcinoma'],
    relationships: [
      { type: 'Is a', target: '372087000 - Primary malignant neoplasm' }
    ]
  },
  {
    conceptId: '369774006',
    term: 'Microscopic examination of tissue',
    fullySpecifiedName: 'Microscopic examination of tissue (procedure)',
    semanticTag: 'procedure',
    hierarchy: ['Procedure', 'Laboratory procedure', 'Microscopic examination', 'Microscopic examination of tissue'],
    relationships: [
      { type: 'Method', target: '117259009 - Microscopic examination - action' },
      { type: 'Procedure site', target: '85756007 - Tissue' }
    ]
  },
  {
    conceptId: '127785005',
    term: 'Biopsy of breast',
    fullySpecifiedName: 'Biopsy of breast (procedure)',
    semanticTag: 'procedure',
    hierarchy: ['Procedure', 'Surgical procedure', 'Biopsy', 'Biopsy of breast'],
    relationships: [
      { type: 'Method', target: '129314006 - Biopsy - action' },
      { type: 'Procedure site', target: '76752008 - Breast structure' }
    ]
  },
  {
    conceptId: '76752008',
    term: 'Breast structure',
    fullySpecifiedName: 'Breast structure (body structure)',
    semanticTag: 'body structure',
    hierarchy: ['Body structure', 'Structure of thorax', 'Breast structure'],
    relationships: [
      { type: 'Is a', target: '123037004 - Body structure' }
    ]
  },
  {
    conceptId: '281319009',
    term: 'Hematoxylin and eosin stain',
    fullySpecifiedName: 'Hematoxylin and eosin stain method (procedure)',
    semanticTag: 'procedure',
    hierarchy: ['Procedure', 'Laboratory procedure', 'Staining method', 'Hematoxylin and eosin stain'],
    relationships: [
      { type: 'Method', target: '127790008 - Staining method' }
    ]
  },
  {
    conceptId: '409720004',
    term: 'Estrogen receptor positive',
    fullySpecifiedName: 'Estrogen receptor positive tumor (finding)',
    semanticTag: 'finding',
    hierarchy: ['Clinical finding', 'Laboratory findings', 'Hormone receptor status', 'Estrogen receptor positive'],
    relationships: [
      { type: 'Finding method', target: '117259009 - Microscopic examination' },
      { type: 'Interprets', target: '116675006 - Estrogen receptor measurement' }
    ]
  },
  {
    conceptId: '85756007',
    term: 'Tissue',
    fullySpecifiedName: 'Tissue specimen (specimen)',
    semanticTag: 'specimen',
    hierarchy: ['Specimen', 'Biological specimen', 'Tissue specimen'],
    relationships: [
      { type: 'Is a', target: '123038009 - Specimen' }
    ]
  }
]
