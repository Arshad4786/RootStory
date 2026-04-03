import os
# Suppress TensorFlow informational messages
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import numpy as np
import io

# --- Configuration ---
# Based on your latest test, the model predicts the first position for Ashwagandha.
# We will set the order based on this evidence for now.
CLASS_NAMES = ['Ashwagandha', 'Bhrahmi', 'Tulsi']

# --- Flask App Initialization ---
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing to allow requests from your app
CORS(app)

# --- Load the AI Model ---
try:
    model = keras.models.load_model('herb_classifier_mobilenetv2.keras')
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# --- Image Preprocessing Function ---
def preprocess_image(image_bytes):
    """
    Takes image bytes, resizes the image to 224x224,
    and prepares it for the MobileNetV2 model.
    """
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array / 255.0

# --- API Routes ---
@app.route("/")
def health_check():
    """A simple route to check if the server is running."""
    return "Herb Classifier API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    """
    The main prediction endpoint. It expects a file upload
    with the key 'image'.
    """
    if model is None:
        return jsonify({'error': 'Model is not loaded'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img_bytes = file.read()
        processed_image = preprocess_image(img_bytes)
        prediction = model.predict(processed_image)
        
        predicted_class_index = np.argmax(prediction[0])
        confidence = float(np.max(prediction[0]))
        predicted_herb = CLASS_NAMES[predicted_class_index]

        print(f"Prediction: {predicted_herb} with confidence: {confidence:.2f}")

        # --- THE FIX: Removed the ambiguous logic ---
        # The server will now always return the single highest prediction from the model.
        return jsonify({
            'prediction': predicted_herb,
            'confidence': confidence
        })
        # --- END OF FIX ---

    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return jsonify({'error': 'Failed to process image'}), 500

# --- Testing Route ---
@app.route('/test_predict', methods=['POST'])
def test_predict():
    """
    A temporary debugging endpoint that returns the raw array of probabilities.
    """
    if model is None:
        return jsonify({'error': 'Model is not loaded'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    try:
        img_bytes = file.read()
        processed_image = preprocess_image(img_bytes)
        prediction = model.predict(processed_image)
        raw_probabilities = prediction[0].tolist()
        
        print(f"Raw prediction array: {raw_probabilities}")
        return jsonify({ 'raw_prediction': raw_probabilities })

    except Exception as e:
        print(f"❌ Error during test prediction: {e}")
        return jsonify({'error': 'Failed to process image'}), 500

# --- Start the Server ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

