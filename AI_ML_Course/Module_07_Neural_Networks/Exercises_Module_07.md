# Module 7 Exercises: Neural Networks & Deep Learning

---

## BEGINNER EXERCISES

---

### Exercise 1: Neural Network Analogy

**Goal:** Understand neural networks through a real-world analogy.

**Instructions:**
A neural network is like a factory assembly line. Read the analogy below and answer the questions.

**The Pizza Factory Analogy:**
Imagine a pizza factory where:
- **Input Layer** = The order desk (receives customer orders: size, toppings, crust type)
- **Hidden Layer 1** = The dough station (prepares the base based on order)
- **Hidden Layer 2** = The topping station (adds ingredients based on the recipe)
- **Hidden Layer 3** = The oven station (bakes at the right temperature and time)
- **Output Layer** = The delivery counter (serves the finished pizza)

**Questions:**

1. In this analogy, what does "training the network" correspond to in the pizza factory?
2. What would happen if you removed Hidden Layer 2 (the topping station)?
3. If a customer complains the pizza is burnt, which "layer" needs adjustment?
4. What are the "weights" in this analogy?
5. Come up with your OWN analogy for a neural network using a different real-world scenario (e.g., a hospital, a school, a music band). Identify the Input, Hidden Layers, and Output.

---

**SOLUTIONS:**

1. **Training** = The period when new employees learn their jobs. They make mistakes at first (burnt pizzas, wrong toppings), but over time they adjust their technique until they consistently produce good pizzas. This is like the network adjusting its weights through many iterations.

2. If you removed Hidden Layer 2 (topping station), the factory would produce plain dough bases -- it could no longer create complex pizzas. Similarly, removing hidden layers reduces a neural network's ability to learn complex patterns.

3. The **oven station (Hidden Layer 3)** needs adjustment -- specifically its temperature and timing parameters (its "weights"). This is like backpropagation adjusting the weights in the layer that caused the error.

4. **Weights** = The specific settings each station uses. For example: how much dough to use per size (dough station), how many grams of each topping (topping station), what temperature and for how long (oven station). These "settings" determine the quality of the output.

5. **Example -- Music Band Analogy:**
   - **Input Layer:** The sheet music/song request from the audience
   - **Hidden Layer 1:** The rhythm section (drums/bass) establishes the foundation
   - **Hidden Layer 2:** The harmony section (guitar/keys) adds chords and texture
   - **Hidden Layer 3:** The melody section (vocals/lead) creates the main theme
   - **Output Layer:** The final sound the audience hears
   - **Weights:** How loud each instrument plays, which notes they emphasize
   - **Training:** Rehearsals where the band adjusts until the song sounds right

---

### Exercise 2: Identify the Layers

**Goal:** Practice identifying Input, Hidden, and Output layers for real scenarios.

**Instructions:**
For each scenario below, identify:
- What the **Input Layer** receives
- What the **Hidden Layers** might detect/process
- What the **Output Layer** produces

**Scenarios:**

**A) Email Spam Filter**
- Input: ???
- Hidden Layers detect: ???
- Output: ???

**B) Face Recognition on Your Phone**
- Input: ???
- Hidden Layers detect: ???
- Output: ???

**C) Music Recommendation (Spotify)**
- Input: ???
- Hidden Layers detect: ???
- Output: ???

**D) Medical X-Ray Analysis**
- Input: ???
- Hidden Layers detect: ???
- Output: ???

**E) Self-Driving Car**
- Input: ???
- Hidden Layers detect: ???
- Output: ???

---

**SOLUTIONS:**

**A) Email Spam Filter**
- **Input:** The email text (words, sender address, subject line, links present, etc.)
- **Hidden Layers detect:** Layer 1 -- word patterns (e.g., "free", "winner", "click now"); Layer 2 -- combinations of suspicious features (many links + urgency words + unknown sender); Layer 3 -- overall spam probability
- **Output:** Classification: "Spam" or "Not Spam"

**B) Face Recognition on Your Phone**
- **Input:** Image pixels (RGB values of every pixel in the photo)
- **Hidden Layers detect:** Layer 1 -- edges and lines; Layer 2 -- shapes (eyes, nose, mouth); Layer 3 -- face structure and proportions; Layer 4 -- identity-specific features
- **Output:** Identity: "This is [Person's Name]" or "Unknown face"

**C) Music Recommendation (Spotify)**
- **Input:** Your listening history (songs played, skipped, liked, time of day, playlist context)
- **Hidden Layers detect:** Layer 1 -- basic audio features (tempo, key, energy); Layer 2 -- genre and mood patterns; Layer 3 -- personal taste profile and context
- **Output:** A ranked list of recommended songs

**D) Medical X-Ray Analysis**
- **Input:** X-ray image pixels
- **Hidden Layers detect:** Layer 1 -- basic shapes and density differences; Layer 2 -- anatomical structures (bones, organs); Layer 3 -- anomalies and irregular patterns
- **Output:** Diagnosis: "Normal" / "Fracture detected" / "Possible pneumonia" with confidence %

**E) Self-Driving Car**
- **Input:** Camera images, LIDAR data, radar data, GPS coordinates, speed
- **Hidden Layers detect:** Layer 1 -- objects (cars, pedestrians, signs, lane markings); Layer 2 -- movement patterns and trajectories; Layer 3 -- risk assessment and path planning
- **Output:** Driving commands: steering angle, acceleration/brake amount

---

### Exercise 3: True or False Quiz

**Goal:** Test your understanding of key neural network concepts.

**Mark each statement as True or False and explain why:**

1. A neural network needs at least one hidden layer to be called "deep learning."
2. Neural networks are modeled after how the human brain works.
3. Every neuron in a neural network receives all inputs and produces all outputs.
4. "Weights" in a neural network are like importance scores for each input.
5. A neural network with more layers can always solve a problem better.
6. Training a neural network means manually setting all the weights by hand.
7. Neural networks need lots of data to train effectively.
8. A CNN (Convolutional Neural Network) is best for processing text data.
9. The activation function decides whether a neuron "fires" or not.
10. Deep learning is a subset of machine learning.

---

**SOLUTIONS:**

1. **FALSE.** "Deep learning" typically refers to neural networks with MULTIPLE hidden layers (usually 3 or more). A single hidden layer is just a regular neural network, sometimes called a "shallow" network.

2. **TRUE.** Neural networks are inspired by biological neurons in the brain. However, they are a simplified mathematical model -- real brains are vastly more complex.

3. **FALSE.** Each neuron receives inputs only from the neurons in the previous layer (or the input data if it is in the first hidden layer). It produces a single output that goes to neurons in the next layer.

4. **TRUE.** Weights determine how much influence each input has on the neuron's output. A higher weight means that input is more "important" for the neuron's decision. These are adjusted during training.

5. **FALSE.** More layers can lead to problems like overfitting (memorizing training data), vanishing gradients (layers stop learning), and much longer training times. Sometimes a simpler model works better. The right number of layers depends on the problem.

6. **FALSE.** Training is an automatic process. The network adjusts its own weights using algorithms like backpropagation and gradient descent. It learns from the data by minimizing errors over many iterations.

7. **TRUE.** Neural networks have many parameters (weights) to learn, so they need large datasets to generalize well. With too little data, they tend to overfit -- memorizing the training examples instead of learning general patterns.

8. **FALSE.** CNNs are designed primarily for image and visual data. They use convolutional filters that detect spatial patterns like edges and textures. For text data, Transformers or RNNs are more appropriate.

9. **TRUE.** The activation function introduces non-linearity and determines the output of a neuron. Common activation functions like ReLU output 0 for negative inputs (neuron doesn't fire) and the input value for positive inputs (neuron fires).

10. **TRUE.** Deep learning is a specific branch of machine learning that uses multi-layered neural networks. Machine learning is, in turn, a subset of artificial intelligence.

---

## INTERMEDIATE EXERCISES

---

### Exercise 4: Draw a Neural Network

**Goal:** Practice designing a neural network architecture for a specific problem.

**Problem:** Design a neural network that predicts whether a student will pass or fail an exam based on these inputs:
- Hours studied (0-50)
- Hours slept the night before (0-12)
- Number of practice tests completed (0-10)
- Attendance percentage (0-100)

**Tasks:**

1. Draw (on paper or digitally) a neural network diagram with:
   - An Input Layer (how many neurons?)
   - At least one Hidden Layer (how many neurons? why?)
   - An Output Layer (how many neurons? what activation function?)

2. For each layer, explain:
   - Why you chose that number of neurons
   - What activation function you would use and why

3. What would "training" this network look like? What data would you need?

4. What would a "weight" represent in this context? Give an example.

---

**SOLUTION:**

**1. Network Architecture:**

```
Input Layer (4 neurons)    Hidden Layer 1 (8 neurons)    Hidden Layer 2 (4 neurons)    Output (1 neuron)
   [Hours Studied]    \         [N1]                  \         [N1]              \
   [Hours Slept]    ----->      [N2]                ----->      [N2]           ----->    [Pass/Fail]
   [Practice Tests]  /          [N3]                  /         [N3]              /
   [Attendance %]   /           [N4]                 /          [N4]             /
                                [N5]
                                [N6]
                                [N7]
                                [N8]
```

**2. Layer explanations:**

- **Input Layer (4 neurons):** One neuron per input feature. Each neuron receives one of the four data points. No activation function needed here -- just raw data.

- **Hidden Layer 1 (8 neurons, ReLU activation):** Roughly 2x the input size is a good starting point. This layer learns basic combinations like "high study hours + high attendance" or "low sleep + few practice tests." ReLU (Rectified Linear Unit) is used because it is computationally efficient and works well in practice.

- **Hidden Layer 2 (4 neurons, ReLU activation):** A smaller layer that combines the patterns from Layer 1 into higher-level features like "well-prepared student" vs. "unprepared student."

- **Output Layer (1 neuron, Sigmoid activation):** One neuron because we have a binary classification (pass/fail). Sigmoid activation outputs a value between 0 and 1, which we interpret as the probability of passing. If > 0.5, predict "Pass"; otherwise, predict "Fail."

**3. Training:**
- **Data needed:** Hundreds (ideally thousands) of past student records with the 4 input features and whether they passed or failed.
- **Process:** Feed each student record through the network, compare the prediction to the actual result, calculate the error (using binary cross-entropy loss), then use backpropagation to adjust all weights. Repeat for many epochs until the network achieves good accuracy.

**4. Weight example:**
A weight connecting "Hours Studied" to a hidden neuron might be 0.8 (high positive value), meaning more study hours strongly increases that neuron's activation. A weight connecting "Hours Slept" to the same neuron might be 0.3, meaning sleep has a moderate positive effect. During training, if the network sees that sleep is actually very important, it would increase that weight.

---

### Exercise 5: TensorFlow Playground (Hands-On)

**Goal:** Experiment with neural networks interactively using a visual tool.

**Instructions:**
Go to **https://playground.tensorflow.org** and complete these experiments.

**Experiment A: Simple Pattern (Circle Dataset)**
1. Select the **circle dataset** (top-left data selector)
2. Start with **1 hidden layer, 2 neurons**
3. Click "Play" and observe. Does it learn the pattern?
4. Now try **1 hidden layer, 4 neurons** -- what changes?
5. Try **2 hidden layers, 4 neurons each** -- any improvement?
6. Write down: What is the minimum configuration that correctly classifies the circle?

**Experiment B: Complex Pattern (Spiral Dataset)**
1. Select the **spiral dataset**
2. Try **1 hidden layer, 2 neurons** -- what happens?
3. Try **1 hidden layer, 8 neurons** -- better?
4. Try **3 hidden layers, 8 neurons each** -- observe the difference
5. Try **4 hidden layers, 8 neurons each** -- does it solve it?
6. What did you learn about "depth" vs. "width"?

**Experiment C: Feature Engineering**
1. Select the **circle dataset**
2. In the "Features" section, turn OFF all features except X1 and X2
3. Try to solve it with 1 hidden layer, 4 neurons
4. Now turn ON the feature X1^2 and X2^2 (squared features)
5. Try again with just 1 hidden layer, 2 neurons. What happens?
6. What does this tell you about feature engineering vs. deeper networks?

---

**SOLUTIONS:**

**Experiment A:**
1-3. With 1 hidden layer and 2 neurons, the network struggles -- it can only create linear boundaries (straight lines), so it cannot properly separate the circular pattern. You may see partial separation or a very rough boundary.
4. With 4 neurons, the network can learn the circle pattern! More neurons allow it to combine multiple linear boundaries into a curved one.
5. With 2 layers of 4 neurons, it learns faster and the boundary is smoother.
6. **Minimum configuration:** 1 hidden layer with 3-4 neurons is typically sufficient for the circle dataset. The key insight is that even simple curved patterns require multiple neurons.

**Experiment B:**
1-2. With 2 neurons, the spiral is impossible -- the network creates only a simple linear split.
3. With 8 neurons in 1 layer, you may see some progress but it cannot fully learn the spiral. The boundary is too complex for a single layer.
4. With 3 layers of 8 neurons, significant improvement! The network starts capturing the spiral pattern, though it may not be perfect.
5. With 4 layers of 8 neurons, it can usually solve the spiral completely.
6. **Key learning:** Complex patterns require DEPTH (more layers), not just WIDTH (more neurons per layer). Deep networks can build hierarchical features -- each layer builds on what the previous layer learned. This is why "deep learning" is powerful for complex problems.

**Experiment C:**
1-4. With only X1 and X2, the network needs multiple neurons and possibly multiple layers to learn the circle.
5. With X1^2 and X2^2 added, the circle becomes trivially separable! Just 1 layer with 2 neurons can solve it, because X1^2 + X2^2 directly describes a circle.
6. **Key learning:** Good feature engineering can make a problem much easier, reducing the need for complex networks. However, one of deep learning's strengths is that it can automatically discover useful features -- essentially doing feature engineering internally. For problems where we cannot easily engineer features (like image recognition), deep networks are essential.

---

### Exercise 6: Match the Neural Network Type

**Goal:** Learn which type of neural network is best for different applications.

**Instructions:**
Match each application to the most appropriate neural network type: **CNN**, **RNN**, **Transformer**, or **GAN**.

| # | Application | NN Type |
|---|-------------|---------|
| 1 | Translating English to Spanish in real-time | ??? |
| 2 | Detecting tumors in MRI scans | ??? |
| 3 | Generating realistic human faces that don't exist | ??? |
| 4 | Predicting the next word as you type on your phone | ??? |
| 5 | Classifying dog breeds from photos | ??? |
| 6 | Generating music in the style of Mozart | ??? |
| 7 | Analyzing stock price patterns over time | ??? |
| 8 | ChatGPT responding to your questions | ??? |
| 9 | Instagram filters that change your face | ??? |
| 10 | Captioning images automatically | ??? |

---

**SOLUTIONS:**

| # | Application | NN Type | Explanation |
|---|-------------|---------|-------------|
| 1 | Translating English to Spanish | **Transformer** | Modern translation uses Transformer architecture (e.g., Google Translate). It can process entire sentences at once with attention mechanisms, understanding context better than RNNs. |
| 2 | Detecting tumors in MRI scans | **CNN** | Medical image analysis is a classic CNN task. The convolutional layers detect spatial patterns like edges, shapes, and textures that indicate abnormalities. |
| 3 | Generating realistic human faces | **GAN** | GANs have a generator and discriminator competing. The generator creates faces, the discriminator judges them. This competition produces photorealistic results (e.g., ThisPersonDoesNotExist.com). |
| 4 | Predicting the next word as you type | **Transformer** | Modern keyboards use Transformer-based models. While RNNs were used historically, Transformers handle language prediction much better due to attention mechanisms. |
| 5 | Classifying dog breeds from photos | **CNN** | Image classification is the quintessential CNN application. Convolutional layers detect breed-specific features like ear shape, fur pattern, and body proportions. |
| 6 | Generating music in the style of Mozart | **GAN** (or **RNN/Transformer**) | GANs can generate music. RNNs are also used since music is sequential data. Transformers are increasingly used for music generation too (e.g., Google's MusicLM). |
| 7 | Analyzing stock price patterns over time | **RNN** (or **Transformer**) | Stock prices are sequential time-series data. RNNs (especially LSTM variants) are designed for sequences. However, Transformers are increasingly used for time-series too. |
| 8 | ChatGPT responding to questions | **Transformer** | ChatGPT is built entirely on the Transformer architecture (GPT = Generative Pre-trained Transformer). It uses self-attention to understand and generate text. |
| 9 | Instagram filters (face changes) | **GAN** | Face filters use GAN-based style transfer. The GAN learns to modify facial features while keeping the image realistic (e.g., aging filters, face swaps). |
| 10 | Captioning images automatically | **CNN + Transformer** (or **CNN + RNN**) | This requires both image understanding (CNN) and language generation (Transformer/RNN). The CNN extracts features from the image, then a language model generates the caption. |

---

## ADVANCED EXERCISES

---

### Exercise 7: Build a Neural Network with Keras/TensorFlow (MNIST Digit Recognition)

**Goal:** Build, train, and evaluate a real neural network that recognizes handwritten digits.

**Prerequisites:** Python with TensorFlow installed (`pip install tensorflow`)

**Instructions:**
Copy and complete the code below. Fill in the sections marked with `# TODO`.

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt

# =============================================
# STEP 1: Load and explore the MNIST dataset
# =============================================
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# TODO 1: Print the shapes of the training and test data
# Expected: x_train shape = (60000, 28, 28), y_train shape = (60000,)
print("Training data shape:", ______)
print("Training labels shape:", ______)
print("Test data shape:", ______)
print("Test labels shape:", ______)

# TODO 2: Display the first 10 images with their labels
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    ax.imshow(______, cmap='gray')  # Show the i-th image
    ax.set_title(f"Label: {______}")  # Show the i-th label
    ax.axis('off')
plt.suptitle("First 10 MNIST Digits", fontsize=16)
plt.tight_layout()
plt.savefig("mnist_samples.png")
plt.show()

# =============================================
# STEP 2: Preprocess the data
# =============================================
# TODO 3: Normalize pixel values from 0-255 to 0-1
x_train = x_train.astype("float32") / ______
x_test = x_test.astype("float32") / ______

# TODO 4: Flatten the 28x28 images into 784-length vectors
x_train_flat = x_train.reshape(______, ______)
x_test_flat = x_test.reshape(______, ______)

print(f"Flattened training shape: {x_train_flat.shape}")

# =============================================
# STEP 3: Build the neural network
# =============================================
model = keras.Sequential([
    # TODO 5: Add an input layer + first hidden layer
    # 128 neurons, ReLU activation, input shape = (784,)
    layers.Dense(______, activation=______, input_shape=(______,)),

    # TODO 6: Add a second hidden layer
    # 64 neurons, ReLU activation
    layers.Dense(______, activation=______),

    # TODO 7: Add the output layer
    # 10 neurons (one per digit 0-9), softmax activation
    layers.Dense(______, activation=______),
])

# Print model summary
model.summary()

# =============================================
# STEP 4: Compile the model
# =============================================
# TODO 8: Compile with optimizer, loss function, and metrics
model.compile(
    optimizer=______,                            # Use 'adam' optimizer
    loss=______,                                 # Use 'sparse_categorical_crossentropy'
    metrics=[______]                             # Track 'accuracy'
)

# =============================================
# STEP 5: Train the model
# =============================================
# TODO 9: Train for 10 epochs with 20% validation split
history = model.fit(
    x_train_flat, y_train,
    epochs=______,
    batch_size=32,
    validation_split=______,
    verbose=1
)

# =============================================
# STEP 6: Evaluate the model
# =============================================
# TODO 10: Evaluate on the test set
test_loss, test_accuracy = model.evaluate(______, ______)
print(f"\nTest Accuracy: {test_accuracy * 100:.2f}%")

# =============================================
# STEP 7: Visualize training history
# =============================================
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Plot accuracy
ax1.plot(history.history['accuracy'], label='Training Accuracy', linewidth=2)
ax1.plot(history.history['val_accuracy'], label='Validation Accuracy', linewidth=2)
ax1.set_title('Model Accuracy Over Epochs', fontsize=14)
ax1.set_xlabel('Epoch')
ax1.set_ylabel('Accuracy')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Plot loss
ax2.plot(history.history['loss'], label='Training Loss', linewidth=2)
ax2.plot(history.history['val_loss'], label='Validation Loss', linewidth=2)
ax2.set_title('Model Loss Over Epochs', fontsize=14)
ax2.set_xlabel('Epoch')
ax2.set_ylabel('Loss')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("training_history.png")
plt.show()

# =============================================
# STEP 8: Make predictions and show results
# =============================================
predictions = model.predict(x_test_flat[:10])

fig, axes = plt.subplots(2, 5, figsize=(14, 6))
for i, ax in enumerate(axes.flat):
    ax.imshow(x_test[i], cmap='gray')
    predicted = np.argmax(predictions[i])
    actual = y_test[i]
    color = 'green' if predicted == actual else 'red'
    ax.set_title(f"Pred: {predicted}\nActual: {actual}", color=color, fontsize=12)
    ax.axis('off')
plt.suptitle("Model Predictions (Green=Correct, Red=Wrong)", fontsize=14)
plt.tight_layout()
plt.savefig("predictions.png")
plt.show()
```

---

**SOLUTION:**

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt

# =============================================
# STEP 1: Load and explore the MNIST dataset
# =============================================
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# TODO 1: Print shapes
print("Training data shape:", x_train.shape)       # (60000, 28, 28)
print("Training labels shape:", y_train.shape)      # (60000,)
print("Test data shape:", x_test.shape)             # (10000, 28, 28)
print("Test labels shape:", y_test.shape)            # (10000,)

# TODO 2: Display first 10 images
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    ax.imshow(x_train[i], cmap='gray')
    ax.set_title(f"Label: {y_train[i]}")
    ax.axis('off')
plt.suptitle("First 10 MNIST Digits", fontsize=16)
plt.tight_layout()
plt.savefig("mnist_samples.png")
plt.show()

# =============================================
# STEP 2: Preprocess the data
# =============================================
# TODO 3: Normalize
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# TODO 4: Flatten
x_train_flat = x_train.reshape(60000, 784)
x_test_flat = x_test.reshape(10000, 784)

print(f"Flattened training shape: {x_train_flat.shape}")

# =============================================
# STEP 3: Build the neural network
# =============================================
model = keras.Sequential([
    # TODO 5: First hidden layer
    layers.Dense(128, activation='relu', input_shape=(784,)),

    # TODO 6: Second hidden layer
    layers.Dense(64, activation='relu'),

    # TODO 7: Output layer
    layers.Dense(10, activation='softmax'),
])

model.summary()

# =============================================
# STEP 4: Compile the model
# =============================================
# TODO 8: Compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# =============================================
# STEP 5: Train the model
# =============================================
# TODO 9: Train
history = model.fit(
    x_train_flat, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# =============================================
# STEP 6: Evaluate
# =============================================
# TODO 10: Evaluate
test_loss, test_accuracy = model.evaluate(x_test_flat, y_test)
print(f"\nTest Accuracy: {test_accuracy * 100:.2f}%")

# =============================================
# STEP 7: Visualize training history
# =============================================
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

ax1.plot(history.history['accuracy'], label='Training Accuracy', linewidth=2)
ax1.plot(history.history['val_accuracy'], label='Validation Accuracy', linewidth=2)
ax1.set_title('Model Accuracy Over Epochs', fontsize=14)
ax1.set_xlabel('Epoch')
ax1.set_ylabel('Accuracy')
ax1.legend()
ax1.grid(True, alpha=0.3)

ax2.plot(history.history['loss'], label='Training Loss', linewidth=2)
ax2.plot(history.history['val_loss'], label='Validation Loss', linewidth=2)
ax2.set_title('Model Loss Over Epochs', fontsize=14)
ax2.set_xlabel('Epoch')
ax2.set_ylabel('Loss')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("training_history.png")
plt.show()

# =============================================
# STEP 8: Predictions
# =============================================
predictions = model.predict(x_test_flat[:10])

fig, axes = plt.subplots(2, 5, figsize=(14, 6))
for i, ax in enumerate(axes.flat):
    ax.imshow(x_test[i], cmap='gray')
    predicted = np.argmax(predictions[i])
    actual = y_test[i]
    color = 'green' if predicted == actual else 'red'
    ax.set_title(f"Pred: {predicted}\nActual: {actual}", color=color, fontsize=12)
    ax.axis('off')
plt.suptitle("Model Predictions (Green=Correct, Red=Wrong)", fontsize=14)
plt.tight_layout()
plt.savefig("predictions.png")
plt.show()
```

**Expected Results:**
- Test accuracy should be approximately **97-98%** with this basic architecture
- The model learns most digits easily but may struggle with certain confusing pairs (e.g., 4 vs 9, 3 vs 8)

---

### Exercise 8: Experiment with Layers and Neurons

**Goal:** Understand how network architecture affects performance.

**Instructions:**
Using the MNIST code from Exercise 7, create and compare these different architectures. Record the test accuracy for each.

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

# Load and preprocess data
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0
x_train_flat = x_train.reshape(-1, 784)
x_test_flat = x_test.reshape(-1, 784)

def build_and_test(name, layer_sizes):
    """Build a model with given hidden layer sizes, train, and return accuracy."""
    print(f"\n{'='*50}")
    print(f"Architecture: {name}")
    print(f"Hidden layers: {layer_sizes}")
    print(f"{'='*50}")

    model_layers = []
    for i, size in enumerate(layer_sizes):
        if i == 0:
            model_layers.append(layers.Dense(size, activation='relu', input_shape=(784,)))
        else:
            model_layers.append(layers.Dense(size, activation='relu'))
    model_layers.append(layers.Dense(10, activation='softmax'))

    model = keras.Sequential(model_layers)
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # Count parameters
    total_params = model.count_params()
    print(f"Total parameters: {total_params:,}")

    history = model.fit(x_train_flat, y_train, epochs=10, batch_size=32,
                        validation_split=0.2, verbose=0)

    test_loss, test_acc = model.evaluate(x_test_flat, y_test, verbose=0)
    print(f"Test Accuracy: {test_acc * 100:.2f}%")

    return test_acc, total_params

# =============================================
# TODO: Test these architectures
# =============================================

results = {}

# Architecture A: Tiny (1 hidden layer, 16 neurons)
results['A_tiny'] = build_and_test("Tiny", [16])

# Architecture B: Small (1 hidden layer, 64 neurons)
results['B_small'] = build_and_test("Small", [64])

# Architecture C: Medium (2 hidden layers, 128 + 64)
results['C_medium'] = build_and_test("Medium", [128, 64])

# Architecture D: Large (3 hidden layers, 256 + 128 + 64)
results['D_large'] = build_and_test("Large", [256, 128, 64])

# Architecture E: Very Wide (1 hidden layer, 512 neurons)
results['E_wide'] = build_and_test("Very Wide", [512])

# Architecture F: Very Deep (5 hidden layers, 64 each)
results['F_deep'] = build_and_test("Very Deep", [64, 64, 64, 64, 64])

# =============================================
# Compare results
# =============================================
print("\n" + "="*60)
print("COMPARISON TABLE")
print("="*60)
print(f"{'Architecture':<20} {'Accuracy':>10} {'Parameters':>12}")
print("-"*42)
for name, (acc, params) in results.items():
    print(f"{name:<20} {acc*100:>9.2f}% {params:>11,}")
```

**Questions to answer after running:**
1. Which architecture achieved the best accuracy?
2. Is the largest model always the best? Why or why not?
3. What is the trade-off between model size and accuracy?
4. Compare "Very Wide" (1 layer, 512) vs "Very Deep" (5 layers, 64 each). Which performed better and why?

---

**SOLUTION:**

**Typical Results (may vary slightly):**

| Architecture | Accuracy | Parameters |
|-------------|----------|------------|
| A_tiny (16) | ~94-95% | ~12,826 |
| B_small (64) | ~97-97.5% | ~50,890 |
| C_medium (128,64) | ~97.5-98% | ~109,386 |
| D_large (256,128,64) | ~97.5-98% | ~237,706 |
| E_wide (512) | ~97.5-98% | ~407,050 |
| F_deep (64x5) | ~97-97.5% | ~71,370 |

**Answers:**

1. **Architecture C or D** typically achieves the best accuracy (~97.5-98%), though the difference from B onwards is small. The medium architecture often hits the sweet spot.

2. **No, the largest model is not always the best.** Architecture D (large) and E (wide) have many more parameters but don't significantly outperform C (medium). Diminishing returns occur because MNIST is a relatively simple problem. Extra capacity may lead to overfitting or simply be unnecessary.

3. **Trade-off:** Larger models take more memory, longer to train, and longer to make predictions, but offer only marginal accuracy improvements past a certain point. The optimal architecture balances accuracy with efficiency. For MNIST, a medium-sized network is sufficient.

4. **"Very Wide" vs "Very Deep":** The wide single-layer network often slightly outperforms the very deep narrow network on MNIST. This is because MNIST patterns are relatively simple and do not need deep hierarchical feature extraction. However, for more complex datasets (like CIFAR-10 with color images), depth typically wins. The deep narrow network also risks vanishing gradients without techniques like batch normalization or residual connections.

---

### Exercise 9: CNN vs Basic Neural Network Comparison

**Goal:** See firsthand why CNNs are better for image tasks.

**Instructions:**
Build both a basic (dense/fully-connected) neural network and a CNN for MNIST, then compare their performance.

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt
import time

# Load data
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# =============================================
# MODEL 1: Basic Dense Neural Network
# =============================================
x_train_flat = x_train.reshape(-1, 784)
x_test_flat = x_test.reshape(-1, 784)

dense_model = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(784,)),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax'),
])

dense_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

print("Training Dense Neural Network...")
start_time = time.time()
dense_history = dense_model.fit(x_train_flat, y_train, epochs=10, batch_size=32,
                                 validation_split=0.2, verbose=1)
dense_time = time.time() - start_time

dense_loss, dense_acc = dense_model.evaluate(x_test_flat, y_test, verbose=0)
print(f"Dense NN - Test Accuracy: {dense_acc*100:.2f}%, Training Time: {dense_time:.1f}s")
print(f"Dense NN - Total Parameters: {dense_model.count_params():,}")

# =============================================
# MODEL 2: Convolutional Neural Network (CNN)
# =============================================
# Reshape for CNN: (samples, height, width, channels)
x_train_cnn = x_train.reshape(-1, 28, 28, 1)
x_test_cnn = x_test.reshape(-1, 28, 28, 1)

cnn_model = keras.Sequential([
    # First Convolutional Block
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),

    # Second Convolutional Block
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),

    # Flatten and Dense layers
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax'),
])

cnn_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

print("\nTraining CNN...")
start_time = time.time()
cnn_history = cnn_model.fit(x_train_cnn, y_train, epochs=10, batch_size=32,
                             validation_split=0.2, verbose=1)
cnn_time = time.time() - start_time

cnn_loss, cnn_acc = cnn_model.evaluate(x_test_cnn, y_test, verbose=0)
print(f"CNN - Test Accuracy: {cnn_acc*100:.2f}%, Training Time: {cnn_time:.1f}s")
print(f"CNN - Total Parameters: {cnn_model.count_params():,}")

# =============================================
# COMPARISON
# =============================================
print("\n" + "="*60)
print("COMPARISON: Dense NN vs CNN")
print("="*60)
print(f"{'Metric':<25} {'Dense NN':>15} {'CNN':>15}")
print("-"*55)
print(f"{'Test Accuracy':<25} {dense_acc*100:>14.2f}% {cnn_acc*100:>14.2f}%")
print(f"{'Training Time':<25} {dense_time:>13.1f}s {cnn_time:>13.1f}s")
print(f"{'Total Parameters':<25} {dense_model.count_params():>15,} {cnn_model.count_params():>15,}")

# Plot comparison
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

axes[0].plot(dense_history.history['val_accuracy'], label='Dense NN', linewidth=2, color='blue')
axes[0].plot(cnn_history.history['val_accuracy'], label='CNN', linewidth=2, color='red')
axes[0].set_title('Validation Accuracy: Dense NN vs CNN', fontsize=14)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Accuracy')
axes[0].legend(fontsize=12)
axes[0].grid(True, alpha=0.3)

axes[1].plot(dense_history.history['val_loss'], label='Dense NN', linewidth=2, color='blue')
axes[1].plot(cnn_history.history['val_loss'], label='CNN', linewidth=2, color='red')
axes[1].set_title('Validation Loss: Dense NN vs CNN', fontsize=14)
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('Loss')
axes[1].legend(fontsize=12)
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("dense_vs_cnn_comparison.png")
plt.show()

# =============================================
# ANALYSIS QUESTIONS
# =============================================
print("\n" + "="*60)
print("ANALYSIS QUESTIONS")
print("="*60)
print("""
1. Which model achieved higher accuracy?
2. Which model trained faster (per epoch)?
3. Which model has fewer parameters?
4. Why does the CNN perform better despite being designed
   for more complex image tasks?
5. For what types of problems would you choose the Dense NN
   over the CNN?
""")
```

---

**SOLUTION:**

**Typical Results:**

| Metric | Dense NN | CNN |
|--------|----------|-----|
| Test Accuracy | ~97.5-98% | ~99-99.3% |
| Training Time | ~30-45s | ~60-120s |
| Total Parameters | ~109,386 | ~34,826 |

**Analysis Answers:**

1. **The CNN achieves higher accuracy** (~99% vs ~97.5%). Even on the relatively simple MNIST dataset, the CNN's advantage is clear. On more complex image datasets, the gap would be much larger.

2. **The Dense NN trains faster per epoch** because it has simpler matrix multiplication operations. CNNs require convolution operations which are more computationally intensive, though they are highly optimized on GPUs.

3. **The CNN has FEWER parameters** despite higher accuracy. This is a key advantage: convolutional layers share weights across the image (the same filter scans the entire image), dramatically reducing parameters compared to dense layers where every pixel connects to every neuron.

4. **Why CNNs are better for images:**
   - **Spatial awareness:** CNNs preserve the 2D structure of images. Dense networks flatten the image to 1D, losing spatial relationships (a pixel's neighbors matter in images).
   - **Translation invariance:** A CNN can recognize a "3" whether it appears in the top-left or bottom-right of the image, because the same filters scan everywhere.
   - **Hierarchical features:** Early layers detect edges, middle layers detect shapes, later layers detect complete digit patterns.
   - **Parameter efficiency:** Weight sharing means fewer parameters to learn, reducing overfitting risk.

5. **When to choose Dense NN over CNN:**
   - Tabular/structured data (spreadsheets, databases) where there is no spatial structure
   - Small datasets where CNN's additional complexity may not help
   - Non-image sequential data (though RNNs or Transformers are often better)
   - Simple classification tasks where inputs are already feature vectors
   - When interpretability is important (dense networks are slightly easier to analyze)

---

## BONUS CHALLENGE

### Challenge: Build a Digit Recognizer with Dropout and Batch Normalization

Take the CNN from Exercise 9 and improve it by adding:
- **Dropout layers** (to prevent overfitting)
- **Batch Normalization** (to stabilize and speed up training)

```python
improved_model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),

    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),

    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.BatchNormalization(),

    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax'),
])
```

**Target:** Achieve 99.3%+ accuracy on the test set. Experiment with the dropout rate (try 0.3, 0.4, 0.5) and see how it affects the gap between training and validation accuracy.

---

*End of Module 7 Exercises*
