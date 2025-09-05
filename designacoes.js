// designacoes.js

// Variáveis globais para controle de paginação e ordenação
let paginaAtual = 1;                // Página atual da tabela
const itensPorPagina = 10;          // Número de itens por página
let designacoesOrdenadas = [];      // Array com designações ordenadas
let ordenacaoCampo = 'id';          // Campo atual para ordenação
let ordenacaoAsc = true;            // Direção da ordenação (true = ascendente)

/**
 * 🔔 Carrega as designações da API e prepara para exibição
 * - Busca todas as designações
 * - Aplica ordenação conforme configurações atuais
 * - Renderiza a tabela
 */
async function carregarDesignacoes() {
    const designacoes = await window.api.designacoes.listar();
    
    // Ordena as designações conforme campo e direção selecionados
    designacoesOrdenadas = designacoes.sort((a, b) => {
        const valorA = a[ordenacaoCampo];
        const valorB = b[ordenacaoCampo];
        if (valorA < valorB) return ordenacaoAsc ? -1 : 1;
        if (valorA > valorB) return ordenacaoAsc ? 1 : -1;
        return 0;
    });
    
    renderizarTabela();
}

/**
 * ➕ Adiciona uma nova designação
 * - Valida os campos do formulário
 * - Envia para a API
 * - Recarrega a tabela e limpa o formulário
 */
async function addDesignacao() {
    // Obtém valores dos campos do formulário
    const territorio = document.getElementById('comboTerritorio').value;
    const saida = document.getElementById('comboSaida').value;
    const dataDesignacao = document.getElementById('dataDesignacao').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;

    // Validação dos campos obrigatórios
    if (!territorio || !saida || !dataDesignacao || !dataDevolucao) {
        mostrarToast('Preencha todos os campos.', 'alerta');
        return;
    }
    

    try {
        await window.api.designacoes.adicionar(territorio, saida, dataDesignacao, dataDevolucao);
        mostrarToast('Designação adicionada com sucesso!', 'sucesso');
        carregarDesignacoes();
        resetarFormularioDesignacao();
    } catch (error) {
        mostrarToast(error.message, 'erro');
    }
}

/**
 * ✏️ Prepara o formulário para edição de uma designação existente
 * @param {number} id - ID da designação a ser editada
 */
async function editarDesignacao(id) {
    const designacoes = await window.api.designacoes.listar();
    const item = designacoes.find(d => d.id === id);

    if (!item) {
        mostrarToast('Designação não encontrada.', 'erro');
        return;
    }

    // Preenche o formulário com os dados da designação
    document.getElementById('comboTerritorio').value = item.territorio_id;
    document.getElementById('comboSaida').value = item.saida_id;
    document.getElementById('dataDesignacao').value = item.data_designacao;
    document.getElementById('dataDevolucao').value = item.data_devolucao;

    // Altera o botão para modo de edição
    const btn = document.querySelector('button[onclick="addDesignacao()"]');
    btn.textContent = 'Salvar Alterações';
    btn.onclick = () => salvarEdicaoDesignacao(id);
}

/**
 * Salva as alterações de uma designação editada
 * @param {number} id - ID da designação sendo editada
 */
async function salvarEdicaoDesignacao(id) {
    const territorio = document.getElementById('comboTerritorio').value;
    const saida = document.getElementById('comboSaida').value;
    const dataDesignacao = document.getElementById('dataDesignacao').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;

    if (!territorio || !saida || !dataDesignacao || !dataDevolucao) {
        mostrarToast('Preencha todos os campos.', 'alerta');
        return;
    }
   

    try {
        await window.api.designacoes.editar(id, territorio, saida, dataDesignacao, dataDevolucao);
        mostrarToast('Designação atualizada!', 'sucesso');
        carregarDesignacoes();
        resetarFormularioDesignacao();
    } catch (error) {
        mostrarToast(error.message, 'erro');
    }
}

/**
 * Limpa o formulário de designação e restaura o botão para modo de adição
 */
function resetarFormularioDesignacao() {
    document.getElementById('comboTerritorio').value = '';
    document.getElementById('comboSaida').value = '';
    document.getElementById('dataDesignacao').value = '';
    document.getElementById('dataDevolucao').value = '';

    const btn = document.querySelector('button[onclick^="salvarEdicaoDesignacao"]');
    if (btn) {
        btn.textContent = 'Designar';
        btn.setAttribute('onclick', 'addDesignacao()');
    }
}

/**
 * ❌ Exclui uma designação após confirmação
 * @param {number} id - ID da designação a ser excluída
 */
async function deletarDesignacao(id) {
    if (confirm('Deseja realmente excluir esta designação?')) {
        await window.api.designacoes.deletar(id);
        mostrarToast('Designação excluída!', 'sucesso');
        carregarDesignacoes();
    }
}

/**
 * 📦 Carrega os combos de seleção (Territórios e Saídas)
 */
async function carregarCombos() {
    const territorios = await window.api.territorios.listar();
    const saidas = await window.api.saidas.listar();

    const comboTerritorio = document.getElementById('comboTerritorio');
    const comboSaida = document.getElementById('comboSaida');

    // Limpa e adiciona opção padrão
    comboTerritorio.innerHTML = '<option value="">Selecione</option>';
    comboSaida.innerHTML = '<option value="">Selecione</option>';

    // Preenche combo de territórios
    territorios.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.descricao;
        comboTerritorio.appendChild(opt);
    });

    // Preenche combo de saídas
    saidas.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.nome} (${s.dia_semana})`;
        comboSaida.appendChild(opt);
    });
}

/**
 * Renderiza a tabela com as designações paginadas
 */
function renderizarTabela() {
    const tbody = document.getElementById('designacao-table');
    tbody.innerHTML = '';

    // Calcula os itens da página atual
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const pagina = designacoesOrdenadas.slice(inicio, fim);

    // Cria uma linha na tabela para cada item
    pagina.forEach(item => {
        const tr = document.createElement('tr');

        // Coluna ID
        const tdId = document.createElement('td');
        tdId.textContent = item.id;
        tr.appendChild(tdId);

        // Coluna Território
        const tdTerritorio = document.createElement('td');
        tdTerritorio.textContent = item.territorio;
        tr.appendChild(tdTerritorio);

        // Coluna Saída
        const tdSaida = document.createElement('td');
        tdSaida.textContent = item.saida;
        tr.appendChild(tdSaida);

        // Coluna Dia da Semana
        const tdDia = document.createElement('td');
        tdDia.textContent = item.dia_semana;
        tr.appendChild(tdDia);

        // Coluna Data de Designação (formatada)
        const tdDesignacao = document.createElement('td');
        tdDesignacao.textContent = formatarDataBrasileira(item.data_designacao);
        tr.appendChild(tdDesignacao);

        // Coluna Data de Devolução (formatada)
        const tdDevolucao = document.createElement('td');
        tdDevolucao.textContent = formatarDataBrasileira(item.data_devolucao);
        tr.appendChild(tdDevolucao);

        // Coluna de Ações (Editar/Excluir)
        const tdAcoes = document.createElement('td');
        
        // Botão Editar
        const btnEditar = document.createElement('button');
        btnEditar.innerHTML = '<span class="material-icons">edit</span> Editar';
        btnEditar.onclick = () => editarDesignacao(item.id);
        
        // Botão Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = '<span class="material-icons">delete</span> Excluir';
        btnExcluir.onclick = () => deletarDesignacao(item.id);
        
        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
    });

    renderizarPaginacao();
}

/**
 * Renderiza os controles de paginação
 */
function renderizarPaginacao() {
    const paginacao = document.getElementById('paginacao');
    const totalPaginas = Math.ceil(designacoesOrdenadas.length / itensPorPagina);
    paginacao.innerHTML = '';
    
    // Cria um botão para cada página
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === paginaAtual ? 'ativo' : '';
        btn.onclick = () => {
            paginaAtual = i;
            renderizarTabela();
        };
        paginacao.appendChild(btn);
    }
}

/**
 * Ordena a tabela por um campo específico
 * @param {string} campo - Nome do campo para ordenação
 */
function ordenarPor(campo) {
    // Alterna direção se ordenando pelo mesmo campo
    if (ordenacaoCampo === campo) {
        ordenacaoAsc = !ordenacaoAsc;
    } else {
        ordenacaoCampo = campo;
        ordenacaoAsc = true;
    }
    renderizarTabela();
}

/**
 * Formata uma data no formato ISO para o formato brasileiro (DD/MM/AAAA)
 * @param {string} dataISO - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada
 */
function formatarDataBrasileira(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

/**
 * Importa designações de um arquivo CSV
 */
async function importarCSV() {
    const { canceled, filePaths } = await window.api.app.abrirDialogoCSV();
    if (!canceled && filePaths.length > 0) {
        await window.api.designacoes.importarCSV(filePaths[0]);
        mostrarToast('Importação concluída!', 'sucesso');
        carregarDesignacoes();
        carregarCombos();
    }
}

/**
 * Exporta as designações para um arquivo CSV
 */
async function exportarDesignacoes() {
    const resultado = await window.api.designacoes.exportarCSV();
    if (resultado && !resultado.canceled) {
        mostrarToast('Exportação concluída!', 'sucesso');
    } else {
        mostrarToast('Exportação cancelada.', 'alerta');
    }
}

async function gerarTextoDesignacoes() {
    const inicio = document.getElementById('filtroInicio').value;
    const fim = document.getElementById('filtroFim').value;

    if (!inicio || !fim) {
        mostrarToast('Selecione o período desejado.', 'alerta');
        return;
    }

    const designacoes = await window.api.designacoes.listar();

    const filtradas = designacoes.filter(d => {
        return d.data_designacao >= inicio && d.data_designacao <= fim;
    });

    if (!filtradas.length) {
        mostrarToast('Nenhuma designação encontrada no período.', 'alerta');
        document.getElementById('textoDesignacoes').value = '';
        return;
    }

    const linhas = filtradas.map(d => {
        const dataInicio = formatarDataBrasileira(d.data_designacao);
        const dataFim = formatarDataBrasileira(d.data_devolucao);
        return `📍 Território: ${d.territorio}\n🚶 Saída: ${d.saida} (${d.dia_semana})\n📅 De ${dataInicio} até ${dataFim}`;
    });

    document.getElementById('textoDesignacoes').value = linhas.join('\n---------------------------\n');
    mostrarToast('Texto gerado com sucesso!', 'sucesso');
}


// 🚀 Inicializa a página quando o DOM estiver carregado
window.addEventListener('DOMContentLoaded', () => {
    carregarDesignacoes();
    carregarCombos();
});