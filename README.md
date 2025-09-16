# Territory Manager

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node >= 18](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Languages](https://img.shields.io/github/languages/top/leocosta1/territory-manager-vite)](https://github.com/leocosta1/territory-manager-vite/search?l=typescript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

Gerencie territórios, saídas e designações de forma offline.

## Descrição
Aplicação SPA para organizar **Territórios**, **Saídas de Campo**, **Designações** e **Sugestões**. Tudo salvo localmente no `IndexedDB` (via [Dexie.js](https://dexie.org)), sem necessidade de backend.

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

Para habilitar a comunicação com um backend de notificações, configure também:

```bash
VITE_NOTIFICATIONS_API_URL="https://sua-api.com"
```

Quando essa variável não estiver definida, as notificações de devolução permanecerão apenas no modo offline.

## Screenshots

Adicione imagens em `docs/screenshots/` com os nomes abaixo (ou ajuste os caminhos conforme preferir):

![Territorios](docs/screenshots/territorios.png)
![Sugestoes](docs/screenshots/sugestoes.png)
![Designacoes](docs/screenshots/designacoes.png)

## Suporte
Abra uma issue no [rastreador de problemas](../../issues) para relatar bugs ou solicitar recursos.

## Contribuição
Contribuições são bem-vindas! Veja as diretrizes em [CONTRIBUTING.md](CONTRIBUTING.md) e o [Código de Conduta](CODE_OF_CONDUCT.md).

## Licença
Distribuído sob a licença [MIT](LICENSE).
