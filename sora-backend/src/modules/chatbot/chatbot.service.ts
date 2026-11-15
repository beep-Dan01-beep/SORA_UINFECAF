import { AppError } from "../../middlewares/error-handler";

/**
 * Chatbot local da SORA.
 */
type Intent =
  | "pets"
  | "greeting"
  | "identity"
  | "help"
  | "tasks"
  | "reminders"
  | "organization"
  | "thanks"
  | "goodbye"
  | "medical"
  | "security"
  | "unknown";

export class ChatbotService {
  async ask(message: string): Promise<string> {
    const normalizedMessage = this.normalize(message);

    if (!normalizedMessage) {
      throw new AppError("A mensagem não pode ficar vazia.");
    }

    const intent = this.detectIntent(normalizedMessage);
    return this.buildResponse(intent);
  }

  private normalize(message: string): string {
    return message
      .trim()
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  private detectIntent(message: string): Intent {
    const matches = (terms: string[]) =>
      terms.some((term) => message.includes(term));

    if(matches(["animal", "ração", "tosa","bichinho","pet","gato",
       "cachorro","comprar ração","comprar areia","meu bichinho", "bichinho"])){
      return "pets";
    }

    if (matches(["quem e voce", "seu nome", "o que e sora", "o que voce e"])) {
      return "identity";
    }

    if (matches(["oi", "ola", "bom dia", "boa tarde", "boa noite", "e ai", "tudo bem"])) {
      return "greeting";
    }

    if (matches(["ajuda", "o que voce faz", "como funciona", "comandos", "suas funcoes"])) {
      return "help";
    }

    if (matches(["tarefa", "tarefas", "atividade", "atividades", "limpar", "organizar a casa"])) {
      return "tasks";
    }

    if (matches(["lembrar","lembre","lembrete", "lembretes", "me lembrar", "lembrar de", "alarme", "horario"])) {
      return "reminders";
    }

    if (matches(["organizar","organizar meu dia", "organizar o dia", "rotina", "planejar meu dia", "planejamento"])) {
      return "organization";
    }

    if (matches(["obrigado", "obrigada", "valeu", "agradeco", "agradeço"])) {
      return "thanks";
    }

    if (matches(["tchau", "ate mais", "ate logo", "falou"])) {
      return "goodbye";
    }

    if (matches(["remedio", "medicamento", "pressao", "dor", "sintoma", "medico", "saude"])) {
      return "medical";
    }

    if (matches(["perigo", "emergencia", "incendio", "vazamento de gas", "invasao", "assalto"])) {
      return "security";
    }

    return "unknown";
  }

  private buildResponse(intent: Intent): string {
    const responses: Record<Intent, string> = {
      pets:
        "Função para animais ainda não implementada. \n In Developments",
      greeting:
        "Olá! 😊 Eu sou a SORA, sua assistente virtual. Como posso ajudar você hoje?",
      identity:
        "Eu sou a SORA, uma assistente virtual criada para ajudar na organização da rotina, tarefas domésticas e lembretes. Estou aqui para facilitar seu dia!",
      help:
        "Posso ajudar com:\n\n• Organização da rotina e do dia.\n• Ideias para dividir tarefas domésticas.\n• Orientações sobre como organizar lembretes.\n• Dúvidas sobre as funcionalidades da SORA.\n\nExperimente perguntar: “Como posso organizar meu dia?”",
      tasks:
        "Vamos organizar suas tarefas! Uma boa maneira é separar as atividades por prioridade:\n\n1. Urgentes: precisam ser feitas primeiro.\n2. Importantes: devem ser concluídas durante o dia.\n3. Opcionais: podem ficar para depois.\n\nQuais atividades você precisa realizar?",
      reminders:
        "Posso ajudar você a estruturar um lembrete. Diga o que precisa lembrar e em qual dia ou horário.\n\nAtenção: esta conversa não agenda notificações automaticamente. Para isso, utilize a funcionalidade de lembretes do sistema.",
      organization:
        "Vamos montar uma rotina simples! 🌟\n\n1. Comece pelas atividades mais importantes.\n2. Separe horários para alimentação e descanso.\n3. Distribua as tarefas domésticas ao longo do dia.\n4. Reserve um tempo livre para você.\n\nQuais são suas prioridades para hoje?",
      thanks:
        "Por nada! 💙 Fico feliz em ajudar. Quando precisar, é só me chamar.",
      goodbye:
        "Até mais! 💙 Estarei por aqui quando precisar de ajuda.",
      medical:
        "Posso ajudar com informações gerais, mas não substituo um profissional de saúde. Não altere doses nem horários de medicamentos sem orientação médica. Se houver sintomas graves ou uma emergência, procure atendimento imediatamente.",
      security:
        "Sua segurança vem primeiro. Se houver perigo imediato, afaste-se do local se puder fazer isso com segurança e contate os serviços de emergência da sua região. Não tente resolver situações perigosas por conta própria.",
      unknown:
        "Entendi! Ainda estou aprendendo a reconhecer diferentes assuntos. 😊\n\nPosso ajudar com organização da rotina, tarefas domésticas e lembretes. Você pode explicar um pouco melhor o que precisa?"
    };

    return responses[intent];
  }
}
