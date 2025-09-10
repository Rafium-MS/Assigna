import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'

const LandingPage = React.lazy(() => import('@/components/LandingPage'))
const DesignacoesPage = React.lazy(() => import('@/components/DesignacoesPage'))
const SaidasPage = React.lazy(() => import('@/components/SaidasPage'))
const TerritoriosPage = React.lazy(() => import('@/components/TerritoriosPage'))
const CalendarPage = React.lazy(() => import('@/components/CalendarPage'))
const ReportsPage = React.lazy(() => import('@/components/ReportsPage'))
const SugestoesPage = React.lazy(() => import('@/components/SugestoesPage'))

const TABS = [
  { id: 'designacoes', label: 'Designações', path: '/designacoes', Comp: DesignacoesPage },
  { id: 'saidas', label: 'Saídas', path: '/saidas', Comp: SaidasPage },
  { id: 'territorios', label: 'Territórios', path: '/territorios', Comp: TerritoriosPage },
  { id: 'calendario', label: 'Calendário', path: '/calendario', Comp: CalendarPage },
  { id: 'relatorios', label: 'Relatórios', path: '/relatorios', Comp: ReportsPage },
  { id: 'sugestoes', label: 'Sugestões', path: '/sugestoes', Comp: SugestoesPage },
]

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props); this.state = { error: null }
  }
  static getDerivedStateFromError(error){ return { error } }
  componentDidCatch(err, info){ console.error('Page error:', err, info) }
  render(){
    if (this.state.error) {
      return (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded p-4">
          <p className="font-medium mb-1">Falha ao carregar a página.</p>
          <p className="text-sm text-red-700">
            Verifique os imports internos. Ex.: use "@/services/api" e "@/types".
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold"><Link to="/">Assigna</Link></h1>
          <nav className="flex gap-2 flex-wrap">


          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <React.Suspense fallback={<div>Carregando...</div>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              {TABS.map(t => (
                <Route key={t.id} path={t.path} element={<t.Comp />} />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </React.Suspense>
      </main>
    </div>
  )
}

