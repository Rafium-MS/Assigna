import React from 'react'
import { Button } from '@/components/ui/button'

const DesignacoesPage = React.lazy(() => import('@/components/DesignacoesPage'))
const SaidasPage = React.lazy(() => import('@/components/SaidasPage'))
const TerritoriosPage = React.lazy(() => import('@/components/TerritoriosPage'))
const CalendarPage = React.lazy(() => import('@/components/CalendarPage'))
const ReportsPage = React.lazy(() => import('@/components/ReportsPage'))
const SugestoesPage = React.lazy(() => import('@/components/SugestoesPage'))

const TABS = [
  { id: 'designacoes', label: 'Designações', Comp: DesignacoesPage },
  { id: 'saidas', label: 'Saídas', Comp: SaidasPage },
  { id: 'territorios', label: 'Territórios', Comp: TerritoriosPage },
  { id: 'calendario', label: 'Calendário', Comp: CalendarPage },
  { id: 'relatorios', label: 'Relatórios', Comp: ReportsPage },
  { id: 'sugestoes', label: 'Sugestões', Comp: SugestoesPage },
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
  const [tab, setTab] = React.useState('designacoes')
  const Active = (TABS.find(t => t.id === tab)?.Comp) || DesignacoesPage

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">Assigna</h1>
          <nav className="flex gap-2 flex-wrap">
            {TABS.map(t => (
              <Button
                key={t.id}
                variant={t.id === tab ? 'default' : 'secondary'}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <React.Suspense fallback={<div>Carregando...</div>}>
          <ErrorBoundary>
            <Active />
          </ErrorBoundary>
        </React.Suspense>
      </main>
    </div>
  )
}

