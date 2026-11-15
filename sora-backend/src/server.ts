import app from "./app";
import { env } from "./config/env";
import { prisma } from "./database/prisma";

async function startServer() {
  try {
    await prisma.$connect();
    app.listen(env.port, () => {
      console.log(`SORA API executando em http://localhost:${env.port}`);
      console.log(`Swagger: http://localhost:${env.port}/api-docs`);
    });
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
    process.exit(1);
  }
}

void startServer();

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
