async function carregarEventos() {
  const dados = await window.api.designacoes.listar();
  return dados.map(d => ({
    id: d.id,
    title: `${d.territorio} (${d.saida})`,
    start: d.data_designacao,
    end: d.data_devolucao,
    extendedProps: { territorio_id: d.territorio_id, saida_id: d.saida_id }
  }));
}

document.addEventListener('DOMContentLoaded', async () => {
  const events = await carregarEventos();
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
    events,
    eventDrop: async (info) => {
      await window.api.designacoes.editar(
        info.event.id,
        info.event.extendedProps.territorio_id,
        info.event.extendedProps.saida_id,
        info.event.startStr,
        info.event.endStr,
      );
      mostrarToast('Designação atualizada!', 'sucesso');
    },
    eventResize: async (info) => {
      await window.api.designacoes.editar(
        info.event.id,
        info.event.extendedProps.territorio_id,
        info.event.extendedProps.saida_id,
        info.event.startStr,
        info.event.endStr,
      );
      mostrarToast('Designação atualizada!', 'sucesso');
    }
  });
  calendar.render();
});