import { openDB, DBSchema, IDBPDatabase } from 'idb'
import type {
  Module,
  GlossaryTerm,
  CaseScenario,
  LOINCCode,
  SNOMEDCode,
  UserProgress
} from '../types'

interface PathInformaticaDB extends DBSchema {
  modules: {
    key: string
    value: Module
    indexes: { 'by-order': number }
  }
  glossary: {
    key: string
    value: GlossaryTerm
    indexes: { 'by-category': string }
  }
  cases: {
    key: string
    value: CaseScenario
  }
  loinc: {
    key: string
    value: LOINCCode
    indexes: { 'by-category': string }
  }
  snomed: {
    key: string
    value: SNOMEDCode
  }
  progress: {
    key: string
    value: UserProgress
  }
}

class DatabaseManager {
  private db: IDBPDatabase<PathInformaticaDB> | null = null
  private readonly DB_NAME = 'PathInformaticaDB'
  private readonly DB_VERSION = 1

  async init(): Promise<void> {
    if (this.db) return

    this.db = await openDB<PathInformaticaDB>(this.DB_NAME, this.DB_VERSION, {
      upgrade(db) {
        // Modules store
        if (!db.objectStoreNames.contains('modules')) {
          const moduleStore = db.createObjectStore('modules', { keyPath: 'id' })
          moduleStore.createIndex('by-order', 'order')
        }

        // Glossary store
        if (!db.objectStoreNames.contains('glossary')) {
          const glossaryStore = db.createObjectStore('glossary', { keyPath: 'id' })
          glossaryStore.createIndex('by-category', 'category')
        }

        // Cases store
        if (!db.objectStoreNames.contains('cases')) {
          db.createObjectStore('cases', { keyPath: 'id' })
        }

        // LOINC codes store
        if (!db.objectStoreNames.contains('loinc')) {
          const loincStore = db.createObjectStore('loinc', { keyPath: 'code' })
          loincStore.createIndex('by-category', 'category')
        }

        // SNOMED codes store
        if (!db.objectStoreNames.contains('snomed')) {
          db.createObjectStore('snomed', { keyPath: 'conceptId' })
        }

        // User progress store
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'userId' })
        }
      },
    })
  }

  // Module operations
  async getAllModules(): Promise<Module[]> {
    await this.init()
    return this.db!.getAllFromIndex('modules', 'by-order')
  }

  async getModule(id: string): Promise<Module | undefined> {
    await this.init()
    return this.db!.get('modules', id)
  }

  async saveModule(module: Module): Promise<void> {
    await this.init()
    await this.db!.put('modules', module)
  }

  async saveModules(modules: Module[]): Promise<void> {
    await this.init()
    const tx = this.db!.transaction('modules', 'readwrite')
    await Promise.all([
      ...modules.map(m => tx.store.put(m)),
      tx.done
    ])
  }

  // Glossary operations
  async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    await this.init()
    return this.db!.getAll('glossary')
  }

  async getGlossaryTermsByCategory(category: string): Promise<GlossaryTerm[]> {
    await this.init()
    return this.db!.getAllFromIndex('glossary', 'by-category', category)
  }

  async saveGlossaryTerms(terms: GlossaryTerm[]): Promise<void> {
    await this.init()
    const tx = this.db!.transaction('glossary', 'readwrite')
    await Promise.all([
      ...terms.map(t => tx.store.put(t)),
      tx.done
    ])
  }

  // Case operations
  async getAllCases(): Promise<CaseScenario[]> {
    await this.init()
    return this.db!.getAll('cases')
  }

  async getCase(id: string): Promise<CaseScenario | undefined> {
    await this.init()
    return this.db!.get('cases', id)
  }

  async saveCases(cases: CaseScenario[]): Promise<void> {
    await this.init()
    const tx = this.db!.transaction('cases', 'readwrite')
    await Promise.all([
      ...cases.map(c => tx.store.put(c)),
      tx.done
    ])
  }

  // LOINC operations
  async searchLOINC(query: string): Promise<LOINCCode[]> {
    await this.init()
    const all = await this.db!.getAll('loinc')
    const lowerQuery = query.toLowerCase()
    return all.filter(code =>
      code.displayName.toLowerCase().includes(lowerQuery) ||
      code.code.toLowerCase().includes(lowerQuery) ||
      code.component.toLowerCase().includes(lowerQuery)
    )
  }

  async saveLOINCCodes(codes: LOINCCode[]): Promise<void> {
    await this.init()
    const tx = this.db!.transaction('loinc', 'readwrite')
    await Promise.all([
      ...codes.map(c => tx.store.put(c)),
      tx.done
    ])
  }

  // SNOMED operations
  async searchSNOMED(query: string): Promise<SNOMEDCode[]> {
    await this.init()
    const all = await this.db!.getAll('snomed')
    const lowerQuery = query.toLowerCase()
    return all.filter(code =>
      code.term.toLowerCase().includes(lowerQuery) ||
      code.conceptId.toLowerCase().includes(lowerQuery)
    )
  }

  async saveSNOMEDCodes(codes: SNOMEDCode[]): Promise<void> {
    await this.init()
    const tx = this.db!.transaction('snomed', 'readwrite')
    await Promise.all([
      ...codes.map(c => tx.store.put(c)),
      tx.done
    ])
  }

  // Progress operations
  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    await this.init()
    return this.db!.get('progress', userId)
  }

  async saveUserProgress(progress: UserProgress): Promise<void> {
    await this.init()
    await this.db!.put('progress', progress)
  }

  // Clear all data
  async clearAll(): Promise<void> {
    await this.init()
    await Promise.all([
      this.db!.clear('modules'),
      this.db!.clear('glossary'),
      this.db!.clear('cases'),
      this.db!.clear('loinc'),
      this.db!.clear('snomed'),
      this.db!.clear('progress')
    ])
  }
}

export const db = new DatabaseManager()
