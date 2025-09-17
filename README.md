# Fullstack Technical Test

Este projeto implementa um teste técnico para Desenvolvedor Fullstack Pleno, dividido em duas aplicações principais:

1. **Frontend**: Aplicação Vue.js 3 para listagem de usuários
2. **Backend**: API NestJS para gerenciamento de tarefas

## Estrutura do Projeto

```
fullstack-technical-test/
├── frontend/                 # Vue.js 3 Application
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/                  # NestJS API
│   ├── src/
│   ├── package.json
│   ├── nest-cli.json
│   └── tsconfig.json
└── README.md
```

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

## Scripts Disponíveis

### Frontend

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run test` - Executa testes
- `npm run lint` - Executa linting

### Backend

- `npm run start:dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run test` - Executa testes
- `npm run lint` - Executa linting

## Tecnologias Utilizadas

### Frontend

- Vue.js 3 com Composition API
- TypeScript
- Vite
- Axios
- Vitest

### Backend

- NestJS
- TypeScript
- TypeORM
- SQLite (desenvolvimento)
- Jest

## Desenvolvimento

O projeto está configurado com:

- ESLint e Prettier para qualidade de código
- TypeScript para tipagem estática
- Testes unitários configurados
- SQLite para banco de dados (sem necessidade de configuração adicional)

## ⚠️ Nota sobre Arquivos de Ambiente

Os arquivos `.env` foram incluídos propositalmente no repositório para facilitar a execução do teste técnico.

**Em um projeto real de produção, estes arquivos nunca devem ser commitados no Git**, pois contêm informações sensíveis como credenciais de banco de dados, chaves de API, etc.

Para este teste técnico, mantivemos os arquivos `.env` versionados apenas para simplificar a configuração e execução do projeto.
