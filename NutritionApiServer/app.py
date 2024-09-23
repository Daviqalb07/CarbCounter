import os
import google.generativeai as genai
from flask import Flask, request, jsonify

app = Flask(__name__)

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/", methods=["POST"])
def home():
    data = request.get_json()

    prompt = """
    Você é um especialista em nutrição. Analise a imagem dessa refeição, 
    reconheça os alimentos e estime o conteúdo nutricional de cada um.
    No fim, retorne um JSON no esquema:
    [
        {
            "name": nome do alimento,
            "portion": porção estimada,
            "calories": calorias para a porção (apenas o valor),
            "carbohydrates": carboidratos para a porção (apenas o valor)
        }
    ]
    """
    image_data = {
        "mime_type": "image/png",
        "data": data.get("image")
    }

    response = model.generate_content([prompt, image_data])
    return jsonify(response.text)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=20002)