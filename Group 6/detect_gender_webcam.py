from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os
import matplotlib.pyplot as plt

# Ensure cvlib is imported correctly, or handle gracefully
try:
    import cvlib as cv
except ImportError:
    raise ImportError("cvlib module is not installed. Please install it using 'pip install cvlib'")

# Load the gender detection model
try:
    model = load_model('gender_detection.h5')  # Ensure you save your model as .h5 or .keras
except Exception as e:
    raise ValueError(f"Failed to load the model: {e}")

# Open the webcam
webcam = cv2.VideoCapture(0)

# Check if webcam is available
if not webcam.isOpened():
    raise ValueError("Could not open the webcam.")

# Define the classes for gender detection
classes = ['man', 'woman']

# Create a figure for matplotlib display
plt.ion()  # Enable interactive mode for live updates
fig, ax = plt.subplots()

# Loop through frames
while True:  # Continuous execution
    # Read frame from webcam
    status, frame = webcam.read()
    
    # If unable to capture frame, break the loop
    if not status:
        print("Could not read frame from webcam.")
        break

    # Apply face detection
    face, confidence = cv.detect_face(frame)

    # Loop through detected faces
    for idx, f in enumerate(face):
        # Get corner points of face rectangle        
        (startX, startY) = f[0], f[1]
        (endX, endY) = f[2], f[3]

        # Draw rectangle over the face
        cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)

        # Crop the detected face region
        face_crop = np.copy(frame[startY:endY, startX:endX])

        # Ignore small face detections to avoid incorrect predictions
        if face_crop.shape[0] < 10 or face_crop.shape[1] < 10:
            continue

        # Preprocess the cropped face for the model
        face_crop = cv2.resize(face_crop, (96, 96))  # Resize to match model input size
        face_crop = face_crop.astype("float") / 255.0  # Normalize pixel values
        face_crop = img_to_array(face_crop)  # Convert to array
        face_crop = np.expand_dims(face_crop, axis=0)  # Expand dimensions for model input

        # Apply gender detection on the face
        conf = model.predict(face_crop)[0]  # Model returns a 2D matrix, get the first row

        # Get label with the maximum confidence
        idx = np.argmax(conf)
        label = classes[idx]

        # Format label with confidence
        label = "{}: {:.2f}%".format(label, conf[idx] * 100)

        # Position the label on the frame
        Y = startY - 10 if startY - 10 > 10 else startY + 10

        # Write the label and confidence above the face rectangle
        cv2.putText(frame, label, (startX, Y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    # Convert the frame from BGR to RGB (since matplotlib uses RGB)
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Display the frame using matplotlib
    ax.clear()  # Clear the previous image
    ax.imshow(frame_rgb)
    plt.axis('off')  # Turn off the axis
    plt.pause(0.001)  # Brief pause to allow the frame to update

    # Check for exit condition (press 'CTRL + C' in terminal)
    if plt.waitforbuttonpress(timeout=0.1):
        break

# Release the webcam and close all windows
webcam.release()
plt.close()
