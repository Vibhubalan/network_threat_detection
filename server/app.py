import pandas as pd
from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from playsound import playsound
import threading
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Helper function for safe loading
def safe_load_model(path):
    try:
        return joblib.load(path)
    except Exception as e:
        print(f"Error loading model from {path}: {e}")
        raise


# Define file paths relative to the 'server' directory
BASE_PATH = os.path.join(os.path.dirname(__file__), "../mlModels/")
BEEP_PATH = os.path.join(os.path.dirname(__file__), "../server/beep.mp3")

# Load the pre-trained models
label_encoders = {
    'protocol_type': safe_load_model(os.path.join(BASE_PATH, 'label_encoder_protocol_typev2.pkl')),
    'service': safe_load_model(os.path.join(BASE_PATH, 'label_encoder_servicev2.pkl')),
    'flag': safe_load_model(os.path.join(BASE_PATH, 'label_encoder_flagv2.pkl'))
}

k_best_label = safe_load_model(os.path.join(BASE_PATH, 'selected_features_v2.pkl'))
pipeline = safe_load_model(os.path.join(BASE_PATH, 'pipeline_label_encoded_final_v2.pkl'))  # Model trained on known attacks
anomaly_model = safe_load_model(os.path.join(BASE_PATH, 'ocsvm_80_pipeline.joblib'))       # Model trained on normal data

def play_beep():
    try:
        playsound(BEEP_PATH)
    except Exception as e:
        print(f"Error playing sound: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if "features" not in data:
        return jsonify({'error': 'No features provided'}), 400
    
    df = pd.DataFrame([data["features"]])
    df_layer2 = pd.DataFrame([data["features"]])

    try:
        for column in ['protocol_type', 'service', 'flag']:
            le = label_encoders[column]
            df[column] = le.transform([df[column]])
    except Exception as e:
        return jsonify({'error': f"Error transforming data: {e}"}), 500

    try:
        feats = k_best_label
        df2 = df[feats]
        print(df2.shape)

        # Predict using the pipeline trained on known attacks
        prediction = pipeline.predict(df2)
        print(f"Prediction: {prediction[0]}")
        
        if prediction[0] != "normal":  # Attack detected
            threading.Thread(target=play_beep).start()
            return jsonify({'result': prediction[0]})
        else:
            # Check for anomaly using the second model
            prediction2 = anomaly_model.predict(df_layer2)
            if prediction2[0] == -1:  # Anomaly detected
                threading.Thread(target=play_beep).start()
                return jsonify({'result': 'Anomaly'})
    except Exception as e:
        return jsonify({'error': f"Error making prediction: {e}"}), 500
    
    return jsonify({'result': 'normal'})  # No attack or anomaly detected, return normal

if __name__ == '__main__':
    # Ensure required files exist before starting the server
    required_files = [
        os.path.join(BASE_PATH, 'label_encoder_protocol_typev2.pkl'),
        os.path.join(BASE_PATH, 'label_encoder_servicev2.pkl'),
        os.path.join(BASE_PATH, 'label_encoder_flagv2.pkl'),
        os.path.join(BASE_PATH, 'selected_features_v2.pkl'),
        os.path.join(BASE_PATH, 'pipeline_label_encoded_final_v2.pkl'),
        os.path.join(BASE_PATH, 'ocsvm_80_pipeline.joblib'),
        BEEP_PATH
    ]
    
    missing_files = [file for file in required_files if not os.path.exists(file)]
    if missing_files:
        print(f"Missing required files: {missing_files}")
        exit(1)
    
    app.run(debug=True, port=8080)
