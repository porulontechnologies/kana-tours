# Module 10: AI Ethics & The Future — Exercises

---

## BEGINNER EXERCISES

---

### Exercise 1: AI Ethics Scenario Discussions (For/Against)

**Instructions:** For each scenario below, write **2 arguments FOR** and **2 arguments AGAINST** the use of AI. There is no single right answer — the goal is to think critically.

**Scenario A:** A hospital uses AI to read X-rays and diagnose diseases. The AI is faster than doctors and catches 95% of cancers, but occasionally makes mistakes that a human doctor would not.

**Scenario B:** A school uses AI to grade student essays. The AI is consistent and unbiased by student names, but may not understand creative or unconventional writing styles.

**Scenario C:** A police department uses facial recognition AI to identify suspects in a crowd. It helps catch criminals faster, but has been shown to misidentify people of certain ethnicities more often.

**Scenario D:** A company uses AI to screen job applicants' resumes before any human sees them. It saves HR hundreds of hours, but the AI was trained on data from the company's past hiring decisions.

---

<details>
<summary><strong>Solutions — Exercise 1</strong></summary>

**Scenario A: AI for Medical Diagnosis**

*Arguments FOR:*
1. AI can process X-rays faster than doctors, potentially saving lives through earlier detection.
2. AI doesn't get tired or distracted, providing consistent analysis 24/7 and helping in understaffed hospitals.

*Arguments AGAINST:*
1. Medical decisions are life-or-death — AI mistakes could lead to missed diagnoses or unnecessary treatments.
2. Patients may lose trust in the healthcare system if they know a machine, not a doctor, is making their diagnosis.

*Key takeaway:* The best approach is AI-assisted diagnosis where AI flags potential issues and a human doctor makes the final call.

**Scenario B: AI Grading Essays**

*Arguments FOR:*
1. AI grading is consistent — it won't be influenced by a student's name, handwriting, or the teacher's mood.
2. It frees teachers to spend more time actually teaching and mentoring students.

*Arguments AGAINST:*
1. AI may penalize creative, humorous, or unconventional writing that doesn't fit expected patterns.
2. Writing is deeply personal and cultural — AI may not understand context, metaphors, or local references.

*Key takeaway:* AI can assist with grading but should not be the sole evaluator, especially for creative work.

**Scenario C: Facial Recognition by Police**

*Arguments FOR:*
1. Can help quickly identify dangerous suspects in crowded areas, improving public safety.
2. Can help solve crimes faster by matching surveillance footage to databases.

*Arguments AGAINST:*
1. Higher misidentification rates for certain ethnicities can lead to wrongful arrests and discrimination.
2. Mass surveillance erodes privacy rights and can be used to target marginalized communities.

*Key takeaway:* The accuracy disparities across races make this technology dangerous without strict oversight and regulation.

**Scenario D: AI Resume Screening**

*Arguments FOR:*
1. Saves enormous amounts of HR time, allowing focus on in-person interviews.
2. Could potentially remove human biases like favoritism or snap judgments from initial screening.

*Arguments AGAINST:*
1. If trained on past hiring data, AI will replicate historical biases (e.g., favoring certain schools or demographics).
2. Qualified candidates with non-traditional backgrounds may be filtered out before any human sees their resume.

*Key takeaway:* AI screening tools must be regularly audited for bias and should always have human review as a safety net.

</details>

---

### Exercise 2: Identify the Bias

**Instructions:** Look at each dataset description below. Identify **what type of bias** exists and **who might be harmed** by an AI trained on this data.

**Dataset 1:** A bank has 20 years of loan approval data. Historically, loan officers approved 80% of applications from wealthy neighborhoods and only 30% from lower-income neighborhoods, regardless of individual credit scores.

**Dataset 2:** A dataset of "professional headshots" collected from top companies' websites contains 85% photos of light-skinned individuals in business attire.

**Dataset 3:** A voice assistant training dataset was recorded primarily from American English speakers aged 20-40.

**Dataset 4:** A movie recommendation dataset was collected only from users in the United States who rate films on a single platform.

---

<details>
<summary><strong>Solutions — Exercise 2</strong></summary>

**Dataset 1: Bank Loan Data**
- **Type of bias:** Training data bias (historical discrimination)
- **Who is harmed:** People from lower-income neighborhoods will be unfairly denied loans, perpetuating economic inequality. This often disproportionately affects racial minorities due to historical housing discrimination.
- **Fix:** Remove zip code/neighborhood as a feature, audit outcomes across demographic groups, use only financial metrics.

**Dataset 2: Professional Headshots**
- **Type of bias:** Representation bias (not diverse enough)
- **Who is harmed:** People with darker skin tones would be less accurately recognized or classified as "professional." This reinforces narrow beauty and professionalism standards.
- **Fix:** Actively collect diverse images across all skin tones, ethnicities, ages, and professional contexts.

**Dataset 3: Voice Assistant Data**
- **Type of bias:** Representation bias (limited demographic coverage)
- **Who is harmed:** Non-native English speakers, people with regional accents, elderly users, and children would experience lower accuracy and more frustration.
- **Fix:** Include speakers of all ages, accents, dialects, and speaking styles in the training data.

**Dataset 4: Movie Recommendations**
- **Type of bias:** Representation bias (geographic and platform bias)
- **Who is harmed:** Users from other countries or cultures would get irrelevant recommendations. Films from non-Western cultures would be underrepresented. Users who don't rate films on that specific platform are excluded entirely.
- **Fix:** Collect data from multiple platforms and countries, include diverse film catalogs.

</details>

---

### Exercise 3: Responsible AI Quiz

**Instructions:** Choose the best answer for each question.

**Question 1:** What does "AI transparency" mean?
- a) AI should be invisible to users
- b) We should be able to understand how and why AI makes decisions
- c) AI code should be open source
- d) AI should be see-through like glass

**Question 2:** Which of the following is an example of AI bias?
- a) An AI that can play chess better than humans
- b) A facial recognition system that works better on lighter skin tones
- c) An AI that can translate 100 languages
- d) A self-driving car that stops at red lights

**Question 3:** Why is "human oversight" important for AI?
- a) Because AI is always wrong
- b) Because humans need jobs
- c) Because high-stakes decisions need human judgment and accountability
- d) Because AI is too slow

**Question 4:** What is a "black box" AI problem?
- a) The AI is stored in a black box
- b) The AI makes decisions but nobody can explain why
- c) The AI only works in the dark
- d) The AI is painted black

**Question 5:** Which is NOT one of the six principles of ethical AI?
- a) Fairness
- b) Profitability
- c) Transparency
- d) Accountability

**Question 6:** What is the EU AI Act?
- a) A science fiction movie about AI
- b) A comprehensive law regulating AI systems by risk level
- c) A plan to build the world's most powerful AI
- d) A ban on all AI technology

**Question 7:** What is "deepfake" technology?
- a) A very deep neural network
- b) AI-generated fake videos, images, or audio designed to look real
- c) A type of deep-sea AI robot
- d) A new social media platform

**Question 8:** Why should we care about AI ethics even as beginners?
- a) Only AI researchers need to care
- b) Because AI decisions affect real people's lives, and informed citizens can advocate for responsible AI
- c) We shouldn't — AI is just math
- d) Ethics slows down innovation

---

<details>
<summary><strong>Solutions — Exercise 3</strong></summary>

1. **b) We should be able to understand how and why AI makes decisions.** Transparency means people affected by AI decisions can understand the reasoning behind them.

2. **b) A facial recognition system that works better on lighter skin tones.** This is representation bias — the system was likely trained on data that didn't equally represent all skin tones.

3. **c) Because high-stakes decisions need human judgment and accountability.** AI lacks moral reasoning, empathy, and contextual understanding. Humans must oversee decisions that deeply affect lives.

4. **b) The AI makes decisions but nobody can explain why.** "Black box" refers to AI systems where the internal decision-making process is opaque, making it impossible to audit for fairness or errors.

5. **b) Profitability.** The six principles are Fairness, Transparency, Privacy, Safety, Accountability, and Beneficence. While profitability matters in business, it is not an ethical AI principle.

6. **b) A comprehensive law regulating AI systems by risk level.** The EU AI Act classifies AI systems into risk categories (unacceptable, high, limited, minimal) with corresponding requirements.

7. **b) AI-generated fake videos, images, or audio designed to look real.** Deepfakes use AI to create convincing but fake content, raising serious concerns about misinformation.

8. **b) Because AI decisions affect real people's lives, and informed citizens can advocate for responsible AI.** Everyone has a role in shaping how AI is developed and used in society.

</details>

---

## INTERMEDIATE EXERCISES

---

### Exercise 4: Research an AI Ethics Case Study

**Instructions:** Choose ONE of the following real-world AI ethics cases. Research it and write a short analysis (300-500 words) covering:

1. **What happened?** (Describe the case)
2. **What went wrong?** (Identify the ethical issues)
3. **Who was affected?** (Identify stakeholders and harm)
4. **What was done about it?** (Response and resolution)
5. **What should have been done differently?** (Your recommendations)

**Choose one:**
- A) Amazon's AI recruiting tool (2018) — biased against women
- B) COMPAS recidivism algorithm — racial bias in criminal justice
- C) Google Photos image classification error (2015) — misclassification of people
- D) Clearview AI facial recognition — privacy controversy
- E) Microsoft's Tay chatbot (2016) — AI learning offensive behavior from users

---

<details>
<summary><strong>Solutions — Exercise 4 (Example Analysis for Case A)</strong></summary>

**Case A: Amazon's AI Recruiting Tool**

**What happened?**
Amazon developed an AI system to automate resume screening and identify top candidates. The system was trained on resumes submitted to the company over a 10-year period. The goal was to find patterns that predicted successful hires.

**What went wrong?**
The AI learned to penalize resumes containing the word "women's" (as in "women's chess club captain") and downgrade graduates of two all-women's colleges. Because the tech industry — and Amazon's workforce historically — was predominantly male, the AI learned that being male was a predictor of being hired. The system amplified existing gender bias rather than correcting it.

**Who was affected?**
Female job applicants were systematically disadvantaged. Qualified women were filtered out before any human reviewed their resumes. This perpetuated the underrepresentation of women in tech.

**What was done about it?**
Amazon disbanded the team working on the tool in 2017 and said the tool was never used as the sole mechanism for evaluating candidates. The story became public in 2018 and became a widely cited example of AI bias in hiring.

**What should have been done differently?**
- The training data should have been audited for gender imbalance before training.
- The team should have tested for bias across demographic groups before deployment.
- Gender-correlated features (like specific college names) should have been excluded.
- A diverse team of developers and ethicists should have been involved.
- Regular bias audits should be built into any AI hiring system.
- The system should have been designed to promote diversity, not replicate past patterns.

**Key lesson:** AI trained on biased historical data will reproduce and amplify that bias. This case demonstrates why bias auditing and diverse development teams are essential for responsible AI.

</details>

---

### Exercise 5: AI Job Displacement Debate

**Instructions:** You will prepare both sides of a debate on the following topic:

> **"AI will create more jobs than it destroys."**

**Part A — Argue FOR the statement (AI creates more jobs):**
Write 4-5 strong arguments supporting this position. Include examples.

**Part B — Argue AGAINST the statement (AI destroys more jobs):**
Write 4-5 strong arguments opposing this position. Include examples.

**Part C — Your Verdict:**
After considering both sides, write your personal conclusion (150-200 words). What do you think will actually happen, and what should society do about it?

---

<details>
<summary><strong>Solutions — Exercise 5</strong></summary>

**Part A — FOR (AI creates more jobs):**

1. **New job categories emerge.** Just as the internet created jobs that didn't exist before (social media manager, web developer, data scientist), AI will create entirely new roles like AI trainer, prompt engineer, AI ethics officer, and AI auditor.

2. **Historical precedent.** Every major technological revolution (industrial revolution, computers, internet) initially caused job displacement but ultimately created more jobs than were lost. The US had 80% agricultural workers in 1800 and 2% today, yet employment grew.

3. **AI augments, not replaces.** Most AI implementations enhance human productivity rather than fully replacing workers. Doctors using AI diagnostics, lawyers using AI research tools, and designers using AI assistants are all MORE productive.

4. **New industries emerge.** AI enables entirely new industries: autonomous vehicle maintenance, AI-generated content review, synthetic data creation, and AI safety testing.

5. **Growing demand.** As AI makes goods and services cheaper, demand increases, which creates new jobs in production, distribution, and customer service.

**Part B — AGAINST (AI destroys more jobs):**

1. **Unprecedented automation scope.** Unlike previous revolutions, AI can automate cognitive tasks, not just physical ones. This affects office workers, analysts, writers, and other white-collar professions previously considered safe.

2. **Speed of change.** Previous technological transitions happened over decades, giving workers time to retrain. AI adoption is happening in years, too fast for many workers to adapt.

3. **Concentration of wealth.** New AI-created jobs tend to be high-skill, high-pay positions concentrated in tech hubs. Displaced workers (truck drivers, call center employees, factory workers) often can't access these new opportunities.

4. **Self-driving vehicles alone.** Autonomous vehicles could displace millions of truck drivers, taxi drivers, and delivery workers — one of the largest job categories in many countries.

5. **Diminishing returns on retraining.** Not everyone can become a data scientist or AI engineer. Retraining programs have mixed success rates, and there may simply not be enough new jobs for everyone displaced.

**Part C — Example Verdict:**

The reality is likely somewhere in between. AI will create new types of jobs and entire industries we can't yet imagine, but the transition will be painful and uneven. The key challenge is not the total number of jobs, but who gets displaced and who benefits. Society needs to invest in education and retraining programs, consider safety nets like universal basic income during transition periods, and ensure AI's economic benefits are broadly shared. Without proactive policy, AI could widen inequality even if it creates net positive employment. The most important thing is not to resist AI, but to manage the transition thoughtfully so no one is left behind.

</details>

---

### Exercise 6: Create Your Own AI Ethics Checklist

**Instructions:** Imagine you are the AI Ethics Officer at a company launching a new AI product. Create a comprehensive checklist that the development team must complete BEFORE launching any AI product.

Your checklist should cover at least these categories:
1. **Data & Bias** (at least 4 items)
2. **Transparency & Explainability** (at least 3 items)
3. **Privacy & Security** (at least 4 items)
4. **Fairness & Inclusion** (at least 3 items)
5. **Safety & Reliability** (at least 3 items)
6. **Accountability & Governance** (at least 3 items)

For each item, write it as a yes/no question (e.g., "Have we tested for bias across demographic groups?")

---

<details>
<summary><strong>Solutions — Exercise 6</strong></summary>

## AI Ethics Pre-Launch Checklist

### 1. Data & Bias
- [ ] Have we documented the sources, size, and collection methods of all training data?
- [ ] Have we checked training data for demographic representation across age, gender, race, and geography?
- [ ] Have we tested the model's outputs for bias across protected groups (gender, race, age, disability)?
- [ ] Have we established a process for regularly re-evaluating data quality and bias over time?
- [ ] Have we removed or mitigated any identified biases before launch?

### 2. Transparency & Explainability
- [ ] Can we explain in plain language how the AI makes its decisions to a non-technical user?
- [ ] Have we documented the model's limitations and known failure modes?
- [ ] Do users know they are interacting with an AI system (not a human)?
- [ ] Have we created user-facing documentation that explains what the AI does and does not do?

### 3. Privacy & Security
- [ ] Have we obtained proper consent for all personal data used in training and operation?
- [ ] Is personal data encrypted both in storage and in transit?
- [ ] Have we implemented data minimization (collecting only what's necessary)?
- [ ] Do users have the ability to opt out, request data deletion, or correct their data?
- [ ] Have we conducted a security audit to protect against adversarial attacks?

### 4. Fairness & Inclusion
- [ ] Have we tested the system with users from diverse backgrounds and abilities?
- [ ] Does the system perform equally well across different demographic groups?
- [ ] Have we considered accessibility needs (visual, auditory, motor, cognitive)?
- [ ] Have we consulted with community representatives from affected groups?

### 5. Safety & Reliability
- [ ] Have we tested the system under edge cases and adversarial conditions?
- [ ] Is there a fallback mechanism when the AI fails or produces unreliable output?
- [ ] Have we established performance thresholds below which the system should not operate?
- [ ] Have we stress-tested the system under real-world conditions before launch?

### 6. Accountability & Governance
- [ ] Have we designated a person or team responsible for monitoring the AI post-launch?
- [ ] Is there a clear process for users to report problems, appeal decisions, or provide feedback?
- [ ] Have we established a schedule for regular audits and reviews of the system?
- [ ] Have we documented who is legally and ethically responsible for the AI's decisions?
- [ ] Do we have a plan to shut down or modify the AI if serious issues are discovered?

</details>

---

## ADVANCED EXERCISES

---

### Exercise 7: Audit a Simple ML Model for Bias (Python)

**Instructions:** Write Python code that:
1. Creates a simple synthetic dataset simulating loan approval decisions
2. Trains a basic classifier (Logistic Regression or Decision Tree)
3. Evaluates the model's fairness across demographic groups
4. Identifies any bias in the model's predictions
5. Suggests and implements a mitigation strategy

```python
# STARTER CODE — Complete the TODO sections

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix

# Set random seed for reproducibility
np.random.seed(42)

# TODO 1: Create a synthetic dataset with 1000 samples
# Features: income (continuous), credit_score (continuous),
#           age (continuous), gender (0=female, 1=male)
# Target: loan_approved (0=denied, 1=approved)
# IMPORTANT: Introduce bias — make approval slightly favor males
#            even when other features are similar


# TODO 2: Train a Logistic Regression model on the data


# TODO 3: Evaluate fairness
# Calculate approval rates for each gender group
# Calculate accuracy for each gender group
# Compare false positive and false negative rates across groups


# TODO 4: Print a fairness report showing:
# - Overall accuracy
# - Approval rate by gender
# - False positive rate by gender
# - False negative rate by gender
# - Whether the model passes a fairness threshold
#   (e.g., 80% rule: approval rate of disadvantaged group
#    should be at least 80% of advantaged group's rate)


# TODO 5: Implement one bias mitigation strategy
# Options: reweighting, threshold adjustment, or removing
#          the protected attribute
```

---

<details>
<summary><strong>Solutions — Exercise 7</strong></summary>

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix

np.random.seed(42)

# ============================================================
# STEP 1: Create a biased synthetic dataset
# ============================================================
n_samples = 1000

income = np.random.normal(55000, 15000, n_samples)
credit_score = np.random.normal(680, 50, n_samples)
age = np.random.randint(22, 65, n_samples)
gender = np.random.binomial(1, 0.5, n_samples)  # 0=female, 1=male

# Create biased approval: males get a boost
approval_score = (
    0.3 * (income - 55000) / 15000 +
    0.3 * (credit_score - 680) / 50 +
    0.1 * (age - 40) / 20 +
    0.15 * gender +              # <-- BIAS: gender directly affects approval
    np.random.normal(0, 0.3, n_samples)
)

loan_approved = (approval_score > 0).astype(int)

df = pd.DataFrame({
    'income': income,
    'credit_score': credit_score,
    'age': age,
    'gender': gender,
    'loan_approved': loan_approved
})

print("=" * 60)
print("DATASET SUMMARY")
print("=" * 60)
print(f"Total samples: {len(df)}")
print(f"Approval rate (overall): {df['loan_approved'].mean():.2%}")
print(f"Approval rate (female):  {df[df['gender']==0]['loan_approved'].mean():.2%}")
print(f"Approval rate (male):    {df[df['gender']==1]['loan_approved'].mean():.2%}")
print()

# ============================================================
# STEP 2: Train a Logistic Regression model
# ============================================================
X = df[['income', 'credit_score', 'age', 'gender']]
y = df['loan_approved']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# ============================================================
# STEP 3: Evaluate fairness across gender groups
# ============================================================
def fairness_metrics(y_true, y_pred, sensitive_feature, group_name):
    """Calculate fairness metrics for each group."""
    results = {}
    for group_val, label in enumerate(group_name):
        mask = sensitive_feature == group_val
        if mask.sum() == 0:
            continue

        group_true = y_true[mask]
        group_pred = y_pred[mask]

        tn, fp, fn, tp = confusion_matrix(
            group_true, group_pred, labels=[0, 1]
        ).ravel()

        results[label] = {
            'count': mask.sum(),
            'accuracy': accuracy_score(group_true, group_pred),
            'approval_rate': group_pred.mean(),
            'true_approval_rate': group_true.mean(),
            'false_positive_rate': fp / (fp + tn) if (fp + tn) > 0 else 0,
            'false_negative_rate': fn / (fn + tp) if (fn + tp) > 0 else 0,
        }

    return results

metrics = fairness_metrics(
    y_test.values, y_pred, X_test['gender'].values, ['Female', 'Male']
)

# ============================================================
# STEP 4: Print fairness report
# ============================================================
print("=" * 60)
print("FAIRNESS REPORT — ORIGINAL MODEL")
print("=" * 60)
print(f"Overall accuracy: {accuracy_score(y_test, y_pred):.2%}")
print()

for group, m in metrics.items():
    print(f"--- {group} (n={m['count']}) ---")
    print(f"  Accuracy:            {m['accuracy']:.2%}")
    print(f"  Predicted approval:  {m['approval_rate']:.2%}")
    print(f"  Actual approval:     {m['true_approval_rate']:.2%}")
    print(f"  False positive rate: {m['false_positive_rate']:.2%}")
    print(f"  False negative rate: {m['false_negative_rate']:.2%}")
    print()

# 80% rule check
female_rate = metrics['Female']['approval_rate']
male_rate = metrics['Male']['approval_rate']
ratio = female_rate / male_rate if male_rate > 0 else 0

print(f"Disparate Impact Ratio: {ratio:.2%}")
print(f"80% Rule: {'PASS' if ratio >= 0.8 else 'FAIL'}")
print(f"  (Female approval rate should be >= 80% of male rate)")
print()

# ============================================================
# STEP 5: Bias mitigation — remove protected attribute
# ============================================================
print("=" * 60)
print("BIAS MITIGATION — Removing Gender Feature")
print("=" * 60)

X_fair = df[['income', 'credit_score', 'age']]  # No gender
X_train_f, X_test_f, y_train_f, y_test_f = train_test_split(
    X_fair, y, test_size=0.3, random_state=42
)

model_fair = LogisticRegression(max_iter=1000)
model_fair.fit(X_train_f, y_train_f)
y_pred_fair = model_fair.predict(X_test_f)

metrics_fair = fairness_metrics(
    y_test_f.values, y_pred_fair,
    X_test['gender'].values, ['Female', 'Male']
)

print(f"Overall accuracy: {accuracy_score(y_test_f, y_pred_fair):.2%}")
print()

for group, m in metrics_fair.items():
    print(f"--- {group} (n={m['count']}) ---")
    print(f"  Accuracy:            {m['accuracy']:.2%}")
    print(f"  Predicted approval:  {m['approval_rate']:.2%}")
    print(f"  False positive rate: {m['false_positive_rate']:.2%}")
    print(f"  False negative rate: {m['false_negative_rate']:.2%}")
    print()

female_rate_f = metrics_fair['Female']['approval_rate']
male_rate_f = metrics_fair['Male']['approval_rate']
ratio_f = female_rate_f / male_rate_f if male_rate_f > 0 else 0

print(f"Disparate Impact Ratio: {ratio_f:.2%}")
print(f"80% Rule: {'PASS' if ratio_f >= 0.8 else 'FAIL'}")
print()
print("NOTE: Simply removing the protected attribute helps but may not")
print("fully eliminate bias if other features are correlated with gender")
print("(e.g., certain job types, income patterns). More advanced techniques")
print("like adversarial debiasing or reweighting may be needed.")
```

**Expected output discussion:**

The original model should show a clear disparity: male approval rates will be notably higher than female approval rates, and the 80% rule will likely fail.

After removing the gender feature, the gap should shrink significantly, though it may not disappear entirely because income and other features may correlate with gender in the real world.

**Key learning:** Removing the protected attribute is the simplest mitigation but not always sufficient. More advanced techniques include:
- **Reweighting:** Giving underrepresented groups higher training weights
- **Threshold adjustment:** Using different decision thresholds per group
- **Adversarial debiasing:** Training a second model to ensure the main model's predictions are independent of the protected attribute

</details>

---

### Exercise 8: Explore AI Explainability Tools (LIME & SHAP)

**Instructions:** Using Python, demonstrate how LIME and SHAP can make a "black box" model explainable. Use a simple classification problem and show how these tools reveal WHY the model makes specific predictions.

```python
# STARTER CODE — Complete the TODO sections

# Install required packages first:
# pip install lime shap scikit-learn matplotlib

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

# TODO 1: Create a synthetic dataset or use a real one
# Suggestion: Create a "will the student pass?" dataset with features like:
# study_hours, attendance_rate, assignment_score, sleep_hours, previous_gpa


# TODO 2: Train a Random Forest classifier (a "black box" model)


# TODO 3: Use LIME to explain a single prediction
# - Pick one student from the test set
# - Generate a LIME explanation
# - Show which features pushed the prediction toward pass/fail


# TODO 4: Use SHAP to explain the model globally
# - Generate SHAP values for the test set
# - Create a summary plot showing feature importance
# - Show a force plot for a single prediction


# TODO 5: Compare LIME and SHAP
# - Explain the same prediction with both tools
# - Note similarities and differences
# - Discuss when you would use each tool
```

---

<details>
<summary><strong>Solutions — Exercise 8</strong></summary>

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import lime
import lime.lime_tabular
import shap
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt

np.random.seed(42)

# ============================================================
# STEP 1: Create a "Will the student pass?" dataset
# ============================================================
n = 500

study_hours = np.random.uniform(0, 8, n)          # hours per day
attendance_rate = np.random.uniform(0.3, 1.0, n)  # percentage
assignment_score = np.random.uniform(30, 100, n)   # out of 100
sleep_hours = np.random.uniform(4, 10, n)          # hours per night
previous_gpa = np.random.uniform(1.5, 4.0, n)      # on 4.0 scale

# Create target: pass if combination of factors is good enough
pass_score = (
    0.25 * study_hours / 8 +
    0.20 * attendance_rate +
    0.25 * assignment_score / 100 +
    0.10 * (sleep_hours - 4) / 6 +
    0.20 * previous_gpa / 4.0 +
    np.random.normal(0, 0.08, n)
)
passed = (pass_score > 0.5).astype(int)

df = pd.DataFrame({
    'study_hours': study_hours,
    'attendance_rate': attendance_rate,
    'assignment_score': assignment_score,
    'sleep_hours': sleep_hours,
    'previous_gpa': previous_gpa,
    'passed': passed
})

feature_names = ['study_hours', 'attendance_rate', 'assignment_score',
                 'sleep_hours', 'previous_gpa']
X = df[feature_names]
y = df['passed']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# ============================================================
# STEP 2: Train a Random Forest (black box model)
# ============================================================
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2%}")
print()

# Pick a student to explain
student_idx = 0
student = X_test.iloc[[student_idx]]
actual = y_test.iloc[student_idx]
predicted = model.predict(student)[0]
prob = model.predict_proba(student)[0]

print("=" * 60)
print(f"STUDENT TO EXPLAIN (index {student_idx})")
print("=" * 60)
for feat in feature_names:
    print(f"  {feat}: {student[feat].values[0]:.2f}")
print(f"  Actual outcome: {'PASS' if actual else 'FAIL'}")
print(f"  Predicted: {'PASS' if predicted else 'FAIL'}")
print(f"  Probability: FAIL={prob[0]:.2%}, PASS={prob[1]:.2%}")
print()

# ============================================================
# STEP 3: LIME Explanation
# ============================================================
print("=" * 60)
print("LIME EXPLANATION")
print("=" * 60)

explainer_lime = lime.lime_tabular.LimeTabularExplainer(
    training_data=X_train.values,
    feature_names=feature_names,
    class_names=['Fail', 'Pass'],
    mode='classification'
)

explanation = explainer_lime.explain_instance(
    data_row=student.values[0],
    predict_fn=model.predict_proba,
    num_features=5
)

print("\nFeature contributions (LIME):")
for feature, weight in explanation.as_list():
    direction = "toward PASS" if weight > 0 else "toward FAIL"
    print(f"  {feature}: {weight:+.4f} ({direction})")

# Save LIME visualization
fig = explanation.as_pyplot_figure()
fig.tight_layout()
fig.savefig('lime_explanation.png', dpi=150, bbox_inches='tight')
plt.close()
print("\nLIME plot saved to lime_explanation.png")

# ============================================================
# STEP 4: SHAP Explanation
# ============================================================
print()
print("=" * 60)
print("SHAP EXPLANATION")
print("=" * 60)

explainer_shap = shap.TreeExplainer(model)
shap_values = explainer_shap.shap_values(X_test)

# For binary classification, shap_values[1] = contribution to class 1 (Pass)
print("\nFeature contributions for student (SHAP):")
for i, feat in enumerate(feature_names):
    val = shap_values[1][student_idx, i]
    direction = "toward PASS" if val > 0 else "toward FAIL"
    print(f"  {feat}: {val:+.4f} ({direction})")

# Global feature importance (summary plot)
plt.figure()
shap.summary_plot(shap_values[1], X_test, feature_names=feature_names,
                  show=False)
plt.tight_layout()
plt.savefig('shap_summary.png', dpi=150, bbox_inches='tight')
plt.close()
print("\nSHAP summary plot saved to shap_summary.png")

# Single prediction force plot (save as HTML)
shap.save_html(
    'shap_force_plot.html',
    shap.force_plot(
        explainer_shap.expected_value[1],
        shap_values[1][student_idx],
        student.values[0],
        feature_names=feature_names
    )
)
print("SHAP force plot saved to shap_force_plot.html")

# ============================================================
# STEP 5: Comparison
# ============================================================
print()
print("=" * 60)
print("LIME vs SHAP COMPARISON")
print("=" * 60)
print("""
SIMILARITIES:
- Both identify which features matter most for a prediction
- Both show direction (positive/negative contribution)
- Both can explain individual predictions

DIFFERENCES:
- LIME: Creates a local linear approximation around the prediction.
  It perturbs the input and observes how the output changes.
  Best for: Explaining individual predictions to non-technical users.

- SHAP: Based on Shapley values from game theory. Provides mathematically
  consistent feature attributions. Can do both local and global explanations.
  Best for: Rigorous fairness audits and comprehensive model analysis.

WHEN TO USE EACH:
- Use LIME when you need a quick, intuitive explanation of one prediction
- Use SHAP when you need mathematically rigorous explanations or global
  feature importance analysis
- Use both for comprehensive explainability in production systems
""")
```

**Key takeaway:** Explainability tools like LIME and SHAP transform "black box" AI into understandable systems. This is critical for building trust, ensuring fairness, and meeting regulatory requirements.

</details>

---

### Exercise 9: Write an AI Policy Proposal for a Company

**Instructions:** You have been hired as an AI Ethics Consultant for a mid-size technology company (500 employees) that is planning to deploy AI in three areas:

1. **Customer service chatbot** (answers customer questions)
2. **Employee performance evaluation** (analyzes productivity metrics)
3. **Content recommendation engine** (suggests products to users)

Write a comprehensive AI Policy Proposal (800-1200 words) that covers:

**Section 1: AI Governance Structure**
- Who oversees AI development? (roles, committees)
- How are AI projects approved and reviewed?
- What training do employees receive?

**Section 2: Risk Assessment Framework**
- Classify each of the three AI systems by risk level
- Justify your risk classifications
- What safeguards are required for each risk level?

**Section 3: Bias Prevention & Monitoring**
- How will bias be detected before deployment?
- How will bias be monitored after deployment?
- What happens when bias is discovered?

**Section 4: Data Privacy & Security**
- What data can/cannot be used?
- How is user consent handled?
- How is data protected?

**Section 5: Transparency & User Rights**
- How will users know they're interacting with AI?
- Can users opt out?
- How can users appeal AI decisions?

**Section 6: Incident Response Plan**
- What happens when AI causes harm?
- How are incidents escalated?
- How is the company held accountable?

---

<details>
<summary><strong>Solutions — Exercise 9 (Example Policy Outline)</strong></summary>

## AI Policy Proposal — TechCo Inc.

### Section 1: AI Governance Structure

**AI Ethics Board:** Establish a cross-functional AI Ethics Board consisting of:
- Chief Technology Officer (chair)
- Legal counsel
- HR representative
- Customer-facing team lead
- External ethics advisor (independent)
- Data protection officer

**Approval Process:**
- All AI projects require a Risk Assessment Form before development begins
- Low-risk systems: Approved by department head + data protection officer
- Medium-risk systems: Require AI Ethics Board review
- High-risk systems: Require full board review + external audit before deployment

**Employee Training:**
- All employees: Annual AI awareness training (2 hours) covering basics of AI ethics, bias recognition, and company policy
- AI developers: Quarterly technical training on fairness metrics, bias testing, and responsible development practices
- Managers: Training on interpreting AI-assisted decisions and when to override them

### Section 2: Risk Assessment Framework

**Customer Service Chatbot — LOW-MEDIUM RISK**
- Justification: Handles routine queries, low stakes per interaction, but deals with customer data and represents the company brand
- Safeguards: Human escalation for complex issues, regular quality audits, clear disclosure that users are chatting with AI, sentiment monitoring

**Employee Performance Evaluation — HIGH RISK**
- Justification: Directly affects people's careers, compensation, and livelihoods. High potential for bias and legal liability
- Safeguards: AI provides recommendations only (never final decisions), mandatory human review by manager, quarterly bias audits across demographics, employee right to see and challenge AI assessments, union/employee representative consultation

**Content Recommendation Engine — MEDIUM RISK**
- Justification: Shapes user behavior and purchasing decisions, potential for filter bubbles and manipulation, collects behavioral data
- Safeguards: Diversity requirements in recommendations, user controls to adjust preferences, opt-out option, regular testing for discriminatory patterns, no use of protected characteristics for targeting

### Section 3: Bias Prevention & Monitoring

**Pre-Deployment:**
- All training data must be documented with a Data Card describing sources, demographics, and known limitations
- Bias testing across protected groups (gender, race, age, disability) before launch
- Minimum fairness thresholds must be met (80% rule for disparate impact)
- Red team testing by diverse group of internal testers

**Post-Deployment:**
- Monthly automated bias monitoring dashboards
- Quarterly manual audits by the AI Ethics Board
- Annual third-party audit for high-risk systems
- Continuous user feedback collection and analysis

**When Bias Is Discovered:**
1. Immediate: Document the bias with evidence and scope of impact
2. Within 24 hours: Notify AI Ethics Board and affected stakeholders
3. Within 1 week: Implement temporary mitigation (may include pausing the system)
4. Within 1 month: Deploy permanent fix and verify with testing
5. After fix: Publish internal transparency report on what happened and what changed

### Section 4: Data Privacy & Security

**Data Usage Rules:**
- Only collect data necessary for the AI system's stated purpose (data minimization)
- Never use protected characteristics (race, religion, sexual orientation) as direct features
- Anonymize personal data where possible
- Retain data only as long as necessary, with automatic deletion schedules

**User Consent:**
- Clear, plain-language consent forms for data collection
- Granular consent options (users can choose what data to share)
- Easy withdrawal of consent at any time
- No penalty for declining data sharing

**Data Security:**
- Encryption at rest and in transit (AES-256, TLS 1.3)
- Access controls with principle of least privilege
- Regular security audits and penetration testing
- Incident response plan for data breaches
- Compliance with GDPR, CCPA, and applicable regulations

### Section 5: Transparency & User Rights

**AI Disclosure:**
- All AI interactions must be clearly labeled (e.g., "You are chatting with an AI assistant")
- AI-generated content must be marked as such
- Users must be informed when AI is used in decisions that affect them

**User Rights:**
- Right to know: Users can request information about how AI decisions are made
- Right to opt out: Users can request human-only service at any time
- Right to appeal: Any AI-influenced decision can be reviewed by a human
- Right to explanation: Users receive plain-language explanations of AI decisions
- Right to correction: Users can flag incorrect AI outputs for correction

### Section 6: Incident Response Plan

**Severity Levels:**
- Level 1 (Low): Minor inaccuracies, no harm. Fix in next update cycle.
- Level 2 (Medium): Noticeable impact on user experience. Fix within 1 week.
- Level 3 (High): Discriminatory output or significant harm to individuals. Fix within 24 hours, consider pausing system.
- Level 4 (Critical): Widespread harm, legal liability, safety risk. Immediately pause system, notify leadership and legal.

**Escalation Path:**
1. Individual contributor identifies issue and reports to team lead
2. Team lead assesses severity and reports to AI Ethics Board
3. AI Ethics Board determines response and communicates to leadership
4. For Level 3-4: CEO and legal counsel are immediately notified
5. External communication: PR team manages disclosure to affected users and public

**Accountability:**
- All incidents are logged in a central AI Incident Database
- Post-incident reviews are conducted within 2 weeks
- Lessons learned are incorporated into training and updated policies
- Annual transparency report published summarizing incidents and responses

**Key principle:** When in doubt, err on the side of caution — pause the system and investigate rather than risk continued harm.

</details>

---

## Final Reflection

Congratulations on completing all exercises for Module 10 and the entire AI & ML course! You now have a solid foundation in both the technical AND ethical aspects of artificial intelligence. Remember: building AI is not just about making it work — it's about making it work **for everyone, fairly and responsibly**.

The future of AI depends on people like you who understand both the power and the responsibility that comes with this technology.
