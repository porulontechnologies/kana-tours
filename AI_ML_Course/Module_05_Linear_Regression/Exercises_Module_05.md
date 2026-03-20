# Module 5 Exercises: Linear Regression

---

## BEGINNER EXERCISES

### Exercise 1: Draw a Best-Fit Line by Hand

**Task:** Given the following data points, plot them on graph paper (or a coordinate grid) and draw the best-fit line by eye.

| Hours Studied (x) | Test Score (y) |
|---|---|
| 1 | 50 |
| 2 | 55 |
| 3 | 65 |
| 4 | 68 |
| 5 | 75 |
| 6 | 82 |
| 7 | 85 |
| 8 | 90 |

**Instructions:**
1. Draw an x-axis (Hours Studied, 0-10) and y-axis (Test Score, 40-100).
2. Plot each data point as a dot.
3. Draw a straight line that passes as close to all points as possible.
4. The line should have roughly equal numbers of points above and below it.

**Solution:**

When you plot these points, you should see a clear upward trend. Your hand-drawn line should:
- Start around (0, 44) on the y-axis
- End around (8, 91)
- Pass through or very close to the middle of the point cloud

The approximate best-fit line is: **y = 5.7x + 44**

This means: for every additional hour studied, the test score goes up by about 5.7 points, and someone who studied 0 hours would score around 44.

To verify your line is reasonable:
- Check that roughly half the points are above and half below.
- The line should follow the general direction of the points.
- It does NOT need to pass through any specific point.

---

### Exercise 2: Predict Values from a Graph

**Task:** Using the best-fit line from Exercise 1, predict the following:

1. What score would a student get if they studied for **3.5 hours**?
2. What score would a student get if they studied for **9 hours**?
3. How many hours would a student need to study to score **70**?

**Solution:**

Using the equation y = 5.7x + 44:

1. **3.5 hours:** y = 5.7(3.5) + 44 = 19.95 + 44 = **63.95 (about 64)**
2. **9 hours:** y = 5.7(9) + 44 = 51.3 + 44 = **95.3 (about 95)**
3. **Score of 70:** 70 = 5.7x + 44 → 26 = 5.7x → x = **4.56 hours (about 4.5 hours)**

Note: The prediction for 9 hours is an **extrapolation** (outside our data range of 1-8), so it may be less reliable. The predictions within the range (interpolation) are generally more trustworthy.

---

### Exercise 3: Identify Linear vs Non-Linear Relationships

**Task:** For each of the following scenarios, decide if the relationship is likely **linear** or **non-linear**. Explain your reasoning.

1. **Number of workers** vs **time to build a wall** (more workers = faster)
2. **Temperature outside** vs **ice cream sales**
3. **Years of education** vs **annual salary**
4. **Bacteria count over time** (bacteria double every hour)
5. **Distance driven** vs **fuel used** (at constant speed)
6. **Age of a car** vs **resale value**

**Solution:**

1. **Non-linear.** Doubling workers does NOT halve the time perfectly (diminishing returns, coordination overhead). The relationship is an inverse/hyperbolic curve.

2. **Roughly linear** (within a reasonable temperature range). As temperature increases, ice cream sales tend to increase at a fairly steady rate. Good candidate for linear regression!

3. **Roughly linear** for many ranges, but can be non-linear at extremes (e.g., PhD holders don't always earn proportionally more than Master's holders). Linear regression is a reasonable starting point.

4. **Non-linear (exponential).** Doubling every hour means 1 → 2 → 4 → 8 → 16... This is an exponential curve, NOT a straight line. Linear regression would be a bad choice here.

5. **Linear.** At constant speed, fuel consumption is roughly proportional to distance. Driving twice as far uses about twice the fuel. Great candidate for linear regression!

6. **Non-linear.** Cars lose value quickly in the first few years, then the depreciation slows down. This is a curved (exponential decay) relationship.

---

## INTERMEDIATE EXERCISES

### Exercise 4: Calculate Slope and Intercept Manually

**Task:** Calculate the slope (m) and intercept (b) for the following small dataset using the formulas.

| x (Years Experience) | y (Salary in $1000s) |
|---|---|
| 1 | 40 |
| 3 | 50 |
| 5 | 60 |
| 7 | 75 |
| 9 | 85 |

**Formulas:**
- Slope: m = [n * Σ(xy) - Σx * Σy] / [n * Σ(x²) - (Σx)²]
- Intercept: b = (Σy - m * Σx) / n

**Solution:**

Step 1: Calculate the needed sums.

| x | y | x*y | x² |
|---|---|---|---|
| 1 | 40 | 40 | 1 |
| 3 | 50 | 150 | 9 |
| 5 | 60 | 300 | 25 |
| 7 | 75 | 525 | 49 |
| 9 | 85 | 765 | 81 |

- n = 5
- Σx = 1 + 3 + 5 + 7 + 9 = **25**
- Σy = 40 + 50 + 60 + 75 + 85 = **310**
- Σ(xy) = 40 + 150 + 300 + 525 + 765 = **1780**
- Σ(x²) = 1 + 9 + 25 + 49 + 81 = **165**

Step 2: Calculate slope.

m = [5 * 1780 - 25 * 310] / [5 * 165 - 25²]
m = [8900 - 7750] / [825 - 625]
m = 1150 / 200
**m = 5.75**

Step 3: Calculate intercept.

b = (310 - 5.75 * 25) / 5
b = (310 - 143.75) / 5
b = 166.25 / 5
**b = 33.25**

**Final equation: Salary = 5.75 * Experience + 33.25** (in $1000s)

Interpretation:
- For every additional year of experience, salary increases by about **$5,750**.
- A person with 0 years of experience would earn about **$33,250** (the base salary).
- Prediction: 6 years of experience → 5.75(6) + 33.25 = **$67,750**

---

### Exercise 5: Create a Trendline in Google Sheets

**Task:** Use Google Sheets (or Excel) to create a scatter plot with a trendline for the following data.

| House Size (sq ft) | Price ($1000s) |
|---|---|
| 800 | 150 |
| 1000 | 180 |
| 1200 | 210 |
| 1400 | 245 |
| 1500 | 260 |
| 1800 | 310 |
| 2000 | 340 |
| 2200 | 380 |
| 2500 | 420 |
| 3000 | 500 |

**Instructions:**
1. Open Google Sheets and enter the data in two columns.
2. Select all the data (both columns).
3. Go to **Insert > Chart**.
4. Change chart type to **Scatter chart**.
5. Click on the chart, then click the three dots > **Edit chart**.
6. Go to the **Customize** tab > **Series**.
7. Check the box for **Trendline**.
8. Select **Linear** as the type.
9. Check **Show R²** and **Label > Use Equation**.

**Solution:**

After following the steps, you should see:
- A scatter plot with points trending upward
- A straight trendline through the points
- The equation displayed will be approximately: **y = 0.159x + 18.5** (meaning price = 0.159 * sqft + 18.5, in $1000s)
- The R² value should be approximately **0.997**, which is very high

**Interpretation:**
- For every additional square foot, the price increases by about **$159**.
- The base price (at 0 sq ft, theoretical) is about **$18,500**.
- R² of 0.997 means 99.7% of the price variation is explained by house size — an excellent linear fit!
- Prediction: A 1,600 sq ft house would cost about 0.159(1600) + 18.5 = **$273,000**

---

### Exercise 6: Interpret R² Values

**Task:** For each scenario below, you are given an R² value. Interpret what it means and decide if linear regression is a good choice.

1. **Predicting exam scores from hours studied:** R² = 0.82
2. **Predicting stock prices from company revenue:** R² = 0.15
3. **Predicting fuel consumption from distance driven:** R² = 0.98
4. **Predicting happiness from income:** R² = 0.35
5. **Predicting height from age (adults only, ages 25-60):** R² = 0.02

**Solution:**

1. **R² = 0.82 — Good fit!** 82% of the variation in exam scores is explained by study hours. Linear regression is a solid choice here. The remaining 18% comes from other factors (sleep, prior knowledge, test difficulty).

2. **R² = 0.15 — Poor fit.** Only 15% of stock price variation is explained by revenue. Linear regression is NOT a good choice. Stock prices depend on many more factors (market sentiment, competition, news). Try adding more features or a different model.

3. **R² = 0.98 — Excellent fit!** 98% of fuel consumption is explained by distance. This makes physical sense — fuel use is very linearly related to distance at constant speed. Linear regression is perfect here.

4. **R² = 0.35 — Mediocre fit.** Income explains only 35% of happiness variation. While there is some relationship (more money helps up to a point), many other factors matter (relationships, health, purpose). Linear regression captures part of the story but misses a lot. The relationship may also be non-linear (happiness plateaus at higher incomes).

5. **R² = 0.02 — Terrible fit.** Height barely changes between ages 25-60 for adults. Only 2% of height variation is explained by age. Linear regression is useless here — there is essentially no linear relationship. This is expected: adults don't grow taller with age!

---

## ADVANCED EXERCISES

### Exercise 7: Linear Regression with Python (scikit-learn)

**Task:** Build a linear regression model to predict house prices using Python and scikit-learn.

**Dataset:** We will create a synthetic dataset with house features.

```python
# ============================================================
# Exercise 7: House Price Prediction with Linear Regression
# ============================================================

import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# ----- Step 1: Create a synthetic dataset -----
np.random.seed(42)
n_samples = 100

# Features
size = np.random.randint(600, 3500, n_samples)          # Square footage
bedrooms = np.random.randint(1, 6, n_samples)            # Number of bedrooms

# Price formula (with some noise)
# price = 150 * size + 20000 * bedrooms + 50000 + noise
noise = np.random.normal(0, 15000, n_samples)
price = 150 * size + 20000 * bedrooms + 50000 + noise

print("Dataset created!")
print(f"  Samples: {n_samples}")
print(f"  Size range: {size.min()} - {size.max()} sq ft")
print(f"  Price range: ${price.min():,.0f} - ${price.max():,.0f}")
print()

# ----- Step 2: Simple Linear Regression (size only) -----
X_simple = size.reshape(-1, 1)  # Reshape for sklearn (needs 2D array)
y = price

# Split into training (80%) and testing (20%)
X_train, X_test, y_train, y_test = train_test_split(
    X_simple, y, test_size=0.2, random_state=42
)

# Create and train the model
model_simple = LinearRegression()
model_simple.fit(X_train, y_train)

# Get predictions
y_pred_simple = model_simple.predict(X_test)

# Print results
print("=" * 50)
print("SIMPLE LINEAR REGRESSION (Size only)")
print("=" * 50)
print(f"  Slope (m):     {model_simple.coef_[0]:,.2f}")
print(f"  Intercept (b): {model_simple.intercept_:,.2f}")
print(f"  Equation:      price = {model_simple.coef_[0]:.2f} * size + {model_simple.intercept_:,.2f}")
print()
print(f"  MAE:  ${mean_absolute_error(y_test, y_pred_simple):,.2f}")
print(f"  R²:   {r2_score(y_test, y_pred_simple):.4f}")
print()

# ----- Step 3: Plot the results -----
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Scatter plot with best-fit line
ax1 = axes[0]
ax1.scatter(X_test, y_test, color='#4A6CF7', alpha=0.6, label='Actual Prices')
ax1.scatter(X_test, y_pred_simple, color='#00D4AA', alpha=0.6, label='Predicted Prices')

# Draw the regression line
x_line = np.linspace(size.min(), size.max(), 100).reshape(-1, 1)
y_line = model_simple.predict(x_line)
ax1.plot(x_line, y_line, color='#EF4444', linewidth=2, label='Best Fit Line')

ax1.set_xlabel('House Size (sq ft)', fontsize=12)
ax1.set_ylabel('Price ($)', fontsize=12)
ax1.set_title('Simple Linear Regression: Size vs Price', fontsize=14)
ax1.legend()
ax1.grid(True, alpha=0.3)

# Plot 2: Actual vs Predicted
ax2 = axes[1]
ax2.scatter(y_test, y_pred_simple, color='#4A6CF7', alpha=0.6)
perfect_line = np.linspace(y_test.min(), y_test.max(), 100)
ax2.plot(perfect_line, perfect_line, color='#EF4444', linewidth=2, linestyle='--', label='Perfect Prediction')
ax2.set_xlabel('Actual Price ($)', fontsize=12)
ax2.set_ylabel('Predicted Price ($)', fontsize=12)
ax2.set_title('Actual vs Predicted Prices', fontsize=14)
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('exercise_7_simple_regression.png', dpi=150, bbox_inches='tight')
plt.show()
print("Plot saved as 'exercise_7_simple_regression.png'")

# ----- Step 4: Make predictions for new houses -----
print()
print("=" * 50)
print("PREDICTIONS FOR NEW HOUSES")
print("=" * 50)
new_houses = np.array([[1000], [1500], [2000], [2500], [3000]])
predictions = model_simple.predict(new_houses)

for size_val, pred in zip(new_houses.flatten(), predictions):
    print(f"  {size_val:,} sq ft  -->  ${pred:,.0f}")
```

**Expected Output:**

```
Dataset created!
  Samples: 100
  Size range: 612 - 3473 sq ft
  Price range: $112,xxx - $620,xxx

==================================================
SIMPLE LINEAR REGRESSION (Size only)
==================================================
  Slope (m):     152.xx
  Intercept (b): 89,xxx.xx
  Equation:      price = 152.xx * size + 89,xxx.xx

  MAE:  $24,xxx.xx
  R²:   0.87xx

==================================================
PREDICTIONS FOR NEW HOUSES
==================================================
  1,000 sq ft  -->  $241,xxx
  1,500 sq ft  -->  $317,xxx
  2,000 sq ft  -->  $393,xxx
  2,500 sq ft  -->  $469,xxx
  3,000 sq ft  -->  $545,xxx
```

**Key Observations:**
- The slope (~152) is close to our true value of 150, showing the model learned well.
- The R² (~0.87) is good but not perfect because we used only size (ignoring bedrooms).
- The MAE tells us predictions are off by ~$24,000 on average.

---

### Exercise 8: Plot and Analyze Residuals

**Task:** Extend Exercise 7 by plotting the residuals (prediction errors) to check if linear regression is appropriate.

```python
# ============================================================
# Exercise 8: Residual Analysis
# ============================================================

import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Recreate the dataset from Exercise 7
np.random.seed(42)
n_samples = 100
size = np.random.randint(600, 3500, n_samples)
bedrooms = np.random.randint(1, 6, n_samples)
noise = np.random.normal(0, 15000, n_samples)
price = 150 * size + 20000 * bedrooms + 50000 + noise

X_simple = size.reshape(-1, 1)
y = price

X_train, X_test, y_train, y_test = train_test_split(
    X_simple, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# ----- Calculate Residuals -----
residuals = y_test - y_pred

print("RESIDUAL ANALYSIS")
print("=" * 50)
print(f"  Mean residual:   ${np.mean(residuals):,.2f}")
print(f"  Std of residuals: ${np.std(residuals):,.2f}")
print(f"  Max overestimate: ${np.min(residuals):,.2f}")
print(f"  Max underestimate: ${np.max(residuals):,.2f}")
print()

# ----- Plot Residuals -----
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# Plot 1: Residuals vs Predicted Values
ax1 = axes[0]
ax1.scatter(y_pred, residuals, color='#4A6CF7', alpha=0.6)
ax1.axhline(y=0, color='#EF4444', linewidth=2, linestyle='--')
ax1.set_xlabel('Predicted Price ($)', fontsize=12)
ax1.set_ylabel('Residual ($)', fontsize=12)
ax1.set_title('Residuals vs Predicted Values', fontsize=14)
ax1.grid(True, alpha=0.3)

# Plot 2: Histogram of Residuals
ax2 = axes[1]
ax2.hist(residuals, bins=10, color='#4A6CF7', edgecolor='white', alpha=0.7)
ax2.axvline(x=0, color='#EF4444', linewidth=2, linestyle='--')
ax2.set_xlabel('Residual ($)', fontsize=12)
ax2.set_ylabel('Frequency', fontsize=12)
ax2.set_title('Distribution of Residuals', fontsize=14)
ax2.grid(True, alpha=0.3)

# Plot 3: Q-Q style - sorted residuals
ax3 = axes[2]
sorted_residuals = np.sort(residuals)
expected = np.linspace(-2, 2, len(sorted_residuals))
ax3.scatter(expected, sorted_residuals, color='#00D4AA', alpha=0.7)
ax3.set_xlabel('Expected (Theoretical)', fontsize=12)
ax3.set_ylabel('Actual Residual ($)', fontsize=12)
ax3.set_title('Residual Normality Check', fontsize=14)
ax3.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('exercise_8_residuals.png', dpi=150, bbox_inches='tight')
plt.show()
print("Plot saved as 'exercise_8_residuals.png'")

# ----- Interpretation -----
print()
print("INTERPRETATION")
print("=" * 50)
print("What to look for in residual plots:")
print()
print("1. Residuals vs Predicted:")
print("   GOOD: Random scatter around 0 (no pattern)")
print("   BAD:  A funnel shape, curve, or clear pattern")
print()
print("2. Histogram of Residuals:")
print("   GOOD: Bell-shaped (roughly normal distribution)")
print("   BAD:  Skewed to one side or multiple peaks")
print()
print("3. In our case:")
if abs(np.mean(residuals)) < 5000:
    print("   - Mean residual is near 0: GOOD (no systematic bias)")
if np.std(residuals) < 50000:
    print("   - Residuals have moderate spread (some error is expected)")
print("   - The scatter has no obvious pattern: linear model is appropriate")
print("   - BUT: spread suggests we're missing a variable (bedrooms!)")
```

**What Good Residuals Look Like:**
- Randomly scattered around zero (no curve or funnel shape)
- Roughly normally distributed (bell-shaped histogram)
- Mean near zero (the model isn't systematically biased)

**What Bad Residuals Look Like:**
- A U-shape or pattern (means the relationship isn't linear)
- A funnel shape (means errors grow with larger values)
- Heavily skewed distribution (means the model is biased)

---

### Exercise 9: Multiple Linear Regression (Multiple Features)

**Task:** Improve the model from Exercise 7 by using BOTH house size AND number of bedrooms.

```python
# ============================================================
# Exercise 9: Multiple Linear Regression
# ============================================================

import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Recreate dataset
np.random.seed(42)
n_samples = 100
size = np.random.randint(600, 3500, n_samples)
bedrooms = np.random.randint(1, 6, n_samples)
noise = np.random.normal(0, 15000, n_samples)
price = 150 * size + 20000 * bedrooms + 50000 + noise

# ----- Simple model (size only) -----
X_simple = size.reshape(-1, 1)
y = price

X_train_s, X_test_s, y_train, y_test = train_test_split(
    X_simple, y, test_size=0.2, random_state=42
)

model_simple = LinearRegression()
model_simple.fit(X_train_s, y_train)
y_pred_simple = model_simple.predict(X_test_s)

mae_simple = mean_absolute_error(y_test, y_pred_simple)
r2_simple = r2_score(y_test, y_pred_simple)

# ----- Multiple model (size + bedrooms) -----
X_multi = np.column_stack([size, bedrooms])  # Combine features into 2D array

X_train_m, X_test_m, y_train_m, y_test_m = train_test_split(
    X_multi, y, test_size=0.2, random_state=42
)

model_multi = LinearRegression()
model_multi.fit(X_train_m, y_train_m)
y_pred_multi = model_multi.predict(X_test_m)

mae_multi = mean_absolute_error(y_test_m, y_pred_multi)
r2_multi = r2_score(y_test_m, y_pred_multi)

# ----- Compare Results -----
print("=" * 60)
print("MODEL COMPARISON")
print("=" * 60)
print()
print("Simple Model (size only):")
print(f"  Equation: price = {model_simple.coef_[0]:.2f} * size + {model_simple.intercept_:,.2f}")
print(f"  MAE:  ${mae_simple:,.2f}")
print(f"  R²:   {r2_simple:.4f}")
print()
print("Multiple Model (size + bedrooms):")
print(f"  Equation: price = {model_multi.coef_[0]:.2f} * size + {model_multi.coef_[1]:,.2f} * bedrooms + {model_multi.intercept_:,.2f}")
print(f"  MAE:  ${mae_multi:,.2f}")
print(f"  R²:   {r2_multi:.4f}")
print()
print("Improvement:")
print(f"  MAE reduced by: ${mae_simple - mae_multi:,.2f} ({(mae_simple - mae_multi) / mae_simple * 100:.1f}%)")
print(f"  R² improved by: {r2_multi - r2_simple:.4f}")
print()

# ----- Interpretation -----
print("INTERPRETATION")
print("=" * 60)
print(f"  Each sq ft adds:       ${model_multi.coef_[0]:,.2f} to price (true: $150)")
print(f"  Each bedroom adds:     ${model_multi.coef_[1]:,.2f} to price (true: $20,000)")
print(f"  Base price:            ${model_multi.intercept_:,.2f} (true: $50,000)")
print()

# ----- Plot comparison -----
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Simple model
ax1 = axes[0]
ax1.scatter(y_test, y_pred_simple, color='#4A6CF7', alpha=0.6, label=f'R² = {r2_simple:.3f}')
perfect = np.linspace(min(y_test.min(), y_test_m.min()), max(y_test.max(), y_test_m.max()), 100)
ax1.plot(perfect, perfect, color='#EF4444', linewidth=2, linestyle='--', label='Perfect')
ax1.set_xlabel('Actual Price ($)', fontsize=12)
ax1.set_ylabel('Predicted Price ($)', fontsize=12)
ax1.set_title('Simple Model (Size Only)', fontsize=14)
ax1.legend(fontsize=11)
ax1.grid(True, alpha=0.3)

# Multiple model
ax2 = axes[1]
ax2.scatter(y_test_m, y_pred_multi, color='#00D4AA', alpha=0.6, label=f'R² = {r2_multi:.3f}')
ax2.plot(perfect, perfect, color='#EF4444', linewidth=2, linestyle='--', label='Perfect')
ax2.set_xlabel('Actual Price ($)', fontsize=12)
ax2.set_ylabel('Predicted Price ($)', fontsize=12)
ax2.set_title('Multiple Model (Size + Bedrooms)', fontsize=14)
ax2.legend(fontsize=11)
ax2.grid(True, alpha=0.3)

plt.suptitle('Simple vs Multiple Linear Regression', fontsize=16, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig('exercise_9_comparison.png', dpi=150, bbox_inches='tight')
plt.show()
print("Plot saved as 'exercise_9_comparison.png'")

# ----- Predict new houses -----
print()
print("=" * 60)
print("PREDICTIONS FOR NEW HOUSES (Multiple Model)")
print("=" * 60)
new_houses = np.array([
    [1000, 2],   # 1000 sq ft, 2 bedrooms
    [1500, 3],   # 1500 sq ft, 3 bedrooms
    [2000, 3],   # 2000 sq ft, 3 bedrooms
    [2000, 5],   # 2000 sq ft, 5 bedrooms (more bedrooms)
    [3000, 4],   # 3000 sq ft, 4 bedrooms
])

predictions = model_multi.predict(new_houses)

print(f"  {'Size':>10}  {'Beds':>6}  {'Predicted Price':>16}")
print(f"  {'-'*10}  {'-'*6}  {'-'*16}")
for house, pred in zip(new_houses, predictions):
    print(f"  {house[0]:>8,.0f}ft  {house[1]:>5.0f}br  ${pred:>14,.0f}")

print()
print("Notice: A 2000 sq ft house with 5 bedrooms costs MORE than one")
print("with 3 bedrooms — the model correctly learned the bedroom effect!")
```

**Expected Output:**

The multiple model should show significant improvement:
- R² improves from ~0.87 to ~0.97+
- MAE drops substantially
- The learned coefficients should be close to the true values (150 for size, 20000 for bedrooms, 50000 for intercept)

**Key Lessons:**
- Adding relevant features (bedrooms) significantly improves predictions.
- Multiple linear regression extends y = mx + b to y = m1*x1 + m2*x2 + b.
- Each coefficient tells you how much that feature contributes to the prediction.
- The model learned that each bedroom is worth about $20,000 — without being told!

---

## BONUS CHALLENGE

### Exercise 10: End-to-End Mini Project

**Task:** Build a complete linear regression project from scratch.

1. Choose a real dataset from one of these sources:
   - [Kaggle Datasets](https://www.kaggle.com/datasets) (search for "housing", "salary", or "cars")
   - Use the built-in Boston housing alternative from sklearn

2. Follow this workflow:
   - Load and explore the data (print shape, statistics, check for missing values)
   - Visualize the relationships (scatter plots for each feature vs target)
   - Split into train/test sets (80/20)
   - Train a linear regression model
   - Evaluate with MAE and R²
   - Plot actual vs predicted
   - Analyze residuals
   - Write 3 sentences interpreting your results

```python
# ============================================================
# Exercise 10: Template for End-to-End Project
# ============================================================

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.datasets import fetch_california_housing

# ----- Step 1: Load Data -----
data = fetch_california_housing()
df = pd.DataFrame(data.data, columns=data.feature_names)
df['Price'] = data.target  # Price is in $100,000s

print("Dataset Shape:", df.shape)
print()
print("First 5 rows:")
print(df.head())
print()
print("Statistics:")
print(df.describe().round(2))
print()

# ----- Step 2: Visualize -----
fig, axes = plt.subplots(2, 4, figsize=(18, 8))
for i, col in enumerate(data.feature_names):
    ax = axes[i // 4][i % 4]
    ax.scatter(df[col], df['Price'], alpha=0.1, color='#4A6CF7', s=5)
    ax.set_xlabel(col, fontsize=10)
    ax.set_ylabel('Price ($100k)', fontsize=10)
    ax.set_title(f'{col} vs Price', fontsize=11)
    ax.grid(True, alpha=0.3)

plt.suptitle('Feature vs Price Relationships', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('exercise_10_exploration.png', dpi=150, bbox_inches='tight')
plt.show()

# ----- Step 3: Train Model -----
X = df[data.feature_names]
y = df['Price']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# ----- Step 4: Evaluate -----
print("=" * 50)
print("MODEL RESULTS")
print("=" * 50)
print(f"  MAE:  ${mean_absolute_error(y_test, y_pred) * 100000:,.0f}")
print(f"  R²:   {r2_score(y_test, y_pred):.4f}")
print()

# Feature importance
print("Feature Importance (coefficients):")
for name, coef in sorted(zip(data.feature_names, model.coef_), key=lambda x: abs(x[1]), reverse=True):
    print(f"  {name:>12}: {coef:>10.4f}")

# ----- Step 5: Plot Results -----
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

ax1 = axes[0]
ax1.scatter(y_test, y_pred, alpha=0.3, color='#4A6CF7', s=10)
perfect = np.linspace(y_test.min(), y_test.max(), 100)
ax1.plot(perfect, perfect, color='#EF4444', linewidth=2, linestyle='--')
ax1.set_xlabel('Actual Price ($100k)', fontsize=12)
ax1.set_ylabel('Predicted Price ($100k)', fontsize=12)
ax1.set_title('Actual vs Predicted', fontsize=14)
ax1.grid(True, alpha=0.3)

residuals = y_test - y_pred
ax2 = axes[1]
ax2.scatter(y_pred, residuals, alpha=0.3, color='#00D4AA', s=10)
ax2.axhline(y=0, color='#EF4444', linewidth=2, linestyle='--')
ax2.set_xlabel('Predicted Price ($100k)', fontsize=12)
ax2.set_ylabel('Residual ($100k)', fontsize=12)
ax2.set_title('Residual Analysis', fontsize=14)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('exercise_10_results.png', dpi=150, bbox_inches='tight')
plt.show()

print()
print("INTERPRETATION:")
print("Write 3 sentences about what you observe!")
print("Hint: Look at R², which features matter most,")
print("and whether the residuals show any patterns.")
```

**What You Should Observe:**
- R² will be around 0.6 — decent but not great (housing prices depend on many non-linear factors)
- MedInc (median income) is typically the strongest predictor
- Residuals may show a funnel pattern, suggesting a non-linear model might work better
- This is a real lesson: linear regression is a great starting point, but sometimes you need more advanced models!

---

## Summary of Skills Practiced

| Exercise | Skill | Level |
|---|---|---|
| 1 | Visual intuition for best-fit lines | Beginner |
| 2 | Making predictions from a linear model | Beginner |
| 3 | Recognizing linear vs non-linear patterns | Beginner |
| 4 | Manual calculation of slope and intercept | Intermediate |
| 5 | Using spreadsheet tools for regression | Intermediate |
| 6 | Interpreting model evaluation metrics | Intermediate |
| 7 | Python scikit-learn linear regression | Advanced |
| 8 | Residual analysis and model validation | Advanced |
| 9 | Multiple features and model comparison | Advanced |
| 10 | End-to-end ML project workflow | Advanced |
