import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as Dialog from '@/components/ui/dialog'

export default function App() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="min-h-dvh bg-background text-foreground p-6">
      <h1 className="text-2xl font-bold mb-4">Assigna + React</h1>
      <p className="text-muted-foreground mb-6">
        Tailwind e shadcn/ui configurados. Exemplos abaixo:
      </p>

      <div className="flex gap-3 mb-4">
        <Button>Botão padrão</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="outline">Outline</Button>
      </div>

      <div className="mb-6 max-w-sm">
        <label className="block text-sm mb-2">Entrada</label>
        <Input placeholder="Digite algo..." />
      </div>

      <Dialog.Dialog open={open} onOpenChange={setOpen}>
        <Dialog.DialogTrigger asChild>
          <Button variant="ghost">Abrir diálogo</Button>
        </Dialog.DialogTrigger>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Olá do shadcn/ui</Dialog.DialogTitle>
            <Dialog.DialogDescription>
              Componentes funcionando no renderer React.
            </Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="flex justify-end">
            <Dialog.DialogClose asChild>
              <Button>Fechar</Button>
            </Dialog.DialogClose>
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </div>
  )
}
