# SORA Backend

API RESTful da assistente doméstica SORA, desenvolvida com TypeScript, Node.js, Express e Prisma ORM. O banco padrão desta versão é SQLite, portanto não é necessário instalar ou manter um servidor PostgreSQL.

## Tecnologias

- Node.js + TypeScript
- Express
- Prisma ORM + SQLite
- Swagger / OpenAPI
- Chatbot local baseado em reconhecimento de intenções (sem serviços externos)
- Python + Scikit-learn para classificação demonstrativa de tarefas

## Pré-requisitos

- Node.js 18 ou superior
- Python 3.10 ou superior (para a rota de Machine Learning)

## 1. Instalar dependências

Na pasta `sora-backend`:

```bash
npm install
```

## 2. Configurar o banco SQLite com Prisma

Copie `.env.example` para `.env`. A configuração padrão usa um arquivo SQLite local:

```env
DATABASE_URL="file:./dev.db"
```

Gere o Prisma Client e crie/aplique a primeira migração:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

O arquivo do banco será criado em `prisma/dev.db`. Para visualizar e editar os dados:

```bash
npx prisma studio
```

Não é necessário instalar PostgreSQL, pgAdmin ou executar scripts SQL manualmente.

## 3. Configurar variáveis de ambiente

No `.env`, ajuste `PORT` e, se necessário, `PYTHON_BIN`. O ChatBot funciona localmente e não exige chave de API nem conexão com serviços externos.

No Windows, se `python` não funcionar, tente `py` ou o caminho completo do executável em `PYTHON_BIN`.

## 4. Instalar dependências do Machine Learning

```bash
python -m pip install -r ml/requirements.txt
```

No Windows, caso use o inicializador `py`:

```bash
py -m pip install -r ml/requirements.txt
```

O endpoint de ML chama o script Python localmente. A classificação incluída é uma demonstração acadêmica com um conjunto pequeno de exemplos; ela não deve ser tratada como previsão confiável em ambiente real.

## 5. Executar

Modo desenvolvimento:

```bash
npm run dev
```

Compilar e executar:

```bash
npm run build
npm start
```

A API inicia em `http://localhost:3000`.

- Verificação: `GET http://localhost:3000/health`
- Documentação Swagger: `http://localhost:3000/api-docs`

## Endpoints

### Usuários — `/api/users`

| Método | Rota | Ação |
|---|---|---|
| GET | `/api/users` | Listar usuários |
| GET | `/api/users/:id` | Buscar usuário |
| POST | `/api/users` | Criar usuário |
| PUT | `/api/users/:id` | Atualizar usuário |
| DELETE | `/api/users/:id` | Excluir usuário |

Exemplo de criação:

```json
{
  "name": "Morador",
  "email": "morador@email.com"
}
```

### Tarefas — `/api/tasks`

| Método | Rota | Ação |
|---|---|---|
| GET | `/api/tasks` | Listar tarefas |
| GET | `/api/tasks?user_id=1` | Filtrar tarefas por usuário |
| GET | `/api/tasks/:id` | Buscar tarefa |
| POST | `/api/tasks` | Criar tarefa |
| PUT | `/api/tasks/:id` | Atualizar tarefa |
| DELETE | `/api/tasks/:id` | Excluir tarefa |

Status permitidos: `pending`, `in_progress`, `completed`.

### Lembretes — `/api/reminders`

| Método | Rota | Ação |
|---|---|---|
| GET | `/api/reminders` | Listar lembretes |
| GET | `/api/reminders?user_id=1` | Filtrar lembretes por usuário |
| GET | `/api/reminders/:id` | Buscar lembrete |
| POST | `/api/reminders` | Criar lembrete |
| PUT | `/api/reminders/:id` | Atualizar lembrete |
| DELETE | `/api/reminders/:id` | Excluir lembrete |

### ChatBot — `/api/chat`

`POST /api/chat`, com corpo `{ "message": "O que posso organizar para hoje?" }`. Funciona localmente, sem OpenAI ou chave de API. O chatbot identifica intenções por palavras-chave e responde sobre rotina, tarefas, lembretes, segurança e orientações gerais.

### Machine Learning — `/api/intelligence/classify-task`

`POST /api/intelligence/classify-task`, com corpo `{ "description": "Varrer a sala e limpar o chão" }`. Retorna categoria prevista e confiança do classificador Scikit-learn.

## Organização

- **Controllers:** recebem HTTP e devolvem respostas.
- **Services:** concentram regras de negócio e validações.
- **Repositories:** acessam os dados por meio do Prisma Client.
- **Prisma:** define os modelos e relacionamentos em `prisma/schema.prisma`.
- **Rotas:** conectam endpoints aos controllers.

## Observações

- A exclusão de um usuário remove suas tarefas e lembretes relacionados (`onDelete: Cascade`).
- O status das tarefas é validado pela camada de serviço.
- Esta versão não inclui autenticação, integração com sensores ou notificações automáticas.
