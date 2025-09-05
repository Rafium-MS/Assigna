// saidas.js

async function carregarSaidas() {
    const saidas = await window.api.saidas.listar();
    const tbody = document.getElementById('saida-table');
    tbody.innerHTML = '';
    
    const selectHistorico = document.getElementById('historicoSelectSaida');
    if (selectHistorico) {
        selectHistorico.innerHTML = '';
    }

    saidas.forEach(item => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = item.id;
        tr.appendChild(tdId);

        const tdNome = document.createElement('td');
        tdNome.textContent = item.nome;
        tr.appendChild(tdNome);

        const tdDia = document.createElement('td');
        tdDia.textContent = item.dia_semana;
        tr.appendChild(tdDia);

        const tdAcoes = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.innerHTML = '<span class="material-icons">edit</span> Editar';
        btnEditar.onclick = () => editarSaida(item.id);
        const btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = '<span class="material-icons">delete</span> Excluir';
        btnExcluir.onclick = () => deletarSaida(item.id);
        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
        
        if (selectHistorico) {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = `${item.nome} (${item.dia_semana})`;
            selectHistorico.appendChild(opt);
        }
    });
}

async function addSaida() {
    const nome = document.getElementById('saida').value.trim();
    const dia = document.getElementById('dia').value;

    if (!nome || !dia) {
        mostrarToast('Preencha todos os campos.', 'alerta');
        return;
    }


    try {
        await window.api.saidas.adicionar(nome, dia);
        mostrarToast('Saída adicionada!', 'sucesso');
        carregarSaidas();
        resetarFormularioSaida();
    } catch (error) {
        mostrarToast(error.message, 'erro');
    }
}

async function editarSaida(id) {
    const saidas = await window.api.saidas.listar();
    const item = saidas.find(s => s.id === id);

    if (!item) {
        mostrarToast('Saída não encontrada.', 'erro');
        return;
    }

    document.getElementById('saida').value = item.nome;
    document.getElementById('dia').value = item.dia_semana;

    const btn = document.querySelector('button[onclick="addSaida()"]');
    btn.textContent = 'Salvar Alterações';
    btn.onclick = () => salvarEdicaoSaida(id);
}

async function salvarEdicaoSaida(id) {
    const nome = document.getElementById('saida').value.trim();
    const dia = document.getElementById('dia').value;

    if (!nome || !dia) {
        mostrarToast('Preencha todos os campos.', 'alerta');
        return;
    }


    try {
        await window.api.saidas.editar(id, nome, dia);
        mostrarToast('Saída atualizada!', 'sucesso');
        carregarSaidas();
        resetarFormularioSaida();
    } catch (error) {
        mostrarToast(error.message, 'erro');
    }
}

function resetarFormularioSaida() {
    document.getElementById('saida').value = '';
    document.getElementById('dia').value = '';
    const btn = document.querySelector('button[onclick^="salvarEdicaoSaida"]');
    if (btn) {
        btn.textContent = 'Adicionar';
        btn.setAttribute('onclick', 'addSaida()');
    }
}

async function deletarSaida(id) {
    if (confirm('Deseja realmente excluir esta saída?')) {
        await window.api.saidas.deletar(id);        mostrarToast('Saída excluída!', 'sucesso');
        carregarSaidas();
    }
}

async function importarCSV() {
    const { canceled, filePaths } = await window.api.app.abrirDialogoCSV();
    if (!canceled && filePaths.length > 0) {
        await window.api.saidas.importarCSV(filePaths[0]);
        mostrarToast('Importação concluída!', 'sucesso');
        carregarSaidas();
    }
}

async function exportarSaidas() {
    const resultado = await window.api.saidas.exportarCSV();
    if (resultado && !resultado.canceled) {
        mostrarToast('Exportação concluída!', 'sucesso');
    } else {
        mostrarToast('Exportação cancelada.', 'alerta');
    }
}
async function carregarHistoricoSaida() {
    const id = document.getElementById('historicoSelectSaida').value;
    const historico = await window.api.designacoes.historicoSaida(parseInt(id));
    const tbody = document.getElementById('historico-por-saida');
    tbody.innerHTML = '';

    historico.forEach(h => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${h.territorio}</td><td>${h.data_designacao}</td><td>${h.data_devolucao}</td>`;
        tbody.appendChild(tr);
    });
}

window.addEventListener('DOMContentLoaded', carregarSaidas);
