import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PartnersBar } from './components/PartnersBar'
import { About } from './components/About'
import { StatsSection } from './components/StatsSection'
import { DashboardSection } from './components/Dashboard/DashboardSection'
import { NewsSection } from './components/NewsSection'
import { AssessoriaForm, type AssessoriaPrefill } from './components/AssessoriaForm'
import { MaterialsSection } from './components/MaterialsSection'
import { Footer } from './components/Footer'
import { municipioInfo, type Osc } from './data/oscs'

export default function App() {
  const [prefill, setPrefill] = useState<AssessoriaPrefill | null>(null)

  function handleRequestFromDashboard(osc: Osc) {
    setPrefill({ nomeOrganizacao: osc.nome, municipio: municipioInfo[osc.municipio].label })
    document.getElementById('assessoria')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-base-light">
      <Header />
      <main>
        <Hero />
        <PartnersBar />
        <About />
        <StatsSection />
        <DashboardSection onRequestAssessoria={handleRequestFromDashboard} />
        <NewsSection />
        <AssessoriaForm prefill={prefill} />
        <MaterialsSection />
      </main>
      <Footer />
    </div>
  )
}
