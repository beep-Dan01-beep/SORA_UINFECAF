/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Atividades dos moradores
 * /api/tasks:
 *   get:
 *     summary: Lista tarefas; aceita filtro opcional user_id
 *     tags: [Tarefas]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de tarefas }
 *   post:
 *     summary: Cria tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/TaskInput' }
 *     responses:
 *       201: { description: Tarefa criada }
 * /api/tasks/{id}:
 *   get:
 *     summary: Consulta tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Tarefa encontrada }
 *       404: { description: Não encontrada }
 *   put:
 *     summary: Atualiza tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/TaskInput' }
 *     responses:
 *       200: { description: Tarefa atualizada }
 *   delete:
 *     summary: Exclui tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Tarefa excluída }
 */
export {};
