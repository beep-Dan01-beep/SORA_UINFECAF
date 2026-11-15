/**
 * @swagger
 * tags:
 *   name: Inteligência
 *   description: Funcionalidades de Machine Learning
 * /api/intelligence/classify-task:
 *   post:
 *     summary: Classifica uma tarefa usando Scikit-learn
 *     tags: [Inteligência]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description]
 *             properties:
 *               description: { type: string, example: "Preparar o almoço e lavar a louça" }
 *     responses:
 *       200:
 *         description: Categoria prevista e confiança do modelo
 */
export {};
