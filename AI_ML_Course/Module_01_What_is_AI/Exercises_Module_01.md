# Module 1: What is Artificial Intelligence? — Hands-On Exercises

---

## BEGINNER LEVEL (No coding required)

### Exercise 1.1: Spot the AI Around You
**Task:** Look around your daily life and list at least 10 things that use AI.
**Hint:** Think about your phone, apps, websites, and devices you use daily.

**Solution:**
Here are examples (yours may vary):
1. Phone's face unlock / fingerprint prediction
2. Autocorrect when typing messages
3. Siri / Google Assistant / Alexa
4. Netflix or YouTube recommendations
5. Spam filter in your email
6. Google Maps suggesting the fastest route
7. Instagram/TikTok showing content you like
8. Online shopping recommendations ("You might also like...")
9. Auto-focus on phone camera
10. Smart home thermostat adjusting temperature
11. Music recommendations on Spotify
12. Voice-to-text when dictating messages

---

### Exercise 1.2: AI or Not AI? (Quiz)
**Task:** For each item below, decide: Is this AI or NOT AI? Explain why.

| # | Item | AI or Not? |
|---|------|------------|
| 1 | A calculator adding 2+2 | ? |
| 2 | Netflix recommending a movie | ? |
| 3 | A light switch turning on a light | ? |
| 4 | Gmail sorting spam emails | ? |
| 5 | A washing machine with preset cycles | ? |
| 6 | Google Translate converting English to Spanish | ? |
| 7 | A digital alarm clock | ? |
| 8 | Siri answering "What's the weather?" | ? |
| 9 | A spreadsheet formula calculating totals | ? |
| 10 | A self-driving car navigating traffic | ? |

**Solution:**

| # | Item | Answer | Explanation |
|---|------|--------|-------------|
| 1 | Calculator adding 2+2 | **NOT AI** | Follows a fixed rule, doesn't learn or adapt |
| 2 | Netflix recommending a movie | **AI** | Learns your preferences from watching history |
| 3 | Light switch | **NOT AI** | Simple on/off mechanism, no intelligence |
| 4 | Gmail spam filter | **AI** | Learns to identify spam patterns from millions of emails |
| 5 | Washing machine presets | **NOT AI** | Follows pre-programmed fixed cycles |
| 6 | Google Translate | **AI** | Uses neural networks trained on millions of translations |
| 7 | Digital alarm clock | **NOT AI** | Just counts time, no learning involved |
| 8 | Siri answering questions | **AI** | Understands speech, processes language, finds answers |
| 9 | Spreadsheet formula | **NOT AI** | Follows fixed mathematical rules |
| 10 | Self-driving car | **AI** | Learns to recognize roads, signs, obstacles, and makes decisions |

**Key Learning:** AI involves LEARNING and ADAPTING. If it just follows fixed rules without learning, it's not AI.

---

### Exercise 1.3: Narrow AI vs General AI
**Task:** Classify each AI system as Narrow AI or General AI:

1. A chess-playing computer
2. A robot that can cook, clean, drive, and have conversations like a human
3. An AI that writes essays
4. An AI that detects cancer in X-rays
5. A robot from a sci-fi movie that thinks and feels

**Solution:**
1. Chess computer → **Narrow AI** (only plays chess)
2. Multi-task robot → **General AI** (doesn't exist yet!)
3. Essay-writing AI → **Narrow AI** (good at writing, can't do other human tasks)
4. Cancer detection AI → **Narrow AI** (specialized in one medical task)
5. Sci-fi thinking robot → **General AI / Super AI** (science fiction)

---

## INTERMEDIATE LEVEL (Light hands-on + critical thinking)

### Exercise 1.4: Try Talking to AI
**Task:** Go to ChatGPT (chat.openai.com) or any AI chatbot and:
1. Ask it to explain photosynthesis like you're 5 years old
2. Ask it to write a short poem about your favorite food
3. Ask it a math problem: "What is 347 × 28?"
4. Ask it something it might get wrong: "What happened in the news yesterday?"
5. Ask it to tell you about itself: "Are you conscious? Do you have feelings?"

**Write down:**
- Which answers were impressive?
- Which answers were wrong or weird?
- What does this tell you about AI's strengths and weaknesses?

**Solution / Discussion:**
- **Impressive:** AI is great at explanations, creative writing, and math
- **Wrong/Weird:** AI may "hallucinate" (make up facts), especially about recent events or things it wasn't trained on
- **Feelings question:** AI will say it doesn't have feelings — it's processing patterns, not experiencing emotions
- **Key Insight:** AI is a powerful pattern-matching tool, but it doesn't truly "understand" — it predicts what text should come next

---

### Exercise 1.5: How Would AI Learn This?
**Task:** For each scenario, describe what DATA the AI would need and what PATTERNS it would find:

1. **Scenario:** An AI that predicts if it will rain tomorrow
2. **Scenario:** An AI that recommends songs you'll like
3. **Scenario:** An AI that detects if an email is spam

**Solution:**

| Scenario | Data Needed | Patterns Found |
|----------|-------------|----------------|
| Rain prediction | Historical weather data (temperature, humidity, wind, cloud cover, past rainfall) | "When humidity is above 80% and clouds are thick, it usually rains" |
| Song recommendation | Your listening history, skip behavior, songs you liked/saved, similar users' data | "Users who like Song A and Song B also tend to like Song C" |
| Spam detection | Millions of emails labeled as spam or not-spam | "Emails with words like 'free money', 'click now', 'you won' are usually spam" |

---

### Exercise 1.6: AI Impact Analysis
**Task:** Choose ONE industry (healthcare, education, transportation, or entertainment) and answer:

1. **What** AI applications currently exist in this industry?
2. **How** does AI improve things compared to the old way?
3. **Where** might AI cause problems or concerns?
4. **Who** benefits the most? Who might be harmed?

**Solution (Example: Healthcare):**
1. **What:** Disease diagnosis from scans, drug discovery, robotic surgery, personalized treatment
2. **How:** AI can analyze thousands of X-rays in minutes (a doctor takes hours), spots patterns humans miss, available 24/7
3. **Where:** Privacy concerns (medical data), incorrect diagnoses if AI is wrong, not all hospitals can afford AI, may reduce the "human touch"
4. **Who benefits:** Patients (faster diagnosis), doctors (AI assists their work), rural areas (remote AI diagnosis). **Might be harmed:** Healthcare workers if jobs are automated, patients if AI makes errors

---

## ADVANCED LEVEL (Deeper thinking + basic coding exploration)

### Exercise 1.7: The Turing Test Experiment
**Task:** The Turing Test says: "If you can't tell whether you're talking to a human or AI, the AI passes."

1. Have a friend chat with ChatGPT while YOU chat with them separately about the same topic
2. Show both conversations (without labels) to a third person
3. Can they tell which conversation was with AI?

**Write a short report:**
- What clues gave away the AI?
- What made the AI seem human?
- Do you think the Turing Test is a good measure of intelligence? Why or why not?

**Solution / Discussion Points:**
- **AI giveaways:** Too polished/perfect language, very long responses, lack of personal experiences, no typos
- **Seemed human:** Natural language, humor, contextual understanding
- **Turing Test debate:** Many argue it's NOT a good test because mimicking conversation ≠ true intelligence. An AI can sound smart without understanding anything. A better test might be handling unexpected situations.

---

### Exercise 1.8: Your First Python AI Experiment (Beginner Coding)
**Task:** If you have Python installed, try this simple "AI-like" program:

```python
# A simple rule-based chatbot (NOT real AI, but shows the concept)
print("=" * 50)
print("  Simple Chatbot - Your First AI Experiment!")
print("=" * 50)
print("Type 'quit' to exit\n")

# This is our "knowledge base" - like data for AI
responses = {
    "hello": "Hi there! How can I help you?",
    "how are you": "I'm a computer program, so I don't have feelings, but thanks for asking!",
    "what is ai": "AI is software that can learn, reason, and make decisions!",
    "who made you": "I was created as a learning exercise for AI beginners!",
    "tell me a joke": "Why did the AI go to school? To improve its neural network! 😄",
    "bye": "Goodbye! Keep learning about AI!"
}

while True:
    user_input = input("You: ").lower().strip()

    if user_input == "quit":
        print("Bot: Goodbye!")
        break

    # Check if we have a matching response
    found = False
    for key in responses:
        if key in user_input:
            print(f"Bot: {responses[key]}")
            found = True
            break

    if not found:
        print("Bot: I don't understand that yet. I'm just a simple program!")
        print("     (Real AI like ChatGPT can understand much more!)")
```

**After running it, answer:**
1. Is this chatbot really AI? Why or why not?
2. What would make it smarter?
3. How is this different from ChatGPT?

**Solution:**
1. **Not real AI** — it uses fixed rules (if-then matching), doesn't learn
2. **To make it smarter:** More response patterns, ability to learn from conversations, understand context
3. **Difference from ChatGPT:** ChatGPT was trained on billions of text examples and can understand language context, generate creative responses, and handle topics it wasn't explicitly programmed for. Our chatbot only matches keywords.

---

### Exercise 1.9: AI Ethics Debate
**Task:** Read each scenario and argue BOTH sides (for and against):

**Scenario 1:** A company uses AI to screen job applications. The AI was trained on past hiring data where the company mostly hired men. Now the AI rejects most female applicants.
- **For AI screening:** Faster, consistent, processes thousands of applications
- **Against:** Biased training data = biased AI. Discriminates against women.
- **Your solution?**

**Scenario 2:** A hospital uses AI to decide which patients get treatment first. The AI prioritizes younger patients because data shows they have better recovery rates.
- **For:** Data-driven, objective decisions
- **Against:** Unfair to elderly, ignores individual circumstances
- **Your solution?**

**Solution / Key Insights:**
- AI inherits biases from its training data
- "Objective" AI can still be unfair
- AI should ASSIST human decision-making, not replace it entirely
- We need diverse training data and human oversight
- Ethics in AI is one of the biggest challenges we face today

---

### Exercise 1.10: Build Your AI Knowledge Map
**Task:** Create a mind map or diagram connecting these concepts (on paper or digitally):

Center: **Artificial Intelligence**

Branches:
- Types (Narrow, General, Super)
- How it works (Data → Patterns → Predictions)
- Where it's used (list 5+ industries)
- Tools you can try (ChatGPT, Google Lens, etc.)
- Concerns (bias, privacy, job loss, safety)
- History (key milestones)

**This is YOUR personal reference guide for AI basics!**

**Solution:** There's no single "right" answer — the goal is to organize your understanding. A good mind map should show connections between concepts. For example:
- "Data" connects to "How it works" AND "Concerns (privacy)"
- "Narrow AI" connects to "Where it's used" (all current examples are Narrow AI)
- "History" connects to "Types" (we've progressed from basic AI to sophisticated Narrow AI)

---

## BONUS: Quick Quiz — Test Your Understanding!

1. What is AI in one sentence?
2. Name the 3 steps of how AI works.
3. What type of AI do we have today?
4. Name 3 everyday examples of AI.
5. What is something AI CANNOT do well (that humans can)?

**Answers:**
1. AI is software that can learn from data, recognize patterns, and make decisions.
2. Feed data → Find patterns → Make predictions/decisions
3. Narrow AI (Weak AI)
4. (Any 3 from: voice assistants, recommendations, spam filters, navigation, face unlock, autocorrect, etc.)
5. (Any from: creativity, emotions, common sense, handling completely new situations, empathy, etc.)

---

*End of Module 1 Exercises. Proceed to Module 2: What is Machine Learning?*
