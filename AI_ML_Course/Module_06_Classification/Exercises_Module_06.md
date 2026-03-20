# Module 6: Classification — Hands-On Exercises

---

## BEGINNER EXERCISES

---

### Exercise 1: Classify Everyday Items into Categories

**Objective:** Understand classification by manually sorting real-world items.

**Instructions:**

Below is a list of 15 items. Sort each one into the correct category: **Fruit**, **Vehicle**, or **Clothing**.

| # | Item | Your Answer |
|---|------|-------------|
| 1 | Apple | |
| 2 | Bicycle | |
| 3 | T-shirt | |
| 4 | Banana | |
| 5 | Truck | |
| 6 | Jacket | |
| 7 | Mango | |
| 8 | Motorcycle | |
| 9 | Socks | |
| 10 | Strawberry | |
| 11 | Bus | |
| 12 | Scarf | |
| 13 | Grapes | |
| 14 | Helicopter | |
| 15 | Jeans | |

**Bonus Questions:**

1. Was this binary or multi-class classification? Why?
2. What **features** (characteristics) did you use to decide each category?
3. If someone showed you a "tomato," which category would you pick? Why is this tricky?

---

**Solution:**

| # | Item | Category |
|---|------|----------|
| 1 | Apple | Fruit |
| 2 | Bicycle | Vehicle |
| 3 | T-shirt | Clothing |
| 4 | Banana | Fruit |
| 5 | Truck | Vehicle |
| 6 | Jacket | Clothing |
| 7 | Mango | Fruit |
| 8 | Motorcycle | Vehicle |
| 9 | Socks | Clothing |
| 10 | Strawberry | Fruit |
| 11 | Bus | Vehicle |
| 12 | Scarf | Clothing |
| 13 | Grapes | Fruit |
| 14 | Helicopter | Vehicle |
| 15 | Jeans | Clothing |

**Bonus Answers:**

1. **Multi-class** classification because there are 3 categories (Fruit, Vehicle, Clothing). Binary would be only 2 categories (e.g., Fruit vs. Not Fruit).
2. Possible features: "Can you eat it?" "Does it have wheels or an engine?" "Do you wear it?" These are exactly the kinds of features a machine learning model would learn.
3. A tomato is technically a fruit (botanically), but many people think of it as a vegetable. This shows that classification can be ambiguous — even humans disagree! ML models can struggle with edge cases too.

---

### Exercise 2: Decision Tree on Paper — Should I Bring an Umbrella?

**Objective:** Build a simple decision tree by hand to understand how this algorithm works.

**Instructions:**

You want to decide: **Should I bring an umbrella today?** Consider these features:

- **Weather forecast:** Rainy, Cloudy, Sunny
- **Wind speed:** High, Low
- **Season:** Winter, Summer

**Step 1:** Draw a tree starting with the most important question at the top.

**Step 2:** Add branches for each possible answer.

**Step 3:** End each branch with a decision: **YES (bring umbrella)** or **NO (leave it)**.

Here is training data to help you:

| Day | Forecast | Wind | Season | Bring Umbrella? |
|-----|----------|------|--------|----------------|
| 1 | Rainy | High | Winter | YES |
| 2 | Rainy | Low | Summer | YES |
| 3 | Sunny | Low | Summer | NO |
| 4 | Cloudy | High | Winter | YES |
| 5 | Sunny | High | Winter | NO |
| 6 | Cloudy | Low | Summer | NO |
| 7 | Rainy | Low | Winter | YES |
| 8 | Sunny | Low | Winter | NO |
| 9 | Cloudy | High | Summer | YES |
| 10 | Rainy | High | Summer | YES |

---

**Solution:**

The best first question is **Forecast** because it separates the data most clearly:

```
                  [Forecast?]
                 /     |      \
            Rainy   Cloudy   Sunny
              |        |        |
           YES ✓   [Wind?]   NO ✗
                   /      \
                High      Low
                 |          |
              YES ✓       NO ✗
```

**How to read it:**
1. Is the forecast **Rainy**? -> Always bring an umbrella (all 4 rainy days = YES).
2. Is the forecast **Sunny**? -> Never bring an umbrella (all 3 sunny days = NO).
3. Is the forecast **Cloudy**? -> Check the wind:
   - **High wind** -> YES, bring umbrella (cloudy + windy often means rain is coming).
   - **Low wind** -> NO, skip the umbrella.

**Why Forecast is the best first question:**
- Rainy: 4/4 = YES (100% pure)
- Sunny: 3/3 = NO (100% pure)
- Cloudy: mixed, so we need another question

This is exactly what a Decision Tree algorithm does — it finds the question that best separates the categories at each step!

---

### Exercise 3: Accuracy Calculation Practice

**Objective:** Learn to calculate classification accuracy by hand.

**Instructions:**

A spam filter classified 20 emails. Here are the results:

| Email # | Actual | Predicted |
|---------|--------|-----------|
| 1 | Spam | Spam |
| 2 | Not Spam | Not Spam |
| 3 | Spam | Spam |
| 4 | Not Spam | Spam |
| 5 | Spam | Not Spam |
| 6 | Not Spam | Not Spam |
| 7 | Spam | Spam |
| 8 | Not Spam | Not Spam |
| 9 | Spam | Spam |
| 10 | Not Spam | Not Spam |
| 11 | Spam | Not Spam |
| 12 | Not Spam | Not Spam |
| 13 | Spam | Spam |
| 14 | Not Spam | Not Spam |
| 15 | Spam | Spam |
| 16 | Not Spam | Not Spam |
| 17 | Not Spam | Spam |
| 18 | Spam | Spam |
| 19 | Not Spam | Not Spam |
| 20 | Spam | Spam |

**Calculate:**

1. How many predictions were **correct**?
2. How many predictions were **incorrect**?
3. What is the **accuracy** (correct / total)?
4. How many **False Positives** (predicted Spam but actually Not Spam)?
5. How many **False Negatives** (predicted Not Spam but actually Spam)?

---

**Solution:**

**Step 1: Count correct predictions (Actual = Predicted):**

Correct: Emails #1, 2, 3, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20 = **16 correct**

**Step 2: Count incorrect predictions:**

Incorrect: Emails #4, 5, 11, 17 = **4 incorrect**

**Step 3: Calculate accuracy:**

```
Accuracy = Correct / Total = 16 / 20 = 0.80 = 80%
```

**Step 4: False Positives (predicted Spam, actually Not Spam):**

Emails #4 and #17 = **2 False Positives**

These are "false alarms" — good emails sent to the spam folder. Annoying, but not dangerous.

**Step 5: False Negatives (predicted Not Spam, actually Spam):**

Emails #5 and #11 = **2 False Negatives**

These are "missed spam" — spam that got through to your inbox. This is worse because you actually see the spam.

**Key Insight:** The model is 80% accurate, but the *type* of error matters! In email filtering, false negatives (missing spam) are annoying but false positives (losing important emails) can be serious.

---

## INTERMEDIATE EXERCISES

---

### Exercise 4: Build a Decision Tree for a Real Scenario

**Objective:** Design a decision tree for a practical classification problem.

**Instructions:**

You are building a model to decide: **Should a bank approve a loan application?** (YES/NO)

Here is your training data:

| Applicant | Income | Credit Score | Existing Debt | Employment | Approved? |
|-----------|--------|-------------|---------------|------------|-----------|
| A | High | Good | Low | Stable | YES |
| B | Low | Poor | High | Unstable | NO |
| C | High | Good | High | Stable | YES |
| D | Medium | Good | Low | Stable | YES |
| E | Low | Good | Low | Stable | YES |
| F | High | Poor | High | Unstable | NO |
| G | Medium | Poor | High | Unstable | NO |
| H | Medium | Good | High | Stable | YES |
| I | Low | Poor | Low | Stable | NO |
| J | High | Poor | Low | Stable | YES |
| K | Low | Good | High | Unstable | NO |
| L | Medium | Poor | Low | Unstable | NO |

**Tasks:**

1. Which feature do you think is most important? Why?
2. Draw a decision tree (2-3 levels deep) on paper.
3. Using your tree, classify these new applicants:
   - Applicant X: Medium income, Good credit, Low debt, Stable employment
   - Applicant Y: Low income, Poor credit, High debt, Unstable employment
   - Applicant Z: High income, Poor credit, Low debt, Unstable employment

---

**Solution:**

**1. Most important feature: Credit Score**

Looking at the data:
- Good Credit: A(YES), C(YES), D(YES), E(YES), H(YES), K(NO) = 5 YES, 1 NO
- Poor Credit: B(NO), F(NO), G(NO), I(NO), J(YES), L(NO) = 1 YES, 5 NO

Credit Score splits the data best (most separation between YES and NO).

**2. Decision Tree:**

```
                    [Credit Score?]
                   /               \
                Good                Poor
                 |                    |
           [Empl. Status?]      [Income?]
           /            \        /    |    \
       Stable      Unstable   High  Med   Low
         |              |       |     |     |
       YES ✓          NO ✗   YES ✓  NO ✗  NO ✗
```

**Reasoning:**
- **Good Credit + Stable Employment** -> All approved (A, C, D, E, H) = YES
- **Good Credit + Unstable Employment** -> Denied (K) = NO
- **Poor Credit + High Income** -> Approved despite poor credit (J) = YES
- **Poor Credit + Medium or Low Income** -> All denied (B, F, G, I, L) = NO

**3. Classify new applicants:**

- **Applicant X** (Medium, Good credit, Low debt, Stable): Good Credit -> Stable Employment -> **YES (Approved)**
- **Applicant Y** (Low, Poor credit, High debt, Unstable): Poor Credit -> Low Income -> **NO (Denied)**
- **Applicant Z** (High, Poor credit, Low debt, Unstable): Poor Credit -> High Income -> **YES (Approved)**

---

### Exercise 5: Google Teachable Machine — Image Classification

**Objective:** Build a real image classifier with zero coding using Google Teachable Machine.

**Instructions:**

1. Go to [https://teachablemachine.withgoogle.com/](https://teachablemachine.withgoogle.com/)
2. Click **"Get Started"** then choose **"Image Project"** -> **"Standard image model"**
3. Create **3 classes** (e.g., "Pen", "Phone", "Cup" — or any 3 objects you have nearby)
4. For each class:
   - Hold the object in front of your webcam
   - Click and hold **"Record"** to capture ~30-50 images
   - Move the object around (different angles, distances)
5. Click **"Train Model"** and wait
6. Test the model by holding up each object

**Questions to Answer:**

1. How accurate was the model on each class?
2. Did any objects get confused with each other? Why?
3. What happened when you showed the camera something that was NOT one of the 3 classes?
4. How could you improve the model's accuracy?

---

**Solution:**

**Expected Observations:**

1. **Accuracy:** Typically 90-100% for distinct objects with good training images. Objects that look similar (e.g., two cups of different colors) may have lower accuracy.

2. **Confusion cases:** Objects with similar shapes or colors may confuse the model. For example, a pen and a pencil might get confused because they share similar features (long, thin, cylindrical).

3. **Unknown objects:** The model MUST choose one of the 3 classes — it has no "I don't know" option. This is a key limitation of classification: the model forces everything into a category. It will assign the object to whichever class it looks most similar to, even if the confidence is low.

4. **Improvements:**
   - Add MORE training images (100+ per class)
   - Include more variety: different angles, lighting, backgrounds, distances
   - Make sure classes are visually distinct
   - Add a 4th "Other" class with random objects to handle unknowns
   - Ensure the background is not too similar across all classes (the model might learn the background, not the object)

**Key Takeaway:** You just built a real neural network classifier! The same principle (learn from labeled examples, classify new ones) applies to all classification models, whether it is a simple decision tree or a deep neural network.

---

### Exercise 6: Confusion Matrix Interpretation

**Objective:** Learn to read and interpret a confusion matrix.

**Instructions:**

A medical screening model for diabetes produced the following confusion matrix on 200 patients:

```
                    Predicted: Diabetic    Predicted: Healthy
Actual: Diabetic          45                    15
Actual: Healthy           10                   130
```

**Calculate:**

1. **True Positives (TP):** Correctly predicted diabetic
2. **True Negatives (TN):** Correctly predicted healthy
3. **False Positives (FP):** Predicted diabetic but actually healthy
4. **False Negatives (FN):** Predicted healthy but actually diabetic
5. **Accuracy:** (TP + TN) / Total
6. **Precision:** TP / (TP + FP) — "When we say diabetic, how often are we right?"
7. **Recall:** TP / (TP + FN) — "Of all diabetic patients, how many did we find?"
8. **Which is more dangerous here: a False Positive or a False Negative? Why?**

---

**Solution:**

**1-4. Reading the confusion matrix:**

| | Value | Meaning |
|---|---|---|
| **TP** | **45** | Correctly identified as diabetic |
| **TN** | **130** | Correctly identified as healthy |
| **FP** | **10** | Healthy person told they're diabetic (false alarm) |
| **FN** | **15** | Diabetic person told they're healthy (MISSED!) |

**5. Accuracy:**
```
Accuracy = (TP + TN) / Total = (45 + 130) / 200 = 175 / 200 = 0.875 = 87.5%
```

**6. Precision:**
```
Precision = TP / (TP + FP) = 45 / (45 + 10) = 45 / 55 = 0.818 = 81.8%
```
When the model says "diabetic," it is correct 81.8% of the time.

**7. Recall:**
```
Recall = TP / (TP + FN) = 45 / (45 + 15) = 45 / 60 = 0.75 = 75%
```
Of all 60 actually diabetic patients, the model found 45 of them (75%).

**8. Which error is more dangerous?**

**False Negatives (FN = 15) are far more dangerous.** These are 15 diabetic patients who were told they are healthy. They will:
- Not receive treatment
- Not change their lifestyle
- Potentially suffer serious health consequences

False Positives (FP = 10) are less harmful because:
- The patient will get additional testing
- A follow-up test will reveal they are actually healthy
- Worst case: some unnecessary worry and extra tests

**In medical applications, we typically optimize for HIGH RECALL** (catch as many positive cases as possible), even if precision drops a bit. It is better to have some false alarms than to miss real cases.

---

## ADVANCED EXERCISES

---

### Exercise 7: Python sklearn Decision Tree Classifier (Iris Dataset)

**Objective:** Build and evaluate a decision tree classifier using Python and scikit-learn.

**Instructions:**

Write a Python script that:
1. Loads the famous Iris dataset (built into sklearn)
2. Splits data into training (80%) and testing (20%)
3. Trains a Decision Tree classifier
4. Makes predictions on the test set
5. Prints the accuracy and classification report
6. Visualizes the decision tree

```python
# starter_code.py - Fill in the blanks (marked with ???)

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import numpy as np

# Step 1: Load the Iris dataset
iris = load_iris()
X = iris.data       # Features: sepal length, sepal width, petal length, petal width
y = iris.target     # Labels: 0=setosa, 1=versicolor, 2=virginica

print(f"Dataset shape: {X.shape}")
print(f"Classes: {iris.target_names}")
print(f"Feature names: {iris.feature_names}")
print()

# Step 2: Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    ???, ???, test_size=???, random_state=42
)
print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")
print()

# Step 3: Create and train the Decision Tree
clf = DecisionTreeClassifier(max_depth=???, random_state=42)
clf.fit(???, ???)

# Step 4: Make predictions
y_pred = clf.predict(???)

# Step 5: Evaluate the model
print(f"Accuracy: {accuracy_score(???, ???) * 100:.1f}%")
print()
print("Classification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))
print()
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print()

# Step 6: Show the decision tree rules
print("Decision Tree Rules:")
print(export_text(clf, feature_names=iris.feature_names))
```

---

**Solution:**

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import numpy as np

# Step 1: Load the Iris dataset
iris = load_iris()
X = iris.data
y = iris.target

print(f"Dataset shape: {X.shape}")
print(f"Classes: {iris.target_names}")
print(f"Feature names: {iris.feature_names}")
print()

# Step 2: Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")
print()

# Step 3: Create and train the Decision Tree
clf = DecisionTreeClassifier(max_depth=3, random_state=42)
clf.fit(X_train, y_train)

# Step 4: Make predictions
y_pred = clf.predict(X_test)

# Step 5: Evaluate the model
print(f"Accuracy: {accuracy_score(y_test, y_pred) * 100:.1f}%")
print()
print("Classification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))
print()
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print()

# Step 6: Show the decision tree rules
print("Decision Tree Rules:")
print(export_text(clf, feature_names=iris.feature_names))
```

**Expected Output (approximately):**

```
Dataset shape: (150, 4)
Classes: ['setosa' 'versicolor' 'virginica']
Feature names: ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']

Training samples: 120
Testing samples: 30

Accuracy: 100.0%

Classification Report:
              precision    recall  f1-score   support

      setosa       1.00      1.00      1.00        10
  versicolor       1.00      1.00      1.00         9
   virginica       1.00      1.00      1.00        11

    accuracy                           1.00        30

Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]

Decision Tree Rules:
|--- petal width (cm) <= 0.80
|   |--- class: 0
|--- petal width (cm) >  0.80
|   |--- petal width (cm) <= 1.75
|   |   |--- petal length (cm) <= 4.95
|   |   |   |--- class: 1
|   |   |--- petal length (cm) >  4.95
|   |   |   |--- class: 2
|   |--- petal width (cm) >  1.75
|   |   |--- class: 2
```

**Key observations:**
- The Iris dataset is relatively simple, so a decision tree can achieve near-perfect accuracy.
- The tree uses mainly **petal width** and **petal length** to classify — sepal measurements are less important.
- Setting `max_depth=3` prevents overfitting by limiting tree complexity.

---

### Exercise 8: Random Forest vs. Decision Tree Comparison

**Objective:** Compare a single Decision Tree to a Random Forest and understand the difference.

**Instructions:**

Using the Iris dataset, compare both models. Use cross-validation for a more reliable comparison.

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
import numpy as np

# Load data
iris = load_iris()
X, y = iris.data, iris.target

# Model 1: Single Decision Tree
dt = DecisionTreeClassifier(random_state=42)
dt_scores = cross_val_score(dt, X, y, cv=10, scoring='accuracy')

# Model 2: Random Forest (100 trees)
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf_scores = cross_val_score(rf, X, y, cv=10, scoring='accuracy')

print("=== Decision Tree ===")
print(f"Scores per fold: {np.round(dt_scores, 3)}")
print(f"Mean accuracy:   {dt_scores.mean() * 100:.1f}%")
print(f"Std deviation:   {dt_scores.std() * 100:.1f}%")
print()

print("=== Random Forest (100 trees) ===")
print(f"Scores per fold: {np.round(rf_scores, 3)}")
print(f"Mean accuracy:   {rf_scores.mean() * 100:.1f}%")
print(f"Std deviation:   {rf_scores.std() * 100:.1f}%")
print()

# Compare
print("=== Comparison ===")
diff = rf_scores.mean() - dt_scores.mean()
print(f"Random Forest is {diff * 100:.1f}% {'better' if diff > 0 else 'worse'} on average.")
print(f"Random Forest has {'lower' if rf_scores.std() < dt_scores.std() else 'higher'} variance (more consistent).")
```

**Questions:**
1. Which model has higher average accuracy?
2. Which model is more consistent (lower standard deviation)?
3. Why does Random Forest generally outperform a single Decision Tree?
4. What is the trade-off of using Random Forest?

---

**Solution:**

**Expected Output (approximately):**

```
=== Decision Tree ===
Scores per fold: [1.    0.933 1.    0.933 0.933 0.867 0.933 1.    1.    1.   ]
Mean accuracy:   96.0%
Std deviation:   4.3%

=== Random Forest (100 trees) ===
Scores per fold: [1.    0.933 1.    0.933 0.933 0.933 0.933 1.    1.    1.   ]
Mean accuracy:   96.7%
Std deviation:   3.0%

=== Comparison ===
Random Forest is 0.7% better on average.
Random Forest has lower variance (more consistent).
```

**Answers:**

1. **Random Forest** typically has slightly higher accuracy (~96-97% vs ~95-96%).

2. **Random Forest** is more consistent — its standard deviation across folds is lower. A single decision tree can be "lucky" or "unlucky" depending on the data split.

3. **Why Random Forest is better:**
   - It creates many different decision trees, each trained on a random subset of data and features.
   - Each tree "votes" on the classification.
   - Individual tree errors cancel each other out (ensemble wisdom).
   - It is like asking 100 doctors instead of 1 — the group decision is usually better.

4. **Trade-offs:**
   - **Slower** to train (100 trees vs. 1)
   - **Harder to interpret** — you cannot easily see why it made a decision
   - **More memory** required
   - For simple problems (like Iris), the improvement may be small, but for complex, noisy data, Random Forest can be dramatically better.

---

### Exercise 9: Precision vs. Recall Deep Dive

**Objective:** Understand precision-recall trade-offs using a real scenario and Python code.

**Instructions:**

Build a classifier on a slightly imbalanced dataset and explore how the decision threshold affects precision and recall.

```python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, classification_report, confusion_matrix
)
import numpy as np

# Create an imbalanced dataset (90% class 0, 10% class 1)
X, y = make_classification(
    n_samples=1000, n_features=10, n_informative=5,
    n_redundant=2, weights=[0.9, 0.1], random_state=42
)

print(f"Class distribution: {np.bincount(y)}")
print(f"  Class 0 (Negative): {np.sum(y == 0)} samples ({np.sum(y == 0)/len(y)*100:.0f}%)")
print(f"  Class 1 (Positive): {np.sum(y == 1)} samples ({np.sum(y == 1)/len(y)*100:.0f}%)")
print()

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train Logistic Regression
model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train, y_train)

# Get probabilities instead of hard predictions
y_proba = model.predict_proba(X_test)[:, 1]  # probability of class 1

# Try different thresholds
print("=" * 70)
print(f"{'Threshold':<12} {'Accuracy':<12} {'Precision':<12} {'Recall':<12} {'F1':<12}")
print("=" * 70)

for threshold in [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]:
    y_pred = (y_proba >= threshold).astype(int)

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)

    print(f"{threshold:<12.1f} {acc:<12.3f} {prec:<12.3f} {rec:<12.3f} {f1:<12.3f}")

print()
print("Default threshold (0.5) classification report:")
y_pred_default = model.predict(X_test)
print(classification_report(y_test, y_pred_default))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred_default))
```

**Questions:**

1. What happens to **precision** as you increase the threshold?
2. What happens to **recall** as you increase the threshold?
3. At threshold 0.5, what is the accuracy? Is the model "good"?
4. If this were a **cancer screening** model, which threshold would you pick? Why?
5. If this were a **spam filter**, which threshold would you pick? Why?

---

**Solution:**

**Expected Output (approximately):**

```
Class distribution: [900 100]
  Class 0 (Negative): 900 samples (90%)
  Class 1 (Positive): 100 samples (10%)

======================================================================
Threshold    Accuracy     Precision    Recall       F1
======================================================================
0.1          0.865        0.186        0.950        0.311
0.2          0.920        0.310        0.900        0.461
0.3          0.940        0.429        0.750        0.545
0.4          0.955        0.556        0.750        0.638
0.5          0.960        0.643        0.650        0.647
0.6          0.960        0.714        0.500        0.588
0.7          0.955        0.778        0.350        0.483
0.8          0.950        0.833        0.250        0.385
0.9          0.940        1.000        0.100        0.182
```

**Answers:**

1. **Precision INCREASES** with higher threshold. The model becomes more "picky" about predicting positive, so when it does predict positive, it is more likely to be correct. At threshold 0.9, precision may reach 100% — but it only catches very few positives.

2. **Recall DECREASES** with higher threshold. The model misses more actual positives because the threshold is so high. At threshold 0.9, recall drops dramatically — the model barely finds any positives.

3. At threshold 0.5, accuracy is around 96%, which looks great. BUT this is misleading! Because 90% of the data is class 0, a model that always predicts "not positive" would get 90% accuracy. The real question is: does it find the positive cases? Look at recall for class 1.

4. **Cancer screening -> Low threshold (0.1-0.3).** We want HIGH RECALL (catch as many cancers as possible). A missed cancer (false negative) could be fatal. False positives just mean extra tests, which is much better than missing a real case. We accept lower precision for higher recall.

5. **Spam filter -> Higher threshold (0.5-0.7).** We want GOOD PRECISION (don't accidentally flag important emails as spam). A false positive (legitimate email in spam folder) could mean missing an important work email. A false negative (spam in inbox) is just annoying but not critical. We want a balance but lean toward precision.

**Key Insight:** There is no single "best" threshold — it depends entirely on the cost of each type of error in your specific application. This is why understanding precision and recall is crucial for real-world ML!

---

## Summary Table

| Exercise | Level | Key Concept |
|----------|-------|-------------|
| 1 | Beginner | Manual classification, binary vs. multi-class |
| 2 | Beginner | Decision trees, feature selection |
| 3 | Beginner | Accuracy, false positives, false negatives |
| 4 | Intermediate | Decision tree design, real-world application |
| 5 | Intermediate | Hands-on image classification (no code) |
| 6 | Intermediate | Confusion matrix, precision, recall |
| 7 | Advanced | sklearn Decision Tree, Iris dataset |
| 8 | Advanced | Random Forest vs. Decision Tree comparison |
| 9 | Advanced | Precision-recall trade-off, thresholds |
