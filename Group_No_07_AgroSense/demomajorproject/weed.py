import cv2
import numpy as np
import tensorflow as tf

# Load the trained model
model = tf.keras.models.load_model('weed_detection_model.h5')

# Function to preprocess the image for the model
def preprocess_image(image_path):
    # Load the image
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))  # Resize to the input size of the model
    img = img / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Function to predict if the image contains weeds
def predict_weed(image_path):
    img = preprocess_image(image_path)
    prediction = model.predict(img)

    # Assuming the model outputs two classes: [crops, weeds]
    class_index = np.argmax(prediction)  # Get the index of the predicted class
    class_labels = ['Crops', 'Weeds']  # Adjust as per your dataset
    return class_labels[class_index], prediction[0][class_index]

# Example usage
image_path = 'path_to_your_image.jpg'  # Replace with your image path
predicted_class, confidence = predict_weed(image_path)

print(f"Predicted Class: {predicted_class}, Confidence: {confidence:.2f}")
