import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useTranslation, I18nContext } from '@/lib/i18n'

const LandingPage = React.lazy(() => import('@/components/LandingPage'))
const DesignacoesPage = React.lazy(() => import('@/components/DesignacoesPage'))
const SaidasPage = React.lazy(() => import('@/components/SaidasPage'))
const TerritoriosPage = React.lazy(() => import('@/components/TerritoriosPage'))
const CalendarPage = React.lazy(() => import('@/components/CalendarPage'))
const ReportsPage = React.lazy(() => import('@/components/ReportsPage'))
const SugestoesPage = React.lazy(() => import('@/components/SugestoesPage'))



class ErrorBoundary extends React.Component {
  constructor(props){
    super(props); this.state = { error: null }
  }
  static contextType = I18nContext
  static getDerivedStateFromError(error){ return { error } }
  componentDidCatch(err, info){ console.error('Page error:', err, info) }
  render(){
    const { t } = this.context
    if (this.state.error) {
      return (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded p-4">
          <p className="font-medium mb-1">{t('error.pageLoadFail')}</p>
          <p className="text-sm text-red-700">
            {t('error.checkImports')}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const location = useLocation()
  const { t } = useTranslation()
  const TABS = [
    { id: 'designacoes', label: t('tabs.designacoes'), path: '/designacoes', Comp: DesignacoesPage },
    { id: 'saidas', label: t('tabs.saidas'), path: '/saidas', Comp: SaidasPage },
    { id: 'territorios', label: t('tabs.territorios'), path: '/territorios', Comp: TerritoriosPage },
    { id: 'calendario', label: t('tabs.calendario'), path: '/calendario', Comp: CalendarPage },
    { id: 'relatorios', label: t('tabs.relatorios'), path: '/relatorios', Comp: ReportsPage },
    { id: 'sugestoes', label: t('tabs.sugestoes'), path: '/sugestoes', Comp: SugestoesPage },
  ]

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold"><Link to="/">{t('app.title')}</Link></h1>
          <nav className="flex gap-2 flex-wrap">


          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <React.Suspense fallback={<div>{t('loading')}</div>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              {TABS.map(tab => (
                <Route key={tab.id} path={tab.path} element={<tab.Comp />} />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </React.Suspense>
      </main>
    </div>
  )
}

