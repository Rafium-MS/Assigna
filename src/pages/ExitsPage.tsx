import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { Card, Button, Input, Label } from '../components/ui';
import { useSaidas } from '../hooks/useSaidas';
import { weekdays } from '../utils/calendar';

const ExitsPage: React.FC = () => {
  const { saidas, addSaida, removeSaida } = useSaidas();
  const confirm = useConfirm();
  const { t } = useTranslation();
  const [nome, setNome] = useState('');
  const [diaDaSemana, setDiaDaSemana] = useState<number>(6);
  const [hora, setHora] = useState('09:00');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nome.trim()) return;
    await addSaida({ nome: nome.trim(), diaDaSemana, hora });
    setNome('');
    setDiaDaSemana(6);
    setHora('09:00');
  };

  return (
    <div className="grid gap-4">
      <Card title={t('exits.newExit')}>
        <form onSubmit={submit} className="grid md:grid-cols-4 gap-3">
          <div className="grid gap-1">
            <Label>{t('exits.name')}</Label>
            <Input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder={t('exits.namePlaceholder')}
            />
          </div>
          <div className="grid gap-1">
            <Label>{t('exits.weekday')}</Label>
            <select
              value={diaDaSemana}
              onChange={(event) => setDiaDaSemana(Number(event.target.value))}
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
            <Label>{t('exits.time')}</Label>
            <Input type="time" value={hora} onChange={(event) => setHora(event.target.value)} />
          </div>
          <div className="flex items-end justify-end">
            <Button type="submit" className="bg-black text-white">
              {t('exits.save')}
            </Button>
          </div>
        </form>
      </Card>

      <Card title={t('exits.exitsWithCount', { count: saidas.length })}>
        {saidas.length === 0 ? (
          <p className="text-neutral-500">{t('exits.noExits')}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {saidas.map((saida) => (
              <div key={saida.id} className="rounded-xl border p-3 flex items-center justify-between bg-white dark:bg-neutral-950">
                <div>
                  <p className="font-semibold">{saida.nome}</p>
                  <p className="text-sm text-neutral-600">
                    {weekdays[saida.diaDaSemana]} · {saida.hora}
                  </p>
                </div>
                <Button
                  onClick={async () => {
                    if (await confirm(t('exits.confirmDelete'))) {
                      await removeSaida(saida.id);
                    }
                  }}
                  className="bg-red-50 text-red-700"
                >
                  {t('exits.delete')}
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
