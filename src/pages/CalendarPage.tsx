import React, { useState } from 'react';
import { Modal } from '../components/layout/Modal';
import { Card, Button, Input, Label } from '../components/ui';
import { useDesignacoes } from '../hooks/useDesignacoes';
import { useTerritorios } from '../hooks/useTerritorios';
import { useWarningDays } from '../hooks/useWarningDays';
import { formatIsoDate, weekdays } from '../utils/calendar';
import { findName } from '../utils/lookups';

const CalendarPage: React.FC = () => {
  const { designacoes } = useDesignacoes();
  const { territorios } = useTerritorios();
  const [warningDays, setWarningDays] = useWarningDays();
  const [month, setMonth] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const today = new Date();
  const toIso = (date: Date) => date.toISOString().slice(0, 10);

  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = new Date(startOfMonth);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const days: Date[] = [];
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    days.push(date);
  }

  const open = (iso: string) => setSelectedDay(iso);
  const close = () => setSelectedDay(null);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="bg-neutral-100">
              ◀
            </Button>
            <h2 className="font-semibold">{month.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <Button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="bg-neutral-100">
              ▶
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label>Alerta (dias)</Label>
            <Input
              type="number"
              min={0}
              value={warningDays}
              onChange={(event) => setWarningDays(Number(event.target.value) || 0)}
              className="w-16"
            />
          </div>
        </div>

        <div className="grid grid-cols-7 text-sm font-medium text-center mb-1">
          {weekdays.map((weekday) => (
            <div key={weekday}>{weekday.slice(0, 3)}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded overflow-hidden">
          {days.map((date) => {
            const iso = toIso(date);
            const inMonth = date.getMonth() === month.getMonth();
            const startItems = designacoes.filter((designacao) => designacao.dataInicial === iso);
            const dueToday = designacoes.filter((designacao) => designacao.dataFinal === iso && !designacao.devolvido);
            let cellCls = inMonth ? 'bg-white' : 'bg-neutral-50 text-neutral-400';
            const dueDiffs = dueToday.map((designacao) =>
              Math.ceil((new Date(designacao.dataFinal).getTime() - today.getTime()) / 86400000),
            );
            if (dueDiffs.some((difference) => difference < 0)) cellCls += ' bg-red-100';
            else if (dueDiffs.some((difference) => difference <= warningDays)) cellCls += ' bg-yellow-100';
            return (
              <div
                key={iso}
                className={`min-h-24 p-1 cursor-pointer ${cellCls}`}
                onClick={() => open(iso)}
                onDragStart={() => open(iso)}
                draggable
              >
                <div className="text-xs text-right">{date.getDate()}</div>
                {startItems.map((designacao) => {
                  const diff = Math.ceil((new Date(designacao.dataFinal).getTime() - today.getTime()) / 86400000);
                  let badge: React.ReactNode = null;
                  if (!designacao.devolvido) {
                    if (diff < 0) badge = <span className="ml-1 text-[10px] px-1 rounded bg-red-600 text-white">Atrasado</span>;
                    else if (diff <= warningDays)
                      badge = <span className="ml-1 text-[10px] px-1 rounded bg-orange-500 text-white">D-{diff}</span>;
                  }
                  return (
                    <div key={designacao.id} className="text-[10px] truncate">
                      {findName(designacao.territorioId, territorios)}
                      {badge}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>

      {selectedDay && (
        <Modal>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">{formatIsoDate(selectedDay)}</h3>
            {(() => {
              const items = designacoes.filter(
                (designacao) => designacao.dataInicial === selectedDay || designacao.dataFinal === selectedDay,
              );
              return items.length === 0 ? (
                <p className="text-sm text-neutral-500">Sem designações.</p>
              ) : (
                <ul className="text-sm grid gap-1">
                  {items.map((assignment) => (
                    <li key={assignment.id}>
                      {findName(assignment.territorioId, territorios)} — {formatIsoDate(assignment.dataInicial)} →
                      {formatIsoDate(assignment.dataFinal)}
                    </li>
                  ))}
                </ul>
              );
            })()}
            <div className="text-right">
              <Button onClick={close} className="bg-neutral-100">
                Fechar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
