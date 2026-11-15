# SORA Front-end

Interface React + TypeScript + Vite integrada à API REST do projeto SORA.

## Requisitos
- Node.js 18+
- Backend SORA iniciado em `http://localhost:3000`
- PostgreSQL configurado e schema aplicado no backend

## Instalação
```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`:
```env
VITE_API_URL=http://localhost:3000
```

Inicie a interface:
```bash
npm run dev
```
Abra o endereço informado pelo Vite (normalmente `http://localhost:5173`).

## Funcionalidades integradas
- Visão geral com indicadores de tarefas, lembretes e perfis.
- Chat com `POST /api/chat`.
- CRUD de tarefas em `/api/tasks`.
- CRUD de lembretes em `/api/reminders`.
- CRUD de perfis em `/api/users`.
- Classificação de atividades via `POST /api/intelligence/classify-task`.
- Verificação de disponibilidade da API via `GET /health`.

## Importante sobre o backend recebido
O backend não implementa autenticação, execução de comandos em dispositivos físicos, nem disparo automático de notificações. Por isso, a interface não simula login, automação doméstica ou notificações que a API não oferece. O chat depende de `OPENAI_API_KEY` configurada no `.env` do backend. O classificador depende do Python e das dependências listadas em `ml/requirements.txt`.

O seletor de perfil filtra tarefas e lembretes no front-end. As consultas globais continuam disponíveis na API. Ao cadastrar tarefas/lembretes, a interface envia o `user_id` selecionado, conforme os DTOs do backend.
