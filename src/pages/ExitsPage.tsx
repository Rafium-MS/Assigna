import React, { useState } from 'react';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { Card, Button, Input, Label } from '../components/ui';
import { useStoreContext } from '../store/localStore';
import { weekdays } from '../utils/calendar';

const ExitsPage: React.FC = () => {
  const { exits, addExit, delExit } = useStoreContext();
  const confirm = useConfirm();
  const [name, setName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState<number>(6);
  const [time, setTime] = useState('09:00');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    addExit({ name: name.trim(), dayOfWeek, time });
    setName('');
    setDayOfWeek(6);
    setTime('09:00');
  };

  return (
    <div className="grid gap-4">
      <Card title="Cadastrar Saída de Campo">
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
          <div className="grid gap-1">
            <Label>Nome</Label>
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Grupo Sábado Manhã" />
          </div>
          <div className="grid gap-1">
            <Label>Dia da Semana</Label>
            <select
              value={dayOfWeek}
              onChange={(event) => setDayOfWeek(Number(event.target.value))}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900"
            >
              {weekdays.map((weekday, index) => (
                <option key={weekday} value={index}>
                  {weekday}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <Label>Horário</Label>
            <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </div>
          <div className="flex items-end justify-end">
            <Button type="submit" className="bg-black text-white">
              Salvar Saída
            </Button>
          </div>
        </form>
      </Card>

      <Card title={`Saídas (${exits.length})`}>
        {exits.length === 0 ? (
          <p className="text-neutral-500">Nenhuma saída cadastrada.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {exits.map((exit) => (
              <div key={exit.id} className="rounded-xl border p-3 flex items-center justify-between bg-white dark:bg-neutral-950">
                <div>
                  <p className="font-semibold">{exit.name}</p>
                  <p className="text-sm text-neutral-600">
                    {weekdays[exit.dayOfWeek]} · {exit.time}
                  </p>
                </div>
                <Button
                  onClick={async () => {
                    if (await confirm('Excluir saída?')) {
                      delExit(exit.id);
                    }
                  }}
                  className="bg-red-50 text-red-700"
                >
                  Excluir
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExitsPage;
