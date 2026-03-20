# Module 8 Exercises: Natural Language Processing (NLP)

---

## BEGINNER EXERCISES

---

### Exercise 1: Tokenization by Hand

**Goal:** Understand how computers break text into pieces (tokens).

**Instructions:**
Tokenize the following sentences BY HAND. Split each sentence into individual words and punctuation marks. Write each token in a separate box/slot.

**Sentence 1:** `The cat sat on the mat.`

**Sentence 2:** `I can't believe it's already 2025!`

**Sentence 3:** `Dr. Smith went to Washington, D.C. for a meeting.`

**Sentence 4:** `The price is $49.99 — what a deal!`

**Questions to answer:**
1. How many tokens does each sentence have?
2. Which sentence was hardest to tokenize? Why?
3. Should "can't" be one token or two ("can" + "'t")?
4. How would you handle "$49.99" — is it one token or multiple?

---

**SOLUTION:**

**Sentence 1:** `["The", "cat", "sat", "on", "the", "mat", "."]` = **7 tokens**

**Sentence 2:** `["I", "ca", "n't", "believe", "it", "'s", "already", "2025", "!"]` = **9 tokens**
(Most modern tokenizers split contractions: "can't" becomes "ca" + "n't", "it's" becomes "it" + "'s")

**Sentence 3:** `["Dr", ".", "Smith", "went", "to", "Washington", ",", "D.C.", "for", "a", "meeting", "."]` = **12 tokens**
(Note: "D.C." is tricky — some tokenizers keep it as one token, others split it)

**Sentence 4:** `["The", "price", "is", "$", "49.99", "—", "what", "a", "deal", "!"]` = **10 tokens**

**Answers to questions:**
1. Sentence 1: 7, Sentence 2: 9, Sentence 3: 12, Sentence 4: 10
2. Sentence 3 is hardest because abbreviations (Dr., D.C.) and proper nouns make splitting ambiguous.
3. Most modern NLP systems split "can't" into two tokens ("ca" + "n't" or "can" + "not") because it helps the model understand negation.
4. "$49.99" is typically split into "$" and "49.99" — the currency symbol and number are separate concepts.

---

### Exercise 2: Sentiment Analysis of Reviews (Manual)

**Goal:** Practice identifying sentiment (positive, negative, neutral) in text — the same task NLP models do automatically.

**Instructions:**
Read each review below and label it as **POSITIVE**, **NEGATIVE**, or **NEUTRAL**. Then identify the **key words** that helped you decide.

| # | Review | Your Label | Key Words |
|---|--------|-----------|-----------|
| 1 | "This phone is absolutely amazing! Best purchase I've made all year." | ___ | ___ |
| 2 | "The food was cold and the waiter was rude. Never going back." | ___ | ___ |
| 3 | "The product arrived on time. It works as described." | ___ | ___ |
| 4 | "I love the design but the battery life is terrible." | ___ | ___ |
| 5 | "Worst experience ever. Total waste of money." | ___ | ___ |
| 6 | "It's okay, nothing special. Does what it's supposed to do." | ___ | ___ |
| 7 | "The movie started slow but the ending was incredible!" | ___ | ___ |
| 8 | "Not bad, but I've seen better for the price." | ___ | ___ |

**Bonus question:** Which reviews were hardest to classify? Why?

---

**SOLUTION:**

| # | Review | Label | Key Words |
|---|--------|-------|-----------|
| 1 | "This phone is absolutely amazing..." | **POSITIVE** | "absolutely amazing", "best purchase" |
| 2 | "The food was cold and the waiter was rude..." | **NEGATIVE** | "cold", "rude", "never going back" |
| 3 | "The product arrived on time..." | **NEUTRAL** | "on time", "works as described" (factual, no emotion) |
| 4 | "I love the design but the battery life is terrible." | **MIXED (Negative-leaning)** | "love" (positive), "terrible" (negative) |
| 5 | "Worst experience ever..." | **NEGATIVE** | "worst", "waste of money" |
| 6 | "It's okay, nothing special..." | **NEUTRAL** | "okay", "nothing special" (lukewarm) |
| 7 | "The movie started slow but the ending was incredible!" | **POSITIVE** | "incredible" outweighs "slow" |
| 8 | "Not bad, but I've seen better..." | **NEUTRAL / Slightly Negative** | "not bad" (mild positive), "seen better" (comparative negative) |

**Bonus:** Reviews 4, 7, and 8 are hardest because they contain MIXED sentiment. This is a real challenge for NLP systems too! Review 4 has both positive ("love") and negative ("terrible") elements. Real NLP models handle this using aspect-based sentiment analysis, where they detect sentiment per topic (design = positive, battery = negative).

---

### Exercise 3: NLP Applications Matching Quiz

**Goal:** Connect NLP tasks to their real-world applications.

**Instructions:**
Match each NLP task (left) with its real-world application (right). Draw a line or write the matching letter.

| NLP Task | | Real-World Application |
|----------|---|----------------------|
| 1. Sentiment Analysis | | A. Google Translate converting English to Japanese |
| 2. Named Entity Recognition | | B. Gmail suggesting "Sounds good!" as a quick reply |
| 3. Text Classification | | C. A news app tagging articles as Sports, Politics, Tech |
| 4. Machine Translation | | D. A brand tracking what customers say about them online |
| 5. Text Generation | | E. A system highlighting "Apple Inc." and "California" in a news article |
| 6. Question Answering | | F. Siri answering "What's the weather today?" |
| 7. Spam Detection | | G. ChatGPT writing an email for you |
| 8. Autocomplete | | H. Your email filtering out phishing and junk mail |

---

**SOLUTION:**

| NLP Task | Answer | Explanation |
|----------|--------|-------------|
| 1. Sentiment Analysis | **D** | Brands use sentiment analysis to monitor customer opinions on social media and reviews. |
| 2. Named Entity Recognition | **E** | NER identifies and classifies proper nouns — "Apple Inc." as an organization, "California" as a location. |
| 3. Text Classification | **C** | Categorizing articles into topics (Sports, Politics, Tech) is text classification. |
| 4. Machine Translation | **A** | Google Translate is the most well-known machine translation system. |
| 5. Text Generation | **G** | ChatGPT generating text from a prompt is text generation. |
| 6. Question Answering | **F** | Siri understands your question and retrieves/generates an answer. |
| 7. Spam Detection | **H** | Spam detection classifies emails as legitimate or junk. |
| 8. Autocomplete | **B** | Gmail's Smart Reply and Smart Compose predict what you want to type next. |

---

## INTERMEDIATE EXERCISES

---

### Exercise 4: Online Sentiment Analysis Tool

**Goal:** Use a real NLP tool to analyze sentiment and compare it with your manual labels.

**Instructions:**

1. Go to one of these free online sentiment analysis tools:
   - **MonkeyLearn** (https://monkeylearn.com/sentiment-analysis-online/)
   - **Text2Data** (https://text2data.com/Demo)
   - **VADER Sentiment** (search "VADER sentiment analysis online")

2. Enter each of the 8 reviews from Exercise 2 into the tool.

3. Fill out this comparison table:

| # | Review (first few words) | Your Manual Label | Tool's Label | Tool's Confidence | Match? |
|---|--------------------------|-------------------|-------------|-------------------|--------|
| 1 | "This phone is absolutely..." | | | | |
| 2 | "The food was cold..." | | | | |
| 3 | "The product arrived..." | | | | |
| 4 | "I love the design but..." | | | | |
| 5 | "Worst experience ever..." | | | | |
| 6 | "It's okay, nothing special..." | | | | |
| 7 | "The movie started slow..." | | | | |
| 8 | "Not bad, but I've seen..." | | | | |

**Questions:**
1. How many times did you agree with the tool?
2. Which reviews did the tool get "wrong" in your opinion? Why?
3. What does the confidence score tell you?

---

**SOLUTION:**

Results will vary by tool, but typical expected outcomes:

| # | Expected Tool Result | Typical Confidence | Notes |
|---|---------------------|-------------------|-------|
| 1 | Positive | ~95% | Strong positive words make this easy |
| 2 | Negative | ~90% | Clear negative indicators |
| 3 | Neutral or Positive | ~60% | Tools often struggle — factual statements may read as slightly positive |
| 4 | Mixed/Positive or Negative | ~55-65% | Low confidence because of conflicting signals |
| 5 | Negative | ~95% | Strongly negative |
| 6 | Neutral | ~50-60% | Tools struggle with lukewarm reviews |
| 7 | Positive or Mixed | ~65% | Tools may miss that "slow" is overcome by "incredible" |
| 8 | Neutral or Negative | ~55% | Double negatives ("not bad") confuse simple models |

**Key takeaways:**
1. Tools typically agree with humans on clearly positive/negative reviews (1, 2, 5) but struggle with mixed or neutral ones.
2. Mixed reviews (4, 7, 8) cause the most disagreement because simple sentiment tools look at individual words, not the overall meaning.
3. Confidence scores reflect how "sure" the model is. Low confidence (50-65%) means the text is ambiguous. High confidence (90%+) means strong sentiment signals.

---

### Exercise 5: ChatGPT as an NLP Multi-Tool

**Goal:** Explore how ChatGPT can perform multiple NLP tasks.

**Instructions:**
Open ChatGPT (https://chat.openai.com) and try each of these NLP tasks. Record the results.

**Task 1 — Sentiment Analysis:**
Prompt: `Analyze the sentiment of this review: "The hotel room was clean but the staff was incredibly unhelpful and the Wi-Fi kept dropping."`

**Task 2 — Named Entity Recognition:**
Prompt: `Identify all named entities (people, places, organizations, dates) in this text: "On March 15, 2024, CEO Tim Cook announced that Apple would open a new headquarters in Austin, Texas."`

**Task 3 — Text Summarization:**
Prompt: `Summarize this in one sentence: "Natural Language Processing is a subfield of artificial intelligence that focuses on the interaction between computers and humans through natural language. The ultimate goal of NLP is to enable computers to understand, interpret, and generate human language in a way that is both meaningful and useful."`

**Task 4 — Translation + Cultural Adaptation:**
Prompt: `Translate "It's raining cats and dogs" into Spanish, Japanese, and French. Explain if you used a literal translation or a cultural equivalent.`

**Task 5 — Text Classification:**
Prompt: `Classify each headline into a category (Sports, Technology, Politics, Entertainment, Science): 1) "NASA Discovers New Exoplanet" 2) "Lakers Win Championship" 3) "New iPhone Released" 4) "Senate Passes Healthcare Bill" 5) "Taylor Swift Breaks Streaming Record"`

**Questions:**
1. Which task did ChatGPT perform best at?
2. Were there any mistakes or surprising results?
3. How is ChatGPT different from a specialized NLP tool?

---

**SOLUTION:**

**Task 1 — Expected result:** ChatGPT should identify mixed/negative sentiment. "Clean" is positive but "unhelpful" and "kept dropping" are negative. Overall sentiment: negative-leaning mixed.

**Task 2 — Expected result:**
- Person: Tim Cook
- Organization: Apple
- Location: Austin, Texas
- Date: March 15, 2024
- Title: CEO

**Task 3 — Expected result:** Something like: "NLP is an AI subfield focused on enabling computers to understand and generate human language meaningfully."

**Task 4 — Expected result:**
- Spanish: "Llueve a cantaros" (cultural equivalent meaning "it rains by the jugful")
- Japanese: Similar idiomatic equivalent rather than literal "cats and dogs"
- French: "Il pleut des cordes" ("it's raining ropes")
- ChatGPT should explain these are cultural equivalents, not literal translations.

**Task 5 — Expected result:**
1. NASA Discovers New Exoplanet = Science
2. Lakers Win Championship = Sports
3. New iPhone Released = Technology
4. Senate Passes Healthcare Bill = Politics
5. Taylor Swift Breaks Streaming Record = Entertainment

**Answers to questions:**
1. ChatGPT typically performs best at text classification and NER because these are well-defined tasks.
2. Translation of idioms is where interesting results appear — ChatGPT usually handles cultural adaptation well.
3. ChatGPT is a general-purpose model. Specialized NLP tools may be more accurate for specific tasks (e.g., a dedicated NER system might catch more entities in complex text).

---

### Exercise 6: Google Translate Quality Comparison

**Goal:** Evaluate machine translation quality across languages.

**Instructions:**

1. Choose this English paragraph:
   > "The weather has been quite unpredictable lately. Yesterday it was sunny and warm, but today it's freezing cold with heavy rain. I hope tomorrow will be better because I have an outdoor picnic planned with friends."

2. Use Google Translate (translate.google.com) to translate it into:
   - Spanish
   - Japanese
   - French
   - Arabic
   - A language you speak (if different from above)

3. Then translate EACH result BACK to English (copy the translated text and translate it back).

4. Fill out this evaluation table:

| Language | Back-Translation Accuracy (1-5) | Meaning Preserved? | Awkward Phrasing? | Notes |
|----------|-------------------------------|--------------------|--------------------|-------|
| Spanish | | Yes/Partially/No | Yes/No | |
| Japanese | | Yes/Partially/No | Yes/No | |
| French | | Yes/Partially/No | Yes/No | |
| Arabic | | Yes/Partially/No | Yes/No | |
| Your language | | Yes/Partially/No | Yes/No | |

---

**SOLUTION:**

Typical results (may vary as Google Translate improves):

| Language | Typical Accuracy | Meaning | Awkward? | Common Issues |
|----------|-----------------|---------|----------|---------------|
| Spanish | 4-5 | Yes | Rarely | European languages translate well. Minor word order differences. |
| Japanese | 3-4 | Partially | Sometimes | "Unpredictable" may lose nuance. Informal tone may become formal. |
| French | 4-5 | Yes | Rarely | Very close to English in structure. Minor idiom issues. |
| Arabic | 3-4 | Partially | Sometimes | Right-to-left language, different grammar. "Freezing cold" may lose emphasis. |

**Key observations:**
- Languages closely related to English (Spanish, French) translate more accurately.
- Languages with very different structures (Japanese, Arabic) may lose nuance and tone.
- The "round-trip" test (translate and translate back) reveals information loss.
- Idiomatic expressions ("freezing cold", "quite unpredictable") are the hardest parts.
- Google Translate has improved dramatically with neural machine translation but still struggles with context-dependent meaning.

---

## ADVANCED EXERCISES

---

### Exercise 7: Python Sentiment Analysis with TextBlob and NLTK

**Goal:** Build a working sentiment analyzer using Python.

**Prerequisites:** Python 3 installed. Install packages with:
```bash
pip install textblob nltk
python -m textblob.download_corpora
```

**Instructions:**

Write a Python script that:
1. Analyzes sentiment of a list of reviews
2. Classifies each as Positive, Negative, or Neutral
3. Prints the polarity score and classification

```python
# YOUR CODE HERE: sentiment_analyzer.py
# Use TextBlob to analyze these reviews:

reviews = [
    "This product is absolutely wonderful! Best thing I've ever bought.",
    "Terrible quality. Broke after one day. Complete waste of money.",
    "It's okay. Nothing great, nothing terrible. Just average.",
    "The customer service was amazing but the product itself was mediocre.",
    "I can't believe how bad this is. Returning immediately.",
    "Love love love it! My whole family enjoys using this every day.",
    "The delivery was fast but the packaging was damaged.",
    "Not what I expected. The color is different from the picture.",
]

# For each review:
# 1. Get the polarity score (-1 to +1)
# 2. Get the subjectivity score (0 to 1)
# 3. Classify as Positive (>0.1), Negative (<-0.1), or Neutral
# 4. Print results in a formatted table
```

---

**SOLUTION:**

```python
from textblob import TextBlob

reviews = [
    "This product is absolutely wonderful! Best thing I've ever bought.",
    "Terrible quality. Broke after one day. Complete waste of money.",
    "It's okay. Nothing great, nothing terrible. Just average.",
    "The customer service was amazing but the product itself was mediocre.",
    "I can't believe how bad this is. Returning immediately.",
    "Love love love it! My whole family enjoys using this every day.",
    "The delivery was fast but the packaging was damaged.",
    "Not what I expected. The color is different from the picture.",
]

def classify_sentiment(polarity):
    if polarity > 0.1:
        return "POSITIVE"
    elif polarity < -0.1:
        return "NEGATIVE"
    else:
        return "NEUTRAL"

print(f"{'#':<4} {'Polarity':>10} {'Subjectivity':>13} {'Label':<10} Review")
print("-" * 90)

positive_count = 0
negative_count = 0
neutral_count = 0

for i, review in enumerate(reviews, 1):
    blob = TextBlob(review)
    polarity = blob.sentiment.polarity        # -1 (negative) to +1 (positive)
    subjectivity = blob.sentiment.subjectivity # 0 (objective) to 1 (subjective)
    label = classify_sentiment(polarity)

    if label == "POSITIVE":
        positive_count += 1
    elif label == "NEGATIVE":
        negative_count += 1
    else:
        neutral_count += 1

    # Truncate review for display
    short_review = review[:50] + "..." if len(review) > 50 else review
    print(f"{i:<4} {polarity:>10.3f} {subjectivity:>13.3f} {label:<10} {short_review}")

print("-" * 90)
print(f"\nSummary: {positive_count} Positive, {negative_count} Negative, {neutral_count} Neutral")
print(f"Average polarity: {sum(TextBlob(r).sentiment.polarity for r in reviews) / len(reviews):.3f}")
```

**Expected output (approximate):**
```
#    Polarity  Subjectivity Label      Review
------------------------------------------------------------------------------------------
1       0.750         0.750 POSITIVE   This product is absolutely wonderful! Best thing...
2      -0.583         0.767 NEGATIVE   Terrible quality. Broke after one day. Complete w...
3       0.050         0.571 NEUTRAL    It's okay. Nothing great, nothing terrible. Just ...
4       0.250         0.675 POSITIVE   The customer service was amazing but the product ...
5      -0.500         0.500 NEGATIVE   I can't believe how bad this is. Returning immedi...
6       0.400         0.600 POSITIVE   Love love love it! My whole family enjoys using t...
7       0.025         0.450 NEUTRAL    The delivery was fast but the packaging was damage...
8       0.000         0.400 NEUTRAL    Not what I expected. The color is different from t...
------------------------------------------------------------------------------------------

Summary: 3 Positive, 2 Negative, 3 Neutral
Average polarity: 0.049
```

**Key learning points:**
- **Polarity** ranges from -1 (very negative) to +1 (very positive)
- **Subjectivity** ranges from 0 (very objective/factual) to 1 (very subjective/opinionated)
- The threshold of 0.1/-0.1 for classification is a design choice — you could adjust it
- TextBlob uses a lexicon-based approach (looks up words in a sentiment dictionary)

---

### Exercise 8: Simple Text Classifier with scikit-learn

**Goal:** Build a text classifier that categorizes movie reviews as positive or negative.

**Prerequisites:**
```bash
pip install scikit-learn
```

**Instructions:**

Build a Naive Bayes text classifier that:
1. Trains on a set of labeled movie reviews
2. Tests on new, unseen reviews
3. Reports accuracy and shows predictions

```python
# YOUR CODE HERE: text_classifier.py
# Build a movie review classifier using:
# - CountVectorizer to convert text to numbers
# - MultinomialNB as the classifier
# - Train/test split to evaluate

# Training data (at least 20 reviews)
# Test on 5 new reviews
# Print accuracy and individual predictions
```

---

**SOLUTION:**

```python
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# Training data: movie reviews with labels
reviews = [
    # Positive reviews
    ("An incredible film with outstanding performances and a gripping storyline", "positive"),
    ("Loved every minute of it. The acting was superb and the plot was engaging", "positive"),
    ("A masterpiece of modern cinema. Beautifully directed and acted", "positive"),
    ("Heartwarming story with brilliant character development", "positive"),
    ("One of the best movies I have seen this year. Highly recommend", "positive"),
    ("The special effects were amazing and the story was compelling", "positive"),
    ("A fun and entertaining movie for the whole family", "positive"),
    ("Excellent dialogue and a surprising twist ending", "positive"),
    ("The cinematography was breathtaking and the score was perfect", "positive"),
    ("A delightful comedy that had me laughing throughout", "positive"),
    ("Truly inspiring film with a powerful message", "positive"),
    ("Great chemistry between the leads and a well-written script", "positive"),
    # Negative reviews
    ("A complete waste of two hours. Boring and predictable", "negative"),
    ("Terrible acting and a nonsensical plot. Very disappointing", "negative"),
    ("The worst movie I have ever seen. Awful in every way", "negative"),
    ("Dull and lifeless. The characters were flat and uninteresting", "negative"),
    ("Painful to sit through. Bad dialogue and worse direction", "negative"),
    ("An absolute disaster of a film. Nothing redeeming about it", "negative"),
    ("Confusing plot with too many holes. Not worth your time", "negative"),
    ("The movie was slow boring and completely forgettable", "negative"),
    ("Disappointing sequel that failed to capture the original magic", "negative"),
    ("Overrated and overhyped. The story made no sense", "negative"),
    ("Cringeworthy dialogue and laughable special effects", "negative"),
    ("A tedious and uninspired mess from start to finish", "negative"),
]

# Separate texts and labels
texts = [r[0] for r in reviews]
labels = [r[1] for r in reviews]

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    texts, labels, test_size=0.25, random_state=42
)

# Convert text to numerical features using TF-IDF
vectorizer = TfidfVectorizer(stop_words='english', max_features=500)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train a Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X_train_vec, y_train)

# Evaluate on test set
y_pred = classifier.predict(X_test_vec)
print("=" * 60)
print("MODEL EVALUATION ON TEST SET")
print("=" * 60)
print(f"\nAccuracy: {accuracy_score(y_test, y_pred):.1%}")
print(f"\nClassification Report:")
print(classification_report(y_test, y_pred))

# Test on brand new reviews
print("=" * 60)
print("PREDICTIONS ON NEW REVIEWS")
print("=" * 60)
new_reviews = [
    "This film was absolutely fantastic and I loved every second",
    "What a terrible movie. I wanted to leave the theater",
    "The movie was okay but nothing special or memorable",
    "Brilliant performances and an unforgettable storyline",
    "Boring plot and awful acting throughout the entire film",
]

new_vectors = vectorizer.transform(new_reviews)
predictions = classifier.predict(new_vectors)
probabilities = classifier.predict_proba(new_vectors)

for review, pred, prob in zip(new_reviews, predictions, probabilities):
    confidence = max(prob) * 100
    short = review[:55] + "..." if len(review) > 55 else review
    print(f"\n  Review:     {short}")
    print(f"  Prediction: {pred.upper()} ({confidence:.0f}% confidence)")

# Show most important features
print("\n" + "=" * 60)
print("MOST IMPORTANT WORDS FOR EACH CLASS")
print("=" * 60)
feature_names = vectorizer.get_feature_names_out()
neg_idx = list(classifier.classes_).index("negative")
pos_idx = list(classifier.classes_).index("positive")

# Get log probabilities
neg_probs = classifier.feature_log_prob_[neg_idx]
pos_probs = classifier.feature_log_prob_[pos_idx]

# Most "negative" words
neg_top = sorted(zip(feature_names, neg_probs), key=lambda x: x[1], reverse=True)[:10]
print("\nTop NEGATIVE indicator words:", ", ".join(w for w, _ in neg_top))

# Most "positive" words
pos_top = sorted(zip(feature_names, pos_probs), key=lambda x: x[1], reverse=True)[:10]
print("Top POSITIVE indicator words:", ", ".join(w for w, _ in pos_top))
```

**Expected output (approximate):**
```
============================================================
MODEL EVALUATION ON TEST SET
============================================================

Accuracy: 83.3%

Classification Report:
              precision    recall  f1-score   support
    negative       0.80      1.00      0.89         4
    positive       1.00      0.50      0.67         2

============================================================
PREDICTIONS ON NEW REVIEWS
============================================================

  Review:     This film was absolutely fantastic and I loved every ...
  Prediction: POSITIVE (78% confidence)

  Review:     What a terrible movie. I wanted to leave the theater
  Prediction: NEGATIVE (82% confidence)

  Review:     The movie was okay but nothing special or memorable
  Prediction: NEGATIVE (61% confidence)

  Review:     Brilliant performances and an unforgettable storyline
  Prediction: POSITIVE (75% confidence)

  Review:     Boring plot and awful acting throughout the entire film
  Prediction: NEGATIVE (85% confidence)
```

**Key learning points:**
- **TF-IDF** (Term Frequency-Inverse Document Frequency) converts text into numbers by measuring how important each word is
- **Naive Bayes** is a simple but effective classifier for text data
- With only 24 training examples, accuracy is limited. Real systems use thousands or millions of examples
- The model learns which words are associated with positive vs. negative reviews
- Ambiguous reviews ("okay but nothing special") are the hardest to classify

---

### Exercise 9: Word Frequency Analysis

**Goal:** Analyze word patterns in text using Python — understand the foundation of how NLP processes language.

**Prerequisites:**
```bash
pip install nltk matplotlib
```

**Instructions:**

Write a Python script that:
1. Takes a block of text (use a paragraph from any article or book)
2. Tokenizes it into words
3. Removes stop words (common words like "the", "is", "at")
4. Counts word frequencies
5. Displays the top 20 most common words
6. Creates a bar chart visualization

```python
# YOUR CODE HERE: word_frequency.py
# Analyze word frequency in a text passage
# Use NLTK for tokenization and stop word removal
# Use matplotlib for visualization
```

---

**SOLUTION:**

```python
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import Counter
import matplotlib.pyplot as plt
import string

# Download required NLTK data (run once)
nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('stopwords', quiet=True)

# Sample text about AI and NLP (replace with any text you like)
text = """
Natural Language Processing is one of the most exciting fields in artificial
intelligence. It combines computer science and linguistics to help computers
understand human language. Every day millions of people interact with NLP
systems without even knowing it. When you ask Siri a question, use Google
Translate, or get email suggestions from Gmail, you are using NLP technology.

The recent advances in NLP have been driven by deep learning and transformer
models. Models like GPT and BERT have revolutionized how computers process
and generate text. These models are trained on massive amounts of text data
from the internet, books, and other sources. They learn patterns in language
that allow them to understand context, meaning, and even nuance.

One of the biggest challenges in NLP is understanding context. The word bank
can mean a financial institution or the side of a river. Humans easily
understand which meaning is intended from context, but teaching computers
to do the same is incredibly difficult. Modern transformer models handle
this much better than older approaches by using attention mechanisms that
consider the entire context of a sentence.

The future of NLP is bright. As models become larger and more sophisticated,
they will be able to understand and generate language with even greater
accuracy and nuance. Applications in healthcare, education, legal, and
many other fields will continue to expand, making NLP one of the most
impactful areas of artificial intelligence research.
"""

# Step 1: Tokenize
tokens = word_tokenize(text.lower())

# Step 2: Remove punctuation and non-alphabetic tokens
tokens = [word for word in tokens if word.isalpha()]

# Step 3: Remove stop words
stop_words = set(stopwords.words('english'))
filtered_tokens = [word for word in tokens if word not in stop_words]

# Step 4: Count frequencies
freq_dist = Counter(filtered_tokens)

# Step 5: Display results
print("=" * 50)
print("WORD FREQUENCY ANALYSIS")
print("=" * 50)
print(f"\nTotal words (raw):        {len(word_tokenize(text))}")
print(f"Total words (no punct):   {len(tokens)}")
print(f"After removing stopwords: {len(filtered_tokens)}")
print(f"Unique words:             {len(freq_dist)}")

print(f"\n{'Rank':<6} {'Word':<20} {'Count':<8} {'Bar'}")
print("-" * 50)
top_20 = freq_dist.most_common(20)
max_count = top_20[0][1]
for rank, (word, count) in enumerate(top_20, 1):
    bar = "#" * int((count / max_count) * 25)
    print(f"{rank:<6} {word:<20} {count:<8} {bar}")

# Step 6: Visualization
words = [w for w, c in top_20]
counts = [c for w, c in top_20]

plt.figure(figsize=(12, 6))
bars = plt.barh(range(len(words)), counts, color='#4A6CF7', edgecolor='#1A1F36')
plt.yticks(range(len(words)), words, fontsize=11)
plt.xlabel('Frequency', fontsize=12)
plt.title('Top 20 Most Frequent Words (Stop Words Removed)', fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()
plt.tight_layout()
plt.savefig('word_frequency.png', dpi=150)
plt.show()
print("\nChart saved as 'word_frequency.png'")

# Bonus: Bigram analysis (two-word combinations)
print("\n" + "=" * 50)
print("TOP 10 BIGRAMS (word pairs)")
print("=" * 50)
bigrams = list(zip(filtered_tokens[:-1], filtered_tokens[1:]))
bigram_freq = Counter(bigrams)
for rank, ((w1, w2), count) in enumerate(bigram_freq.most_common(10), 1):
    print(f"{rank:<4} \"{w1} {w2}\"  ({count})")
```

**Expected output (approximate):**
```
==================================================
WORD FREQUENCY ANALYSIS
==================================================

Total words (raw):        233
Total words (no punct):   196
After removing stopwords: 119
Unique words:             82

Rank   Word                 Count    Bar
--------------------------------------------------
1      nlp                  6        #########################
2      language             5        ####################
3      models               4        ################
4      text                 4        ################
5      computers            4        ################
6      understand           4        ################
7      context              3        ############
8      learning             2        ########
...

==================================================
TOP 10 BIGRAMS (word pairs)
==================================================
1    "natural language"  (2)
2    "artificial intelligence"  (2)
3    "transformer models"  (2)
...
```

**Key learning points:**
- **Stop words** (the, is, at, which, etc.) are the most frequent words in any language but carry little meaning. Removing them reveals the actual content words.
- **Tokenization** is the first step in any NLP pipeline.
- **Word frequency** gives a rough picture of what a text is about.
- **Bigrams** (word pairs) capture more context than single words — "artificial intelligence" is more meaningful than "artificial" alone.
- This bag-of-words approach was the foundation of NLP before deep learning. Modern models (BERT, GPT) go far beyond counting words — they understand context and relationships.

---

## SUMMARY OF EXERCISES

| # | Exercise | Level | Key NLP Concept |
|---|----------|-------|-----------------|
| 1 | Tokenization by Hand | Beginner | How text is broken into tokens |
| 2 | Manual Sentiment Analysis | Beginner | Classifying text polarity |
| 3 | NLP Applications Quiz | Beginner | Real-world NLP tasks |
| 4 | Online Sentiment Tool | Intermediate | Using real NLP tools |
| 5 | ChatGPT NLP Tasks | Intermediate | LLMs as multi-task NLP systems |
| 6 | Translation Comparison | Intermediate | Machine translation quality |
| 7 | Python Sentiment Analysis | Advanced | TextBlob, polarity scores |
| 8 | Text Classifier | Advanced | sklearn, TF-IDF, Naive Bayes |
| 9 | Word Frequency Analysis | Advanced | NLTK, tokenization, visualization |
