# Assigna
Gerencie territórios, saídas e designações de forma offline.

## Descrição
Aplicação SPA para organizar **Territórios**, **Saídas de Campo**, **Designações** e **Sugestões**. Tudo salvo localmente em `localStorage`, sem necessidade de backend.

### Principais Recursos
- Cadastrar **Territórios** (nome e imagem opcional)
- Cadastrar **Saídas de Campo** (dia da semana, nome e horário)
- Registrar **Designações** (território, saída, datas de designação e devolução)
- Gerar **Sugestões** evitando repetição por N meses e com duração padrão em dias

## Requisitos
- [Node.js](https://nodejs.org) \>= 18
- Windows, macOS ou Linux
- Dependências-chave: React, Vite e Tailwind CSS

## Instalação
1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Inicie o servidor de desenvolvimento usando `npm run dev`.

Para um passo a passo completo, consulte o [guia de instalação](docs/installation.md).

## Uso
```bash
npm run dev
# abra http://localhost:5173 no navegador
```
Resultado esperado: a aplicação carregará no navegador permitindo gerenciar territórios e designações.

## Configuração
Atualmente não há variáveis de ambiente obrigatórias. Caso precise, crie um arquivo `.env` e defina variáveis como:
```bash
EXAMPLE_API_KEY="sua_chave_aqui"
```

## Suporte
Abra uma issue no [rastreador de problemas](../../issues) para relatar bugs ou solicitar recursos.

## Contribuição
Contribuições são bem-vindas! Veja as diretrizes em [CONTRIBUTING.md](CONTRIBUTING.md) e o [Código de Conduta](CODE_OF_CONDUCT.md).

## Licença
Distribuído sob a licença [MIT](LICENSE).
