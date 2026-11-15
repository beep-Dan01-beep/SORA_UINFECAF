"""
Classificador demonstrativo de tarefas domésticas.
Recebe JSON pela entrada padrão e devolve categoria + confiança em JSON.
O modelo é treinado com exemplos didáticos embutidos; para uso real, amplie
o conjunto de treinamento com exemplos representativos dos usuários.
"""
import json
import sys

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

TRAINING_TEXTS = [
    "lembrar de comprar ração amanha",
    "crie um lembrete para amanha",
    "me de uma rotina para arrumar a sala",
    "quero fazer uma reunião na minha casa",
    "me de uma lista de comidas para comprar no mercado",
    "arrumar guarda roupa",
    "varrer a sala limpar o chão passar pano tirar o pó",
    "lavar a louça limpar banheiro organizar cozinha arrumar quarto",
    "preparar almoço fazer jantar cozinhar café da manhã",
    "regar plantas cuidar do jardim podar flores",
    "comprar mercado buscar pão comprar alimentos farmácia",
    "lavar roupa colocar roupas na máquina estender roupas",
    "pagar conta conferir boleto organizar orçamento",
    "estudar fazer curso ler material estudar programação",
    "levar lixo para fora reciclar separar resíduos",
    "alimentar cachorro passear com cachorro cuidar do gato",
    "limpar janela aspirar tapete higienizar banheiro",
    "fazer lista de compras comprar frutas e verduras",
    "preparar refeição cortar legumes cozinhar arroz",
    "organizar documentos pagar água e energia",
    "dar comida ao animal trocar água do cachorro",
]
TRAINING_LABELS = [
    "limpeza", "jardinagem", "compras",
    "lavanderia", "financeiro", "estudos", "pets",
    "alimentação","organização","lembrete","atividade"
]

def main():
    payload = json.load(sys.stdin)
    description = str(payload.get("description", "")).strip()
    if not description:
        raise ValueError("A descrição não pode ficar vazia.")

    model = Pipeline([
        ("tfidf", TfidfVectorizer(ngram_range=(1, 2), strip_accents="unicode")),
        ("classifier", LogisticRegression(max_iter=1000))
    ])
    model.fit(TRAINING_TEXTS, TRAINING_LABELS)
    prediction = model.predict([description])[0]
    probabilities = model.predict_proba([description])[0]
    confidence = float(max(probabilities))

    print(json.dumps({
        "category": prediction,
        "confidence": round(confidence, 4),
        "note": "Classificação demonstrativa; a confiança depende do pequeno conjunto de exemplos."
    }, ensure_ascii=False))

if __name__ == "__main__":
    main()
