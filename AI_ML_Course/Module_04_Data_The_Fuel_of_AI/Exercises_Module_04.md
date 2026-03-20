# Module 4: Data — The Fuel of AI
## Exercises & Solutions

---

# BEGINNER EXERCISES

---

## Exercise 1: Identify the Data Type

For each item below, identify the data type: **Numbers**, **Text**, **Images**, **Audio**, or **Time Series**.

| # | Data Example | Your Answer |
|---|---|---|
| 1 | A customer's age (25 years old) | |
| 2 | A product review on Amazon | |
| 3 | A chest X-ray scan | |
| 4 | A recorded phone call to customer service | |
| 5 | Daily stock prices of Apple over 1 year | |
| 6 | The temperature in your city right now (72°F) | |
| 7 | A tweet about the weather | |
| 8 | A satellite photo of a forest | |
| 9 | Monthly electricity bills for the past 3 years | |
| 10 | A podcast episode about technology | |

### Solution

| # | Data Example | Answer | Explanation |
|---|---|---|---|
| 1 | A customer's age (25 years old) | **Numbers** | Age is a numerical/quantitative value |
| 2 | A product review on Amazon | **Text** | Written language, unstructured text data |
| 3 | A chest X-ray scan | **Images** | Visual/pixel data in image format |
| 4 | A recorded phone call | **Audio** | Sound wave data captured as audio |
| 5 | Daily stock prices over 1 year | **Time Series** | Numerical data collected at regular time intervals |
| 6 | Temperature right now (72°F) | **Numbers** | A single numerical measurement |
| 7 | A tweet about the weather | **Text** | Short-form written text |
| 8 | A satellite photo of a forest | **Images** | Visual data captured from satellite |
| 9 | Monthly electricity bills for 3 years | **Time Series** | Numerical data tracked over time periods |
| 10 | A podcast episode | **Audio** | Spoken word recorded as audio data |

---

## Exercise 2: Structured vs Unstructured

Classify each data source as **Structured** or **Unstructured**.

| # | Data Source | Structured or Unstructured? |
|---|---|---|
| 1 | An Excel spreadsheet of student grades | |
| 2 | A collection of Instagram photos | |
| 3 | A SQL database of employee records | |
| 4 | Emails in your inbox | |
| 5 | A CSV file of weather measurements | |
| 6 | YouTube video comments | |
| 7 | A hospital patient database | |
| 8 | A folder of PDF research papers | |
| 9 | A table of flight departure times | |
| 10 | Voice messages on WhatsApp | |

### Solution

| # | Data Source | Answer | Explanation |
|---|---|---|---|
| 1 | Excel spreadsheet of student grades | **Structured** | Organized in rows (students) and columns (subjects/grades) |
| 2 | Instagram photos | **Unstructured** | Images have no fixed tabular format |
| 3 | SQL database of employee records | **Structured** | Organized in defined tables with rows and columns |
| 4 | Emails in your inbox | **Unstructured** | Free-form text with varying formats and lengths |
| 5 | CSV file of weather measurements | **Structured** | Comma-separated values in rows and columns |
| 6 | YouTube video comments | **Unstructured** | Free-form text of varying lengths |
| 7 | Hospital patient database | **Structured** | Organized records with defined fields (name, age, diagnosis) |
| 8 | Folder of PDF research papers | **Unstructured** | Documents with mixed text, images, and layouts |
| 9 | Table of flight departure times | **Structured** | Organized in rows (flights) and columns (time, gate, etc.) |
| 10 | WhatsApp voice messages | **Unstructured** | Audio data with no fixed format |

---

## Exercise 3: Spot the Data Quality Problems

Look at the following mini-dataset of a pet store inventory. Find ALL the data quality problems.

| ID | Pet Name | Species | Age | Price ($) | In Stock |
|----|----------|---------|-----|-----------|----------|
| 1 | Buddy | Dog | 2 | 500 | Yes |
| 2 | Whiskers | Cat | 3 | 250 | Yes |
| 3 | Buddy | Dog | 2 | 500 | Yes |
| 4 | Goldie | Fish | | 15 | Yes |
| 5 | Rex | Dogg | 4 | 350 | Yes |
| 6 | Tweety | Bird | 1 | -50 | Yes |
| 7 | Slither | Snake | 150 | 200 | |
| 8 | Luna | cat | 2 | 300 | No |

**Task:** List every data quality issue you can find and explain what type of problem it is.

### Solution

1. **Duplicate Record (Row 3):** Row 3 is an exact copy of Row 1 (Buddy, Dog, 2, $500). This is a **duplicate** that should be removed.

2. **Missing Value (Row 4, Age):** Goldie the Fish has no age listed. This is a **missing value** that needs to be filled or handled.

3. **Typo / Incorrect Data (Row 5, Species):** "Dogg" should be "Dog". This is an **incorrect data / typo** problem.

4. **Negative Price / Outlier (Row 6, Price):** Tweety the Bird has a price of -$50. Prices cannot be negative. This is an **outlier / incorrect data** issue.

5. **Unrealistic Outlier (Row 7, Age):** Slither the Snake is listed as 150 years old. Most snakes live 15-30 years. This is an **outlier** that is likely a data entry error (maybe should be 15 or 1.5).

6. **Missing Value (Row 7, In Stock):** The "In Stock" field is empty for Slither. This is a **missing value**.

7. **Inconsistent Formatting (Row 8, Species):** "cat" is lowercase while all other species are capitalized ("Cat", "Dog"). This is an **inconsistency** problem that could cause the AI to treat "cat" and "Cat" as different species.

**Total issues found: 7**

---

# INTERMEDIATE EXERCISES

---

## Exercise 4: Clean a Messy Dataset (On Paper)

You received the following dataset for a movie recommendation system. Clean it step by step.

**Original Dataset:**

| User ID | Movie Title | Rating (1-5) | Genre | Watch Date |
|---------|------------|---------------|-------|------------|
| U001 | The Matrix | 5 | Sci-Fi | 2024-01-15 |
| U002 | Titanic | 4 | Romance | Jan 20, 2024 |
| U001 | The Matrix | 5 | Sci-Fi | 2024-01-15 |
| U003 | Inception | | Sci-fi | 2024-02-01 |
| U004 | The Godfather | 7 | Crime | 2024-02-10 |
| U005 | Frozen | 3 | animation | 2024/03/05 |
| U002 | | 4 | Drama | 2024-03-15 |
| U006 | Toy Story | 2 | Animation | 24-04-01 |

**Task:** Go through each row and document:
1. What problems exist
2. How you would fix them
3. Write the final cleaned dataset

### Solution

**Problems and Fixes:**

| Row | Problem | Type | Fix |
|-----|---------|------|-----|
| Row 2 | Date format inconsistent ("Jan 20, 2024" vs "2024-01-15") | Inconsistency | Convert to "2024-01-20" |
| Row 3 | Duplicate of Row 1 (same user, movie, rating, date) | Duplicate | Remove this row |
| Row 4 | Missing rating | Missing Value | Option A: Ask for data. Option B: Use average rating. Option C: Remove row |
| Row 4 | "Sci-fi" vs "Sci-Fi" (capitalization) | Inconsistency | Standardize to "Sci-Fi" |
| Row 5 | Rating = 7, but scale is 1-5 | Out of Range | Investigate — could be a typo (maybe 4 or 5?). Flag for review |
| Row 6 | "animation" not capitalized | Inconsistency | Standardize to "Animation" |
| Row 6 | Date format "2024/03/05" uses slashes | Inconsistency | Convert to "2024-03-05" |
| Row 7 | Movie Title is missing | Missing Value | Cannot fix without external info — remove row or flag |
| Row 8 | Date format "24-04-01" (2-digit year) | Inconsistency | Convert to "2024-04-01" |

**Cleaned Dataset:**

| User ID | Movie Title | Rating (1-5) | Genre | Watch Date |
|---------|------------|---------------|-------|------------|
| U001 | The Matrix | 5 | Sci-Fi | 2024-01-15 |
| U002 | Titanic | 4 | Romance | 2024-01-20 |
| U003 | Inception | 3 (avg) | Sci-Fi | 2024-02-01 |
| U004 | The Godfather | 5 (capped) | Crime | 2024-02-10 |
| U005 | Frozen | 3 | Animation | 2024-03-05 |
| U006 | Toy Story | 2 | Animation | 2024-04-01 |

**Rows removed:** Row 3 (duplicate), Row 7 (missing critical field)
**Decisions made:** Row 4 rating filled with average (3), Row 5 rating capped at max (5)

---

## Exercise 5: Design a Data Collection Plan

**Scenario:** You want to build an AI that predicts whether a restaurant will be popular (rating > 4.0 stars).

**Task:** Design a complete data collection plan by answering:

1. What data would you collect? (List at least 8 features)
2. Where would you get this data?
3. What data quality issues might you encounter?
4. How much data would you need?
5. How would you split training/testing data?

### Solution

**1. Features to Collect (at least 8):**

| Feature | Type | Example |
|---------|------|---------|
| Restaurant Name | Text | "Joe's Pizza" |
| Cuisine Type | Text (categorical) | Italian, Mexican, Chinese |
| Average Price per Meal ($) | Number | $15.50 |
| Number of Reviews | Number | 342 |
| Current Star Rating | Number | 4.2 |
| Location (Zip Code) | Text/Number | 90210 |
| Has Outdoor Seating | Boolean (Yes/No) | Yes |
| Has Delivery Option | Boolean (Yes/No) | Yes |
| Years in Business | Number | 5 |
| Number of Menu Items | Number | 45 |
| Average Wait Time (min) | Number | 20 |
| Social Media Followers | Number | 5,200 |

**2. Data Sources:**
- Google Maps API / Yelp API (ratings, reviews, location)
- Restaurant websites (menu items, prices)
- Public business registries (years in business)
- Social media platforms (follower counts)
- Food delivery apps like DoorDash/UberEats (delivery options, wait times)
- Web scraping from review sites

**3. Potential Data Quality Issues:**
- **Missing values:** Not all restaurants list prices or wait times
- **Inconsistency:** Different rating scales across platforms (Yelp 1-5, Google 1-5, TripAdvisor 1-5 but with different distributions)
- **Bias:** Popular areas may have more reviews, skewing the data
- **Outdated info:** Restaurants change menus, prices, and owners
- **Duplicates:** Same restaurant listed under slightly different names

**4. How Much Data:**
- Minimum: 500-1,000 restaurants for a basic model
- Ideal: 5,000-10,000 restaurants for better accuracy
- Should include a balanced mix of popular (rating > 4.0) and unpopular restaurants
- Aim for roughly 40-60% popular vs 40-60% unpopular (balanced classes)

**5. Train/Test Split:**
- 80% Training (4,000 restaurants if using 5,000 total)
- 20% Testing (1,000 restaurants)
- Use random shuffling to ensure both sets have a mix of popular and unpopular
- Consider geographic diversity in both sets

---

## Exercise 6: Explore Kaggle Datasets

**Task:** Visit [kaggle.com/datasets](https://kaggle.com/datasets) and find 3 datasets. For each one, answer:

1. What is the dataset about?
2. How many rows/columns does it have?
3. What types of data does it contain? (Numbers, Text, Images, etc.)
4. Is it structured or unstructured?
5. What AI problem could you solve with it?
6. What data quality issues might exist?

### Solution (Example answers — yours will vary)

**Dataset 1: Titanic Dataset**
1. Passenger information from the Titanic (name, age, class, survival status)
2. ~891 rows, 12 columns
3. Numbers (age, fare), Text (name, ticket), Categorical (sex, embarked)
4. Structured (CSV table)
5. Classification: Predict whether a passenger survived
6. Missing values in Age (~20% missing) and Cabin (~77% missing)

**Dataset 2: MNIST Handwritten Digits**
1. Images of handwritten digits (0-9) for digit recognition
2. 70,000 images, 28x28 pixels each
3. Images (grayscale pixel values)
4. Structured (pixel values in grid) but originally image data
5. Image Classification: Recognize which digit is in each image
6. Some digits are ambiguous (messy handwriting), limited diversity in writing styles

**Dataset 3: Amazon Product Reviews**
1. Customer reviews of products with ratings and review text
2. Millions of rows, typically 8-10 columns
3. Text (review body, summary), Numbers (rating, helpful votes)
4. Mix — structured metadata + unstructured review text
5. Sentiment Analysis: Predict if a review is positive or negative
6. Fake reviews, spam, very short unhelpful reviews, rating distribution heavily skewed toward 5 stars

---

# ADVANCED EXERCISES

---

## Exercise 7: Python Pandas Data Cleaning

**Task:** Write Python code to clean a messy dataset. You can run this in Google Colab or Jupyter Notebook.

```python
import pandas as pd
import numpy as np

# Create a messy dataset
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Alice', 'Eve', 'Frank', None, 'Grace'],
    'Age': [25, 300, 35, 25, np.nan, 28, 45, -5],
    'Salary': [50000, 60000, np.nan, 50000, 75000, 'sixty thousand', 80000, 55000],
    'Department': ['Engineering', 'engineering', 'Marketing', 'Engineering',
                   'Sales', 'Engineering', 'MARKETING', 'Sales'],
    'Join_Date': ['2020-01-15', '2019/06/20', '2021-03-10', '2020-01-15',
                  'Jan 5, 2022', '2020-11-30', '2018-07-25', '23-02-01'],
    'Email': ['alice@co.com', 'bob@co.com', 'charlie@co.com', 'alice@co.com',
              'eve@', 'frank@co.com', 'grace@co.com', 'grace@co.com']
}

df = pd.DataFrame(data)
print("=== ORIGINAL MESSY DATA ===")
print(df)
print(f"\nShape: {df.shape}")
print(f"\nData types:\n{df.dtypes}")
print(f"\nMissing values:\n{df.isnull().sum()}")
```

**Your tasks:**
1. Remove duplicate rows
2. Handle missing values (Name and Age)
3. Fix outliers in Age (remove unrealistic values like 300 and -5)
4. Fix the Salary column (convert all to numbers)
5. Standardize the Department names (consistent capitalization)
6. Standardize all dates to YYYY-MM-DD format
7. Validate email addresses (flag invalid ones)
8. Print the cleaned dataset and a summary of changes

### Solution

```python
import pandas as pd
import numpy as np
import re

# Create the messy dataset
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Alice', 'Eve', 'Frank', None, 'Grace'],
    'Age': [25, 300, 35, 25, np.nan, 28, 45, -5],
    'Salary': [50000, 60000, np.nan, 50000, 75000, 'sixty thousand', 80000, 55000],
    'Department': ['Engineering', 'engineering', 'Marketing', 'Engineering',
                   'Sales', 'Engineering', 'MARKETING', 'Sales'],
    'Join_Date': ['2020-01-15', '2019/06/20', '2021-03-10', '2020-01-15',
                  'Jan 5, 2022', '2020-11-30', '2018-07-25', '23-02-01'],
    'Email': ['alice@co.com', 'bob@co.com', 'charlie@co.com', 'alice@co.com',
              'eve@', 'frank@co.com', 'grace@co.com', 'grace@co.com']
}

df = pd.DataFrame(data)
print("=== ORIGINAL MESSY DATA ===")
print(df)
print(f"\nShape: {df.shape}")
changes_log = []

# ---- STEP 1: Remove duplicates ----
rows_before = len(df)
df = df.drop_duplicates()
rows_removed = rows_before - len(df)
changes_log.append(f"Removed {rows_removed} duplicate row(s)")
print(f"\n[Step 1] Removed {rows_removed} duplicate(s). Rows: {len(df)}")

# ---- STEP 2: Handle missing Name ----
df = df.dropna(subset=['Name'])
changes_log.append("Dropped rows with missing Name")
print(f"[Step 2] Dropped rows with missing Name. Rows: {len(df)}")

# ---- STEP 3: Fix Age outliers ----
# Reasonable age range: 18-65 for employees
age_mask = (df['Age'] < 18) | (df['Age'] > 100)
outlier_count = age_mask.sum()
df.loc[age_mask, 'Age'] = np.nan  # Set outliers to NaN
# Fill missing ages with median
median_age = df['Age'].median()
df['Age'] = df['Age'].fillna(median_age)
df['Age'] = df['Age'].astype(int)
changes_log.append(f"Fixed {outlier_count} age outlier(s), filled with median ({median_age})")
print(f"[Step 3] Fixed {outlier_count} age outlier(s). Filled with median: {median_age}")

# ---- STEP 4: Fix Salary column ----
def clean_salary(val):
    if pd.isna(val):
        return np.nan
    if isinstance(val, (int, float)):
        return float(val)
    # Try to extract numbers
    val_str = str(val).lower().strip()
    # Handle word-based salaries
    word_to_num = {
        'sixty thousand': 60000,
        'fifty thousand': 50000,
        'seventy thousand': 70000,
        'eighty thousand': 80000,
    }
    if val_str in word_to_num:
        return float(word_to_num[val_str])
    # Try to extract digits
    nums = re.findall(r'[\d.]+', val_str)
    if nums:
        return float(nums[0])
    return np.nan

df['Salary'] = df['Salary'].apply(clean_salary)
# Fill missing salary with median
median_salary = df['Salary'].median()
df['Salary'] = df['Salary'].fillna(median_salary)
df['Salary'] = df['Salary'].astype(int)
changes_log.append("Converted all salaries to numbers, filled missing with median")
print(f"[Step 4] Cleaned Salary column. Median fill: {median_salary}")

# ---- STEP 5: Standardize Department names ----
df['Department'] = df['Department'].str.strip().str.title()
changes_log.append("Standardized Department names to Title Case")
print(f"[Step 5] Standardized Department names")

# ---- STEP 6: Standardize dates ----
def parse_date(date_str):
    formats = ['%Y-%m-%d', '%Y/%m/%d', '%b %d, %Y', '%y-%m-%d']
    for fmt in formats:
        try:
            return pd.to_datetime(date_str, format=fmt).strftime('%Y-%m-%d')
        except (ValueError, TypeError):
            continue
    try:
        return pd.to_datetime(date_str).strftime('%Y-%m-%d')
    except:
        return None

df['Join_Date'] = df['Join_Date'].apply(parse_date)
changes_log.append("Standardized all dates to YYYY-MM-DD format")
print(f"[Step 6] Standardized date formats")

# ---- STEP 7: Validate emails ----
def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, str(email)))

df['Email_Valid'] = df['Email'].apply(is_valid_email)
invalid_count = (~df['Email_Valid']).sum()
changes_log.append(f"Flagged {invalid_count} invalid email(s)")
print(f"[Step 7] Flagged {invalid_count} invalid email(s)")

# ---- FINAL RESULT ----
print("\n=== CLEANED DATA ===")
print(df)
print(f"\nFinal shape: {df.shape}")
print(f"\n=== CHANGES LOG ===")
for change in changes_log:
    print(f"  - {change}")
```

**Expected Output Summary:**
- Started with 8 rows, ended with 6 rows
- Removed 1 duplicate (Alice's second entry)
- Removed 1 row with missing Name
- Fixed 2 age outliers (300 and -5) replaced with median
- Converted "sixty thousand" to 60000
- Standardized "engineering" and "MARKETING" to "Engineering" and "Marketing"
- Converted all dates to YYYY-MM-DD format
- Flagged "eve@" as invalid email

---

## Exercise 8: Data Visualization with Matplotlib

**Task:** Create visualizations to explore data quality and distribution. Use the provided dataset or any Kaggle dataset.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create a sample student performance dataset
np.random.seed(42)
n = 200

data = {
    'Student_ID': range(1, n + 1),
    'Study_Hours': np.random.normal(5, 2, n).clip(0, 15),
    'Sleep_Hours': np.random.normal(7, 1.5, n).clip(3, 12),
    'Attendance_%': np.random.normal(75, 15, n).clip(0, 100),
    'Previous_Score': np.random.normal(70, 12, n).clip(0, 100),
    'Final_Score': None  # We'll calculate this
}

df = pd.DataFrame(data)

# Final score depends on other factors (with some noise)
df['Final_Score'] = (
    df['Study_Hours'] * 5 +
    df['Sleep_Hours'] * 2 +
    df['Attendance_%'] * 0.3 +
    df['Previous_Score'] * 0.4 +
    np.random.normal(0, 8, n)
).clip(0, 100)

# Inject some data quality issues
df.loc[5, 'Study_Hours'] = np.nan
df.loc[15, 'Sleep_Hours'] = np.nan
df.loc[25, 'Final_Score'] = np.nan
df.loc[50, 'Study_Hours'] = 50   # Outlier
df.loc[100, 'Final_Score'] = -10  # Negative score
df.loc[150, 'Attendance_%'] = 200  # Over 100%

print("Dataset shape:", df.shape)
print("\nFirst 5 rows:")
print(df.head())
print("\nMissing values:")
print(df.isnull().sum())
print("\nBasic statistics:")
print(df.describe())
```

**Your tasks:**
1. Create a bar chart showing missing values per column
2. Create histograms for each numerical column to spot outliers
3. Create a scatter plot of Study_Hours vs Final_Score
4. Create a correlation heatmap
5. Create a box plot to identify outliers
6. Write a summary of what you found

### Solution

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

# Create the dataset (same as above)
np.random.seed(42)
n = 200

data = {
    'Student_ID': range(1, n + 1),
    'Study_Hours': np.random.normal(5, 2, n).clip(0, 15),
    'Sleep_Hours': np.random.normal(7, 1.5, n).clip(3, 12),
    'Attendance_%': np.random.normal(75, 15, n).clip(0, 100),
    'Previous_Score': np.random.normal(70, 12, n).clip(0, 100),
    'Final_Score': None
}

df = pd.DataFrame(data)
df['Final_Score'] = (
    df['Study_Hours'] * 5 +
    df['Sleep_Hours'] * 2 +
    df['Attendance_%'] * 0.3 +
    df['Previous_Score'] * 0.4 +
    np.random.normal(0, 8, n)
).clip(0, 100)

# Inject data quality issues
df.loc[5, 'Study_Hours'] = np.nan
df.loc[15, 'Sleep_Hours'] = np.nan
df.loc[25, 'Final_Score'] = np.nan
df.loc[50, 'Study_Hours'] = 50
df.loc[100, 'Final_Score'] = -10
df.loc[150, 'Attendance_%'] = 200

# ---- VISUALIZATION 1: Missing Values Bar Chart ----
fig, ax = plt.subplots(figsize=(8, 4))
missing = df.isnull().sum()
colors = ['#E85D75' if v > 0 else '#00D4AA' for v in missing]
bars = ax.bar(missing.index, missing.values, color=colors, edgecolor='white')
ax.set_title('Missing Values Per Column', fontsize=14, fontweight='bold')
ax.set_ylabel('Count of Missing Values')
for bar, val in zip(bars, missing.values):
    if val > 0:
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1,
                str(val), ha='center', fontweight='bold', color='#E85D75')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.savefig('viz_1_missing_values.png', dpi=150)
plt.show()
print("Chart 1 saved: viz_1_missing_values.png")

# ---- VISUALIZATION 2: Histograms for Each Column ----
num_cols = ['Study_Hours', 'Sleep_Hours', 'Attendance_%', 'Previous_Score', 'Final_Score']
fig, axes = plt.subplots(1, 5, figsize=(18, 4))
for i, col in enumerate(num_cols):
    axes[i].hist(df[col].dropna(), bins=25, color='#4A6CF7', edgecolor='white', alpha=0.8)
    axes[i].set_title(col, fontsize=11, fontweight='bold')
    axes[i].set_ylabel('Frequency' if i == 0 else '')
    # Mark outlier ranges
    q1 = df[col].quantile(0.25)
    q3 = df[col].quantile(0.75)
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    upper = q3 + 1.5 * iqr
    axes[i].axvline(lower, color='#E85D75', linestyle='--', alpha=0.7, label='Outlier bounds')
    axes[i].axvline(upper, color='#E85D75', linestyle='--', alpha=0.7)
fig.suptitle('Distribution of Each Feature (with outlier bounds)', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('viz_2_histograms.png', dpi=150)
plt.show()
print("Chart 2 saved: viz_2_histograms.png")

# ---- VISUALIZATION 3: Scatter Plot ----
fig, ax = plt.subplots(figsize=(8, 6))
scatter = ax.scatter(df['Study_Hours'], df['Final_Score'],
                     c=df['Attendance_%'], cmap='coolwarm', alpha=0.7,
                     edgecolors='white', linewidth=0.5, s=50)
ax.set_xlabel('Study Hours per Week', fontsize=12)
ax.set_ylabel('Final Score', fontsize=12)
ax.set_title('Study Hours vs Final Score\n(colored by Attendance %)', fontsize=14, fontweight='bold')
plt.colorbar(scatter, label='Attendance %')
# Highlight outliers
outlier_mask = (df['Study_Hours'] > 20) | (df['Final_Score'] < 0)
if outlier_mask.any():
    ax.scatter(df.loc[outlier_mask, 'Study_Hours'],
              df.loc[outlier_mask, 'Final_Score'],
              s=150, facecolors='none', edgecolors='red', linewidth=2, label='Outliers')
    ax.legend()
plt.tight_layout()
plt.savefig('viz_3_scatter.png', dpi=150)
plt.show()
print("Chart 3 saved: viz_3_scatter.png")

# ---- VISUALIZATION 4: Correlation Heatmap ----
fig, ax = plt.subplots(figsize=(8, 6))
corr = df[num_cols].corr()
im = ax.imshow(corr, cmap='RdYlBu_r', vmin=-1, vmax=1)
ax.set_xticks(range(len(num_cols)))
ax.set_yticks(range(len(num_cols)))
ax.set_xticklabels(num_cols, rotation=45, ha='right')
ax.set_yticklabels(num_cols)
# Add correlation values
for i in range(len(num_cols)):
    for j in range(len(num_cols)):
        ax.text(j, i, f'{corr.iloc[i, j]:.2f}', ha='center', va='center',
                color='white' if abs(corr.iloc[i, j]) > 0.5 else 'black', fontsize=10)
ax.set_title('Feature Correlation Heatmap', fontsize=14, fontweight='bold')
plt.colorbar(im, label='Correlation')
plt.tight_layout()
plt.savefig('viz_4_correlation.png', dpi=150)
plt.show()
print("Chart 4 saved: viz_4_correlation.png")

# ---- VISUALIZATION 5: Box Plots ----
fig, axes = plt.subplots(1, 5, figsize=(18, 5))
colors = ['#4A6CF7', '#00D4AA', '#7C3AED', '#F59E0B', '#E85D75']
for i, col in enumerate(num_cols):
    bp = axes[i].boxplot(df[col].dropna(), patch_artist=True,
                         boxprops=dict(facecolor=colors[i], alpha=0.7),
                         medianprops=dict(color='black', linewidth=2),
                         flierprops=dict(marker='o', markerfacecolor='red', markersize=8))
    axes[i].set_title(col, fontsize=11, fontweight='bold')
    outliers_in_col = bp['fliers'][0].get_ydata()
    if len(outliers_in_col) > 0:
        axes[i].set_xlabel(f'{len(outliers_in_col)} outlier(s)', color='red', fontweight='bold')
fig.suptitle('Box Plots — Spotting Outliers in Each Feature', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('viz_5_boxplots.png', dpi=150)
plt.show()
print("Chart 5 saved: viz_5_boxplots.png")

# ---- SUMMARY ----
print("\n" + "="*50)
print("DATA QUALITY SUMMARY")
print("="*50)
print(f"Total rows: {len(df)}")
print(f"Missing values: {df.isnull().sum().sum()} across {(df.isnull().sum() > 0).sum()} columns")
print(f"Outliers found:")
print(f"  - Study_Hours = 50 (row 50) — impossible, max ~15 hrs/day")
print(f"  - Final_Score = -10 (row 100) — scores can't be negative")
print(f"  - Attendance = 200% (row 150) — can't exceed 100%")
print(f"\nRecommendations:")
print(f"  1. Fill missing values with median (robust to outliers)")
print(f"  2. Cap Study_Hours at 15, Attendance at 100, Final_Score at 0-100")
print(f"  3. Study_Hours has strongest positive correlation with Final_Score")
```

---

## Exercise 9: Train/Test Split Experiment

**Task:** Experiment with different train/test split ratios and observe how they affect model performance.

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Generate a dataset: predict house prices
np.random.seed(42)
n = 500

size_sqft = np.random.uniform(500, 4000, n)
bedrooms = np.random.randint(1, 6, n)
age_years = np.random.uniform(0, 50, n)

# Price formula with some noise
price = (size_sqft * 150 +
         bedrooms * 20000 -
         age_years * 1000 +
         np.random.normal(0, 30000, n))

df = pd.DataFrame({
    'Size_SqFt': size_sqft,
    'Bedrooms': bedrooms,
    'Age_Years': age_years,
    'Price': price
})

print("Dataset shape:", df.shape)
print(df.head())
```

**Your tasks:**
1. Split data using ratios: 50/50, 60/40, 70/30, 80/20, 90/10, 95/5
2. For each split, train a Linear Regression model
3. Record training R2 score and testing R2 score
4. Plot the results
5. Answer: Which split ratio gives the best balance? Why?

### Solution

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Generate dataset
np.random.seed(42)
n = 500

size_sqft = np.random.uniform(500, 4000, n)
bedrooms = np.random.randint(1, 6, n)
age_years = np.random.uniform(0, 50, n)

price = (size_sqft * 150 +
         bedrooms * 20000 -
         age_years * 1000 +
         np.random.normal(0, 30000, n))

df = pd.DataFrame({
    'Size_SqFt': size_sqft,
    'Bedrooms': bedrooms,
    'Age_Years': age_years,
    'Price': price
})

X = df[['Size_SqFt', 'Bedrooms', 'Age_Years']]
y = df['Price']

# ---- Experiment with different splits ----
split_ratios = [0.50, 0.60, 0.70, 0.80, 0.90, 0.95]
results = []

for train_ratio in split_ratios:
    test_ratio = 1 - train_ratio

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, train_size=train_ratio, random_state=42
    )

    model = LinearRegression()
    model.fit(X_train, y_train)

    train_r2 = r2_score(y_train, model.predict(X_train))
    test_r2 = r2_score(y_test, model.predict(X_test))
    train_rmse = np.sqrt(mean_squared_error(y_train, model.predict(X_train)))
    test_rmse = np.sqrt(mean_squared_error(y_test, model.predict(X_test)))

    results.append({
        'Split': f"{int(train_ratio*100)}/{int(test_ratio*100)}",
        'Train_Size': len(X_train),
        'Test_Size': len(X_test),
        'Train_R2': train_r2,
        'Test_R2': test_r2,
        'Train_RMSE': train_rmse,
        'Test_RMSE': test_rmse
    })

    print(f"Split {int(train_ratio*100)}/{int(test_ratio*100)}: "
          f"Train R2={train_r2:.4f}, Test R2={test_r2:.4f}, "
          f"Train size={len(X_train)}, Test size={len(X_test)}")

results_df = pd.DataFrame(results)

# ---- Visualization ----
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: R2 Scores
x_pos = range(len(split_ratios))
width = 0.35
axes[0].bar([p - width/2 for p in x_pos], results_df['Train_R2'],
            width, label='Training R2', color='#4A6CF7', alpha=0.8)
axes[0].bar([p + width/2 for p in x_pos], results_df['Test_R2'],
            width, label='Testing R2', color='#00D4AA', alpha=0.8)
axes[0].set_xlabel('Train/Test Split Ratio')
axes[0].set_ylabel('R2 Score')
axes[0].set_title('Model Performance vs Split Ratio', fontweight='bold')
axes[0].set_xticks(x_pos)
axes[0].set_xticklabels(results_df['Split'])
axes[0].legend()
axes[0].set_ylim(0.8, 1.0)

# Plot 2: RMSE
axes[1].plot(results_df['Split'], results_df['Train_RMSE'],
             'o-', color='#4A6CF7', linewidth=2, markersize=8, label='Training RMSE')
axes[1].plot(results_df['Split'], results_df['Test_RMSE'],
             's-', color='#E85D75', linewidth=2, markersize=8, label='Testing RMSE')
axes[1].set_xlabel('Train/Test Split Ratio')
axes[1].set_ylabel('RMSE ($)')
axes[1].set_title('Error vs Split Ratio', fontweight='bold')
axes[1].legend()

plt.tight_layout()
plt.savefig('viz_train_test_split_experiment.png', dpi=150)
plt.show()

# ---- Summary Table ----
print("\n" + "="*70)
print("RESULTS SUMMARY")
print("="*70)
print(results_df.to_string(index=False))

print("\n" + "="*70)
print("ANALYSIS & CONCLUSIONS")
print("="*70)
print("""
1. BEST SPLIT: 80/20 provides the best balance for this dataset.
   - The model gets enough training data (400 samples) to learn patterns well.
   - The test set (100 samples) is large enough to give a reliable performance estimate.

2. OBSERVATIONS:
   - 50/50 split: Model doesn't have enough training data to learn well.
     Training R2 and Test R2 are both lower.
   - 95/5 split: Model trains well, but test set is tiny (25 samples),
     making the test score unreliable and highly variable.
   - Training R2 stays fairly stable across splits (model always fits
     training data well). Test R2 varies more.

3. WHY 80/20 WORKS:
   - It's the sweet spot between having enough data to train and enough
     data to evaluate fairly.
   - With 500 samples, 80/20 gives 400 train + 100 test — both are
     reasonable sizes.

4. IMPORTANT NOTES:
   - The "best" split depends on dataset size. With 100 samples, you
     might use 70/30. With 1 million, even 99/1 could work.
   - For more reliable results, use cross-validation (k-fold) instead
     of a single train/test split.
""")
```

---

## Bonus Challenge: End-to-End Data Pipeline

Combine everything you learned: collect data, clean it, visualize it, split it, and train a model.

**Task:** Use the Iris dataset from sklearn, but first intentionally mess it up, then clean it, and finally train a classifier.

```python
from sklearn.datasets import load_iris
import pandas as pd
import numpy as np

# Load clean Iris dataset
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = iris.target

# Now mess it up!
np.random.seed(42)
# Add missing values
for col in df.columns[:4]:
    mask = np.random.random(len(df)) < 0.05
    df.loc[mask, col] = np.nan

# Add duplicates
df = pd.concat([df, df.sample(10, random_state=42)], ignore_index=True)

# Add outliers
df.loc[0, 'sepal length (cm)'] = 100
df.loc[10, 'petal width (cm)'] = -5

# Add inconsistent species labels
df.loc[50, 'species'] = 99

print("Messy dataset shape:", df.shape)
print("Missing values:", df.isnull().sum().sum())

# YOUR TASK: Clean this dataset and train a classifier!
# Steps:
# 1. Remove duplicates
# 2. Handle missing values
# 3. Fix outliers
# 4. Remove invalid species labels
# 5. Split 80/20
# 6. Train a classifier (e.g., KNeighborsClassifier)
# 7. Report accuracy
```

This exercise ties together all concepts from Module 4: data types, quality, cleaning, and splitting.

---

**Congratulations!** You have completed all exercises for Module 4.
The key lesson: **Great AI starts with great data. Always invest time in understanding, cleaning, and preparing your data before building models.**
