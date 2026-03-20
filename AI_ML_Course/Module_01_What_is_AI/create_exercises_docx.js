const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
        Header, Footer, PageNumber, PageBreak, LevelFormat } = require("docx");

// Colors
const C = {
  primary: "4A6CF7",
  accent: "00B894",
  dark: "1A1F36",
  gray: "64748B",
  lightBg: "F0F4FF",
  tableBorder: "CBD5E1",
  tableHeader: "4A6CF7",
  tableHeaderText: "FFFFFF",
  tableAlt: "F8FAFC",
  codeBlockBg: "F1F5F9",
  codeBorder: "E2E8F0",
};

const border = { style: BorderStyle.SINGLE, size: 1, color: C.tableBorder };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// Page dimensions (US Letter)
const PAGE_W = 12240;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9360

function headerCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: C.tableHeader, type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: C.tableHeaderText, font: "Arial", size: 20 })] })],
  });
}

function cell(textRuns, width, shading) {
  const runs = typeof textRuns === "string"
    ? [new TextRun({ text: textRuns, font: "Arial", size: 20 })]
    : textRuns;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: shading ? { fill: shading, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    children: [new Paragraph({ children: runs })],
  });
}

function boldCell(text, width, shading) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: shading ? { fill: shading, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, font: "Arial", size: 20 })] })],
  });
}

function spacer(h = 100) {
  return new Paragraph({ spacing: { after: h }, children: [] });
}

function heading1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text })] });
}
function heading2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text })] });
}
function heading3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text })] });
}

function para(runs) {
  if (typeof runs === "string") {
    return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: runs, font: "Arial", size: 22 })] });
  }
  return new Paragraph({ spacing: { after: 120 }, children: runs });
}

function boldPara(label, text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: label, bold: true, font: "Arial", size: 22 }),
      new TextRun({ text, font: "Arial", size: 22 }),
    ],
  });
}

function bulletItem(text, ref = "bullets", level = 0) {
  return new Paragraph({
    numbering: { reference: ref, level },
    spacing: { after: 60 },
    children: typeof text === "string"
      ? [new TextRun({ text, font: "Arial", size: 22 })]
      : text,
  });
}

function numberedItem(text, ref = "numbers1", level = 0) {
  return new Paragraph({
    numbering: { reference: ref, level },
    spacing: { after: 60 },
    children: typeof text === "string"
      ? [new TextRun({ text, font: "Arial", size: 22 })]
      : text,
  });
}

function codeBlock(lines) {
  return lines.map((line, i) =>
    new Paragraph({
      spacing: { after: 0 },
      shading: { fill: C.codeBlockBg, type: ShadingType.CLEAR },
      indent: { left: 360 },
      children: [new TextRun({ text: line || " ", font: "Consolas", size: 18, color: C.dark })],
    })
  );
}

function levelDivider(text) {
  return [
    new Paragraph({ children: [] }),
    new Paragraph({
      spacing: { before: 200, after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.primary, space: 8 } },
      children: [new TextRun({ text, bold: true, font: "Arial", size: 28, color: C.primary })],
    }),
  ];
}

async function createDoc() {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 22 } } },
      paragraphStyles: [
        {
          id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 36, bold: true, font: "Georgia", color: C.dark },
          paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 },
        },
        {
          id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 30, bold: true, font: "Georgia", color: C.primary },
          paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 },
        },
        {
          id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, font: "Arial", color: C.dark },
          paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{
            level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
        {
          reference: "numbers1",
          levels: [{
            level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
        {
          reference: "numbers2",
          levels: [{
            level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
        {
          reference: "numbers3",
          levels: [{
            level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
        {
          reference: "numbers4",
          levels: [{
            level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
        {
          reference: "numbers5",
          levels: [{
            level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
        {
          reference: "numbers6",
          levels: [{
            level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: 15840 },
            margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
          },
        },
        headers: {
          default: new Header({
            children: [new Paragraph({
              border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.primary, space: 4 } },
              children: [
                new TextRun({ text: "AI & ML Course  |  Module 1: What is Artificial Intelligence?", font: "Arial", size: 16, color: C.gray, italics: true }),
              ],
            })],
          }),
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 1, color: C.tableBorder, space: 4 } },
              children: [
                new TextRun({ text: "Page ", font: "Arial", size: 16, color: C.gray }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: C.gray }),
              ],
            })],
          }),
        },
        children: [
          // ========== TITLE ==========
          new Paragraph({
            spacing: { after: 80 },
            children: [new TextRun({ text: "MODULE 1", font: "Arial", size: 20, bold: true, color: C.primary, characterSpacing: 200 })],
          }),
          new Paragraph({
            spacing: { after: 40 },
            children: [new TextRun({ text: "What is Artificial Intelligence?", font: "Georgia", size: 44, bold: true, color: C.dark })],
          }),
          new Paragraph({
            spacing: { after: 300 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.primary, space: 12 } },
            children: [new TextRun({ text: "Hands-On Exercises & Solutions", font: "Arial", size: 24, color: C.gray })],
          }),

          // ========== BEGINNER LEVEL ==========
          ...levelDivider("BEGINNER LEVEL (No coding required)"),

          // Exercise 1.1
          heading3("Exercise 1.1: Spot the AI Around You"),
          boldPara("Task: ", "Look around your daily life and list at least 10 things that use AI."),
          boldPara("Hint: ", "Think about your phone, apps, websites, and devices you use daily."),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          para("Here are examples (yours may vary):"),
          numberedItem("Phone\u2019s face unlock / fingerprint prediction", "numbers1"),
          numberedItem("Autocorrect when typing messages", "numbers1"),
          numberedItem("Siri / Google Assistant / Alexa", "numbers1"),
          numberedItem("Netflix or YouTube recommendations", "numbers1"),
          numberedItem("Spam filter in your email", "numbers1"),
          numberedItem("Google Maps suggesting the fastest route", "numbers1"),
          numberedItem("Instagram/TikTok showing content you like", "numbers1"),
          numberedItem("Online shopping recommendations (\u201CYou might also like...\u201D)", "numbers1"),
          numberedItem("Auto-focus on phone camera", "numbers1"),
          numberedItem("Smart home thermostat adjusting temperature", "numbers1"),
          numberedItem("Music recommendations on Spotify", "numbers1"),
          numberedItem("Voice-to-text when dictating messages", "numbers1"),

          // Exercise 1.2
          spacer(200),
          heading3("Exercise 1.2: AI or Not AI? (Quiz)"),
          boldPara("Task: ", "For each item below, decide: Is this AI or NOT AI? Explain why."),
          spacer(),
          // Quiz table
          new Table({
            width: { size: CONTENT_W, type: WidthType.DXA },
            columnWidths: [600, 5760, 3000],
            rows: [
              new TableRow({ children: [headerCell("#", 600), headerCell("Item", 5760), headerCell("AI or Not?", 3000)] }),
              ...([
                ["1", "A calculator adding 2+2", "?"],
                ["2", "Netflix recommending a movie", "?"],
                ["3", "A light switch turning on a light", "?"],
                ["4", "Gmail sorting spam emails", "?"],
                ["5", "A washing machine with preset cycles", "?"],
                ["6", "Google Translate converting English to Spanish", "?"],
                ["7", "A digital alarm clock", "?"],
                ["8", 'Siri answering \u201CWhat\u2019s the weather?\u201D', "?"],
                ["9", "A spreadsheet formula calculating totals", "?"],
                ["10", "A self-driving car navigating traffic", "?"],
              ].map((row, i) =>
                new TableRow({
                  children: [
                    cell(row[0], 600, i % 2 ? C.tableAlt : undefined),
                    cell(row[1], 5760, i % 2 ? C.tableAlt : undefined),
                    cell(row[2], 3000, i % 2 ? C.tableAlt : undefined),
                  ],
                })
              )),
            ],
          }),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          new Table({
            width: { size: CONTENT_W, type: WidthType.DXA },
            columnWidths: [600, 2800, 1200, 4760],
            rows: [
              new TableRow({ children: [headerCell("#", 600), headerCell("Item", 2800), headerCell("Answer", 1200), headerCell("Explanation", 4760)] }),
              ...([
                ["1", "Calculator adding 2+2", "NOT AI", "Follows a fixed rule, doesn\u2019t learn or adapt"],
                ["2", "Netflix recommending", "AI", "Learns your preferences from watching history"],
                ["3", "Light switch", "NOT AI", "Simple on/off mechanism, no intelligence"],
                ["4", "Gmail spam filter", "AI", "Learns to identify spam patterns from millions of emails"],
                ["5", "Washing machine", "NOT AI", "Follows pre-programmed fixed cycles"],
                ["6", "Google Translate", "AI", "Uses neural networks trained on millions of translations"],
                ["7", "Digital alarm clock", "NOT AI", "Just counts time, no learning involved"],
                ["8", "Siri answering", "AI", "Understands speech, processes language, finds answers"],
                ["9", "Spreadsheet formula", "NOT AI", "Follows fixed mathematical rules"],
                ["10", "Self-driving car", "AI", "Learns to recognize roads, signs, and makes decisions"],
              ].map((row, i) =>
                new TableRow({
                  children: [
                    cell(row[0], 600, i % 2 ? C.tableAlt : undefined),
                    cell(row[1], 2800, i % 2 ? C.tableAlt : undefined),
                    boldCell(row[2], 1200, i % 2 ? C.tableAlt : undefined),
                    cell(row[3], 4760, i % 2 ? C.tableAlt : undefined),
                  ],
                })
              )),
            ],
          }),
          spacer(),
          para([
            new TextRun({ text: "Key Learning: ", bold: true, font: "Arial", size: 22, color: C.primary }),
            new TextRun({ text: "AI involves LEARNING and ADAPTING. If it just follows fixed rules without learning, it\u2019s not AI.", font: "Arial", size: 22 }),
          ]),

          // Exercise 1.3
          spacer(200),
          heading3("Exercise 1.3: Narrow AI vs General AI"),
          boldPara("Task: ", "Classify each AI system as Narrow AI or General AI:"),
          numberedItem("A chess-playing computer", "numbers2"),
          numberedItem("A robot that can cook, clean, drive, and have conversations like a human", "numbers2"),
          numberedItem("An AI that writes essays", "numbers2"),
          numberedItem("An AI that detects cancer in X-rays", "numbers2"),
          numberedItem("A robot from a sci-fi movie that thinks and feels", "numbers2"),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          numberedItem([
            new TextRun({ text: "Chess computer \u2192 ", font: "Arial", size: 22 }),
            new TextRun({ text: "Narrow AI", bold: true, font: "Arial", size: 22, color: C.accent }),
            new TextRun({ text: " (only plays chess)", font: "Arial", size: 22 }),
          ], "numbers3"),
          numberedItem([
            new TextRun({ text: "Multi-task robot \u2192 ", font: "Arial", size: 22 }),
            new TextRun({ text: "General AI", bold: true, font: "Arial", size: 22, color: C.accent }),
            new TextRun({ text: " (doesn\u2019t exist yet!)", font: "Arial", size: 22 }),
          ], "numbers3"),
          numberedItem([
            new TextRun({ text: "Essay-writing AI \u2192 ", font: "Arial", size: 22 }),
            new TextRun({ text: "Narrow AI", bold: true, font: "Arial", size: 22, color: C.accent }),
            new TextRun({ text: " (good at writing, can\u2019t do other human tasks)", font: "Arial", size: 22 }),
          ], "numbers3"),
          numberedItem([
            new TextRun({ text: "Cancer detection AI \u2192 ", font: "Arial", size: 22 }),
            new TextRun({ text: "Narrow AI", bold: true, font: "Arial", size: 22, color: C.accent }),
            new TextRun({ text: " (specialized in one medical task)", font: "Arial", size: 22 }),
          ], "numbers3"),
          numberedItem([
            new TextRun({ text: "Sci-fi thinking robot \u2192 ", font: "Arial", size: 22 }),
            new TextRun({ text: "General AI / Super AI", bold: true, font: "Arial", size: 22, color: C.accent }),
            new TextRun({ text: " (science fiction)", font: "Arial", size: 22 }),
          ], "numbers3"),

          // ========== INTERMEDIATE LEVEL ==========
          new Paragraph({ children: [new PageBreak()] }),
          ...levelDivider("INTERMEDIATE LEVEL (Light hands-on + critical thinking)"),

          // Exercise 1.4
          heading3("Exercise 1.4: Try Talking to AI"),
          boldPara("Task: ", "Go to ChatGPT (chat.openai.com) or any AI chatbot and try these:"),
          numberedItem("Ask it to explain photosynthesis like you\u2019re 5 years old", "numbers4"),
          numberedItem("Ask it to write a short poem about your favorite food", "numbers4"),
          numberedItem('Ask it a math problem: \u201CWhat is 347 \u00D7 28?\u201D', "numbers4"),
          numberedItem('Ask it something it might get wrong: \u201CWhat happened in the news yesterday?\u201D', "numbers4"),
          numberedItem('Ask it: \u201CAre you conscious? Do you have feelings?\u201D', "numbers4"),
          spacer(),
          para([new TextRun({ text: "Write down:", bold: true, font: "Arial", size: 22 })]),
          bulletItem("Which answers were impressive?"),
          bulletItem("Which answers were wrong or weird?"),
          bulletItem("What does this tell you about AI\u2019s strengths and weaknesses?"),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution / Discussion:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          bulletItem([
            new TextRun({ text: "Impressive: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "AI is great at explanations, creative writing, and math", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Wrong/Weird: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "AI may \u201Challucinate\u201D (make up facts), especially about recent events", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Feelings question: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "AI will say it doesn\u2019t have feelings \u2014 it processes patterns, not emotions", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Key Insight: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "AI is a powerful pattern-matching tool, but it doesn\u2019t truly \u201Cunderstand\u201D", font: "Arial", size: 22 }),
          ]),

          // Exercise 1.5
          spacer(200),
          heading3("Exercise 1.5: How Would AI Learn This?"),
          boldPara("Task: ", "For each scenario, describe what DATA the AI would need and what PATTERNS it would find:"),
          numberedItem("An AI that predicts if it will rain tomorrow", "numbers5"),
          numberedItem("An AI that recommends songs you\u2019ll like", "numbers5"),
          numberedItem("An AI that detects if an email is spam", "numbers5"),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          new Table({
            width: { size: CONTENT_W, type: WidthType.DXA },
            columnWidths: [2000, 3680, 3680],
            rows: [
              new TableRow({ children: [headerCell("Scenario", 2000), headerCell("Data Needed", 3680), headerCell("Patterns Found", 3680)] }),
              new TableRow({
                children: [
                  cell("Rain prediction", 2000),
                  cell("Historical weather data (temperature, humidity, wind, cloud cover)", 3680),
                  cell("\u201CWhen humidity is above 80% and clouds are thick, it usually rains\u201D", 3680),
                ],
              }),
              new TableRow({
                children: [
                  cell("Song recommendation", 2000, C.tableAlt),
                  cell("Your listening history, skip behavior, similar users\u2019 data", 3680, C.tableAlt),
                  cell("\u201CUsers who like Song A and B also tend to like Song C\u201D", 3680, C.tableAlt),
                ],
              }),
              new TableRow({
                children: [
                  cell("Spam detection", 2000),
                  cell("Millions of emails labeled as spam or not-spam", 3680),
                  cell("\u201CEmails with \u2018free money\u2019, \u2018click now\u2019 are usually spam\u201D", 3680),
                ],
              }),
            ],
          }),

          // Exercise 1.6
          spacer(200),
          heading3("Exercise 1.6: AI Impact Analysis"),
          boldPara("Task: ", "Choose ONE industry (healthcare, education, transportation, or entertainment) and answer:"),
          numberedItem([
            new TextRun({ text: "What ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "AI applications currently exist in this industry?", font: "Arial", size: 22 }),
          ], "numbers6"),
          numberedItem([
            new TextRun({ text: "How ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "does AI improve things compared to the old way?", font: "Arial", size: 22 }),
          ], "numbers6"),
          numberedItem([
            new TextRun({ text: "Where ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "might AI cause problems or concerns?", font: "Arial", size: 22 }),
          ], "numbers6"),
          numberedItem([
            new TextRun({ text: "Who ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "benefits the most? Who might be harmed?", font: "Arial", size: 22 }),
          ], "numbers6"),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution (Example: Healthcare):", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          bulletItem([
            new TextRun({ text: "What: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Disease diagnosis from scans, drug discovery, robotic surgery, personalized treatment", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "How: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "AI can analyze thousands of X-rays in minutes, spots patterns humans miss, available 24/7", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Where: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Privacy concerns, incorrect diagnoses, not all hospitals can afford AI, may reduce human touch", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Who benefits: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Patients, doctors, rural areas. Might be harmed: Healthcare workers if jobs automated, patients if AI errs", font: "Arial", size: 22 }),
          ]),

          // ========== ADVANCED LEVEL ==========
          new Paragraph({ children: [new PageBreak()] }),
          ...levelDivider("ADVANCED LEVEL (Deeper thinking + basic coding exploration)"),

          // Exercise 1.7
          heading3("Exercise 1.7: The Turing Test Experiment"),
          boldPara("Task: ", 'The Turing Test says: \u201CIf you can\u2019t tell whether you\u2019re talking to a human or AI, the AI passes.\u201D'),
          numberedItem("Have a friend chat with ChatGPT while YOU chat with them separately about the same topic", "numbers4"),
          numberedItem("Show both conversations (without labels) to a third person", "numbers4"),
          numberedItem("Can they tell which conversation was with AI?", "numbers4"),
          spacer(),
          para([new TextRun({ text: "Write a short report:", bold: true, font: "Arial", size: 22 })]),
          bulletItem("What clues gave away the AI?"),
          bulletItem("What made the AI seem human?"),
          bulletItem("Do you think the Turing Test is a good measure of intelligence? Why or why not?"),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution / Discussion:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          bulletItem([
            new TextRun({ text: "AI giveaways: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Too polished/perfect language, very long responses, lack of personal experiences, no typos", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Seemed human: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Natural language, humor, contextual understanding", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Turing Test debate: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Many argue it\u2019s NOT a good test because mimicking conversation \u2260 true intelligence. A better test might be handling unexpected situations.", font: "Arial", size: 22 }),
          ]),

          // Exercise 1.8
          spacer(200),
          heading3("Exercise 1.8: Your First Python AI Experiment (Beginner Coding)"),
          boldPara("Task: ", "If you have Python installed, try this simple \u201CAI-like\u201D program:"),
          spacer(),
          ...codeBlock([
            '# A simple rule-based chatbot (NOT real AI, but shows the concept)',
            'print("=" * 50)',
            'print("  Simple Chatbot - Your First AI Experiment!")',
            'print("=" * 50)',
            'print("Type \'quit\' to exit\\n")',
            '',
            '# This is our "knowledge base" - like data for AI',
            'responses = {',
            '    "hello": "Hi there! How can I help you?",',
            '    "how are you": "I\'m a computer program, but thanks for asking!",',
            '    "what is ai": "AI is software that can learn, reason, and make decisions!",',
            '    "who made you": "I was created as a learning exercise for AI beginners!",',
            '    "tell me a joke": "Why did the AI go to school? To improve its neural network!",',
            '    "bye": "Goodbye! Keep learning about AI!"',
            '}',
            '',
            'while True:',
            '    user_input = input("You: ").lower().strip()',
            '    if user_input == "quit":',
            '        print("Bot: Goodbye!")',
            '        break',
            '    found = False',
            '    for key in responses:',
            '        if key in user_input:',
            '            print(f"Bot: {responses[key]}")',
            '            found = True',
            '            break',
            '    if not found:',
            '        print("Bot: I don\'t understand that yet!")',
          ]),
          spacer(),
          para([new TextRun({ text: "After running it, answer:", bold: true, font: "Arial", size: 22 })]),
          numberedItem("Is this chatbot really AI? Why or why not?", "numbers5"),
          numberedItem("What would make it smarter?", "numbers5"),
          numberedItem("How is this different from ChatGPT?", "numbers5"),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          bulletItem([
            new TextRun({ text: "Not real AI ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "\u2014 it uses fixed rules (if-then matching), doesn\u2019t learn", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "To make it smarter: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "More response patterns, ability to learn from conversations, understand context", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Difference from ChatGPT: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "ChatGPT was trained on billions of text examples and can understand language context. Our chatbot only matches keywords.", font: "Arial", size: 22 }),
          ]),

          // Exercise 1.9
          spacer(200),
          heading3("Exercise 1.9: AI Ethics Debate"),
          boldPara("Task: ", "Read each scenario and argue BOTH sides (for and against):"),
          spacer(),
          para([new TextRun({ text: "Scenario 1: ", bold: true, font: "Arial", size: 22, color: C.primary }),
            new TextRun({ text: "A company uses AI to screen job applications. The AI was trained on past hiring data where the company mostly hired men. Now the AI rejects most female applicants.", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "For: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Faster, consistent, processes thousands of applications", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Against: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Biased training data = biased AI. Discriminates against women.", font: "Arial", size: 22 }),
          ]),
          spacer(),
          para([new TextRun({ text: "Scenario 2: ", bold: true, font: "Arial", size: 22, color: C.primary }),
            new TextRun({ text: "A hospital uses AI to decide which patients get treatment first. The AI prioritizes younger patients because data shows they have better recovery rates.", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "For: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Data-driven, objective decisions", font: "Arial", size: 22 }),
          ]),
          bulletItem([
            new TextRun({ text: "Against: ", bold: true, font: "Arial", size: 22 }),
            new TextRun({ text: "Unfair to elderly, ignores individual circumstances", font: "Arial", size: 22 }),
          ]),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Key Insights:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          bulletItem("AI inherits biases from its training data"),
          bulletItem("\u201CObjective\u201D AI can still be unfair"),
          bulletItem("AI should ASSIST human decision-making, not replace it entirely"),
          bulletItem("We need diverse training data and human oversight"),
          bulletItem("Ethics in AI is one of the biggest challenges we face today"),

          // Exercise 1.10
          spacer(200),
          heading3("Exercise 1.10: Build Your AI Knowledge Map"),
          boldPara("Task: ", "Create a mind map or diagram connecting these concepts (on paper or digitally):"),
          spacer(),
          para([new TextRun({ text: "Center: Artificial Intelligence", bold: true, font: "Arial", size: 22 })]),
          para([new TextRun({ text: "Branches:", bold: true, font: "Arial", size: 22 })]),
          bulletItem("Types (Narrow, General, Super)"),
          bulletItem("How it works (Data \u2192 Patterns \u2192 Predictions)"),
          bulletItem("Where it\u2019s used (list 5+ industries)"),
          bulletItem("Tools you can try (ChatGPT, Google Lens, etc.)"),
          bulletItem("Concerns (bias, privacy, job loss, safety)"),
          bulletItem("History (key milestones)"),
          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Solution:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          para("There\u2019s no single \u201Cright\u201D answer \u2014 the goal is to organize your understanding. A good mind map should show connections:"),
          bulletItem("\u201CData\u201D connects to \u201CHow it works\u201D AND \u201CConcerns (privacy)\u201D"),
          bulletItem("\u201CNarrow AI\u201D connects to \u201CWhere it\u2019s used\u201D (all current examples are Narrow AI)"),
          bulletItem("\u201CHistory\u201D connects to \u201CTypes\u201D (we\u2019ve progressed from basic AI to sophisticated Narrow AI)"),

          // ========== BONUS QUIZ ==========
          new Paragraph({ children: [new PageBreak()] }),
          ...levelDivider("BONUS: Quick Quiz \u2014 Test Your Understanding!"),

          numberedItem("What is AI in one sentence?", "numbers4"),
          numberedItem("Name the 3 steps of how AI works.", "numbers4"),
          numberedItem("What type of AI do we have today?", "numbers4"),
          numberedItem("Name 3 everyday examples of AI.", "numbers4"),
          numberedItem("What is something AI CANNOT do well (that humans can)?", "numbers4"),

          spacer(),
          new Paragraph({
            spacing: { after: 120 },
            shading: { fill: C.lightBg, type: ShadingType.CLEAR },
            indent: { left: 200, right: 200 },
            children: [new TextRun({ text: "Answers:", bold: true, font: "Arial", size: 22, color: C.primary })],
          }),
          numberedItem("AI is software that can learn from data, recognize patterns, and make decisions.", "numbers6"),
          numberedItem("Feed data \u2192 Find patterns \u2192 Make predictions/decisions", "numbers6"),
          numberedItem("Narrow AI (Weak AI)", "numbers6"),
          numberedItem("(Any 3 from: voice assistants, recommendations, spam filters, navigation, face unlock, autocorrect, etc.)", "numbers6"),
          numberedItem("(Any from: creativity, emotions, common sense, handling completely new situations, empathy, etc.)", "numbers6"),

          spacer(300),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 2, color: C.primary, space: 8 } },
            spacing: { before: 200 },
            children: [new TextRun({ text: "End of Module 1 Exercises  \u2022  Proceed to Module 2: What is Machine Learning?", font: "Arial", size: 20, italics: true, color: C.gray })],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("E:/porulon/Kana/AI_ML_Course/Module_01_What_is_AI/Exercises_Module_01.docx", buffer);
  console.log("Exercises_Module_01.docx created successfully!");
}

createDoc().catch(console.error);
