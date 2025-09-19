# Teste Técnico Fullstack

Este projeto implementa um teste técnico para Desenvolvedor Fullstack Pleno, dividido em duas aplicações principais:

1. **Frontend**: Aplicação Vue.js 3 para listagem de usuários
2. **Backend**: API NestJS para gerenciamento de tarefas

## Estrutura do Projeto

```
liveseo-fullstack-challenge/
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

- Node.js 20.19.5
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

## Tecnologias Utilizadas

### Frontend

- Vue.js 3 com Composition API
- TypeScript
- Vite
- Axios

### Backend

- NestJS
- TypeScript
- TypeORM
- SQLite
- Jest

## Desenvolvimento

O projeto está configurado com:

- ESLint e Prettier para qualidade de código
- TypeScript para tipagem estática
- SQLite para banco de dados

## Testes da API

Para testar as funcionalidades da API, você pode usar o arquivo de collection do Postman disponível na raiz do projeto:

- **`Tasks_API_Postman_Collection.json`** - Collection completa com todas as rotas da API para testes

### Como usar:

1. Abra o Postman
2. Importe o arquivo `Tasks_API_Postman_Collection.json`
3. Certifique-se de que o backend esteja rodando (`npm run start:dev` na pasta backend)
4. Execute as requisições da collection para testar todas as funcionalidades da API

## ⚠️ Nota sobre Arquivos de Ambiente

Os arquivos `.env` foram incluídos propositalmente no repositório para facilitar a execução do teste técnico.

**Em um projeto real de produção, estes arquivos nunca devem ser commitados no Git**, pois contêm informações sensíveis como credenciais de banco de dados, chaves de API, etc.

Para este teste técnico, mantive os arquivos `.env` versionados apenas para simplificar a configuração e execução do projeto.

## 3. Arquitetura e Resolução de Problemas

### Sistema de Gerenciamento de Projetos

#### Modelagem das Tabelas Principais (MySQL)

```sql
-- Tabela de usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    role ENUM('user', 'admin', 'manager', 'developer') DEFAULT 'user' NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active' NOT NULL,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_deleted_at (deleted_at)
    -- Index no email porque para um sistema de autenticação, consultas por email são feitas frequentemente.
    -- Sem índice, a consulta teria que varrer toda a tabela, com indice, vai direto ao registro especifico.
    -- Index no status e deleted_at para consultas de soft delete e filtros de usuários ativos.
);

-- Tabela de projetos
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL, -- quem criou
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('active', 'completed', 'archived') DEFAULT 'active',
    private BOOLEAN DEFAULT FALSE,  -- TRUE = privado, FALSE = público
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    INDEX idx_owner_status (owner_id, status),
    INDEX idx_created_at (created_at),
    INDEX idx_private_status (private, status)
);

-- Tabela de permissões de projeto
CREATE TABLE project_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('owner', 'admin', 'member', 'viewer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_project_user (project_id, user_id),
    INDEX idx_user_role (user_id, role)
);

-- Tabela de tarefas
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    creator_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo', 'in_progress', 'review', 'done') DEFAULT 'todo',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    assigned_to INT,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_project_status (project_id, status),  -- Buscar tasks por projeto e status
    INDEX idx_assigned_to (assigned_to), -- Buscar tasks de um usuário
    INDEX idx_due_date (due_date) -- Buscar tasks por prazo
);

-- Tabela de comentários
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_created (task_id, created_at),
    INDEX idx_user_created (user_id, created_at)
);

-- Logs para para auditoria
CREATE TABLE activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    user_id INT,
    task_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type ENUM('project', 'task', 'comment', 'permission') NOT NULL
    entity_id INT, -- ID da entidade afetada
    payload JSON, -- Dados adicionais da ação
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_project_created (project_id, created_at), -- Logs por projeto ordenados
    INDEX idx_user_created (user_id, created_at), -- Logs por usuário
    INDEX idx_task_created (task_id, created_at), -- Logs por task
    INDEX idx_entity (entity_type, entity_id), -- Logs por entidade específica
    INDEX idx_action (action), -- Logs por tipo de ação
    INDEX idx_created_at (created_at) -- Logs por data
);
```

#### Estrutura do Projeto NestJS

```
src/
├── auth/                  # Autenticação e autorização
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   └── jwt.strategy.ts
├── users/                 # Usuários
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── user.entity.ts
├── projects/              # Projetos
│   ├── projects.module.ts
│   ├── projects.service.ts
│   ├── projects.controller.ts
│   └── project.entity.ts
├── tasks/                 # Tarefas
│   ├── tasks.module.ts
│   ├── tasks.service.ts
│   ├── tasks.controller.ts
│   └── task.entity.ts
├── comments/              # Comentários
│   ├── comments.module.ts
│   ├── comments.service.ts
│   ├── comments.controller.ts
│   └── comment.entity.ts
├── common/                # Código compartilhado
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── guards/
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   └── logging.interceptor.ts
│   ├── dtos/
│   │   └── pagination.dto.ts
│   ├── enums/
│   │   ├── user-role.enum.ts
│   │   └── task-status.enum.ts
│   ├── services/
│   │   └── audit.service.ts
│   └── entities/
│       └── activity-log.entity.ts
├── database/
│   └── database.module.ts
└── app.module.ts
```

#### Como implementaria autenticação e autorização?

Eu implementaria autenticação com JWT.
- O usuário faz login com e-mail/senha, a API valida e retorna um access token.
- Esse token é enviado no Authorization: Bearer ... em cada requisição e validado pelo backend.

Para autorização, usaria dois níveis:

**1.** Roles (ex.: user, manager, admin) para permissões mais amplas.

**2.** Regras de acesso por recurso, por exemplo: um usuário só pode editar um projeto se for o dono ou membro dele.

Isso garante segurança sem complexidade exagerada.

#### Quais práticas adotaria para garantir escalabilidade e manutenção?

Para manter o sistema organizado e preparado para crescer, eu seguiria essas práticas:

- Separar em módulos (auth, users, projects, tasks, comments), facilitando manutenção e testes.

- Usar DTOs e validações para garantir entrada de dados correta.

- Paginação em listagens (projetos, tarefas, comentários) para evitar sobrecarga no banco.

- Boas práticas de banco de dados: uso de chaves estrangeiras e índices para consultas mais usadas.

- Documentação da API com Postman Collection ou Swagger para facilitar integração de outros times


#### Como resolveria problemas de performance em consultas que envolvem relacionamentos complexos (ex:listar projetos → tarefas → comentários)?

Em consultas como listar projetos → tarefas → comentários, eu cuidaria para evitar o problema de N+1 queries.

- Usaria joins ou eager loading (carregar em lote) em vez de buscar cada relação separadamente.

- Aplicaria paginação nos comentários e tarefas para não trazer tudo de uma vez.

- Criaria índices nos campos mais usados em filtros, como project_id em tarefas e task_id em comentários.

Se em algum caso ainda houvesse lentidão, poderia usar contagens via subquery ou caching simples (ex.: Redis) para resultados mais acessados, mas sem complicar demais.