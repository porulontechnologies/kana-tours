# Module 9: Computer Vision - Exercises

---

## BEGINNER EXERCISES

### Exercise 1: How Computers See Images (Pixel Grid Exercise)

**Objective:** Understand that images are just grids of numbers (pixels).

**Instructions:**

Below is a simplified 8x8 pixel grid. Each number represents a brightness value from 0 (black) to 9 (white). Shade the grid on paper using the numbers as a guide to reveal the hidden image.

```
0 0 0 9 9 0 0 0
0 0 9 9 9 9 0 0
0 9 9 9 9 9 9 0
9 9 9 9 9 9 9 9
9 9 9 9 9 9 9 9
0 9 9 9 9 9 9 0
0 0 9 9 9 9 0 0
0 0 0 9 9 0 0 0
```

**Tasks:**
1. On graph paper, shade each cell: 0 = fully black, 9 = fully white (leave blank)
2. What shape do you see?
3. Now create your OWN 8x8 pixel art using numbers 0-9 (try a heart, star, or letter)
4. How many pixels are in this image? How many pixels are in a 1920x1080 HD image?

**Solution:**

1. When shaded correctly, the pattern reveals a **diamond/circle shape** (bright center fading to dark edges).
2. The white (9) pixels form a **diamond or circle** shape against a black (0) background.
3. Example heart shape:
```
0 0 0 0 0 0 0 0
0 9 9 0 0 9 9 0
9 9 9 9 9 9 9 9
9 9 9 9 9 9 9 9
0 9 9 9 9 9 9 0
0 0 9 9 9 9 0 0
0 0 0 9 9 0 0 0
0 0 0 0 0 0 0 0
```
4. This image has **8 x 8 = 64 pixels**. An HD image has **1920 x 1080 = 2,073,600 pixels** (over 2 million!). This shows why computers need so much processing power for images.

---

### Exercise 2: Identify Computer Vision in Your Daily Life

**Objective:** Recognize CV applications you already use without realizing it.

**Instructions:**

Go through a typical day and list every time you encounter Computer Vision technology. For each one, identify:
- What CV task is being performed?
- What is the input (what does the camera/sensor see)?
- What is the output (what does the system decide/do)?

**Fill in the table:**

| Time of Day | CV Application | CV Task Type | Input | Output |
|-------------|---------------|-------------|-------|--------|
| Morning | ? | ? | ? | ? |
| Commute | ? | ? | ? | ? |
| At work/school | ? | ? | ? | ? |
| Shopping | ? | ? | ? | ? |
| Evening | ? | ? | ? | ? |

**Solution:**

| Time of Day | CV Application | CV Task Type | Input | Output |
|-------------|---------------|-------------|-------|--------|
| Morning | Phone face unlock | Face Recognition | Your face via front camera | Phone unlocked or locked |
| Morning | Instagram/Snapchat filters | Face Detection + AR | Your face via camera | Filters overlaid on face |
| Commute | Google Maps street view | Image Recognition | Street-level photos | Identified addresses/stores |
| At work/school | Document scanner app | OCR | Photo of paper document | Editable digital text |
| Shopping | Barcode/QR scanner | Image Recognition | Barcode image | Product info/website link |
| Shopping | Self-checkout camera | Object Detection | Products on scanner | Identified items + prices |
| Evening | Netflix thumbnails | Image Classification | Movie frames | Personalized preview images |
| Evening | Google Photos search | Image Classification | Your photo library | Photos matching "beach", "dog", etc. |

**Key Insight:** Most people interact with Computer Vision technology 10-20+ times per day without even noticing it!

---

### Exercise 3: Computer Vision Tasks Matching Quiz

**Objective:** Understand the differences between the main CV tasks.

**Instructions:**

Match each scenario (1-10) with the correct CV task type (A-E):

**CV Task Types:**
- **A** - Image Classification
- **B** - Object Detection
- **C** - Face Recognition
- **D** - Image Segmentation
- **E** - OCR (Optical Character Recognition)

**Scenarios:**
1. A phone app that scans a restaurant menu and translates it to English
2. A security system that identifies employees entering a building
3. A self-driving car that finds all pedestrians, cars, and traffic signs in its view
4. A medical AI that looks at an X-ray and says "pneumonia" or "healthy"
5. A photo editing app that separates you from the background for a portrait mode effect
6. Google Photos automatically labeling your pictures as "beach", "food", or "sunset"
7. A parking lot camera that counts how many cars are in each row
8. A banking app that reads the numbers on a check you photograph
9. An airport system that matches your face to your passport photo
10. A satellite system that outlines every building, road, and tree in aerial images

**Solution:**

1. **E - OCR** — Reading text (menu items) from an image and converting to digital text
2. **C - Face Recognition** — Identifying specific individuals from their facial features
3. **B - Object Detection** — Finding AND locating multiple different objects in a scene
4. **A - Image Classification** — Categorizing the entire image into one label (healthy vs. sick)
5. **D - Image Segmentation** — Separating the image pixel-by-pixel into "person" vs. "background"
6. **A - Image Classification** — Assigning a category label to the whole photo
7. **B - Object Detection** — Finding and counting specific objects (cars) and their locations
8. **E - OCR** — Reading printed/handwritten numbers from a photograph
9. **C - Face Recognition** — Matching a face to a known identity in a database
10. **D - Image Segmentation** — Outlining and labeling every object at the pixel level

**Scoring:**
- 9-10 correct: CV Expert!
- 7-8 correct: Great understanding!
- 5-6 correct: Good start, review the task definitions
- Below 5: Re-read Slide 4 and try again

---

## INTERMEDIATE EXERCISES

### Exercise 4: Try Google Lens on Different Objects

**Objective:** Experience real computer vision in action and understand its capabilities and limitations.

**Instructions:**

1. Open the **Google app** on your phone (or go to lens.google.com on desktop)
2. Use Google Lens to scan each of the following objects:

| Object to Scan | What to Try | Record What Happened |
|----------------|-------------|---------------------|
| A plant or flower | Point camera at it | Did it identify the species? |
| A landmark or building | Take a photo | Did it recognize the location? |
| Text in another language | Point at foreign text | Did it translate correctly? |
| A math equation (write one) | Photograph the equation | Did it solve it? |
| A product (shoe, gadget, etc.) | Scan the product | Did it find shopping results? |
| A dog or cat | Point at the animal | Did it identify the breed? |
| A handwritten note | Write something messy | Could it read your handwriting? |

**Questions to Answer:**
1. Which scan was MOST accurate? Why do you think so?
2. Which scan was LEAST accurate? What made it difficult?
3. What CV tasks is Google Lens performing behind the scenes?
4. Can you find something that completely confuses Google Lens?

**Solution:**

**Expected Results:**
- **Plants/flowers:** Usually very accurate for common species. Google Lens uses image classification trained on large botanical databases.
- **Landmarks:** Accurate for famous buildings. Uses image retrieval (matching against a database of known landmarks).
- **Foreign text:** Translation is generally good for printed text; struggles with decorative fonts.
- **Math equations:** Works well for printed equations; struggles with complex handwriting.
- **Products:** Very accurate for popular brands; less accurate for generic items.
- **Animals:** Good at identifying common breeds; may struggle with mixed breeds.
- **Handwriting:** Variable results depending on legibility.

**Answers to Questions:**
1. Products and printed text tend to be most accurate because Google has massive training datasets for these.
2. Handwritten notes and rare plants tend to be least accurate due to high variability in appearance.
3. Google Lens uses: **Image Classification** (identifying what something is), **OCR** (reading text), **Object Detection** (finding items), and **Image Retrieval** (matching to known database entries).
4. Things that confuse it: reflections, abstract art, extreme close-ups, objects partially hidden, very unusual angles.

---

### Exercise 5: Build an Image Classifier with Google Teachable Machine

**Objective:** Train your own image classification model without writing code!

**Instructions:**

1. Go to **https://teachablemachine.withgoogle.com/**
2. Click **"Get Started"** then choose **"Image Project"** then **"Standard image model"**
3. You will build a classifier that distinguishes between 3 hand gestures:

**Step-by-step:**

**Step 1: Create Classes**
- Rename "Class 1" to "Rock" (closed fist)
- Rename "Class 2" to "Paper" (open hand)
- Click "Add a class" and name it "Scissors" (two fingers out)

**Step 2: Record Training Data**
- For each class, click "Webcam" and hold up the gesture
- Record at least **50 samples** per class (hold the gesture and click "Hold to Record")
- Try different angles, distances, and lighting for each gesture

**Step 3: Train the Model**
- Click "Train Model" and wait for it to finish
- This is training a CNN (Convolutional Neural Network)!

**Step 4: Test Your Model**
- In the "Preview" panel, try showing each gesture
- Try tricking it: show a thumbs up, wave, or use the wrong hand

**Questions to Answer:**
1. How accurate is your model for each gesture?
2. What happens when you show a gesture the model hasn't seen (e.g., thumbs up)?
3. What happens when you cover part of your hand?
4. Does it work better with more training samples? Try adding 50 more per class.
5. What if the lighting changes (turn a lamp on/off)?

**Solution:**

**Expected Results:**
1. With 50+ samples per class, accuracy should be **85-95%** for clear gestures directly facing the camera.
2. An unseen gesture will be classified as whichever trained class it looks most similar to (usually with lower confidence). The model does NOT know how to say "I don't know."
3. Partial occlusion reduces accuracy significantly. The model relies on seeing the full hand shape.
4. More samples generally improve accuracy, especially if they include varied angles and positions. Going from 50 to 100 samples per class typically improves accuracy by 5-10%.
5. Lighting changes can reduce accuracy. This is why training with varied lighting is important. If you trained only in bright light, the model may fail in dim light.

**Key Takeaways:**
- You just trained a real CNN (Convolutional Neural Network)!
- More diverse training data = better model
- The model can only recognize what it was trained on
- This is the same core process used by professional CV systems, just on a smaller scale

---

### Exercise 6: Explore Pre-trained Models Online

**Objective:** See how powerful pre-trained CV models are and understand transfer learning.

**Instructions:**

Visit each of these free online CV demos and test them with your own images:

**Demo 1: Object Detection**
- Go to: **https://huggingface.co/spaces** and search for "object detection"
- Upload a photo with multiple objects (e.g., a room, a street scene)
- Record: How many objects were detected? Were any missed?

**Demo 2: Image Classification**
- Go to: **https://huggingface.co/spaces** and search for "image classification"
- Upload 5 different images and record the predictions and confidence scores
- Try: a clear photo, a blurry photo, an unusual angle, a drawing, something abstract

**Demo 3: Image Segmentation**
- Search for "segment anything" on Hugging Face Spaces
- Upload an image and click on different objects
- Record: Does it correctly outline each object you click?

**Questions:**
1. Which model was most impressive? Why?
2. What types of images were hardest for the models?
3. What is the "confidence score" and why does it matter?
4. These models were pre-trained on millions of images. How does that help?

**Solution:**

1. **Answers will vary**, but object detection models (like YOLO-based demos) tend to be most impressive because they can identify AND locate many objects simultaneously in real-time.

2. **Hardest images for models:**
   - Very close-up or zoomed-in images (missing context)
   - Artistic or stylized images (trained mostly on photographs)
   - Images with unusual lighting (very dark, overexposed)
   - Objects rarely seen in training data (uncommon items)
   - Ambiguous images (is it a muffin or a chihuahua?)

3. **Confidence score** is a percentage (0-100%) indicating how certain the model is about its prediction. High confidence (>90%) means the model is very sure. Low confidence (<50%) means it is guessing. This matters because in critical applications (medical, self-driving), you only want to trust high-confidence predictions.

4. **Pre-training on millions of images** means the model has already learned to recognize general visual features (edges, textures, shapes, patterns). When applied to a new task, it already knows "how to see" and only needs to learn the specific differences for the new task. This is called **Transfer Learning** and it dramatically reduces the data and time needed to build effective CV models.

---

## ADVANCED EXERCISES

### Exercise 7: Python OpenCV Basics (Load, Display, and Edit Images)

**Objective:** Get hands-on with OpenCV, the most popular computer vision library.

**Prerequisites:** Python 3 installed. Install OpenCV: `pip install opencv-python numpy matplotlib`

**Instructions:**

Create a file called `cv_basics.py` and complete each task:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# ============================================
# TASK 1: Load and display an image
# ============================================
# Download any image from the internet and save it as "test_image.jpg"
# Or use your own photo

# Load the image
img = cv2.imread("test_image.jpg")

# OpenCV loads images in BGR format, convert to RGB for matplotlib
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Display the image
plt.figure(figsize=(10, 6))
plt.imshow(img_rgb)
plt.title("Original Image")
plt.axis("off")
plt.savefig("01_original.png")
plt.show()

# Print image info
print(f"Image shape: {img.shape}")  # (height, width, channels)
print(f"Image size: {img.size} pixels")
print(f"Data type: {img.dtype}")

# ============================================
# TASK 2: Convert to grayscale
# ============================================
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

plt.figure(figsize=(10, 6))
plt.imshow(gray, cmap="gray")
plt.title("Grayscale Image")
plt.axis("off")
plt.savefig("02_grayscale.png")
plt.show()

print(f"Grayscale shape: {gray.shape}")  # Notice: only 2 dimensions now!

# ============================================
# TASK 3: Resize the image
# ============================================
# Resize to 50% of original size
height, width = img.shape[:2]
resized = cv2.resize(img, (width // 2, height // 2))

resized_rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
plt.figure(figsize=(10, 6))
plt.imshow(resized_rgb)
plt.title(f"Resized: {resized.shape[1]}x{resized.shape[0]}")
plt.axis("off")
plt.savefig("03_resized.png")
plt.show()

# ============================================
# TASK 4: Crop a region
# ============================================
# Crop the center quarter of the image
h, w = img.shape[:2]
cropped = img[h//4:3*h//4, w//4:3*w//4]

cropped_rgb = cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB)
plt.figure(figsize=(10, 6))
plt.imshow(cropped_rgb)
plt.title("Cropped Center")
plt.axis("off")
plt.savefig("04_cropped.png")
plt.show()

# ============================================
# TASK 5: Draw on the image
# ============================================
canvas = img.copy()

# Draw a rectangle (top-left corner, bottom-right corner, color BGR, thickness)
cv2.rectangle(canvas, (50, 50), (300, 200), (0, 255, 0), 3)

# Draw a circle (center, radius, color BGR, thickness)
cv2.circle(canvas, (width // 2, height // 2), 100, (0, 0, 255), 3)

# Add text
cv2.putText(canvas, "Hello Computer Vision!", (50, height - 50),
            cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 0), 3)

canvas_rgb = cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB)
plt.figure(figsize=(10, 6))
plt.imshow(canvas_rgb)
plt.title("Drawing on Image")
plt.axis("off")
plt.savefig("05_drawing.png")
plt.show()

# ============================================
# TASK 6: Apply filters (blur, sharpen)
# ============================================
# Gaussian blur
blurred = cv2.GaussianBlur(img, (15, 15), 0)

# Sharpening kernel
sharpen_kernel = np.array([[ 0, -1,  0],
                           [-1,  5, -1],
                           [ 0, -1,  0]])
sharpened = cv2.filter2D(img, -1, sharpen_kernel)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0].set_title("Original")
axes[0].axis("off")
axes[1].imshow(cv2.cvtColor(blurred, cv2.COLOR_BGR2RGB))
axes[1].set_title("Blurred (Gaussian)")
axes[1].axis("off")
axes[2].imshow(cv2.cvtColor(sharpened, cv2.COLOR_BGR2RGB))
axes[2].set_title("Sharpened")
axes[2].axis("off")
plt.savefig("06_filters.png")
plt.show()

print("\nAll tasks completed! Check the saved images.")
```

**Questions to Answer:**
1. What does `img.shape` return and what do the three numbers mean?
2. Why does the grayscale image have only 2 dimensions instead of 3?
3. What happens if you change the blur kernel from (15, 15) to (3, 3)? To (51, 51)?
4. What does the sharpening kernel do mathematically?

**Solution:**

1. `img.shape` returns `(height, width, channels)`. For example, `(1080, 1920, 3)` means 1080 pixels tall, 1920 pixels wide, and 3 color channels (Blue, Green, Red in OpenCV's BGR format).

2. Grayscale has only 2 dimensions `(height, width)` because there is only ONE brightness value per pixel instead of three color values. Color images need 3 channels (R, G, B), but grayscale only needs 1 value (0=black to 255=white).

3. **Blur kernel size effects:**
   - `(3, 3)` — Very slight blur, barely noticeable
   - `(15, 15)` — Moderate blur, smooths out details
   - `(51, 51)` — Very heavy blur, image looks foggy
   - The larger the kernel, the more neighboring pixels are averaged together, creating a stronger blur effect.
   - The kernel size must be odd numbers.

4. The sharpening kernel works by **emphasizing the center pixel and subtracting its neighbors**. The center value (5) amplifies the current pixel, while the -1 values subtract the surrounding pixels. This enhances edges and details because edges are where pixel values change rapidly. Mathematically, it is the identity matrix plus a Laplacian edge detector.

---

### Exercise 8: Build an Image Classifier with Keras (Cats vs Dogs)

**Objective:** Build and train a CNN (Convolutional Neural Network) for image classification.

**Prerequisites:** `pip install tensorflow matplotlib numpy`

**Instructions:**

Create a file called `cats_vs_dogs.py`:

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt
import numpy as np

# ============================================
# STEP 1: Load the dataset
# ============================================
# We will use the built-in "cats_vs_dogs" dataset
# Download a small subset for faster training

import tensorflow_datasets as tfds

# If tensorflow_datasets is not installed: pip install tensorflow-datasets
# This downloads ~800MB the first time

# Alternative: Use CIFAR-10 (smaller, faster) for practice
# We will use CIFAR-10 and focus on 2 classes (cats=3, dogs=5)

(x_train_full, y_train_full), (x_test_full, y_test_full) = keras.datasets.cifar10.load_data()

# Filter for cats (label 3) and dogs (label 5) only
cat_label, dog_label = 3, 5

# Training data
train_mask = np.isin(y_train_full.flatten(), [cat_label, dog_label])
x_train = x_train_full[train_mask]
y_train = y_train_full[train_mask]
y_train = (y_train == dog_label).astype(np.float32).flatten()  # 0=cat, 1=dog

# Test data
test_mask = np.isin(y_test_full.flatten(), [cat_label, dog_label])
x_test = x_test_full[test_mask]
y_test = y_test_full[test_mask]
y_test = (y_test == dog_label).astype(np.float32).flatten()  # 0=cat, 1=dog

# Normalize pixel values to 0-1
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

print(f"Training images: {x_train.shape[0]}")
print(f"Test images: {x_test.shape[0]}")
print(f"Image shape: {x_train.shape[1:]}")

# ============================================
# STEP 2: Visualize some samples
# ============================================
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i in range(5):
    axes[0, i].imshow(x_train[y_train == 0][i])
    axes[0, i].set_title("Cat")
    axes[0, i].axis("off")
    axes[1, i].imshow(x_train[y_train == 1][i])
    axes[1, i].set_title("Dog")
    axes[1, i].axis("off")
plt.suptitle("Sample Training Images (32x32 pixels)")
plt.savefig("samples.png")
plt.show()

# ============================================
# STEP 3: Build the CNN model
# ============================================
model = keras.Sequential([
    # First convolutional block
    layers.Conv2D(32, (3, 3), activation="relu", input_shape=(32, 32, 3)),
    layers.MaxPooling2D((2, 2)),

    # Second convolutional block
    layers.Conv2D(64, (3, 3), activation="relu"),
    layers.MaxPooling2D((2, 2)),

    # Third convolutional block
    layers.Conv2D(64, (3, 3), activation="relu"),

    # Flatten and classify
    layers.Flatten(),
    layers.Dense(64, activation="relu"),
    layers.Dropout(0.5),
    layers.Dense(1, activation="sigmoid"),  # Binary: cat or dog
])

model.summary()

# ============================================
# STEP 4: Compile and train
# ============================================
model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"],
)

history = model.fit(
    x_train, y_train,
    epochs=15,
    batch_size=32,
    validation_split=0.2,
    verbose=1,
)

# ============================================
# STEP 5: Evaluate the model
# ============================================
test_loss, test_accuracy = model.evaluate(x_test, y_test, verbose=0)
print(f"\nTest Accuracy: {test_accuracy:.2%}")

# ============================================
# STEP 6: Plot training history
# ============================================
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.plot(history.history["accuracy"], label="Training")
ax1.plot(history.history["val_accuracy"], label="Validation")
ax1.set_title("Model Accuracy")
ax1.set_xlabel("Epoch")
ax1.set_ylabel("Accuracy")
ax1.legend()

ax2.plot(history.history["loss"], label="Training")
ax2.plot(history.history["val_loss"], label="Validation")
ax2.set_title("Model Loss")
ax2.set_xlabel("Epoch")
ax2.set_ylabel("Loss")
ax2.legend()

plt.tight_layout()
plt.savefig("training_history.png")
plt.show()

# ============================================
# STEP 7: Make predictions on test images
# ============================================
predictions = model.predict(x_test[:10])

fig, axes = plt.subplots(2, 5, figsize=(15, 6))
for i, ax in enumerate(axes.flatten()):
    ax.imshow(x_test[i])
    pred_label = "Dog" if predictions[i] > 0.5 else "Cat"
    true_label = "Dog" if y_test[i] == 1 else "Cat"
    confidence = predictions[i][0] if predictions[i] > 0.5 else 1 - predictions[i][0]
    color = "green" if pred_label == true_label else "red"
    ax.set_title(f"Pred: {pred_label} ({confidence:.0%})\nTrue: {true_label}", color=color)
    ax.axis("off")

plt.suptitle("Model Predictions (Green=Correct, Red=Wrong)")
plt.savefig("predictions.png")
plt.show()

print("Done! Check the saved images for results.")
```

**Questions to Answer:**
1. What accuracy did your model achieve on the test set?
2. Look at the training history plot. Is the model overfitting? How can you tell?
3. What do the Conv2D layers do? Why do we use multiple convolutional blocks?
4. What does MaxPooling2D do and why is it important?
5. What does Dropout(0.5) do and why do we use it?
6. Why do we use sigmoid activation for the final layer?

**Solution:**

1. **Expected accuracy: 65-75%** on CIFAR-10 cats vs dogs (32x32 pixel images are very small and hard to distinguish). With higher resolution images and more data, accuracy would be much higher (95%+).

2. **Overfitting signs:** If training accuracy keeps climbing but validation accuracy plateaus or drops, the model is overfitting. On the loss plot, overfitting shows as training loss decreasing while validation loss starts increasing. The gap between training and validation curves indicates overfitting severity.

3. **Conv2D layers** apply learnable filters that scan across the image looking for specific patterns:
   - First Conv2D: Learns basic features (edges, corners, color blobs)
   - Second Conv2D: Combines basic features into more complex patterns (eyes, ears, fur texture)
   - Third Conv2D: Learns high-level features (face shapes, body parts)
   - Multiple blocks create a hierarchy from simple to complex features.

4. **MaxPooling2D** reduces the spatial dimensions by taking the maximum value in each small window (2x2). It is important because:
   - Reduces computation (fewer pixels to process)
   - Provides translation invariance (the model recognizes features regardless of exact position)
   - Prevents overfitting by reducing the number of parameters

5. **Dropout(0.5)** randomly deactivates 50% of neurons during each training step. This prevents overfitting by:
   - Forcing the network to not rely on any single neuron
   - Creating an ensemble-like effect (many sub-networks)
   - Acting as regularization to improve generalization

6. **Sigmoid activation** outputs a value between 0 and 1, which is perfect for binary classification. Values close to 0 mean "cat" and values close to 1 mean "dog." We can interpret the output as a probability (e.g., 0.92 = 92% confident it is a dog).

---

### Exercise 9: Edge Detection Experiment

**Objective:** Understand how edge detection works, one of the fundamental building blocks of computer vision.

**Prerequisites:** `pip install opencv-python numpy matplotlib`

**Instructions:**

Create a file called `edge_detection.py`:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load an image (use any image with clear edges - buildings, objects, faces)
img = cv2.imread("test_image.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# ============================================
# METHOD 1: Canny Edge Detection
# ============================================
# Canny is the most popular edge detection algorithm
# It takes two threshold parameters: low and high

edges_low = cv2.Canny(gray, 50, 100)     # Low thresholds = more edges
edges_mid = cv2.Canny(gray, 100, 200)    # Medium thresholds = balanced
edges_high = cv2.Canny(gray, 200, 400)   # High thresholds = fewer edges

fig, axes = plt.subplots(1, 4, figsize=(20, 5))
axes[0].imshow(gray, cmap="gray")
axes[0].set_title("Original (Grayscale)")
axes[0].axis("off")
axes[1].imshow(edges_low, cmap="gray")
axes[1].set_title("Canny (50, 100)\nLow Threshold")
axes[1].axis("off")
axes[2].imshow(edges_mid, cmap="gray")
axes[2].set_title("Canny (100, 200)\nMedium Threshold")
axes[2].axis("off")
axes[3].imshow(edges_high, cmap="gray")
axes[3].set_title("Canny (200, 400)\nHigh Threshold")
axes[3].axis("off")
plt.suptitle("Canny Edge Detection with Different Thresholds")
plt.savefig("edges_canny.png", bbox_inches="tight")
plt.show()

# ============================================
# METHOD 2: Sobel Edge Detection
# ============================================
# Sobel detects edges in X direction, Y direction, or both

sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)  # Vertical edges
sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)  # Horizontal edges
sobel_combined = cv2.magnitude(sobel_x, sobel_y)        # Combined

# Normalize for display
sobel_x_display = np.uint8(np.abs(sobel_x) / np.abs(sobel_x).max() * 255)
sobel_y_display = np.uint8(np.abs(sobel_y) / np.abs(sobel_y).max() * 255)
sobel_combined_display = np.uint8(sobel_combined / sobel_combined.max() * 255)

fig, axes = plt.subplots(1, 4, figsize=(20, 5))
axes[0].imshow(gray, cmap="gray")
axes[0].set_title("Original (Grayscale)")
axes[0].axis("off")
axes[1].imshow(sobel_x_display, cmap="gray")
axes[1].set_title("Sobel X\n(Vertical Edges)")
axes[1].axis("off")
axes[2].imshow(sobel_y_display, cmap="gray")
axes[2].set_title("Sobel Y\n(Horizontal Edges)")
axes[2].axis("off")
axes[3].imshow(sobel_combined_display, cmap="gray")
axes[3].set_title("Sobel Combined\n(All Edges)")
axes[3].axis("off")
plt.suptitle("Sobel Edge Detection")
plt.savefig("edges_sobel.png", bbox_inches="tight")
plt.show()

# ============================================
# METHOD 3: Laplacian Edge Detection
# ============================================
laplacian = cv2.Laplacian(gray, cv2.CV_64F)
laplacian_display = np.uint8(np.abs(laplacian) / np.abs(laplacian).max() * 255)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(gray, cmap="gray")
axes[0].set_title("Original (Grayscale)")
axes[0].axis("off")
axes[1].imshow(laplacian_display, cmap="gray")
axes[1].set_title("Laplacian Edge Detection")
axes[1].axis("off")
axes[2].imshow(edges_mid, cmap="gray")
axes[2].set_title("Canny (for comparison)")
axes[2].axis("off")
plt.suptitle("Laplacian vs Canny")
plt.savefig("edges_laplacian.png", bbox_inches="tight")
plt.show()

# ============================================
# EXPERIMENT: Effect of blur on edge detection
# ============================================
# Pre-blurring removes noise and produces cleaner edges

fig, axes = plt.subplots(2, 3, figsize=(15, 10))

blur_levels = [0, 3, 7]
for i, blur in enumerate(blur_levels):
    if blur > 0:
        blurred = cv2.GaussianBlur(gray, (blur, blur), 0)
    else:
        blurred = gray.copy()

    edges = cv2.Canny(blurred, 100, 200)

    axes[0, i].imshow(blurred, cmap="gray")
    axes[0, i].set_title(f"Blur: {blur}x{blur}" if blur > 0 else "No Blur")
    axes[0, i].axis("off")
    axes[1, i].imshow(edges, cmap="gray")
    axes[1, i].set_title(f"Canny Edges (blur={blur})")
    axes[1, i].axis("off")

plt.suptitle("Effect of Pre-Blurring on Edge Detection")
plt.savefig("edges_blur_experiment.png", bbox_inches="tight")
plt.show()

# ============================================
# BONUS: Contour Detection (finding shapes)
# ============================================
edges = cv2.Canny(gray, 100, 200)
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Draw contours on a copy of the original image
contour_img = img.copy()
cv2.drawContours(contour_img, contours, -1, (0, 255, 0), 2)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
axes[0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0].set_title("Original")
axes[0].axis("off")
axes[1].imshow(cv2.cvtColor(contour_img, cv2.COLOR_BGR2RGB))
axes[1].set_title(f"Detected Contours ({len(contours)} found)")
axes[1].axis("off")
plt.savefig("edges_contours.png", bbox_inches="tight")
plt.show()

print(f"\nTotal contours found: {len(contours)}")
print("All edge detection experiments completed! Check the saved images.")
```

**Questions to Answer:**
1. How do the three Canny threshold settings differ in output? When would you use each?
2. What is the difference between Sobel X and Sobel Y edges? Why are they different?
3. Why does pre-blurring the image before edge detection produce cleaner results?
4. How does Laplacian differ from Canny edge detection?
5. Why is edge detection a fundamental step in computer vision?

**Solution:**

1. **Canny threshold effects:**
   - **Low thresholds (50, 100):** Detects many edges including weak ones and noise. Use when you want to capture every possible edge (e.g., medical imaging where missing an edge could miss a tumor).
   - **Medium thresholds (100, 200):** Balanced detection, captures strong and moderate edges while filtering noise. Best general-purpose setting.
   - **High thresholds (200, 400):** Only the strongest edges survive. Use when you only want major boundaries (e.g., detecting building outlines in aerial imagery).
   - The two thresholds work together via "hysteresis": edges above the high threshold are always kept, edges below the low threshold are always removed, and edges between are kept only if they connect to a strong edge.

2. **Sobel X vs Sobel Y:**
   - **Sobel X** detects **vertical edges** (changes in the horizontal direction). It highlights left-right boundaries because it measures how much pixel values change from left to right.
   - **Sobel Y** detects **horizontal edges** (changes in the vertical direction). It highlights top-bottom boundaries.
   - They are different because each direction has a separate derivative filter. Combining them (magnitude) gives all edges.

3. **Pre-blurring helps** because:
   - Images contain noise (random pixel variations) that look like tiny edges
   - Gaussian blur smooths out this noise while preserving larger, true edges
   - Without blurring, edge detectors produce many false edges from noise
   - The Canny algorithm actually includes a blur step internally, but additional pre-blurring can further reduce noise
   - Too much blur, however, will also remove real fine edges

4. **Laplacian vs Canny:**
   - **Laplacian** uses a second derivative to find edges. It detects all edges at once but is more sensitive to noise and produces thicker, less clean edges.
   - **Canny** uses a multi-step process (Gaussian blur, gradient calculation, non-maximum suppression, hysteresis thresholding) that produces thin, clean, well-connected edges.
   - Canny is generally preferred for most applications because of its cleaner output.

5. **Edge detection is fundamental** because:
   - Edges define the boundaries of objects, which is the first step in understanding what is in an image
   - It reduces data massively: a million-pixel image becomes a few thousand edge pixels
   - It is invariant to brightness changes (edges stay the same in different lighting)
   - Object detection, segmentation, and recognition all build upon edge information
   - CNNs learn edge-like filters in their first layers automatically, mimicking traditional edge detection

---

## Summary

| Level | Exercise | Key Concept |
|-------|----------|-------------|
| Beginner | Pixel Grid Exercise | Images are grids of numbers |
| Beginner | CV in Daily Life | CV is everywhere around us |
| Beginner | Tasks Matching Quiz | Five main CV task types |
| Intermediate | Google Lens | Real CV in action |
| Intermediate | Teachable Machine | Train your own CNN |
| Intermediate | Pre-trained Models | Transfer learning power |
| Advanced | OpenCV Basics | Image manipulation with code |
| Advanced | Cats vs Dogs Classifier | Build and train a CNN |
| Advanced | Edge Detection | Fundamental CV building block |
