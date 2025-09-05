import { useEffect, useState, useCallback } from 'react';
import FullCalendar, { EventDropArg, EventResizeDoneArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { api } from '../services/api';
import type { Designacao } from '../types';

type EventType = {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: { territorio_id:number; saida_id:number };
};

export default function CalendarPage(){
  const [events, setEvents] = useState<EventType[]>([]);

  const carregarEventos = useCallback(async ()=>{
    const dados: Designacao[] = await api.designacoes.listar();
    setEvents(dados.map(d => ({
      id: String(d.id),
      title: `${d.territorio} (${d.saida})`,
      start: d.data_designacao,
      end: d.data_devolucao,
      extendedProps: { territorio_id: d.territorio_id, saida_id: d.saida_id }
    })));
  },[]);

  useEffect(()=>{ carregarEventos(); }, [carregarEventos]);

  async function atualizarDesignacao(e:EventDropArg|EventResizeDoneArg){
    const ev = e.event;
    try{
      await api.designacoes.editar(
        Number(ev.id),
        ev.extendedProps.territorio_id,
        ev.extendedProps.saida_id,
        ev.startStr,
        ev.endStr
      );
      alert('Designação atualizada!');
    } catch(err:any){
      alert(`Erro ao atualizar: ${err.message||err}`);
      ev.revert(); // desfaz se erro
    }
  }

  return (
    <div className="wrap">
      <h1>📅 Calendário</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventDrop={atualizarDesignacao}
        eventResize={atualizarDesignacao}
        height="auto"
      />
    </div>
  );
}
