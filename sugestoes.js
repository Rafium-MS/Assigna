// Número de meses mínimos entre designações de um mesmo território para a mesma saída
const MESES_LIMITE = 5;

// Função para mostrar mensagens de feedback ao usuário
async function gerarSugestoes() {
    const dataDesignacao = document.getElementById('dataDesignacao').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;

    if (!dataDesignacao || !dataDevolucao) {
        mostrarToast('Selecione as datas de designação e devolução', 'alerta');
        return;
    }

    const saidas = await window.api.saidas.listar();
    const territorios = await window.api.territorios.listar();
    const designacoes = await window.api.designacoes.listar();

    // Mapeia o último uso de cada território por saída
    const ultimoUso = new Map();
    designacoes.forEach(des => {
        const key = `${des.saida_id}-${des.territorio_id}`;
        const dataDev = new Date(des.data_devolucao);
        if (!ultimoUso.has(key) || dataDev > ultimoUso.get(key)) {
            ultimoUso.set(key, dataDev);
        }
    });

    const sugestoes = [];

    saidas.forEach(saida => {
        const territoriosDisponiveis = territorios.filter(territorio => {
            // Filtra designações conflitantes
            const conflitoPeriodo = designacoes.some(des => {
                const dataDesig = new Date(des.data_designacao);
                const dataDev = new Date(des.data_devolucao);
                const novaDataDesig = new Date(dataDesignacao);
                const novaDataDev = new Date(dataDevolucao);

                return des.territorio === territorio.descricao &&
                       (
                        (novaDataDesig <= dataDev && novaDataDev >= dataDesig)
                       );
            });
            if (conflitoPeriodo) return false;

            // Verifica se o território foi designado recentemente para esta saída
            const ultimaDataDev = ultimoUso.get(`${saida.id}-${territorio.id}`);
            if (ultimaDataDev) {
                const dataNova = new Date(dataDesignacao);
                const diffMeses =
                    (dataNova.getFullYear() - ultimaDataDev.getFullYear()) * 12 +
                    (dataNova.getMonth() - ultimaDataDev.getMonth());
                if (diffMeses < MESES_LIMITE) return false;
            }

            return true;
        });

        // Ordena territórios disponíveis baseado no tempo desde o último uso
        const ordenados = territoriosDisponiveis.sort((a, b) => {
            const ultA = ultimoUso.get(`${saida.id}-${a.id}`);
            const ultB = ultimoUso.get(`${saida.id}-${b.id}`);
            const diffA = ultA ? new Date(dataDesignacao) - ultA : Infinity;
            const diffB = ultB ? new Date(dataDesignacao) - ultB : Infinity;
            return diffB - diffA; // maior tempo sem uso primeiro
        });

        sugestoes.push({
            saida,
            territorios: ordenados
        });
    });

    preencherTabela(sugestoes, dataDesignacao, dataDevolucao);
}

function preencherTabela(sugestoes, dataDesignacao, dataDevolucao) {
    const tbody = document.getElementById('sugestoes-table');
    tbody.innerHTML = '';

    sugestoes.forEach(item => {
        const tr = document.createElement('tr');

        const tdSaida = document.createElement('td');
        tdSaida.innerText = `${item.saida.nome} (${item.saida.dia_semana})`;

        const tdTerritorios = document.createElement('td');
        if (item.territorios.length > 0) {
            const select = document.createElement('select');
            item.territorios.forEach(t => {
                const option = document.createElement('option');
                option.value = t.id;
                option.text = t.descricao;
                select.appendChild(option);
            });
            tdTerritorios.appendChild(select);
        } else {
            tdTerritorios.innerText = 'Nenhum disponível';
        }

        const tdAcoes = document.createElement('td');
        const btn = document.createElement('button');
        btn.innerText = 'Aplicar Sugestão';
        btn.disabled = item.territorios.length === 0;
        btn.onclick = async () => {
            try {
                const territorioId = tdTerritorios.querySelector('select').value;
                await window.api.designacoes.adicionar(
                    territorioId,
                    item.saida.id,
                    dataDesignacao,
                    dataDevolucao,
                );
                mostrarToast(`Designação aplicada para ${item.saida.nome}`, 'sucesso');
                gerarSugestoes(); // Recarregar sugestões
            } catch (error) {
                mostrarToast(`Erro: ${error.message}`, 'erro');
            }
        };


        tdAcoes.appendChild(btn);

        tr.appendChild(tdSaida);
        tr.appendChild(tdTerritorios);
        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
    });
}

