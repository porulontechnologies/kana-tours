const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBrain, FaComments, FaLanguage, FaRobot, FaCheckCircle, FaArrowRight,
  FaLightbulb, FaSearch, FaEnvelope, FaGlobeAmericas, FaHospital,
  FaGavel, FaCogs, FaRocket, FaThumbsUp, FaThumbsDown, FaQuoteLeft,
  FaBookOpen, FaListOl, FaProjectDiagram, FaExchangeAlt, FaPencilAlt,
  FaQuestionCircle, FaUsers, FaShieldAlt, FaHeadset, FaMagic
} = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// Color palette
const COLORS = {
  darkBg: "1A1F36",
  primary: "4A6CF7",
  primaryLight: "6B8CFF",
  accent: "00D4AA",
  accentDark: "00B894",
  white: "FFFFFF",
  lightGray: "F0F2F8",
  medGray: "8892B0",
  darkText: "1A1F36",
  cardBg: "FFFFFF",
  cardBorder: "E2E8F0",
  subtitle: "CBD5E1",
};

const FONTS = {
  header: "Georgia",
  body: "Calibri",
};

const makeShadow = () => ({
  type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.12,
});

async function createPresentation() {
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "AI & ML Course";
  pres.title = "Module 8: Natural Language Processing";

  // Pre-render icons
  const icons = {
    language: await iconToBase64Png(FaLanguage, "#FFFFFF", 256),
    languageBlue: await iconToBase64Png(FaLanguage, "#" + COLORS.primary, 256),
    comments: await iconToBase64Png(FaComments, "#" + COLORS.primary, 256),
    commentsWhite: await iconToBase64Png(FaComments, "#FFFFFF", 256),
    robot: await iconToBase64Png(FaRobot, "#" + COLORS.primary, 256),
    robotWhite: await iconToBase64Png(FaRobot, "#FFFFFF", 256),
    brain: await iconToBase64Png(FaBrain, "#" + COLORS.primary, 256),
    brainWhite: await iconToBase64Png(FaBrain, "#FFFFFF", 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    checkWhite: await iconToBase64Png(FaCheckCircle, "#FFFFFF", 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    search: await iconToBase64Png(FaSearch, "#" + COLORS.primary, 256),
    envelope: await iconToBase64Png(FaEnvelope, "#" + COLORS.primary, 256),
    globe: await iconToBase64Png(FaGlobeAmericas, "#" + COLORS.primary, 256),
    hospital: await iconToBase64Png(FaHospital, "#" + COLORS.primary, 256),
    gavel: await iconToBase64Png(FaGavel, "#" + COLORS.primary, 256),
    cogs: await iconToBase64Png(FaCogs, "#" + COLORS.primary, 256),
    rocket: await iconToBase64Png(FaRocket, "#" + COLORS.primary, 256),
    thumbsUp: await iconToBase64Png(FaThumbsUp, "#" + COLORS.primary, 256),
    listOl: await iconToBase64Png(FaListOl, "#" + COLORS.primary, 256),
    project: await iconToBase64Png(FaProjectDiagram, "#" + COLORS.primary, 256),
    exchange: await iconToBase64Png(FaExchangeAlt, "#" + COLORS.primary, 256),
    pencil: await iconToBase64Png(FaPencilAlt, "#" + COLORS.primary, 256),
    question: await iconToBase64Png(FaQuestionCircle, "#" + COLORS.primary, 256),
    headset: await iconToBase64Png(FaHeadset, "#" + COLORS.primary, 256),
    shield: await iconToBase64Png(FaShieldAlt, "#" + COLORS.primary, 256),
    magic: await iconToBase64Png(FaMagic, "#" + COLORS.primary, 256),
    users: await iconToBase64Png(FaUsers, "#" + COLORS.primary, 256),
    bookOpen: await iconToBase64Png(FaBookOpen, "#" + COLORS.primary, 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.language, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 8", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("Natural Language Processing", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 40, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Teaching Computers to Understand Human Language", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is NLP?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT is Natural Language Processing?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Main definition card
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 1.1, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 0.07, h: 1.1, fill: { color: COLORS.primary },
  });
  slide2.addText([
    { text: "NLP = Teaching computers to read, understand, and generate human language", options: { bold: true, fontSize: 18, color: COLORS.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.55, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("Computers speak in numbers \u2014 NLP bridges the gap between human words and computer numbers.", {
    x: 0.85, y: 1.9, w: 8.4, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Examples in 3 cards
  const nlpExamples = [
    { title: "ChatGPT", desc: "Conversing with AI\nin natural language", icon: icons.commentsWhite, x: 0.5 },
    { title: "Google Translate", desc: "Translating between\n100+ languages instantly", icon: icons.robotWhite, x: 3.55 },
    { title: "Siri / Alexa", desc: "Understanding your\nvoice commands", icon: icons.brainWhite, x: 6.6 },
  ];

  nlpExamples.forEach((ex) => {
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: ex.x, y: 2.7, w: 2.8, h: 1.65, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Icon circle
    slide2.addShape(pres.shapes.OVAL, {
      x: ex.x + 1.0, y: 2.85, w: 0.65, h: 0.65, fill: { color: COLORS.primary },
    });
    slide2.addImage({ data: ex.icon, x: ex.x + 1.12, y: 2.97, w: 0.4, h: 0.4 });
    slide2.addText(ex.title, {
      x: ex.x + 0.2, y: 3.55, w: 2.4, h: 0.35,
      fontSize: 14, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide2.addText(ex.desc, {
      x: ex.x + 0.2, y: 3.85, w: 2.4, h: 0.45,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom bar
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.6, w: 9, h: 0.7, fill: { color: COLORS.primary },
  });
  slide2.addText('"NLP makes human language computable \u2014 turning words into data computers can process"', {
    x: 0.7, y: 4.6, w: 8.6, h: 0.7,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    italic: true, bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW does NLP work?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Does NLP Work? (The Pipeline)", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 4 Steps
  const steps = [
    { num: "1", title: "TOKENIZE", desc: "Break text into\nwords or pieces", color: COLORS.primary },
    { num: "2", title: "EMBED", desc: "Convert words\ninto numbers", color: COLORS.accentDark },
    { num: "3", title: "UNDERSTAND", desc: "Analyze meaning\nand context", color: "7C3AED" },
    { num: "4", title: "RESPOND", desc: "Generate output\nor classify", color: "E85D75" },
  ];

  steps.forEach((step, i) => {
    const x = 0.3 + i * 2.45;
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 2.1, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 0.06, fill: { color: step.color },
    });
    // Number circle
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 0.7, y: 1.6, w: 0.7, h: 0.7, fill: { color: step.color },
    });
    slide3.addText(step.num, {
      x: x + 0.7, y: 1.6, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide3.addText(step.title, {
      x: x + 0.1, y: 2.4, w: 2.0, h: 0.35,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide3.addText(step.desc, {
      x: x + 0.1, y: 2.75, w: 2.0, h: 0.6,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    // Arrow between cards
    if (i < 3) {
      slide3.addImage({ data: icons.arrowAccent, x: x + 2.22, y: 2.15, w: 0.25, h: 0.25 });
    }
  });

  // Example card
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 0.07, h: 1.5, fill: { color: COLORS.accent },
  });
  slide3.addImage({ data: icons.lightbulb, x: 0.85, y: 3.85, w: 0.5, h: 0.5 });
  slide3.addText("Example: \"I love this movie!\"", {
    x: 1.5, y: 3.8, w: 7.8, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide3.addText([
    { text: "[\"I\", \"love\", \"this\", \"movie\", \"!\"] ", options: { color: COLORS.primary, bold: true } },
    { text: "\u2192  ", options: { color: COLORS.medGray } },
    { text: "[0.23, 0.87, 0.12, 0.65, 0.91] ", options: { color: COLORS.accentDark, bold: true } },
    { text: "\u2192  ", options: { color: COLORS.medGray } },
    { text: "Positive context ", options: { color: "7C3AED", bold: true } },
    { text: "\u2192  ", options: { color: COLORS.medGray } },
    { text: "Sentiment: POSITIVE \u2705", options: { color: "E85D75", bold: true } },
  ], { x: 1.5, y: 4.35, w: 7.8, h: 0.7, fontSize: 13, fontFace: FONTS.body, margin: 0 });

  // ============================================================
  // SLIDE 4 - Key NLP Tasks Explained
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("Key NLP Tasks Explained", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 2x3 grid of task cards
  const tasks = [
    { icon: icons.thumbsUp, title: "Sentiment Analysis", desc: "Is this review positive or negative?", x: 0.5, y: 1.35 },
    { icon: icons.users, title: "Named Entity Recognition", desc: "Find names, places, and dates in text", x: 3.55, y: 1.35 },
    { icon: icons.bookOpen, title: "Text Classification", desc: "Categorize documents by topic", x: 6.6, y: 1.35 },
    { icon: icons.exchange, title: "Machine Translation", desc: "English \u2192 Spanish, French \u2192 Chinese", x: 0.5, y: 3.1 },
    { icon: icons.pencil, title: "Text Generation", desc: "ChatGPT writing text from prompts", x: 3.55, y: 3.1 },
    { icon: icons.question, title: "Question Answering", desc: "Finding answers from documents", x: 6.6, y: 3.1 },
  ];

  tasks.forEach((t) => {
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: t.x, y: t.y, w: 2.8, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Icon circle
    slide4.addShape(pres.shapes.OVAL, {
      x: t.x + 0.25, y: t.y + 0.2, w: 0.6, h: 0.6, fill: { color: COLORS.lightGray },
    });
    slide4.addImage({ data: t.icon, x: t.x + 0.35, y: t.y + 0.3, w: 0.4, h: 0.4 });
    slide4.addText(t.title, {
      x: t.x + 1.0, y: t.y + 0.15, w: 1.6, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide4.addText(t.desc, {
      x: t.x + 1.0, y: t.y + 0.5, w: 1.6, h: 0.7,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // ============================================================
  // SLIDE 5 - WHEN to use NLP?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHEN Should You Use NLP?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const whenItems = [
    { title: "Working with Text Data", desc: "Any time your data is words, sentences, or documents rather than numbers", color: COLORS.primary },
    { title: "Automating Language Tasks", desc: "Sorting emails, routing support tickets, tagging content automatically", color: COLORS.accentDark },
    { title: "Customer Feedback Analysis", desc: "Understanding thousands of reviews, surveys, or social media comments at scale", color: "7C3AED" },
    { title: "Building Chatbots", desc: "Creating conversational AI for customer service, FAQ, or virtual assistants", color: "E85D75" },
    { title: "Content Moderation", desc: "Detecting spam, hate speech, or inappropriate content automatically", color: "F59E0B" },
  ];

  whenItems.forEach((item, i) => {
    const y = 1.3 + i * 0.78;
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.68, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.68, fill: { color: item.color },
    });
    slide5.addText(item.title, {
      x: 0.8, y: y + 0.05, w: 3.0, h: 0.3,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide5.addText(item.desc, {
      x: 3.8, y: y + 0.05, w: 5.5, h: 0.58,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray, valign: "middle", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 6 - WHERE is NLP used today?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("WHERE is NLP Used Today?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const usages = [
    { icon: icons.headset, title: "Chatbots", desc: "Customer service automation, 24/7 support", x: 0.5, y: 1.35 },
    { icon: icons.envelope, title: "Email", desc: "Smart compose, spam filtering, priority sorting", x: 3.55, y: 1.35 },
    { icon: icons.search, title: "Search Engines", desc: "Understanding what you really mean when you search", x: 6.6, y: 1.35 },
    { icon: icons.shield, title: "Social Media", desc: "Content moderation, trend detection, sentiment", x: 0.5, y: 3.15 },
    { icon: icons.hospital, title: "Healthcare", desc: "Medical records analysis, clinical notes processing", x: 3.55, y: 3.15 },
    { icon: icons.gavel, title: "Legal", desc: "Contract analysis, legal document review", x: 6.6, y: 3.15 },
  ];

  usages.forEach((u) => {
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: u.x, y: u.y, w: 2.8, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide6.addShape(pres.shapes.OVAL, {
      x: u.x + 0.25, y: u.y + 0.2, w: 0.6, h: 0.6, fill: { color: COLORS.lightGray },
    });
    slide6.addImage({ data: u.icon, x: u.x + 0.35, y: u.y + 0.3, w: 0.4, h: 0.4 });
    slide6.addText(u.title, {
      x: u.x + 1.0, y: u.y + 0.15, w: 1.6, h: 0.35,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide6.addText(u.desc, {
      x: u.x + 1.0, y: u.y + 0.5, w: 1.6, h: 0.7,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // ============================================================
  // SLIDE 7 - WHICH NLP technologies?
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("WHICH NLP Technologies Power Today's AI?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const techs = [
    {
      title: "Word Embeddings",
      status: "WORDS AS NUMBERS",
      statusColor: COLORS.primary,
      desc: "Every word becomes a list of\nnumbers that capture its meaning.\n\"King\" and \"Queen\" are close\nin number-space.",
      cardColor: COLORS.primary,
    },
    {
      title: "Transformers",
      status: "THE BREAKTHROUGH",
      statusColor: COLORS.accent,
      desc: "The architecture behind ChatGPT.\nProcesses all words at once\n(not one by one) using\n\"attention\" mechanism.",
      cardColor: COLORS.accentDark,
    },
    {
      title: "GPT Models",
      status: "GENERATIVE AI",
      statusColor: "7C3AED",
      desc: "Generative Pre-trained Transformers.\nTrained on massive text to\npredict and generate\nhuman-like language.",
      cardColor: "7C3AED",
    },
    {
      title: "BERT",
      status: "UNDERSTANDING CONTEXT",
      statusColor: "E85D75",
      desc: "Reads text both left-to-right\nAND right-to-left.\nUnderstands context better\nthan one-direction models.",
      cardColor: "E85D75",
    },
  ];

  techs.forEach((t, i) => {
    const x = 0.3 + i * 2.45;
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 3.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 0.06, fill: { color: t.cardColor },
    });
    slide7.addText(t.title, {
      x: x + 0.1, y: 1.5, w: 2.0, h: 0.4,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    // Status badge
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15, y: 1.95, w: 1.9, h: 0.3, fill: { color: t.statusColor },
    });
    slide7.addText(t.status, {
      x: x + 0.15, y: 1.95, w: 1.9, h: 0.3,
      fontSize: 8, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide7.addText(t.desc, {
      x: x + 0.15, y: 2.4, w: 1.9, h: 1.8,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom bar
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.6, w: 9, h: 0.7, fill: { color: COLORS.primary },
  });
  slide7.addText("The Transformer architecture (2017) revolutionized NLP \u2014 it's behind ChatGPT, BERT, and modern AI", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.7,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - How ChatGPT Works (Simply)
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("How ChatGPT Works (Simply)", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 4 step cards for how ChatGPT works
  const gptSteps = [
    { num: "1", title: "MASSIVE TRAINING", desc: "Trained on billions of\ntext documents from\nbooks, websites, articles", color: COLORS.primary },
    { num: "2", title: "NEXT WORD PREDICTION", desc: "Learns to predict\nwhat word comes next\nin any sentence", color: COLORS.accentDark },
    { num: "3", title: "ATTENTION MECHANISM", desc: "Understands which words\nrelate to each other\nacross the whole text", color: "7C3AED" },
    { num: "4", title: "HUMAN FEEDBACK", desc: "Fine-tuned with human\nratings to be helpful,\nharmless, and honest", color: "E85D75" },
  ];

  gptSteps.forEach((step, i) => {
    const x = 0.3 + i * 2.45;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 2.1, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 0.06, fill: { color: step.color },
    });
    slide8.addShape(pres.shapes.OVAL, {
      x: x + 0.7, y: 1.6, w: 0.7, h: 0.7, fill: { color: step.color },
    });
    slide8.addText(step.num, {
      x: x + 0.7, y: 1.6, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide8.addText(step.title, {
      x: x + 0.05, y: 2.4, w: 2.1, h: 0.3,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide8.addText(step.desc, {
      x: x + 0.05, y: 2.7, w: 2.1, h: 0.65,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    if (i < 3) {
      slide8.addImage({ data: icons.arrowAccent, x: x + 2.22, y: 2.15, w: 0.25, h: 0.25 });
    }
  });

  // Key insight card
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 0.07, h: 1.5, fill: { color: COLORS.accent },
  });
  slide8.addImage({ data: icons.lightbulb, x: 0.85, y: 3.85, w: 0.5, h: 0.5 });
  slide8.addText("The Key Insight", {
    x: 1.5, y: 3.8, w: 7.8, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide8.addText([
    { text: "ChatGPT doesn't actually \"think\" \u2014 ", options: { color: COLORS.primary, bold: true } },
    { text: "it predicts what text comes next, really well. ", options: { color: COLORS.medGray } },
    { text: "Like autocomplete on steroids! ", options: { color: COLORS.accentDark, bold: true } },
    { text: "Given \"The cat sat on the...\", it predicts \"mat\" because that pattern appeared millions of times in its training data.", options: { color: COLORS.medGray } },
  ], { x: 1.5, y: 4.3, w: 7.8, h: 0.8, fontSize: 12, fontFace: FONTS.body, margin: 0 });

  // ============================================================
  // SLIDE 9 - Key Takeaways
  // ============================================================
  let slide9 = pres.addSlide();
  slide9.background = { color: COLORS.lightGray };

  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide9.addText("Key Takeaways", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const takeaways = [
    "NLP bridges the gap between human language and computer numbers",
    "The pipeline: Tokenize \u2192 Embed \u2192 Understand \u2192 Respond",
    "Key tasks: sentiment analysis, translation, text generation, Q&A",
    "Transformers revolutionized NLP \u2014 they power ChatGPT and BERT",
    "ChatGPT predicts the next word extremely well \u2014 it doesn't truly \"think\"",
  ];

  takeaways.forEach((text, i) => {
    const y = 1.35 + i * 0.78;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.65, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide9.addImage({ data: icons.check, x: 0.7, y: y + 0.1, w: 0.42, h: 0.42 });
    slide9.addText(text, {
      x: 1.3, y: y, w: 7.9, h: 0.65,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, valign: "middle", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 10 - What's Next?
  // ============================================================
  let slide10 = pres.addSlide();
  slide10.background = { color: COLORS.darkBg };

  slide10.addImage({ data: icons.arrow, x: 4.4, y: 0.7, w: 1.2, h: 1.2 });

  slide10.addText("What's Next?", {
    x: 0.5, y: 2.0, w: 9, h: 0.8,
    fontSize: 36, fontFace: FONTS.header, color: COLORS.white, bold: true, align: "center", margin: 0,
  });

  slide10.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 2.85, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  slide10.addText("In Module 9, we'll learn:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Computer Vision \u2014 Teaching Computers to See", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.4, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_08_NLP/Module_08_NLP.pptx" });
  console.log("Module 8 presentation created successfully!");
}

createPresentation().catch(console.error);
