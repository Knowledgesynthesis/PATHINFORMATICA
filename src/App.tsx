import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import { db } from './lib/db'
import { modules } from './data/modules'
import { glossaryTerms } from './data/glossary'
import { sampleLOINCCodes, sampleSNOMEDCodes } from './data/codingSystems'

// Components
import Layout from './components/Layout'
import Home from './pages/Home'
import ModuleView from './pages/ModuleView'
import LessonView from './pages/LessonView'
import MetadataBuilder from './pages/MetadataBuilder'
import WSIWorkflowSimulator from './pages/WSIWorkflowSimulator'
import AIConceptExplorer from './pages/AIConceptExplorer'
import CodingMapper from './pages/CodingMapper'
import RegulatoryLab from './pages/RegulatoryLab'
import Assessment from './pages/Assessment'
import Glossary from './pages/Glossary'
import Settings from './pages/Settings'

function App() {
  const { setModules, setGlossaryTerms } = useAppStore()

  useEffect(() => {
    // Initialize app data
    const initializeApp = async () => {
      try {
        // Initialize database
        await db.init()

        // Load modules into state
        setModules(modules)
        setGlossaryTerms(glossaryTerms)

        // Save to IndexedDB for offline access
        await db.saveModules(modules)
        await db.saveGlossaryTerms(glossaryTerms)
        await db.saveLOINCCodes(sampleLOINCCodes)
        await db.saveSNOMEDCodes(sampleSNOMEDCodes)

        console.log('PathInformatica initialized successfully')
      } catch (error) {
        console.error('Failed to initialize app:', error)
      }
    }

    initializeApp()
  }, [setModules, setGlossaryTerms])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module/:moduleId" element={<ModuleView />} />
          <Route path="/lesson/:lessonId" element={<LessonView />} />
          <Route path="/metadata-builder" element={<MetadataBuilder />} />
          <Route path="/wsi-workflow" element={<WSIWorkflowSimulator />} />
          <Route path="/ai-explorer" element={<AIConceptExplorer />} />
          <Route path="/coding-mapper" element={<CodingMapper />} />
          <Route path="/regulatory-lab" element={<RegulatoryLab />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
