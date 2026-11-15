import { spawn } from "node:child_process";
import path from "node:path";
import { AppError } from "../../middlewares/error-handler";
import { env } from "../../config/env";

export class IntelligenceService {
  classifyTask(description: string): Promise<{ category: string; confidence: number }> {
    if (!description?.trim()) throw new AppError("Informe a descrição da tarefa.");
    return new Promise((resolve, reject) => {
      const scriptPath = path.resolve(process.cwd(), "ml", "classify_task.py");
      const process = spawn(env.pythonBin, [scriptPath], { stdio: ["pipe", "pipe", "pipe"] });
      let output = "";
      let errorOutput = "";

      process.stdout.setEncoding("utf8");
      process.stderr.setEncoding("utf8");
      process.stdout.on("data", (chunk: string) => output += chunk);
      process.stderr.on("data", (chunk: string) => errorOutput += chunk);
      process.on("error", () => reject(new AppError(
        "Não foi possível iniciar o Python. Verifique PYTHON_BIN e instale as dependências de ml/requirements.txt.", 503
      )));
      process.on("close", (code) => {
        if (code !== 0) {
          reject(new AppError(errorOutput || "Falha na classificação de Machine Learning.", 500));
          return;
        }
        try { resolve(JSON.parse(output)); }
        catch { reject(new AppError("Resposta inválida do módulo de Machine Learning.", 500)); }
      });
      process.stdin.end(JSON.stringify({ description }));
    });
  }
}
