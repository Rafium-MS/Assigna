import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useTranslation } from '@/lib/i18n'

export default function LandingPage() {
  const [totalSaidas, setTotalSaidas] = useState<number | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    api?.saidas?.listar?.()
      .then((lista) => {
        const total = Array.isArray(lista) ? lista.length : 0
        setTotalSaidas(total)
      })
      .catch(() => setTotalSaidas(null))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold">{t('landing.title')}</h1>
      <p className="text-muted-foreground mb-6">{t('landing.subtitle')}</p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">{t('landing.territories.title')}</h2>
          <p>{t('landing.territories.desc')}</p>
          <p className="text-sm text-muted-foreground">{t('landing.territories.dev')}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">{t('landing.saidas.title')}</h2>
          <p>{t('landing.saidas.desc')}</p>
          <p className="text-sm text-muted-foreground">{t('landing.saidas.dev')}</p>
          <p className="text-sm text-muted-foreground">
            {totalSaidas === null
              ? t('landing.saidas.loading')
              : t('landing.saidas.total', { total: totalSaidas })}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">{t('landing.designacoes.title')}</h2>
          <p>{t('landing.designacoes.desc')}</p>
          <p className="text-sm text-muted-foreground">{t('landing.designacoes.dev')}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">{t('landing.relatorios.title')}</h2>
          <p>{t('landing.relatorios.desc')}</p>
          <p className="text-sm text-muted-foreground">{t('landing.relatorios.dev')}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">{t('landing.mapa.title')}</h2>
          <p>{t('landing.mapa.desc')}</p>
          <p className="text-sm text-muted-foreground">{t('landing.mapa.dev')}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">{t('landing.calendario.title')}</h2>
          <p>{t('landing.calendario.desc')}</p>
          <p className="text-sm text-muted-foreground">{t('landing.calendario.dev')}</p>
        </div>
      </div>
    </div>
  )
}

