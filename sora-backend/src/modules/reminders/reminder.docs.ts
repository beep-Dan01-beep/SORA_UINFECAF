/**
 * @swagger
 * tags:
 *   name: Lembretes
 *   description: Lembretes domésticos
 * /api/reminders:
 *   get:
 *     summary: Lista lembretes; aceita filtro opcional user_id
 *     tags: [Lembretes]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de lembretes }
 *   post:
 *     summary: Cria lembrete
 *     tags: [Lembretes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReminderInput' }
 *     responses:
 *       201: { description: Lembrete criado }
 * /api/reminders/{id}:
 *   get:
 *     summary: Consulta lembrete
 *     tags: [Lembretes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lembrete encontrado }
 *   put:
 *     summary: Atualiza lembrete
 *     tags: [Lembretes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReminderInput' }
 *     responses:
 *       200: { description: Lembrete atualizado }
 *   delete:
 *     summary: Exclui lembrete
 *     tags: [Lembretes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Lembrete excluído }
 */
export {};
