# Module 2 Exercises: What is Machine Learning?

---

## BEGINNER LEVEL

---

### Exercise 1: ML vs Traditional Programming Quiz

**Instructions:** For each scenario below, decide whether it is an example of **Traditional Programming** or **Machine Learning**. Write your answer next to each one.

| # | Scenario | Your Answer |
|---|----------|-------------|
| 1 | A calculator app that adds two numbers together | |
| 2 | An email app that learns which emails you consider spam over time | |
| 3 | A traffic light that changes every 60 seconds on a fixed timer | |
| 4 | A music app that suggests songs based on what you've listened to before | |
| 5 | A thermostat programmed to turn on heat when temperature drops below 20C | |
| 6 | A system that detects fraudulent credit card transactions by analyzing millions of past transactions | |
| 7 | A vending machine that dispenses a drink when you press a button | |
| 8 | A camera app that automatically detects and focuses on faces | |

---

**Solution:**

| # | Scenario | Answer | Explanation |
|---|----------|--------|-------------|
| 1 | Calculator app | **Traditional Programming** | The rules for addition are simple and fixed (a + b = c). A programmer writes these rules directly. |
| 2 | Email spam filter that learns | **Machine Learning** | The system learns from YOUR behavior (what you mark as spam) and adapts over time. The rules are not hardcoded. |
| 3 | Fixed-timer traffic light | **Traditional Programming** | It follows a simple, fixed rule: change every 60 seconds. No learning involved. |
| 4 | Music recommendation | **Machine Learning** | The app analyzes patterns in your listening history to find songs you might like. It learns your preferences from data. |
| 5 | Simple thermostat | **Traditional Programming** | It follows one explicit rule: if temp < 20, turn on heat. A human wrote that rule. |
| 6 | Fraud detection system | **Machine Learning** | Fraud patterns are complex and constantly changing. The system learns from millions of examples what "suspicious" looks like. |
| 7 | Vending machine | **Traditional Programming** | Simple if-then rules: if button X pressed AND payment received, dispense item X. |
| 8 | Face detection camera | **Machine Learning** | Recognizing a face in any lighting, angle, or expression is far too complex to write rules for. The system learned from thousands of face images. |

---

### Exercise 2: Identify the ML Type

**Instructions:** For each scenario below, identify which type of Machine Learning is being used:
- **(S)** Supervised Learning (learning with labeled answers)
- **(U)** Unsupervised Learning (finding hidden patterns without labels)
- **(R)** Reinforcement Learning (learning by trial and error with rewards)

| # | Scenario | Type (S/U/R)? |
|---|----------|---------------|
| 1 | A robot learns to walk by trying different movements and falling down many times | |
| 2 | An email system trained on 10,000 emails labeled as "spam" or "not spam" | |
| 3 | A store groups its customers into segments based on purchasing behavior (without predefined groups) | |
| 4 | A model trained on house data (size, location, bedrooms) with known sale prices to predict future prices | |
| 5 | A chess-playing AI that plays millions of games against itself to improve | |
| 6 | A system that organizes thousands of news articles into topic clusters automatically | |
| 7 | A model that learned to identify dog breeds from 50,000 labeled photos | |
| 8 | A self-driving car that learns the best driving strategy through simulated driving | |

---

**Solution:**

| # | Scenario | Type | Explanation |
|---|----------|------|-------------|
| 1 | Robot learning to walk | **(R) Reinforcement** | The robot tries actions, gets feedback (falling = bad, staying up = good), and improves through trial and error. |
| 2 | Spam email classifier | **(S) Supervised** | The system is trained with labeled data -- each email already has the answer: "spam" or "not spam." |
| 3 | Customer segmentation | **(U) Unsupervised** | No predefined groups exist. The algorithm discovers natural groupings in the customer data on its own. |
| 4 | House price prediction | **(S) Supervised** | The model is trained with features (size, location) AND the correct answers (known sale prices). Classic supervised regression. |
| 5 | Chess AI self-play | **(R) Reinforcement** | The AI learns through playing games (actions), receiving rewards (winning) or penalties (losing), and adjusting its strategy. |
| 6 | News article clustering | **(U) Unsupervised** | No one told the system which topics exist. It discovers them by finding patterns and similarities in the text. |
| 7 | Dog breed identification | **(S) Supervised** | The model was trained on photos that were already labeled with the correct breed name. |
| 8 | Self-driving car simulation | **(R) Reinforcement** | The car learns driving strategy through trial and error in a simulated environment, receiving rewards for safe driving. |

---

### Exercise 3: Vocabulary Matching

**Instructions:** Match each ML term on the left with its correct definition on the right.

| # | Term | | Definition |
|---|------|-|------------|
| 1 | Feature | | A. The phase where the model studies data to learn patterns |
| 2 | Label | | B. The model's answer when given new, unseen data |
| 3 | Training | | C. The learned pattern that can make decisions |
| 4 | Model | | D. An input characteristic used by the model (like height or color) |
| 5 | Prediction | | E. The correct answer or category in training data |

---

**Solution:**

| Term | Matches | Definition |
|------|---------|------------|
| 1. Feature | **D** | An input characteristic used by the model (like height or color) |
| 2. Label | **E** | The correct answer or category in training data |
| 3. Training | **A** | The phase where the model studies data to learn patterns |
| 4. Model | **C** | The learned pattern that can make decisions |
| 5. Prediction | **B** | The model's answer when given new, unseen data |

**Bonus Explanation:**
Think of it like school:
- **Features** = the questions on a test (the information you look at)
- **Labels** = the answer key (what the correct answers are)
- **Training** = studying for the test (the learning process)
- **Model** = the knowledge in your brain after studying
- **Prediction** = your answer on a new test you haven't seen before

---

## INTERMEDIATE LEVEL

---

### Exercise 4: Design an ML System

**Instructions:** You are asked to build an ML system that helps a restaurant predict how much food to prepare each day (to reduce waste). Answer the following questions to design your system:

1. **What type of ML would you use?** (Supervised, Unsupervised, or Reinforcement)
2. **What features (inputs) would you collect?**
3. **What would the label (output) be?**
4. **Where would you get training data?**
5. **How would you know if your model is working well?**

---

**Solution:**

1. **Type of ML: Supervised Learning**
   - We have historical data with both inputs (day info) and outputs (how much food was actually needed). We want to predict a number (amount of food), which makes this a supervised regression problem.

2. **Features (Inputs) to collect:**
   - Day of the week (weekends are busier)
   - Month / season (summer vs. winter eating habits)
   - Weather forecast (rainy days = fewer customers)
   - Is it a holiday? (holidays change traffic patterns)
   - Any local events happening? (concerts, sports games nearby)
   - Number of reservations booked
   - Historical customer count for similar days
   - Day before / day after a holiday

3. **Label (Output):**
   - The number of meals served that day (or the total amount of food consumed in kg/portions)

4. **Where to get training data:**
   - The restaurant's own past records: daily sales data, receipts, inventory usage
   - Historical weather data from weather APIs
   - Local event calendars
   - Reservation system logs
   - Ideally, at least 1-2 years of daily data to capture seasonal patterns

5. **How to know if the model works well:**
   - Split data: use 80% for training, 20% for testing
   - Compare the model's predictions to what actually happened on the test days
   - Measure by how far off the prediction is on average (e.g., "off by 5 meals on average")
   - A good model should reduce food waste compared to the current method (e.g., guessing or always preparing the same amount)
   - Track real-world performance after deployment: is food waste actually going down?

---

### Exercise 5: Try a No-Code ML Tool (Google Teachable Machine)

**Instructions:** Use Google's Teachable Machine to build a simple image classifier without writing any code.

**Steps:**
1. Go to [https://teachablemachine.withgoogle.com/](https://teachablemachine.withgoogle.com/)
2. Click "Get Started" and choose "Image Project" then "Standard image model"
3. Create two classes (e.g., "Pen" and "Phone" -- use objects near you)
4. For each class, use your webcam to capture about 30-50 sample images
   - Move the object around, change angles, change lighting
5. Click "Train Model" and wait for training to complete
6. Test the model with your webcam in the "Preview" panel

**After building your model, answer these questions:**

1. How accurate was your model? Did it correctly identify the objects?
2. What happened when you showed it an object that was NOT a pen or phone?
3. What happened when you held the object at a very unusual angle or in poor lighting?
4. How could you improve the model's accuracy?

---

**Solution:**

1. **Accuracy:** Most students find the model is 85-95% accurate on the objects they trained on. It should correctly identify the objects most of the time, especially when held similarly to the training images.

2. **Unknown objects:** The model will STILL classify the unknown object as either "Pen" or "Phone" -- it has no "I don't know" option. This is a key ML limitation: the model can only choose from the categories it was trained on. It might show lower confidence (e.g., 60% phone, 40% pen) but it will always pick one.

3. **Unusual angles / poor lighting:** Accuracy likely drops significantly. This demonstrates the importance of diverse training data. If you only trained with the object in one position, the model struggles with new positions.

4. **How to improve:**
   - Add MORE training images (100+ per class)
   - Include images from many different angles, distances, and lighting conditions
   - Add a third class called "Other" or "Nothing" with images of your background
   - Make sure training images cover the full range of conditions you expect during testing
   - This illustrates why real-world ML systems need thousands or millions of training examples

---

### Exercise 6: Feature Identification Exercise

**Instructions:** For each ML problem below, list at least 5 features (inputs) that you think would be useful for the model to learn from. Think about what information would help make a good prediction.

**Problem A:** Predicting whether a student will pass or fail an exam
**Problem B:** Predicting the price of a used car
**Problem C:** Predicting whether a customer will cancel their streaming subscription

---

**Solution:**

**Problem A: Student pass/fail prediction**

| # | Feature | Why It Helps |
|---|---------|-------------|
| 1 | Attendance rate (% of classes attended) | Students who attend more classes tend to perform better |
| 2 | Average score on previous assignments | Past performance is a strong predictor of future performance |
| 3 | Hours spent studying per week | More study time generally leads to better outcomes |
| 4 | Number of practice tests completed | Practice improves exam readiness |
| 5 | Number of office hours / tutoring visits | Seeking help shows engagement and fills knowledge gaps |
| 6 | Time since last study session | Recency of studying affects recall |
| 7 | Score on midterm exam | Direct indicator of understanding the material |

**Problem B: Used car price prediction**

| # | Feature | Why It Helps |
|---|---------|-------------|
| 1 | Car brand and model | Some brands hold value better than others |
| 2 | Year of manufacture (age) | Older cars are generally cheaper |
| 3 | Mileage (km or miles driven) | Higher mileage = more wear = lower price |
| 4 | Fuel type (gas, diesel, electric, hybrid) | Electric/hybrid cars may hold value differently |
| 5 | Number of previous owners | Fewer owners often means better maintenance |
| 6 | Accident history | Cars in accidents are worth less |
| 7 | Condition (excellent/good/fair/poor) | Physical condition directly affects price |
| 8 | Location (city/region) | Prices vary by geography |

**Problem C: Streaming subscription cancellation**

| # | Feature | Why It Helps |
|---|---------|-------------|
| 1 | Hours watched per week (last month) | Low usage suggests the customer may not see value |
| 2 | Number of months subscribed | Long-term subscribers are less likely to cancel |
| 3 | Monthly subscription cost | Higher cost = higher chance of cancellation |
| 4 | Number of profiles on the account | More profiles = more people using it = less likely to cancel |
| 5 | Days since last login | Long gaps suggest disengagement |
| 6 | Number of shows added to watchlist | Active engagement with content |
| 7 | Whether they contacted customer support recently | Support issues may drive cancellation |
| 8 | Whether they have been offered a discount | Discounted users may cancel when full price returns |

---

## ADVANCED LEVEL

---

### Exercise 7: Simple Python ML with Scikit-Learn

**Instructions:** Build a simple linear regression model to predict student exam scores based on study hours. Follow the steps below and run the code in Python.

**Prerequisites:** Python 3.x with `scikit-learn` and `matplotlib` installed.
```
pip install scikit-learn matplotlib numpy
```

**Code:**

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# ==============================================
# STEP 1: Create our dataset
# ==============================================
# Hours studied vs. Exam score (out of 100)
hours_studied = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                          1.5, 2.5, 3.5, 5.5, 6.5, 7.5, 8.5, 4.5,
                          2, 3, 5, 7, 9, 1, 4, 6, 8, 10]).reshape(-1, 1)

exam_scores = np.array([35, 45, 50, 55, 65, 68, 75, 82, 88, 95,
                        40, 48, 52, 67, 72, 78, 85, 58,
                        42, 53, 63, 77, 90, 32, 57, 70, 80, 92])

print(f"Total data points: {len(hours_studied)}")
print(f"Hours range: {hours_studied.min():.1f} to {hours_studied.max():.1f}")
print(f"Score range: {exam_scores.min()} to {exam_scores.max()}")

# ==============================================
# STEP 2: Split into training and testing sets
# ==============================================
X_train, X_test, y_train, y_test = train_test_split(
    hours_studied, exam_scores, test_size=0.2, random_state=42
)

print(f"\nTraining samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")

# ==============================================
# STEP 3: Create and train the model
# ==============================================
model = LinearRegression()
model.fit(X_train, y_train)

print(f"\n--- Model Learned ---")
print(f"Slope (coefficient): {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
print(f"Formula: Score = {model.coef_[0]:.2f} * Hours + {model.intercept_:.2f}")

# ==============================================
# STEP 4: Test the model
# ==============================================
y_pred = model.predict(X_test)

print(f"\n--- Test Results ---")
for i in range(len(X_test)):
    print(f"Hours: {X_test[i][0]:.1f} | Actual: {y_test[i]} | Predicted: {y_pred[i]:.1f}")

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"\nMean Absolute Error: {mae:.2f} points")
print(f"R-squared Score: {r2:.4f} (1.0 = perfect)")

# ==============================================
# STEP 5: Make predictions on new data
# ==============================================
new_hours = np.array([[3], [5], [7], [12]])
new_predictions = model.predict(new_hours)

print(f"\n--- Predictions for New Students ---")
for h, p in zip(new_hours, new_predictions):
    print(f"If you study {h[0]} hours, predicted score: {p:.1f}")

# ==============================================
# STEP 6: Visualize the results
# ==============================================
plt.figure(figsize=(10, 6))

# Plot training data
plt.scatter(X_train, y_train, color='#4A6CF7', label='Training Data', alpha=0.7, s=60)

# Plot test data
plt.scatter(X_test, y_test, color='#00D4AA', label='Test Data', marker='s', alpha=0.7, s=60)

# Plot the model's line
line_x = np.linspace(0, 12, 100).reshape(-1, 1)
line_y = model.predict(line_x)
plt.plot(line_x, line_y, color='#E85D75', linewidth=2, label='Model Prediction Line')

plt.xlabel('Hours Studied', fontsize=12)
plt.ylabel('Exam Score', fontsize=12)
plt.title('Linear Regression: Study Hours vs Exam Score', fontsize=14)
plt.legend(fontsize=10)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('linear_regression_result.png', dpi=150)
plt.show()

print("\nChart saved as 'linear_regression_result.png'")
```

**Questions to answer after running the code:**

1. What is the formula the model learned? What does the slope mean in plain English?
2. How accurate is the model? Is the Mean Absolute Error acceptable?
3. What does the model predict for 12 hours of study? Is this realistic? Why or why not?
4. What would happen if we only had 5 data points instead of 28?

---

**Solution:**

1. **Formula:** The model learns something close to `Score = 6.5 * Hours + 28`. The slope (~6.5) means that for every additional hour of studying, the model expects the exam score to increase by about 6.5 points. The intercept (~28) is the predicted score for 0 hours of studying (a baseline).

2. **Accuracy:** The Mean Absolute Error should be around 3-5 points, meaning the model's predictions are off by about 3-5 points on average. For exam scores out of 100, this is quite good. The R-squared should be around 0.95+, meaning the model explains ~95% of the variance in scores.

3. **12 hours prediction:** The model will predict about 106, which is impossible since the max score is 100. This reveals a limitation of linear regression: it always predicts in a straight line and does not know about boundaries or limits. In reality, studying more has diminishing returns, and the score caps at 100. This is called **extrapolation** and it is dangerous with linear models.

4. **With only 5 data points:** The model would be much less reliable. With so little data, a single unusual point (outlier) could dramatically change the line. The model might overfit to those 5 specific points and fail to generalize to new students. This demonstrates why ML needs sufficient data to learn reliable patterns.

---

### Exercise 8: Overfitting Experiment

**Instructions:** This exercise demonstrates **overfitting** -- when a model memorizes training data instead of learning general patterns. Run the code below and observe what happens.

**Code:**

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Generate simple data with some noise
np.random.seed(42)
X = np.sort(np.random.uniform(0, 10, 20)).reshape(-1, 1)
y_true = 2 * X.flatten() + 5  # True relationship: y = 2x + 5
y = y_true + np.random.normal(0, 3, 20)  # Add random noise

# Split: first 15 for training, last 5 for testing
X_train, X_test = X[:15], X[15:]
y_train, y_test = y[:15], y[15:]

# Try different model complexities
degrees = [1, 3, 15]
titles = ["Simple (degree=1)\nJust Right", "Medium (degree=3)\nSlightly Complex", "Complex (degree=15)\nOverfitting!"]
colors = ["#4A6CF7", "#00D4AA", "#E85D75"]

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

for idx, (degree, title, color) in enumerate(zip(degrees, titles, colors)):
    # Create polynomial features
    poly = PolynomialFeatures(degree=degree)
    X_train_poly = poly.fit_transform(X_train)
    X_test_poly = poly.transform(X_test)

    # Train model
    model = LinearRegression()
    model.fit(X_train_poly, y_train)

    # Calculate errors
    train_pred = model.predict(X_train_poly)
    test_pred = model.predict(X_test_poly)
    train_error = mean_squared_error(y_train, train_pred)
    test_error = mean_squared_error(y_test, test_pred)

    # Plot
    ax = axes[idx]
    ax.scatter(X_train, y_train, color='#4A6CF7', label='Training Data', zorder=5, s=50)
    ax.scatter(X_test, y_test, color='#00D4AA', marker='s', label='Test Data', zorder=5, s=50)

    # Smooth prediction line
    X_plot = np.linspace(0, 10, 200).reshape(-1, 1)
    X_plot_poly = poly.transform(X_plot)
    y_plot = model.predict(X_plot_poly)
    ax.plot(X_plot, y_plot, color=color, linewidth=2, label='Model')

    ax.set_title(title, fontsize=12, fontweight='bold')
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_ylim(-5, 35)
    ax.legend(fontsize=8)
    ax.text(0.5, 0.02, f'Train Error: {train_error:.1f}\nTest Error: {test_error:.1f}',
            transform=ax.transAxes, fontsize=9, verticalalignment='bottom',
            bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

plt.suptitle('Overfitting Demonstration: Simple vs Complex Models', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('overfitting_experiment.png', dpi=150)
plt.show()

print("=== Results Summary ===")
for degree, title in zip(degrees, ["Simple (1)", "Medium (3)", "Complex (15)"]):
    poly = PolynomialFeatures(degree=degree)
    X_train_poly = poly.fit_transform(X_train)
    X_test_poly = poly.transform(X_test)
    model = LinearRegression()
    model.fit(X_train_poly, y_train)
    train_err = mean_squared_error(y_train, model.predict(X_train_poly))
    test_err = mean_squared_error(y_test, model.predict(X_test_poly))
    print(f"{title:20s} | Train Error: {train_err:8.2f} | Test Error: {test_err:8.2f}")
```

**Questions to answer:**

1. Which model has the lowest TRAINING error? Which has the lowest TEST error? Why are they different?
2. Look at the degree=15 chart. What is the model doing wrong?
3. In your own words, what is overfitting?
4. How can you prevent overfitting in real-world ML projects?

---

**Solution:**

1. **Training vs Test Error:**
   - The degree=15 model has the LOWEST training error (close to 0) because it memorizes every training point perfectly.
   - The degree=1 model has the LOWEST test error because it learned the TRUE underlying pattern (a straight line) and generalizes well to new data.
   - They differ because the complex model is "cheating" -- it memorized the training data (including the noise) instead of learning the real pattern. When it sees new data, it performs terribly.

2. **Degree=15 problem:** The model creates wild curves and zigzags to pass through every single training point. It treats random noise as if it were meaningful patterns. Between training points, the predictions swing wildly, giving absurd values for new data. It has memorized instead of learned.

3. **Overfitting in plain English:** Overfitting is like a student who memorizes every answer on practice tests word-for-word but does not actually understand the subject. They score perfectly on practice tests but fail on the real exam because the questions are slightly different. The model learned the noise and quirks of the training data instead of the true underlying pattern.

4. **Preventing overfitting:**
   - **Use more training data:** More examples make it harder for the model to memorize and force it to learn general patterns
   - **Use simpler models:** Do not make the model more complex than necessary (start simple)
   - **Use validation data:** Always test on data the model has never seen during training
   - **Regularization:** Add penalties for overly complex models (advanced technique)
   - **Cross-validation:** Test on multiple different splits of the data
   - **Early stopping:** Stop training before the model starts memorizing
   - **Feature selection:** Remove irrelevant features that add noise

---

### Exercise 9: Data Quality Exploration

**Instructions:** Data quality is crucial for ML. In this exercise, you will explore a messy dataset and clean it before training a model. This demonstrates why Step 2 (Prepare & Clean Data) in the ML process is so important.

**Code:**

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

# ==============================================
# STEP 1: Create a "messy" dataset
# ==============================================
np.random.seed(42)

# Simulating student data: study hours, sleep hours, and exam scores
n = 50
data = {
    'study_hours': np.round(np.random.uniform(1, 10, n), 1),
    'sleep_hours': np.round(np.random.uniform(4, 10, n), 1),
}
# True relationship: score = 5 * study + 3 * sleep + 10 + noise
data['exam_score'] = np.round(
    5 * data['study_hours'] + 3 * data['sleep_hours'] + 10 +
    np.random.normal(0, 5, n), 1
)

df = pd.DataFrame(data)

# --- Introduce data quality problems ---

# Problem 1: Missing values (set some entries to NaN)
missing_idx = np.random.choice(n, 5, replace=False)
df.loc[missing_idx, 'study_hours'] = np.nan

# Problem 2: Outliers (unrealistic values)
df.loc[3, 'exam_score'] = 250    # Score can't be > 100
df.loc[17, 'study_hours'] = -5   # Negative hours is impossible
df.loc[25, 'sleep_hours'] = 30   # Nobody sleeps 30 hours

# Problem 3: Duplicates
df = pd.concat([df, df.iloc[[0, 1, 2]]], ignore_index=True)

print("=== RAW MESSY DATA ===")
print(f"Shape: {df.shape}")
print(f"\nMissing values:\n{df.isnull().sum()}")
print(f"\nBasic statistics:\n{df.describe()}")

# ==============================================
# STEP 2: Train on MESSY data (baseline)
# ==============================================
df_messy = df.dropna()  # Just drop NaN to make it run
X_messy = df_messy[['study_hours', 'sleep_hours']].values
y_messy = df_messy['exam_score'].values

model_messy = LinearRegression()
model_messy.fit(X_messy, y_messy)
pred_messy = model_messy.predict(X_messy)
mae_messy = mean_absolute_error(y_messy, pred_messy)

print(f"\n=== MODEL ON MESSY DATA ===")
print(f"Coefficients: study={model_messy.coef_[0]:.2f}, sleep={model_messy.coef_[1]:.2f}")
print(f"Intercept: {model_messy.intercept_:.2f}")
print(f"MAE: {mae_messy:.2f}")
print(f"(True coefficients should be: study=5.00, sleep=3.00, intercept=10.00)")

# ==============================================
# STEP 3: Clean the data
# ==============================================
df_clean = df.copy()

# Fix 1: Remove duplicates
before_dupes = len(df_clean)
df_clean = df_clean.drop_duplicates()
print(f"\n=== CLEANING ===")
print(f"Removed {before_dupes - len(df_clean)} duplicate rows")

# Fix 2: Handle outliers (remove values outside reasonable ranges)
df_clean = df_clean[
    (df_clean['study_hours'] >= 0) & (df_clean['study_hours'] <= 24) &
    (df_clean['sleep_hours'] >= 0) & (df_clean['sleep_hours'] <= 24) &
    (df_clean['exam_score'] >= 0) & (df_clean['exam_score'] <= 100)
]
print(f"Removed outliers. Rows remaining: {len(df_clean)}")

# Fix 3: Handle missing values (fill with median)
for col in df_clean.columns:
    median_val = df_clean[col].median()
    df_clean[col] = df_clean[col].fillna(median_val)
    if df_clean[col].isnull().any():
        print(f"Filled {col} missing values with median: {median_val:.1f}")

print(f"\nFinal clean dataset shape: {df_clean.shape}")
print(f"Missing values: {df_clean.isnull().sum().sum()}")

# ==============================================
# STEP 4: Train on CLEAN data
# ==============================================
X_clean = df_clean[['study_hours', 'sleep_hours']].values
y_clean = df_clean['exam_score'].values

model_clean = LinearRegression()
model_clean.fit(X_clean, y_clean)
pred_clean = model_clean.predict(X_clean)
mae_clean = mean_absolute_error(y_clean, pred_clean)

print(f"\n=== MODEL ON CLEAN DATA ===")
print(f"Coefficients: study={model_clean.coef_[0]:.2f}, sleep={model_clean.coef_[1]:.2f}")
print(f"Intercept: {model_clean.intercept_:.2f}")
print(f"MAE: {mae_clean:.2f}")
print(f"(True coefficients should be: study=5.00, sleep=3.00, intercept=10.00)")

# ==============================================
# STEP 5: Compare results
# ==============================================
print(f"\n{'='*50}")
print(f"{'COMPARISON':^50}")
print(f"{'='*50}")
print(f"{'Metric':<25} {'Messy Data':>12} {'Clean Data':>12}")
print(f"{'-'*50}")
print(f"{'Study coefficient':<25} {model_messy.coef_[0]:>12.2f} {model_clean.coef_[0]:>12.2f}")
print(f"{'Sleep coefficient':<25} {model_messy.coef_[1]:>12.2f} {model_clean.coef_[1]:>12.2f}")
print(f"{'Intercept':<25} {model_messy.intercept_:>12.2f} {model_clean.intercept_:>12.2f}")
print(f"{'MAE':<25} {mae_messy:>12.2f} {mae_clean:>12.2f}")
print(f"{'-'*50}")
print(f"{'TRUE values':<25} {'study=5.00':>12} {'sleep=3.00':>12}")
print(f"\nConclusion: Clean data produces a model much closer to the true relationship!")
```

**Questions to answer:**

1. How many data quality problems did you find in the messy dataset?
2. How did the messy data affect the model's learned coefficients compared to the true values?
3. After cleaning, how much closer are the coefficients to the true values?
4. In a real-world project, what other data quality issues might you encounter?

---

**Solution:**

1. **Data quality problems found:**
   - **Missing values:** 5 entries in study_hours were NaN (empty)
   - **Outliers:** 3 unrealistic values (exam score of 250, negative study hours, 30 hours of sleep)
   - **Duplicates:** 3 duplicate rows were added
   - **Total:** 3 types of problems affecting 11 rows

2. **Impact on messy model:** The messy data model's coefficients are noticeably off from the true values (study=5, sleep=3, intercept=10). The score of 250 pulls the model's predictions upward, the negative study hours confuse the relationship, and duplicates give some data points unfair extra weight. The MAE is higher because the model is trying to fit noise and errors.

3. **After cleaning:** The clean model's coefficients should be much closer to the true values of 5.0 and 3.0. The MAE drops significantly. The model now correctly captures that each hour of studying adds about 5 points and each hour of sleep adds about 3 points.

4. **Other real-world data quality issues:**
   - **Inconsistent formats:** "5 hours" vs "5h" vs "5.0" vs "five"
   - **Typos:** "Studdy_hours" instead of "Study_hours"
   - **Wrong units:** Mixing minutes and hours in the same column
   - **Outdated data:** Using 10-year-old data when patterns have changed
   - **Selection bias:** Only collecting data from top students (not representative)
   - **Label errors:** Some exam scores recorded incorrectly
   - **Imbalanced data:** 95% pass, 5% fail makes it hard to learn about failures
   - **Privacy issues:** Data containing personal information that needs to be removed

**Key Lesson:** "Garbage in, garbage out" is the most important rule in ML. No algorithm can overcome fundamentally bad data. Data cleaning often takes 60-80% of a data scientist's time, and it is the most impactful step in the entire ML process.
