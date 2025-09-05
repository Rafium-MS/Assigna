async function verificarDesignacoesProximas() {
  const designacoes = await window.api.designacoes.listar();
  const hoje = new Date();
  const limite = new Date();
  limite.setDate(hoje.getDate() + 2);
  for (const d of designacoes) {
    const dataDev = new Date(d.data_devolucao);
    if (dataDev >= hoje && dataDev <= limite) {
      const msg = `Devolução de ${d.territorio} em ${d.data_devolucao}`;
      if (window.Notification && Notification.permission === 'granted') {
        new Notification('Designação próxima do vencimento', { body: msg });
      } else {
        mostrarToast(msg, 'alerta');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  verificarDesignacoesProximas();
  setInterval(verificarDesignacoesProximas, 6 * 60 * 60 * 1000);
});