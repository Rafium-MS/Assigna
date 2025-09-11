# Territory Manager (Vite + React + Tailwind)

Aplicação SPA para gestão de **Territórios**, **Saídas**, **Designações** e **Sugestões** com regras.
Tudo salvo em `localStorage` (sem backend).

## Recursos
- Cadastrar **Territórios** (nome + imagem opcional)
- Cadastrar **Saídas de Campo** (dia da semana, nome, horário)
- **Designações** (território, saída, data de designação e devolução)
- **Sugestões** baseadas em regras (evitar repetição por N meses e duração padrão em dias)

## Como rodar
```bash
# Requisitos: Node 18+
npm i
npm run dev
# abrir http://localhost:5173
```

## Build
```bash
npm run build
npm run preview
```

## Tailwind
Tailwind já está configurado com `darkMode: 'class'`. O botão no topo alterna claro/escuro.
