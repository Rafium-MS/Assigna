async function addTerritorio() {
    const descricao = document.getElementById('territorio').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    if (!descricao) {
        mostrarToast('Preencha a descrição.', 'alerta');
        return;
    }

    try {
        const enderecos = rua ? [{ rua, numero }] : [];
        await window.api.territorios.adicionar(descricao, isNaN(latitude) ? null : latitude,
            isNaN(longitude) ? null : longitude, enderecos);
        mostrarToast('Território adicionado com sucesso!', 'sucesso');
        document.getElementById('territorio').value = '';
        document.getElementById('rua').value = '';
        document.getElementById('numero').value = '';
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
        carregarTerritorios();
    } catch (err) {
        mostrarToast(`Erro ao adicionar: ${err.message}`, 'erro');
    }
}

async function carregarTerritorios() {
    try {
        const lista = await window.api.territorios.listar();
        const tbody = document.getElementById('territorio-table');
        tbody.innerHTML = '';

        const selectHistorico = document.getElementById('historicoSelectTerritorio');
        if (selectHistorico) {
            selectHistorico.innerHTML = '';
        }

        lista.forEach(territorio => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = territorio.id;
            tr.appendChild(tdId);

            const tdDescricao = document.createElement('td');
            tdDescricao.textContent = territorio.descricao;
            tr.appendChild(tdDescricao);
            
            const tdLat = document.createElement('td');
            tdLat.textContent = territorio.latitude ?? '';
            tr.appendChild(tdLat);

            const tdLon = document.createElement('td');
            tdLon.textContent = territorio.longitude ?? '';
            tr.appendChild(tdLon);

            const tdEnd = document.createElement('td');
            tdEnd.innerHTML = territorio.enderecos.map(e => `${e.rua || ''} ${e.numero || ''}`).join('<br>');
            tr.appendChild(tdEnd);


            const tdAcoes = document.createElement('td');
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = '<span class="material-icons">edit</span> Editar';
            btnEditar.onclick = () => editarTerritorio(territorio.id, territorio.descricao, territorio.latitude, territorio.longitude, territorio.enderecos);
            const btnExcluir = document.createElement('button');
            btnExcluir.innerHTML = '<span class="material-icons">delete</span> Excluir';
            btnExcluir.onclick = () => deletarTerritorio(territorio.id);
            tdAcoes.appendChild(btnEditar);
            tdAcoes.appendChild(btnExcluir);
            tr.appendChild(tdAcoes);

            tbody.appendChild(tr);
            
            if (selectHistorico) {
                const opt = document.createElement('option');
                opt.value = territorio.id;
                opt.textContent = territorio.descricao;
                selectHistorico.appendChild(opt);
            }
        });
    } catch (err) {
        mostrarToast(`Erro ao carregar territórios: ${err.message}`, 'erro');
    }
}

async function editarTerritorio(id, descricaoAtual, latAtual, lonAtual, enderecosAtuais=[]) {
    const descricao = prompt('Nova descrição:', descricaoAtual);
    if (descricao === null) return; // cancelado
    if (!descricao.trim()) {
        mostrarToast('Descrição não pode ser vazia.', 'alerta');
        return;
    }

    const lat = prompt('Latitude:', latAtual ?? '');
    const lon = prompt('Longitude:', lonAtual ?? '');
    const endAtualStr = enderecosAtuais.map(e => `${e.rua || ''},${e.numero || ''}`).join('; ');
    const endStr = prompt('Endereços (rua,numero; ...):', endAtualStr);
    const latitude = lat === null ? latAtual : parseFloat(lat);
    const longitude = lon === null ? lonAtual : parseFloat(lon);
    const enderecos = endStr === null ? enderecosAtuais : endStr.split(';').map(e => {
        const [r,n] = e.split(',').map(s => s.trim());
        return { rua: r, numero: n };
    }).filter(e => e.rua);
   
    try {
        await window.api.territorios.editar(id, descricao,
            isNaN(latitude) ? null : latitude,
            isNaN(longitude) ? null : longitude,
            enderecos);
        mostrarToast('Território atualizado!', 'sucesso');        carregarTerritorios();
    } catch (err) {
        mostrarToast(`Erro ao editar: ${err.message}`, 'erro');
    }
}

async function deletarTerritorio(id) {
    if (!confirm('Tem certeza que deseja excluir este território?')) return;


    try {
        await window.api.territorios.deletar(id);
        mostrarToast('Território excluído!', 'sucesso');
        carregarTerritorios();
    } catch (err) {
        mostrarToast(`Erro ao excluir: ${err.message}`, 'erro');
  }
}

async function importarCSV() {
  const { canceled, filePaths } = await window.api.app.abrirDialogoCSV();
  if (!canceled && filePaths.length > 0) {
    await window.api.territorios.importarCSV(filePaths[0]);
    mostrarToast('Importação concluída!', 'sucesso');
    carregarTerritorios();
  }
}

async function exportarTerritorios() {
  const resultado = await window.api.territorios.exportarCSV();
  if (resultado && !resultado.canceled) {
    mostrarToast('Exportação concluída!', 'sucesso');
  } else {
    mostrarToast('Exportação cancelada.', 'alerta');
  }
}

async function mostrarAgrupamentos() {
  const grupos = await window.api.territorios.agruparProximos();
  const saidas = await window.api.saidas.listar();
  const container = document.getElementById('agrupamentos');
  container.innerHTML = '';
  grupos.forEach((g, idx) => {
    if (g.length <= 1) return;
    const div = document.createElement('div');
    div.style.marginBottom = '10px';
    div.innerHTML = `<strong>Grupo ${idx + 1}:</strong> ${g.map(t => t.descricao).join(', ')}`;
    const select = document.createElement('select');
    saidas.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.nome;
      select.appendChild(opt);
    });
    const btn = document.createElement('button');
    btn.textContent = 'Designar';
    btn.onclick = () => designarGrupo(g.map(t => t.id), select.value);
    div.appendChild(select);
    div.appendChild(btn);
    container.appendChild(div);
  });
}

async function designarGrupo(ids, saidaId) {
  const hoje = new Date().toISOString().split('T')[0];
  for (const id of ids) {
    try {
      await window.api.designacoes.adicionar(id, parseInt(saidaId), hoje, null);
    } catch (err) {
      console.error(err);
    }
  }
  mostrarToast('Designações adicionadas!', 'sucesso');
}
async function carregarHistoricoTerritorio() {
  const id = document.getElementById('historicoSelectTerritorio').value;
  const historico = await window.api.designacoes.historicoTerritorio(parseInt(id));
  const tbody = document.getElementById('historico-por-territorio');
  tbody.innerHTML = '';

  historico.forEach(h => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${h.saida}</td><td>${h.data_designacao}</td><td>${h.data_devolucao}</td>`;
    tbody.appendChild(tr);
  });
  
  const visitas = await window.api.visitas.listar(parseInt(id));
  const contagens = await window.api.visitas.contagens();
  const totalVisitas = contagens.reduce((acc, c) => acc + c.total, 0);
  const registro = contagens.find(c => c.territorio_id === parseInt(id));
  const totalTerritorio = registro ? registro.total : 0;
  const percent = totalVisitas ? (totalTerritorio / totalVisitas) * 100 : 0;
  document.getElementById('contagem-visitas').textContent =
    `Total de visitas: ${totalTerritorio} (${percent.toFixed(1)}%)`;

  const ul = document.getElementById('lista-visitas');
  ul.innerHTML = '';
  visitas.forEach(v => {
    const li = document.createElement('li');
    li.textContent = v.data_visita;
    ul.appendChild(li);
  });
}

async function registrarVisita() {
  const id = document.getElementById('historicoSelectTerritorio').value;
  const data = document.getElementById('dataVisita').value;
  if (!id || !data) {
    mostrarToast('Selecione o território e a data.', 'alerta');
    return;
  }
  try {
    await window.api.visitas.registrar(parseInt(id), data);
    mostrarToast('Visita registrada!', 'sucesso');
    carregarHistoricoTerritorio();
  } catch (err) {
    mostrarToast(`Erro ao registrar visita: ${err.message}`, 'erro');
  }
}


window.addEventListener('DOMContentLoaded', () => {
    carregarTerritorios();
});
