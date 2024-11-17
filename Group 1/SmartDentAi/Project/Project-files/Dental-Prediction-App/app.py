import os
from flask import Flask, request, render_template, redirect, url_for, jsonify
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
from PIL import Image
# from google_chatbot import GoogleGenerativeAI, HarmCategory, HarmBlockThreshold  # Import your chatbot library here


app = Flask(__name__)
UPLOAD_FOLDER = 'static/assets/uploads'
MODEL_PATH_XRAY = 'model/xray_model.h5'
# MODEL_PATH_DENTAL = 'model/my_dental_model.h5'

# Load the trained model
model_xray = load_model(MODEL_PATH_XRAY)
# model_dental = load_model(MODEL_PATH_DENTAL)

#sUMMARY OF THE MODELS
model_xray.summary()
# model_dental.summary()


# Define the allowed extensions for file uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the uploads folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Image preprocessing function
IMG_SIZE = (256, 256)
def preprocess_image(img_path):
# def preprocess_image(img_path, target_size):
    img = Image.open(img_path)
    img = img.resize(IMG_SIZE)
    # img = img.resize(target_size)
    img = np.array(img) / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Home page route for uploading images
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle file upload, prediction, and display everything in one page
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return redirect(url_for('index'))
    
    file = request.files['file']
    
    if file and allowed_file(file.filename):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        
        # Preprocess the image
        # img = preprocess_image(file_path, target_size)

        #********************************Changes here**************************************
        # Determine which model to use (example logic)
        # if file.filename.startswith('xray_'):  # Use your condition here
        #     model = model_xray   # Use the loaded model object
        #     classes = {0: 'Fillings', 1: 'Implant', 2: 'Impacted Tooth', 3: 'Cavity'}
        #     target_size = (128, 128)  # Expected size for x-ray model
        # else:
        #     model = model_dental   # Use the loaded model object
        #     classes = {0: 'Class A', 1: 'Class B'}  # Define classes for the new model
        #     target_size = (256, 256)  # Expected size for dental model

        # Preprocess the image with the correct target size
        img = preprocess_image(file_path)
        # img = preprocess_image(file_path, target_size)
        #***********************************************************************************
        
        # Make prediction
        prediction = model_xray.predict(img)
        predicted_class = np.argmax(prediction)
        
        # Class mapping
        classes = {0: 'Fillings', 1: 'Implant', 2: 'Impacted Tooth', 3: 'Cavity'}
        result = classes[predicted_class]
        
        # Diagnosis information for each predicted class
        diagnosis_info = {
            'Fillings': {
                'symptoms': 'Toothache, sensitivity, pain while chewing, visible holes in teeth.',
                'causes': 'Tooth decay due to plaque build-up and bacterial infections.',
                'treatment': 'The dentist removes decayed material and fills the cavity with a composite material.',
                'precautions': 'Brush and floss daily, avoid sugary foods, and visit the dentist regularly.'
            },
            'Implant': {
                'symptoms': 'Missing tooth, discomfort while eating or speaking.',
                'causes': 'Tooth loss due to decay, injury, or periodontal disease.',
                'treatment': 'A dental implant is surgically placed in the jawbone and acts as a root for a replacement tooth.',
                'precautions': 'Good oral hygiene, avoid smoking, and follow the dentist’s aftercare instructions.'
            },
            'Impacted Tooth': {
                'symptoms': 'Swelling, pain, difficulty opening mouth, bad breath.',
                'causes': 'A tooth that fails to fully erupt due to lack of space or alignment issues.',
                'treatment': 'May require surgical removal or orthodontic treatment.',
                'precautions': 'Regular dental check-ups, good oral hygiene, and timely intervention for wisdom teeth.'
            },
            'Cavity': {
                'symptoms': 'Toothache, sensitivity to hot/cold, visible holes in teeth, bad breath.',
                'causes': 'Plaque build-up leading to acid erosion and tooth decay.',
                'treatment': 'Fillings, crowns, or in severe cases, root canal treatment.',
                'precautions': 'Brush with fluoride toothpaste, reduce sugary food intake, and visit the dentist regularly.'
            }
        }

        # Retrieve diagnosis information for the predicted class
        details = diagnosis_info.get(result, {})

        # Render everything on the same page
        # return render_template('predict.html', prediction=result, details=details, img_path=file_path)
        return render_template('predict.html', prediction=result, details=details, img_path='assets/uploads/' + file.filename)

    
    return redirect(url_for('index'))



@app.route('/api', methods=['POST'])
def api_endpoint():
    try:
        user_input = request.json.get('message')

        if not user_input:
            return jsonify({"error": "No input provided"}), 400

        # Your chatbot generation logic
        genAI = GoogleGenerativeAI('AIzaSyAxt1oBL387GkWkLgpswy6iMINrW4u1xpE')  # Replace with your actual API key
        model = genAI.getGenerativeModel({"model": "gemini-pro"})

        generationConfig = {
            "temperature": 0.9,
            "topK": 1,
            "topP": 1,
            "maxOutputTokens": 1000,
        }

        safetySettings = [
            {
                "category": HarmCategory.HARM_CATEGORY_HARASSMENT,
                "threshold": HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ]

        # Start chat and send message
        chat = model.startChat({
            "generationConfig": generationConfig,
            "safetySettings": safetySettings,
        })

        response = chat.sendMessage(user_input)
        return jsonify({"response": response.text()})

    except Exception as e:
        print(f"Error: {e}")  # Log the error for debugging
        return jsonify({"error": "An error occurred while processing the request."}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5001)
