# Guia de Instalação Completo

Este guia detalha todo o processo de configuração do **Territory Manager**, complementando as instruções resumidas do [README](../README.md#instalação). Siga cada etapa para garantir um ambiente de desenvolvimento consistente.

## Pré-requisitos
- [Node.js](https://nodejs.org) \>= 18 (a versão LTS é recomendada).
- `npm` (instalado automaticamente com o Node.js).
- Sistemas operacionais suportados: Windows, macOS ou Linux.

> 💡 Verifique a versão instalada executando `node -v` e `npm -v`. Caso esteja abaixo da versão mínima, atualize o Node.js antes de prosseguir.

## Passo a passo de instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/leocosta1/territory-manager-vite.git
   cd territory-manager-vite
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
   - O comando exibirá a URL (por padrão, `http://localhost:5173`).
   - Abra o endereço no navegador para carregar o aplicativo.

## Funcionamento offline e IndexedDB
- Na primeira execução o aplicativo inicializa o banco local (IndexedDB) usando [Dexie.js](https://dexie.org/).
- Os dados ficam armazenados no dispositivo, permitindo uso offline e sincronização imediata após recarregar a página.
- Se precisar limpar o estado, exclua o banco `territory-manager` no DevTools do navegador (`Application` \> `IndexedDB`).

## Variáveis de ambiente
Não há variáveis obrigatórias para desenvolvimento local. Contudo, para integrar com um backend de notificações configure, em um arquivo `.env` na raiz, a variável opcional:
```bash
VITE_NOTIFICATIONS_API_URL="https://sua-api.com"
```
Quando a variável não estiver definida, as notificações de devolução permanecerão restritas ao modo offline, conforme descrito no [README](../README.md#configuração).

## Builds de produção
Para gerar os artefatos otimizados, execute:
```bash
npm run build
```
- Os arquivos processados serão gravados em `dist/`.
- Teste o resultado com `npm run preview` se desejar validar localmente.

## Testes automatizados
A suíte de testes utiliza **Vitest** com ambiente **jsdom**.
```bash
npm test
```
Use esse comando sempre que adicionar funcionalidades para garantir que o comportamento se mantenha estável.

## Dicas e solução de problemas
- **Versão do Node incompatível**: atualize para a versão 18 ou superior (verifique com `node -v`).
- **Porta 5173 ocupada**: defina outra porta ao executar `npm run dev -- --port 5174`.
- **Erros ao instalar dependências**: remova `node_modules/` e `package-lock.json`, depois rode `npm install` novamente.
- **IndexedDB corrompido**: limpe o armazenamento local conforme indicado na seção de funcionamento offline e recarregue o app.
- **Variáveis de ambiente não carregam**: confirme o nome do arquivo `.env` e reinicie o servidor de desenvolvimento após alterações.

Para informações adicionais sobre scripts, arquitetura e recursos, consulte o [README principal](../README.md).
