import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function LandingPage() {
  const [totalSaidas, setTotalSaidas] = useState<number | null>(null)

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
      <h1 className="text-2xl font-semibold">Assigna</h1>
      <p className="text-muted-foreground mb-6">Escolha um módulo para começar.</p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">Territórios</h2>
          <p>Gerencie territórios e dados relacionados.</p>
          <p className="text-sm text-muted-foreground">Módulo em desenvolvimento.</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">Saídas</h2>
          <p>Gerencie saídas de campo.</p>
          <p className="text-sm text-muted-foreground">Módulo em desenvolvimento.</p>
          <p className="text-sm text-muted-foreground">
            {totalSaidas === null
              ? 'Carregando informações…'
              : `Total de saídas cadastradas: ${totalSaidas}`}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">Designações</h2>
          <p>Crie e acompanhe designações.</p>
          <p className="text-sm text-muted-foreground">Módulo em desenvolvimento.</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">Relatórios</h2>
          <p>Gere relatórios e exportações.</p>
          <p className="text-sm text-muted-foreground">Módulo em desenvolvimento.</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">Mapa</h2>
          <p>Visualize dados no mapa.</p>
          <p className="text-sm text-muted-foreground">Módulo em desenvolvimento.</p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-medium mb-1">Calendário</h2>
          <p>Consulte o calendário.</p>
          <p className="text-sm text-muted-foreground">Módulo em desenvolvimento.</p>
        </div>
      </div>
    </div>
  )
}

