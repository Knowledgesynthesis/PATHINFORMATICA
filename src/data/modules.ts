import type { Module } from '../types'

export const modules: Module[] = [
  {
    id: 'foundations-digital-pathology',
    title: 'Foundations of Digital Pathology',
    description: 'Understanding whole-slide imaging, scanning hardware, storage systems, and DICOM standards for digital pathology.',
    icon: 'Microscope',
    order: 1,
    prerequisiteIds: [],
    estimatedMinutes: 45,
    lessons: [
      {
        id: 'wsi-basics',
        moduleId: 'foundations-digital-pathology',
        title: 'Whole-Slide Imaging Basics',
        content: `# Whole-Slide Imaging (WSI)

Whole-slide imaging represents a fundamental shift in pathology practice, converting traditional glass slides into high-resolution digital images.

## Key Concepts

**What is WSI?**
WSI technology captures complete microscopic images of tissue sections mounted on glass slides. Unlike traditional microscopy, WSI enables:
- Remote viewing and consultation
- Digital archiving and retrieval
- Integration with laboratory information systems
- Foundation for AI/ML analysis

**Image Acquisition**
The scanning process involves:
1. **Automated stage movement** - Precise mechanical positioning
2. **High-resolution imaging** - Typically 20x or 40x magnification
3. **Image tiling** - Captures overlapping regions
4. **Focus optimization** - Single, multi-layer, or extended depth of field
5. **Color calibration** - Ensures consistent staining appearance

**Resolution and Quality**
- Spatial resolution: 0.25-0.5 µm/pixel
- Typical file sizes: 1-5 GB per slide (compressed)
- Scanning time: 1-5 minutes per slide
- Color depth: 24-bit RGB (8 bits per channel)

## Clinical Significance

WSI enables:
- Primary diagnosis (where validated)
- Tumor board presentations
- Education and training
- Quality assurance programs
- Telepathology consultations

## Limitations

Important constraints:
- Z-axis information limited (focus planes)
- File size and storage requirements
- Network bandwidth for viewing
- Initial validation requirements
- Regulatory considerations for primary diagnosis`,
        bloomLevel: 'Understand',
        learnerLevels: ['MS3', 'MS4', 'Resident'],
        order: 1,
        completed: false
      },
      {
        id: 'scanning-hardware',
        moduleId: 'foundations-digital-pathology',
        title: 'Scanning Hardware and Systems',
        content: `# Scanning Hardware and Systems

Understanding the technical components that enable whole-slide imaging.

## Scanner Components

**Optical System**
- Objective lenses (20x, 40x, 60x)
- Light source (LED, halogen)
- Camera sensors (CCD, CMOS)
- Focus mechanisms
- Color filters and calibration

**Mechanical System**
- Automated stage (X-Y positioning)
- Z-axis focus control
- Slide loading mechanisms
- Barcode readers for tracking

**Software Integration**
- Image acquisition control
- Real-time preview
- Quality assessment
- LIS integration
- Archive connectivity

## Scanner Types

**Brightfield Scanners**
- Standard H&E and special stains
- Most common clinical use
- Well-established validation

**Fluorescence Scanners**
- Immunofluorescence imaging
- Multiple wavelength channels
- Specialized clinical applications

**Multispectral Imaging**
- Beyond RGB color space
- Enhanced stain separation
- Research and specialized diagnostics

## Performance Specifications

Key metrics:
- **Throughput**: Slides per hour
- **Resolution**: µm per pixel
- **Scan area**: Maximum tissue dimensions
- **Focus accuracy**: ±1-2 µm
- **Color reproducibility**: ΔE < 3

## Quality Control

Essential QC steps:
1. Focus quality assessment
2. Color calibration verification
3. Tissue detection accuracy
4. Scan completeness validation
5. Image artifact detection`,
        bloomLevel: 'Understand',
        learnerLevels: ['Resident', 'Fellow'],
        order: 2,
        completed: false
      },
      {
        id: 'storage-compression',
        moduleId: 'foundations-digital-pathology',
        title: 'Storage, Compression, and Resolution',
        content: `# Storage, Compression, and Resolution

Managing the massive data requirements of digital pathology.

## Storage Architecture

**File Formats**
- Proprietary vendor formats
- DICOM WSI (standard)
- TIFF-based formats
- Pyramidal image structure

**Storage Hierarchy**
1. **Fast tier**: Recent cases, active diagnostics
2. **Warm tier**: Recent archives (months)
3. **Cold tier**: Long-term archives (years)
4. **Backup**: Redundant, off-site

## Compression Strategies

**Lossy Compression**
- JPEG (common, 10-20:1 ratios)
- JPEG2000 (better quality preservation)
- Diagnostic acceptability thresholds
- Validation requirements

**Lossless Compression**
- PNG, lossless JPEG2000
- 2-3:1 compression ratios
- Forensic and legal cases
- Research applications

## Resolution Considerations

**Native Resolution**
- Determined by objective and camera
- Typically 0.25-0.5 µm/pixel at 40x
- Cannot be increased post-scan

**Pyramidal Levels**
- Multiple resolution tiers
- Enable efficient viewing
- Level 0: Full resolution
- Each level: ~50% reduction

## Data Management

**Retention Policies**
- Regulatory requirements (CAP, CLIA)
- Institutional policies
- Minimum: Match glass slide retention
- Typical: 10+ years

**Disaster Recovery**
- Geographic redundancy
- Regular backup verification
- Restoration testing
- Business continuity planning

**Cost Considerations**
- Initial storage: ~$50-100/TB
- Annual costs: Power, cooling, maintenance
- Network infrastructure
- Archive migration planning`,
        bloomLevel: 'Apply',
        learnerLevels: ['Fellow', 'Attending'],
        order: 3,
        completed: false
      },
      {
        id: 'dicom-wsi',
        moduleId: 'foundations-digital-pathology',
        title: 'DICOM Standards for WSI',
        content: `# DICOM for Whole-Slide Imaging

Understanding the standard for interoperable digital pathology.

## DICOM Overview

**Digital Imaging and Communications in Medicine (DICOM)**
- International standard (ISO 12052)
- Ensures interoperability
- Vendor-neutral format
- Pathology supplement: DICOM Supplement 145

## DICOM WSI Structure

**Key Components**
1. **Image data**: Pyramidal, tiled structure
2. **Metadata**: Patient, specimen, acquisition details
3. **Optical paths**: Multiple stains/channels
4. **Spatial information**: Coordinates, magnification
5. **Specimen information**: Identifiers, preparation

**IOD (Information Object Definition)**
- VL Whole Slide Microscopy Image
- Standardized attributes
- Required vs. optional elements
- Type 1, 1C, 2, 2C, 3 attributes

## Metadata Standards

**Patient Module**
- Patient ID (de-identified when appropriate)
- Patient demographics (limited)
- Study and series information

**Specimen Module**
- Specimen identifier
- Container identifier
- Specimen type
- Collection procedure
- Fixation and processing

**Optical Path Module**
- Illumination type and wavelength
- Objective lens properties
- Color space (RGB, YCbCr)
- ICC profile

## Implementation Benefits

**Interoperability**
- Vendor-neutral archives
- Cross-platform viewing
- Integration with PACS/VNA
- Future-proof data

**Workflow Integration**
- Standardized interfaces
- Automated routing
- Quality assurance
- Regulatory compliance

## Challenges and Considerations

**Adoption Barriers**
- Vendor implementation variability
- Legacy system migration
- File size overhead
- Complexity of specification

**Best Practices**
- Validate DICOM conformance
- Test interoperability
- Plan migration strategy
- Monitor standard updates`,
        bloomLevel: 'Analyze',
        learnerLevels: ['Fellow', 'Attending'],
        order: 4,
        completed: false
      }
    ]
  },
  {
    id: 'metadata-archiving',
    title: 'Digital Slide Archiving & Metadata',
    description: 'Learn about metadata structures, DICOM integration, LIS/AP-LIS data flow, and proper archiving practices.',
    icon: 'Database',
    order: 2,
    prerequisiteIds: ['foundations-digital-pathology'],
    estimatedMinutes: 60,
    lessons: [
      {
        id: 'metadata-layers',
        moduleId: 'metadata-archiving',
        title: 'Metadata Layers and Structures',
        content: `# Metadata Layers in Digital Pathology

Understanding the hierarchical organization of digital pathology information.

## Hierarchical Structure

**Case Level**
- Accession number
- Case type (surgical, cytology)
- Ordering physician
- Clinical indication
- Priority level

**Specimen Level**
- Specimen identifier
- Specimen type
- Anatomic source
- Collection date/time
- Fixation details
- Processing protocol

**Slide Level**
- Slide identifier (unique)
- Block identifier
- Stain type
- Section thickness
- Special procedures

**Region/Annotation Level**
- Coordinates (X, Y, Z)
- Region of interest
- Annotations
- Measurements
- Diagnostic findings

## Metadata Standards

**HL7 Integration**
- ADT messages (Patient demographics)
- ORM messages (Orders)
- ORU messages (Results)
- Standard segments and fields

**LOINC Codes**
- Standardized test identification
- Specimen source codes
- Result reporting

**SNOMED CT**
- Diagnostic terminology
- Specimen types
- Topography codes
- Morphology codes

## Data Quality

**Required Elements**
- Patient identifiers (validated)
- Specimen identifiers (unique)
- Temporal information (accurate timestamps)
- Accession tracking

**Validation Rules**
- Format checking
- Range validation
- Reference data verification
- Completeness checking
- Consistency across systems

## Practical Implications

**Retrieval Efficiency**
- Indexed fields for searching
- Query optimization
- Performance considerations

**Regulatory Compliance**
- Audit trail requirements
- Data integrity
- Version control
- Access logging`,
        bloomLevel: 'Understand',
        learnerLevels: ['Resident', 'Fellow'],
        order: 1,
        completed: false
      }
    ]
  },
  {
    id: 'ai-concepts',
    title: 'AI-Based Image Analysis (Conceptual)',
    description: 'Conceptual understanding of how AI algorithms work in pathology, including limitations, validation, and clinical applicability.',
    icon: 'Brain',
    order: 3,
    prerequisiteIds: ['foundations-digital-pathology', 'metadata-archiving'],
    estimatedMinutes: 75,
    lessons: [
      {
        id: 'ai-workflow-overview',
        moduleId: 'ai-concepts',
        title: 'AI Workflow Overview (Conceptual)',
        content: `# AI Workflow in Digital Pathology (Conceptual Overview)

**Important**: This module teaches CONCEPTS, not actual implementation. No real AI image analysis is performed in this app.

## Conceptual Workflow

**1. Image Preprocessing**
- Tissue detection
- Color normalization
- Artifact removal
- Quality filtering

**2. Patch/Tile Extraction**
- Divide WSI into manageable regions
- Typical sizes: 256x256 or 512x512 pixels
- Overlapping vs. non-overlapping
- Resolution selection

**3. Feature Extraction (Conceptual)**
- Neural networks learn representations
- Low-level features: edges, textures
- High-level features: cellular patterns, tissue architecture
- No manual feature engineering

**4. Model Types (High-Level)**
- **CNNs**: Convolutional Neural Networks for image analysis
- **Transformers**: Attention-based models
- **Ensemble methods**: Combining multiple models

**5. Heatmap Generation**
- Visualizing predictions
- Uncertainty quantification
- Attention mechanisms

**6. Clinical Integration**
- Quality assurance checks
- Pathologist review
- Reporting integration

## Critical Limitations

**Technical Limitations**
- Training data requirements (thousands of cases)
- Computational resources
- Stain variability sensitivity
- Scanner-specific artifacts
- Generalization challenges

**Clinical Limitations**
- Not a replacement for pathologist expertise
- Requires validation for each use case
- Limited to specific task training
- Cannot handle novel presentations
- Context-dependent performance

**Regulatory Boundaries**
- FDA classification requirements
- CLIA compliance
- CAP validation checklists
- Ongoing quality assurance

## Validation Requirements

**Pre-deployment**
- Algorithm verification
- Clinical validation studies
- Comparison to ground truth
- Multi-site testing
- Edge case evaluation

**Post-deployment**
- Continuous monitoring
- Performance metrics tracking
- Failure mode detection
- Periodic revalidation

## Appropriate Use Cases

**Where AI May Assist**
- Screening prioritization
- Quantitative measurements
- Quality control
- Workflow optimization
- Education and training

**Where AI Should NOT Be Sole Decision-Maker**
- Primary diagnosis (without validation)
- Complex morphologic interpretation
- Rare entities
- Cases requiring clinical correlation`,
        bloomLevel: 'Analyze',
        learnerLevels: ['Resident', 'Fellow', 'Attending'],
        order: 1,
        completed: false
      }
    ]
  },
  {
    id: 'data-integrity',
    title: 'Data Integrity & Workflow Automation',
    description: 'LIS/AP-LIS systems, FHIR, LOINC, SNOMED CT, specimen tracking, QC workflows, and interoperability.',
    icon: 'Network',
    order: 4,
    prerequisiteIds: ['metadata-archiving'],
    estimatedMinutes: 60,
    lessons: []
  },
  {
    id: 'ethics-regulatory',
    title: 'Ethics & Regulatory Overview',
    description: 'FDA SaMD classifications, CLIA requirements, CAP validation, bias, fairness, accountability, and data governance.',
    icon: 'Shield',
    order: 5,
    prerequisiteIds: ['ai-concepts'],
    estimatedMinutes: 90,
    lessons: []
  }
]
