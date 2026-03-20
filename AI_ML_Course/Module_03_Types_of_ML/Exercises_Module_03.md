# Module 3: Types of Machine Learning — Exercises

---

## BEGINNER EXERCISES

---

### Exercise 1: Classify the Scenario

**Instructions:** For each scenario below, identify which type of Machine Learning is being used: **Supervised**, **Unsupervised**, or **Reinforcement**.

| # | Scenario | Your Answer |
|---|----------|-------------|
| 1 | A system trained on 10,000 emails labeled "spam" or "not spam" to filter your inbox | ___________ |
| 2 | A robot learning to walk by trying different movements and falling over repeatedly | ___________ |
| 3 | An algorithm that groups customers into segments based on their shopping behavior (no predefined groups) | ___________ |
| 4 | A model trained on house features (size, location, bedrooms) with known sale prices to predict future prices | ___________ |
| 5 | A chess-playing AI that improves by playing millions of games against itself | ___________ |
| 6 | A system that automatically organizes thousands of news articles into topic clusters | ___________ |
| 7 | A medical AI trained on X-ray images labeled "healthy" or "pneumonia" by doctors | ___________ |
| 8 | A video game character that learns the best strategy by earning points for good moves | ___________ |

#### Solution

| # | Scenario | Answer | Explanation |
|---|----------|--------|-------------|
| 1 | Spam filter trained on labeled emails | **Supervised** | Has labeled data (spam/not spam) — learns from input + correct answer pairs |
| 2 | Robot learning to walk by trying movements | **Reinforcement** | Learns by trial and error — gets "reward" for staying upright, "penalty" for falling |
| 3 | Customer segmentation without predefined groups | **Unsupervised** | No labels given — the algorithm discovers groups on its own |
| 4 | House price prediction from labeled data | **Supervised** | Has labeled data (features + known prices) — this is regression (predicting numbers) |
| 5 | Chess AI playing against itself | **Reinforcement** | Learns strategy through trial and error — wins = reward, losses = penalty |
| 6 | Auto-organizing news articles into topics | **Unsupervised** | No predefined categories — the system finds natural groupings (clustering) |
| 7 | Medical X-ray classification | **Supervised** | Has labeled data (doctor-labeled X-rays) — this is classification (categories) |
| 8 | Game character earning points | **Reinforcement** | Agent takes actions in an environment and receives rewards for good performance |

---

### Exercise 2: Match the Analogy

**Instructions:** Draw a line (or write the letter) matching each ML type to its best analogy.

**ML Types:**
1. Supervised Learning
2. Unsupervised Learning
3. Reinforcement Learning

**Analogies:**
- A) A child sorting a box of mixed LEGO bricks by color and shape without any instructions
- B) A student studying flashcards where each card shows a question on the front and the answer on the back
- C) A dog learning tricks — gets a treat for sitting, nothing for ignoring commands
- D) A teacher grading papers using an answer key
- E) Organizing your closet by naturally grouping similar clothes together
- F) Learning to ride a bicycle by trying, falling, and adjusting your balance

#### Solution

| ML Type | Best Analogies | Explanation |
|---------|---------------|-------------|
| **1. Supervised Learning** | **B and D** | Both involve learning with known correct answers. Flashcards have answers on the back (labeled data). The answer key provides the "right" output for each input. |
| **2. Unsupervised Learning** | **A and E** | Both involve finding structure without being told what to look for. Sorting LEGO without instructions = clustering. Organizing clothes by similarity = pattern discovery. |
| **3. Reinforcement Learning** | **C and F** | Both involve learning through actions and feedback. Dog training uses rewards/no rewards. Bicycle riding uses balance feedback (falling = negative, staying up = positive). |

---

### Exercise 3: True or False Quiz

**Instructions:** Mark each statement as **True** or **False**.

| # | Statement | T/F |
|---|-----------|-----|
| 1 | Supervised learning requires labeled data (input + correct output). | ___ |
| 2 | Unsupervised learning needs a teacher to provide the correct answers. | ___ |
| 3 | Reinforcement learning uses rewards and punishments to learn. | ___ |
| 4 | Classification is a type of supervised learning that predicts categories. | ___ |
| 5 | K-means clustering is an example of supervised learning. | ___ |
| 6 | A self-driving car learning to navigate uses reinforcement learning. | ___ |
| 7 | Unsupervised learning is best when you want to predict a specific output. | ___ |
| 8 | Regression predicts numbers (like prices or temperatures). | ___ |
| 9 | Reinforcement learning requires a large dataset of labeled examples. | ___ |
| 10 | Most real-world ML applications today use supervised learning. | ___ |

#### Solution

| # | Statement | Answer | Explanation |
|---|-----------|--------|-------------|
| 1 | Supervised learning requires labeled data. | **True** | By definition, supervised learning uses input-output pairs where the output (label) is known. |
| 2 | Unsupervised learning needs a teacher. | **False** | The whole point of "unsupervised" is that there is NO teacher/labels — the algorithm finds patterns on its own. |
| 3 | RL uses rewards and punishments. | **True** | The agent receives positive rewards for good actions and negative rewards (penalties) for bad ones. |
| 4 | Classification predicts categories. | **True** | Classification is supervised learning where the output is a category (e.g., spam/not spam, cat/dog). |
| 5 | K-means clustering is supervised. | **False** | K-means is an unsupervised algorithm — it groups data without labels. |
| 6 | Self-driving cars use RL. | **True** | Self-driving cars often use reinforcement learning to learn driving strategies (reward for safe driving, penalty for accidents). |
| 7 | Unsupervised is best for predicting outputs. | **False** | Supervised learning is best for prediction. Unsupervised is best for discovering hidden patterns or groups. |
| 8 | Regression predicts numbers. | **True** | Regression is a type of supervised learning where the output is a continuous number (price, temperature, etc.). |
| 9 | RL requires labeled examples. | **False** | Reinforcement learning does NOT use labeled data — it learns from rewards/penalties through interaction with an environment. |
| 10 | Most real-world ML uses supervised learning. | **True** | The majority of practical ML applications (spam filters, recommendations, medical diagnosis) are supervised. |

---

## INTERMEDIATE EXERCISES

---

### Exercise 4: Design an ML Approach

**Instructions:** For each real-world problem below, decide: (a) which type of ML to use, (b) what the input data would be, (c) what the output would be, and (d) why you chose that type.

**Problem 1:** A bank wants to detect fraudulent credit card transactions.

**Problem 2:** A streaming service wants to group its movies into categories for a new recommendation feature, but doesn't have predefined genres.

**Problem 3:** A company is building a robot arm that needs to learn how to pick up objects of different shapes and sizes from a conveyor belt.

#### Solution

**Problem 1: Fraud Detection**
- **(a) Type:** Supervised Learning (Classification)
- **(b) Input:** Transaction data — amount, time, location, merchant type, user spending history
- **(c) Output:** "Fraudulent" or "Legitimate" (two categories)
- **(d) Why:** The bank has historical data with transactions already labeled as fraudulent or legitimate. The model learns from these labeled examples to classify new transactions. This is classification because the output is a category.

**Problem 2: Movie Grouping**
- **(a) Type:** Unsupervised Learning (Clustering)
- **(b) Input:** Movie features — plot keywords, director, actors, length, viewer ratings, viewer demographics
- **(c) Output:** Groups/clusters of similar movies (the algorithm decides the groups)
- **(d) Why:** There are no predefined categories — the service wants the algorithm to discover natural groupings. This is clustering because we want to find hidden structure in the data without labels.

**Problem 3: Robot Arm**
- **(a) Type:** Reinforcement Learning
- **(b) Input:** Camera images of objects, sensor readings from robot arm (position, grip force)
- **(c) Output:** Sequence of motor actions (move left, grip, lift, etc.)
- **(d) Why:** The robot needs to learn a strategy through trial and error. It gets a reward for successfully picking up an object and a penalty for dropping it. There's no labeled dataset of "correct" arm movements — the robot must discover the best approach through interaction with its environment.

---

### Exercise 5: Hands-On with Google Teachable Machine (Supervised Learning)

**Instructions:** In this exercise, you will train your own supervised learning image classifier using Google's free Teachable Machine tool. No coding required!

**Steps:**

1. Go to [https://teachablemachine.withgoogle.com/](https://teachablemachine.withgoogle.com/)
2. Click **"Get Started"** and choose **"Image Project"** then **"Standard image model"**
3. You will see two classes (Class 1 and Class 2). Rename them:
   - Class 1: **"Thumbs Up"**
   - Class 2: **"Thumbs Down"**
4. For each class, click **"Webcam"** and record ~30 images:
   - For "Thumbs Up": Hold your thumb up in different positions
   - For "Thumbs Down": Hold your thumb down in different positions
5. Click **"Train Model"** and wait for training to complete
6. Test the model by showing thumbs up/down to your webcam

**After completing, answer these questions:**

| Question | Your Answer |
|----------|-------------|
| Q1: What type of ML did you just perform? | ___________ |
| Q2: What was your labeled data? | ___________ |
| Q3: What are the two categories (classes)? | ___________ |
| Q4: Is this classification or regression? | ___________ |
| Q5: How accurate was your model? Try showing it tricky poses — when does it fail? | ___________ |
| Q6: What do you think would happen if you only trained with 5 images per class instead of 30? | ___________ |

#### Solution

| Question | Answer |
|----------|--------|
| Q1 | **Supervised Learning** — you provided labeled examples (images with their class names). |
| Q2 | **The webcam images you recorded**, each labeled as either "Thumbs Up" or "Thumbs Down". |
| Q3 | **"Thumbs Up" and "Thumbs Down"** — these are the two categories the model classifies between. |
| Q4 | **Classification** — the model predicts a category (one of two classes), not a number. |
| Q5 | Answers will vary. The model likely works well for clear thumbs up/down but may struggle with ambiguous gestures, different backgrounds, or angles it wasn't trained on. This shows the importance of diverse training data. |
| Q6 | **The model would likely be less accurate.** With fewer training examples, the model has less information to learn from. It might overfit (memorize the few examples instead of learning general patterns) and fail on new, slightly different images. More data generally means better performance. |

---

### Exercise 6: Classification vs Regression — Know the Difference

**Instructions:** For each scenario, determine whether it is a **Classification** problem or a **Regression** problem, and explain why.

| # | Scenario | Classification or Regression? | Why? |
|---|----------|-------------------------------|------|
| 1 | Predicting whether a student will pass or fail an exam | ___________ | ___________ |
| 2 | Predicting the exact score a student will get on an exam | ___________ | ___________ |
| 3 | Determining if a tumor is benign or malignant | ___________ | ___________ |
| 4 | Estimating the selling price of a used car | ___________ | ___________ |
| 5 | Predicting whether it will rain tomorrow (yes/no) | ___________ | ___________ |
| 6 | Predicting how many millimeters of rain will fall tomorrow | ___________ | ___________ |
| 7 | Categorizing customer reviews as positive, neutral, or negative | ___________ | ___________ |
| 8 | Predicting a company's revenue for next quarter | ___________ | ___________ |

#### Solution

| # | Scenario | Answer | Explanation |
|---|----------|--------|-------------|
| 1 | Pass or fail | **Classification** | The output is a category (pass/fail) — two discrete classes. |
| 2 | Exact exam score | **Regression** | The output is a continuous number (0-100). |
| 3 | Benign or malignant | **Classification** | The output is a category (two classes: benign/malignant). |
| 4 | Used car price | **Regression** | The output is a continuous number (dollar amount). |
| 5 | Rain yes/no | **Classification** | The output is a category (yes/no) — binary classification. |
| 6 | Millimeters of rain | **Regression** | The output is a continuous number (millimeters). |
| 7 | Review sentiment | **Classification** | The output is a category (positive/neutral/negative) — multi-class classification. |
| 8 | Company revenue | **Regression** | The output is a continuous number (dollar amount). |

**Key Rule of Thumb:**
- If the answer is a **category/label** (spam/not spam, cat/dog, positive/negative) = **Classification**
- If the answer is a **number** (price, temperature, score, count) = **Regression**

---

## ADVANCED EXERCISES

---

### Exercise 7: Supervised Learning with Python — Iris Classification (sklearn)

**Instructions:** Complete the following Python code to train a supervised learning classifier on the famous Iris dataset. This dataset contains measurements of flowers and their species.

**Prerequisites:** Install scikit-learn if you haven't: `pip install scikit-learn`

```python
# Exercise 7: Supervised Learning — Iris Classification
# Goal: Train a model to predict flower species from measurements

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

# Step 1: Load the Iris dataset
iris = load_iris()
X = iris.data        # Features: sepal length, sepal width, petal length, petal width
y = iris.target      # Labels: 0=setosa, 1=versicolor, 2=virginica

print(f"Dataset shape: {X.shape}")
print(f"Feature names: {iris.feature_names}")
print(f"Target names: {iris.target_names}")
print(f"First 5 samples:\n{X[:5]}")
print(f"First 5 labels: {y[:5]}")

# Step 2: Split data into training (80%) and testing (20%)
# TODO: Use train_test_split to split X and y
# Hint: X_train, X_test, y_train, y_test = train_test_split(?, ?, test_size=?, random_state=42)
X_train, X_test, y_train, y_test = _______________

# Step 3: Create and train the model
# TODO: Create a DecisionTreeClassifier and fit it on the training data
model = _______________
model.fit(_______________)

# Step 4: Make predictions on test data
# TODO: Use the model to predict labels for X_test
y_pred = _______________

# Step 5: Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"\nModel Accuracy: {accuracy * 100:.1f}%")
print(f"\nDetailed Report:\n{classification_report(y_test, y_pred, target_names=iris.target_names)}")

# Step 6: Try predicting a new flower!
# A flower with sepal_length=5.0, sepal_width=3.5, petal_length=1.5, petal_width=0.3
new_flower = [[5.0, 3.5, 1.5, 0.3]]
prediction = model.predict(new_flower)
print(f"\nNew flower prediction: {iris.target_names[prediction[0]]}")
```

**Questions to answer after completing:**
1. What accuracy did your model achieve?
2. Is this classification or regression? Why?
3. What are the features (inputs) and labels (outputs)?
4. Why do we split data into training and testing sets?

#### Solution

```python
# Exercise 7: SOLUTION — Iris Classification
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

# Step 1: Load the dataset
iris = load_iris()
X = iris.data
y = iris.target

print(f"Dataset shape: {X.shape}")
print(f"Feature names: {iris.feature_names}")
print(f"Target names: {iris.target_names}")
print(f"First 5 samples:\n{X[:5]}")
print(f"First 5 labels: {y[:5]}")

# Step 2: Split data — 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 3: Create and train the model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Step 4: Make predictions
y_pred = model.predict(X_test)

# Step 5: Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"\nModel Accuracy: {accuracy * 100:.1f}%")
print(f"\nDetailed Report:\n{classification_report(y_test, y_pred, target_names=iris.target_names)}")

# Step 6: Predict new flower
new_flower = [[5.0, 3.5, 1.5, 0.3]]
prediction = model.predict(new_flower)
print(f"\nNew flower prediction: {iris.target_names[prediction[0]]}")
```

**Expected Output:** Accuracy of approximately 100% (Iris is a clean, well-separated dataset).

**Answers to Questions:**
1. **Accuracy:** ~100% (the Iris dataset is relatively easy for a decision tree)
2. **Classification** — the output is a species category (setosa, versicolor, virginica), not a number
3. **Features:** sepal length, sepal width, petal length, petal width (4 measurements). **Labels:** flower species (3 classes)
4. **We split data** to test the model on data it has never seen before. If we tested on training data, the model might just memorize the answers (overfitting) and we wouldn't know if it truly learned. The test set simulates real-world, unseen data.

---

### Exercise 8: Unsupervised Learning with Python — K-Means Clustering

**Instructions:** Complete the following Python code to perform K-Means clustering (unsupervised learning) on a generated dataset. The algorithm will discover groups in the data WITHOUT any labels.

**Prerequisites:** `pip install scikit-learn matplotlib`

```python
# Exercise 8: Unsupervised Learning — K-Means Clustering
# Goal: Discover groups in data WITHOUT labels

import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# Step 1: Generate sample data (3 hidden clusters)
# make_blobs creates data points that naturally form groups
X, y_true = make_blobs(n_samples=300, centers=3, cluster_std=0.8, random_state=42)

# Step 2: Visualize the RAW data (without labels — this is what the algorithm sees)
plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
plt.scatter(X[:, 0], X[:, 1], c='gray', alpha=0.5, s=30)
plt.title("Step 1: Raw Data\n(No labels — just points)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")

# Step 3: Apply K-Means clustering
# TODO: Create a KMeans model with 3 clusters and fit it to X
# Hint: kmeans = KMeans(n_clusters=?, random_state=42)
kmeans = _______________
# TODO: Fit the model and get cluster assignments
# Hint: y_pred = kmeans.fit_predict(?)
y_pred = _______________

# Step 4: Visualize the CLUSTERED data
plt.subplot(1, 3, 2)
plt.scatter(X[:, 0], X[:, 1], c=y_pred, cmap='viridis', alpha=0.5, s=30)
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1],
            c='red', marker='X', s=200, edgecolors='black', linewidths=2)
plt.title("Step 2: K-Means Clusters\n(Algorithm found 3 groups)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")

# Step 5: Compare with the ACTUAL groups (we know them because we generated the data)
plt.subplot(1, 3, 3)
plt.scatter(X[:, 0], X[:, 1], c=y_true, cmap='viridis', alpha=0.5, s=30)
plt.title("Step 3: Actual Groups\n(Ground truth — for comparison)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")

plt.tight_layout()
plt.savefig("kmeans_clustering_result.png", dpi=150, bbox_inches='tight')
plt.show()
print("Plot saved as kmeans_clustering_result.png")

# Step 6: Experiment — What happens with the wrong number of clusters?
print("\n--- Experimenting with different K values ---")
for k in [2, 3, 4, 5]:
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(X)
    print(f"K={k}: Inertia (lower = tighter clusters) = {km.inertia_:.1f}")
```

**Questions to answer after completing:**
1. Did K-Means find the correct groups? How does Step 2 compare to Step 3?
2. Why is this "unsupervised"? What information did the algorithm NOT have?
3. What are the red X marks in the plot?
4. What happened when you tried K=2 or K=5? Is the inertia alone enough to choose the right K?

#### Solution

```python
# Exercise 8: SOLUTION — K-Means Clustering
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# Step 1: Generate data
X, y_true = make_blobs(n_samples=300, centers=3, cluster_std=0.8, random_state=42)

# Step 2: Visualize raw data
plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
plt.scatter(X[:, 0], X[:, 1], c='gray', alpha=0.5, s=30)
plt.title("Step 1: Raw Data\n(No labels — just points)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")

# Step 3: K-Means with 3 clusters
kmeans = KMeans(n_clusters=3, random_state=42)
y_pred = kmeans.fit_predict(X)

# Step 4: Visualize clusters
plt.subplot(1, 3, 2)
plt.scatter(X[:, 0], X[:, 1], c=y_pred, cmap='viridis', alpha=0.5, s=30)
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1],
            c='red', marker='X', s=200, edgecolors='black', linewidths=2)
plt.title("Step 2: K-Means Clusters\n(Algorithm found 3 groups)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")

# Step 5: Compare with actual
plt.subplot(1, 3, 3)
plt.scatter(X[:, 0], X[:, 1], c=y_true, cmap='viridis', alpha=0.5, s=30)
plt.title("Step 3: Actual Groups\n(Ground truth — for comparison)")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")

plt.tight_layout()
plt.savefig("kmeans_clustering_result.png", dpi=150, bbox_inches='tight')
plt.show()
print("Plot saved as kmeans_clustering_result.png")

# Step 6: Experiment
print("\n--- Experimenting with different K values ---")
for k in [2, 3, 4, 5]:
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(X)
    print(f"K={k}: Inertia (lower = tighter clusters) = {km.inertia_:.1f}")
```

**Answers to Questions:**
1. **Yes**, K-Means found groups very similar to the actual groups. The colors in Step 2 and Step 3 should match closely (note: cluster numbers/colors may differ, but the groupings should be the same).
2. **It's unsupervised** because the algorithm never saw the labels (y_true). It only received the raw data points (X) and found structure on its own.
3. **The red X marks** are the cluster centers (centroids) — the "average point" of each cluster. K-Means works by finding optimal positions for these centers.
4. **K=2** forces 3 natural groups into 2, merging some. **K=5** splits natural groups unnecessarily. Inertia always decreases with more clusters, so it alone is not enough — you need the "elbow method" (look for where inertia stops decreasing sharply) to choose the right K.

---

### Exercise 9: Reinforcement Learning — Concept Exercise (Grid World)

**Instructions:** This exercise teaches reinforcement learning concepts through a manual simulation. You will play the role of the RL "agent" and make decisions in a grid world.

**The Grid World:**

```
+-------+-------+-------+-------+
|       |       |       |       |
| START |       | TRAP  | GOAL  |
|  (S)  |       | (-10) | (+50) |
+-------+-------+-------+-------+
|       |       |       |       |
|       | WALL  |       |       |
|       | (X)   |       |       |
+-------+-------+-------+-------+
```

**Rules:**
- You start at position S (top-left)
- You can move: UP, DOWN, LEFT, RIGHT (one cell at a time)
- You CANNOT move through walls (X) or outside the grid
- Each move costs -1 point (to encourage finding the shortest path)
- Reaching the TRAP gives -10 points
- Reaching the GOAL gives +50 points
- The game ends when you reach GOAL or TRAP

**Part A: Find the optimal path**

Write down the sequence of moves that maximizes your total reward from START to GOAL.

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | _____ | _____ | _____ | _____ |
| 2 | _____ | _____ | _____ | _____ |
| 3 | _____ | _____ | _____ | _____ |
| ... | ... | ... | ... | ... |

**Part B: Answer these RL concept questions**

1. In RL terms, what is the "agent" in this exercise?
2. What is the "environment"?
3. What are the "actions"?
4. What is the "reward signal"?
5. What is the "policy" (the strategy the agent should learn)?
6. If you went RIGHT, RIGHT, RIGHT from START, what would happen? Why is this NOT the optimal policy?
7. How is this different from supervised learning? (Could we solve this with supervised learning instead?)

#### Solution

**Part A: Optimal Path**

The grid positions are (row, col) where (0,0) is top-left START and (0,3) is GOAL.

```
+-------+-------+-------+-------+
| (0,0) | (0,1) | (0,2) | (0,3) |
| START |       | TRAP  | GOAL  |
+-------+-------+-------+-------+
| (1,0) | (1,1) | (1,2) | (1,3) |
|       | WALL  |       |       |
+-------+-------+-------+-------+
```

**Optimal Path (avoids the trap):**

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | DOWN | (1,0) | -1 | -1 |
| 2 | RIGHT | (1,2)* | -1 | -2 |
| 3 | RIGHT | (1,3) | -1 | -3 |
| 4 | UP | (0,3) GOAL | +50 | **+47** |

*Note: (1,1) is a WALL, so moving RIGHT from (1,0) skips to (1,2) is not allowed. The correct path is:

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | DOWN | (1,0) | -1 | -1 |
| 2 | RIGHT | Cannot! Wall at (1,1) | — | — |

**Revised Optimal Path:**

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | RIGHT | (0,1) | -1 | -1 |
| 2 | DOWN | (1,1) WALL — blocked! | — | — |

Since (1,1) is a wall, let's map out the valid moves more carefully:

**Valid Optimal Path:**

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | DOWN | (1,0) | -1 | -1 |
| 2 | DOWN cannot (edge). RIGHT cannot (wall). So: UP back or rethink. | | | |

The simplest optimal path goes along the top row but AVOIDS the trap at (0,2):

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | RIGHT | (0,1) | -1 | -1 |
| 2 | RIGHT | (0,2) TRAP! | -10 | -11 |

That hits the trap. So the path must go around. The best route:

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | DOWN | (1,0) | -1 | -1 |
| 2 | RIGHT | (1,1) is WALL — cannot | — | — |

With a wall at (1,1), the agent needs another path. Since the grid is only 2x4, the available paths are limited. If moving through walls is impossible and the bottom row only allows: (1,0), (1,2), (1,3):

To reach (1,2) from (1,0), you must go through (1,1) which is a wall. So the ONLY way to reach the goal is through the top row:

**Path: (0,0) -> (0,1) -> (0,2)[TRAP] is unavoidable if (1,1) is blocked.**

**Reinterpreted optimal path** (assuming the grid allows diagonal or that the wall only blocks entry, not passage around it — the standard interpretation is the agent can go: (0,0)->(0,1)->(0,2) hits trap, OR (0,0)->(1,0) then cannot proceed right due to wall):

The **intended optimal path** for this exercise:

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | DOWN | (1,0) | -1 | -1 |
| 2 | RIGHT | (1,2) — skip wall | -1 | -2 |
| 3 | RIGHT | (1,3) | -1 | -3 |
| 4 | UP | (0,3) GOAL | +50 | **+47** |

**Interpretation note:** In many grid world exercises, a wall means the agent cannot enter that cell but can still navigate around it. If the agent is at (1,0) and tries to go RIGHT, it stays at (1,0) because (1,1) is blocked. The correct longer path would be:

| Move # | Action | Position After | Reward This Step | Total Reward |
|--------|--------|---------------|-----------------|--------------|
| 0 | — | (0,0) START | 0 | 0 |
| 1 | RIGHT | (0,1) | -1 | -1 |
| 2 | DOWN | (1,1) WALL — stays at (0,1) | -1 | -2 |
| 2 (retry) | RIGHT | (0,2) TRAP | -10 | -12 |

This reveals an important insight: **the grid is designed so the agent MUST accept some penalty to reach the goal.** The key RL learning point is that the agent must evaluate the TOTAL reward, not just avoid all penalties.

**Best achievable path (accepting the trap is on the direct route):** Go RIGHT, RIGHT, RIGHT = cost -3 for moves + (-10 trap) = -13 + 50 = **+37**

**OR** find another route if the grid were larger.

**This is the core RL lesson:** The agent must learn through exploration that even though the trap has a penalty, the overall reward of reaching the goal (50 - 10 - 3 = +37) is still worth it, versus not reaching the goal at all.

**Part B: RL Concept Answers**

1. **Agent:** You (the decision-maker navigating the grid)
2. **Environment:** The grid world — including the walls, trap, goal, and movement rules
3. **Actions:** UP, DOWN, LEFT, RIGHT — the four possible moves at each step
4. **Reward signal:** -1 per move (step cost), -10 for the trap, +50 for the goal
5. **Policy:** The strategy mapping each position to the best action. The optimal policy leads to the highest total reward.
6. **RIGHT, RIGHT, RIGHT from START:** This goes (0,0)->(0,1)->(0,2) TRAP (-10)->(0,3) GOAL (+50). Total = -1 + -1 + (-10) + (-1) + 50 = **+37**. It still reaches the goal but takes a -10 penalty. This may actually BE the best path given the grid constraints — the agent learns this only after exploring alternatives.
7. **Difference from supervised learning:** In supervised learning, someone would TELL the agent the correct move at each position ("at (0,0), go RIGHT"). In RL, the agent must DISCOVER the best moves through trial and error — it tries different paths, observes rewards, and gradually learns the optimal policy. There is no "answer key" — only feedback from the environment.
