/**
 * @swagger
 * tags:
 *   name: ChatBot
 *   description: Chatbot local da assistente SORA
 * /api/chat:
 *   post:
 *     summary: Envia uma mensagem para a SORA
 *     tags: [ChatBot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string, example: "Como posso organizar meu dia?" }
 *     responses:
 *       200: { description: Resposta do chatbot local }
 *       400: { description: Mensagem inválida }
 */
export {};
