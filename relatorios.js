/**
 * Converte uma data no formato ISO (ex: '2025-04-05T10:00:00.000Z') 
 * para o formato brasileiro (DD/MM/AAAA).
 * @param {string} dataISO - Data no formato ISO.
 * @returns {string} - Data formatada como 'DD/MM/AAAA'.
 */
function formatarDataBR(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');       // Garante 2 dígitos (ex: '05')
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então +1
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

/**
 * Carrega todas as designações do banco de dados e exibe-as na tabela do relatório.
 */
async function carregarRelatorio() {
    try {
        // Busca os dados das designações via API
        const designacoes = await window.api.designacoes.listar();

        // Obtém o elemento tbody da tabela onde os dados serão inseridos
        const tbody = document.getElementById('relatorio-table');
        tbody.innerHTML = ''; // Limpa qualquer conteúdo anterior

        // Verifica se há registros para mostrar
        if (designacoes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">Nenhuma designação encontrada.</td></tr>';
            return;
        }

        // Para cada registro, cria uma linha (<tr>) e colunas (<td>) dinamicamente
        designacoes.forEach(d => {
            const tr = document.createElement('tr');

            // Célula: Território
            const tdTerritorio = document.createElement('td');
            tdTerritorio.textContent = d.territorio;
            tr.appendChild(tdTerritorio);

            // Célula: Saída (nome + dia da semana)
            const tdSaida = document.createElement('td');
            tdSaida.textContent = `${d.saida} (${d.dia_semana})`;
            tr.appendChild(tdSaida);

            // Célula: Data de designação (formatada como BR)
            const tdDesignacao = document.createElement('td');
            tdDesignacao.textContent = formatarDataBR(d.data_designacao);
            tr.appendChild(tdDesignacao);

            // Célula: Data de devolução (formatada como BR)
            const tdDevolucao = document.createElement('td');
            tdDevolucao.textContent = formatarDataBR(d.data_devolucao);
            tr.appendChild(tdDevolucao);

            // Adiciona a linha à tabela
            tbody.appendChild(tr);
        });
    } catch (error) {
        // Em caso de erro, mostra mensagem ao usuário
        mostrarToast('Erro ao carregar o relatório.', 'erro');
        console.error(error);
    }
}

/**
 * Carrega opções de filtro (saídas e territórios) nos selects do formulário.
 */
async function carregarFiltros() {
    try {
        // Elementos dos campos de filtro
        const filtroSaida = document.getElementById('filtroSaida');
        const filtroTerritorio = document.getElementById('filtroTerritorio');

        // Define opção padrão "Todas" e "Todos"
        filtroSaida.innerHTML = '<option value="">Todas</option>';
        filtroTerritorio.innerHTML = '<option value="">Todos</option>';

        // Busca saídas disponíveis e preenche o select
        const saidas = await window.api.saidas.listar();
        saidas.forEach(s => {
            const option = document.createElement('option');
            option.value = s.nome;
            option.textContent = `${s.nome} (${s.dia_semana})`;
            filtroSaida.appendChild(option);
        });

        // Busca territórios disponíveis e preenche o select
        const territorios = await window.api.territorios.listar();
        territorios.forEach(t => {
            const option = document.createElement('option');
            option.value = t.descricao;
            option.textContent = t.descricao;
            filtroTerritorio.appendChild(option);
        });
    } catch (error) {
        mostrarToast('Erro ao carregar filtros.', 'erro');
        console.error(error);
    }
}

/**
 * Filtra os registros com base nos valores selecionados nos campos do formulário.
 */
async function filtrarRelatorio() {
    try {
        // Obtém os valores dos filtros
        const saidaSelecionada = document.getElementById('filtroSaida').value;
        const territorioSelecionado = document.getElementById('filtroTerritorio').value;
        const dataInicio = document.getElementById('filtroDataInicio').value;
        const dataFim = document.getElementById('filtroDataFim').value;

        // Busca todos os registros
        let designacoes = await window.api.designacoes.listar();

        // Aplica os filtros conforme necessário
        if (saidaSelecionada) {
            designacoes = designacoes.filter(d => d.saida === saidaSelecionada);
        }
        if (territorioSelecionado) {
            designacoes = designacoes.filter(d => d.territorio === territorioSelecionado);
        }
        if (dataInicio) {
            const di = new Date(dataInicio);
            designacoes = designacoes.filter(d => new Date(d.data_designacao) >= di);
        }
        if (dataFim) {
            const df = new Date(dataFim);
            designacoes = designacoes.filter(d => new Date(d.data_devolucao) <= df);
        }

        // Atualiza a tabela com os resultados filtrados
        const tbody = document.getElementById('relatorio-table');
        tbody.innerHTML = '';

        if (designacoes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">Nenhuma designação encontrada com os filtros selecionados.</td></tr>';
            return;
        }

        designacoes.forEach(d => {
            const tr = document.createElement('tr');

            const tdTerritorio = document.createElement('td');
            tdTerritorio.textContent = d.territorio;
            tr.appendChild(tdTerritorio);

            const tdSaida = document.createElement('td');
            tdSaida.textContent = `${d.saida} (${d.dia_semana})`;
            tr.appendChild(tdSaida);

            const tdDesignacao = document.createElement('td');
            tdDesignacao.textContent = formatarDataBR(d.data_designacao);
            tr.appendChild(tdDesignacao);

            const tdDevolucao = document.createElement('td');
            tdDevolucao.textContent = formatarDataBR(d.data_devolucao);
            tr.appendChild(tdDevolucao);

            tbody.appendChild(tr);
        });
    } catch (error) {
        mostrarToast('Erro ao filtrar o relatório.', 'erro');
        console.error(error);
    }
}

/**
 * Exporta os registros filtrados para um arquivo PDF.
 */
async function exportarRelatorio() {
    // Obtém os valores dos filtros
    const saidaSelecionada = document.getElementById('filtroSaida').value;
    const territorioSelecionado = document.getElementById('filtroTerritorio').value;
    const dataInicio = document.getElementById('filtroDataInicio').value;
    const dataFim = document.getElementById('filtroDataFim').value;

    // Busca todos os registros
    let designacoes = await window.api.designacoes.listar();

    // Aplica os filtros conforme necessário
    if (saidaSelecionada) {
        designacoes = designacoes.filter(d => d.saida === saidaSelecionada);
    }
    if (territorioSelecionado) {
        designacoes = designacoes.filter(d => d.territorio === territorioSelecionado);
    }
    if (dataInicio) {
        const di = new Date(dataInicio);
        designacoes = designacoes.filter(d => new Date(d.data_designacao) >= di);
    }
    if (dataFim) {
        const df = new Date(dataFim);
        designacoes = designacoes.filter(d => new Date(d.data_devolucao) <= df);
    }

    // Prepara os dados para exportação
    const dados = designacoes.map(item => ({
        territorio: item.territorio,
        saida: item.saida,
        dia: item.dia_semana,
        designacao: formatarDataBR(item.data_designacao),
        devolucao: formatarDataBR(item.data_devolucao)
    }));

    // Monta o período de filtragem para incluir no PDF
    let periodo = 'Completo';
    if (dataInicio || dataFim) {
        const inicioBR = dataInicio ? formatarDataBR(dataInicio) : '';
        const fimBR = dataFim ? formatarDataBR(dataFim) : '';
        periodo = `${inicioBR} - ${fimBR}`.trim();
    }

    // Chama a API para gerar o PDF e retorna o caminho do arquivo salvo
    const caminho = await window.api.pdf.gerarRelatorio(dados, periodo);

    if (caminho) {
        mostrarToast(`PDF salvo em: ${caminho}`, 'sucesso');
    } else {
        mostrarToast('Exportação cancelada.', 'alerta');
    }
}

/**
 * Gera um PDF simples do relatório completo.
 */
async function gerarPDF() {
    const caminho = await window.api.pdf.gerar('Relatorio');
    if (caminho) {
        mostrarToast(`PDF salvo em: ${caminho}`, 'sucesso');
    } else {
        mostrarToast('Exportação cancelada.', 'alerta');
    }
}
async function gerarFormularioS13() {
    const designacoes = await window.api.designacoes.listar();

    // Agrupar por território
    const agrupado = {};
    designacoes.forEach(d => {
        if (!agrupado[d.territorio]) agrupado[d.territorio] = [];
        agrupado[d.territorio].push({
            data_designacao: formatarDataBR(d.data_designacao),
            data_devolucao: formatarDataBR(d.data_devolucao),
            saida: `${d.saida} (${d.dia_semana})`
        });
    });

    // Monta estrutura HTML baseada no PDF original
    let html = `
        <html><head><title>Formulário S-13_T</title>
        <style>
            body { font-family: Arial; padding: 40px; }
            h1, h2 { text-align: center; }
            table { border-collapse: collapse; width: 100%; margin-top: 30px; }
            td, th { border: 1px solid #333; padding: 6px; text-align: center; font-size: 12px; }
        </style>
        </head><body>
        <h1>REGISTRO DE DESIGNAÇÃO DE TERRITÓRIO</h1>
        <table>
        <tr>
            <th>Terr. n.º</th><th>Última data concluída</th>
            <th>Data Designação 1</th><th>Data Conclusão 1</th>
            <th>Data Designação 2</th><th>Data Conclusão 2</th>
            <th>Data Designação 3</th><th>Data Conclusão 3</th>
            <th>Data Designação 4</th><th>Data Conclusão 4</th>
        </tr>`;

    for (const [territorio, registros] of Object.entries(agrupado)) {
        const ultData = registros[registros.length - 1]?.data_devolucao || '';
        const colunas = registros.slice(-4).map(r => [r.data_designacao, r.data_devolucao]).flat();
        while (colunas.length < 8) colunas.push('');
        html += `<tr><td>${territorio}</td><td>${ultData}</td>${colunas.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }

    html += `</table></body></html>`;

    // Abre nova aba para impressão
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
}

// Quando a página terminar de carregar, carrega automaticamente os dados
window.addEventListener('DOMContentLoaded', async () => {
    await carregarRelatorio();   // Carrega os registros
    await carregarFiltros();     // Carrega os filtros
});

