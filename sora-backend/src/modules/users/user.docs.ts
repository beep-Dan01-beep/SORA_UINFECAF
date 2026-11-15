/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Cadastro de moradores
 * /api/users:
 *   get:
 *     summary: Lista usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *   post:
 *     summary: Cadastra usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuário criado
 * /api/users/{id}:
 *   get:
 *     summary: Consulta usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Usuário encontrado }
 *       404: { description: Usuário não encontrado }
 *   put:
 *     summary: Atualiza usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserInput' }
 *     responses:
 *       200: { description: Usuário atualizado }
 *   delete:
 *     summary: Exclui usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Usuário excluído }
 */
export {};
