import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/meal/estimation/nutrition", methods=["POST"])
def nutrition_values():
    request_data = request.get_json()
    food_info = json.dumps(request_data, ensure_ascii=False)
    prompt = f"""
    {food_info}
    Você é um especialista em nutrição. Dado a lista JSON que contém os alimentos e as porções
    retorne um JSON com esses alimentos e a quantidade de carboidratos e calorias das porções indicadas.
    Retorne JSON no esquema pronto para ser serializável, sem nenhum texto a mais:
    [
        {{
            'name': nome do alimento (igual JSON de entrada),
            'portion': porção (igual JSON de entrada),
            'calories': quantidade de calorias calculada (apenas o valor numérico em kcal),
            'carbohydrates': quantidade de carboidratos calculada (apenas o valor numérico em g)
        }}
    ]
    """

    response = model.generate_content(prompt)
    response_json = response.text.replace("json", "").replace("```", "")
    response_data = {"data": json.loads(response_json)}
    return jsonify(response_data)

@app.route("/meal/estimation/portions", methods=["POST"])
def portions_estimation():
    request_data = request.get_json()
    
    prompt = """
    Você é um especialista em nutrição. Analise a imagem dessa refeição, 
    reconheça os alimentos e estime as porções de cada um.
    No fim, retorne um JSON no esquema abaixo, pronto para ser desserializável:
    [
        {
            "name": nome do alimento (em português),
            "portion": porção estimada (unidades em português, se tiver abreviação, abrevia)
        }
    ]
    """
    image_data = {
        "mime_type": "image/png",
        "data": request_data.get("image")
    }

    response = model.generate_content([prompt, image_data])
    response_json = response.text.replace("json", "").replace("```", "")
    response_data = {"data": json.loads(response_json)}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")