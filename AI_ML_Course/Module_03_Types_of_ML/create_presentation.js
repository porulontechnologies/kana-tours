const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBrain, FaGraduationCap, FaPuzzlePiece, FaGamepad,
  FaCheckCircle, FaArrowRight, FaLightbulb, FaRobot,
  FaEnvelope, FaDog, FaHome, FaUsers, FaNewspaper,
  FaCar, FaChartLine, FaStethoscope, FaShieldAlt,
  FaChessKnight, FaSearch, FaSitemap, FaTrophy,
  FaDatabase, FaTag, FaQuestion
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
  supervised: "4A6CF7",
  unsupervised: "7C3AED",
  reinforcement: "E85D75",
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
  pres.title = "Module 3: Types of Machine Learning";

  // Pre-render icons
  const icons = {
    brain: await iconToBase64Png(FaBrain, "#FFFFFF", 256),
    brainPrimary: await iconToBase64Png(FaBrain, "#" + COLORS.primary, 256),
    gradCap: await iconToBase64Png(FaGraduationCap, "#" + COLORS.supervised, 256),
    gradCapWhite: await iconToBase64Png(FaGraduationCap, "#FFFFFF", 256),
    puzzle: await iconToBase64Png(FaPuzzlePiece, "#" + COLORS.unsupervised, 256),
    puzzleWhite: await iconToBase64Png(FaPuzzlePiece, "#FFFFFF", 256),
    gamepad: await iconToBase64Png(FaGamepad, "#" + COLORS.reinforcement, 256),
    gamepadWhite: await iconToBase64Png(FaGamepad, "#FFFFFF", 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    robot: await iconToBase64Png(FaRobot, "#" + COLORS.primary, 256),
    envelope: await iconToBase64Png(FaEnvelope, "#" + COLORS.supervised, 256),
    dog: await iconToBase64Png(FaDog, "#" + COLORS.reinforcement, 256),
    home: await iconToBase64Png(FaHome, "#" + COLORS.supervised, 256),
    users: await iconToBase64Png(FaUsers, "#" + COLORS.unsupervised, 256),
    newspaper: await iconToBase64Png(FaNewspaper, "#" + COLORS.unsupervised, 256),
    car: await iconToBase64Png(FaCar, "#" + COLORS.reinforcement, 256),
    chartLine: await iconToBase64Png(FaChartLine, "#" + COLORS.primary, 256),
    stethoscope: await iconToBase64Png(FaStethoscope, "#" + COLORS.supervised, 256),
    shield: await iconToBase64Png(FaShieldAlt, "#" + COLORS.unsupervised, 256),
    chess: await iconToBase64Png(FaChessKnight, "#" + COLORS.reinforcement, 256),
    search: await iconToBase64Png(FaSearch, "#" + COLORS.unsupervised, 256),
    sitemap: await iconToBase64Png(FaSitemap, "#" + COLORS.primary, 256),
    trophy: await iconToBase64Png(FaTrophy, "#" + COLORS.reinforcement, 256),
    database: await iconToBase64Png(FaDatabase, "#" + COLORS.primary, 256),
    tag: await iconToBase64Png(FaTag, "#" + COLORS.supervised, 256),
    question: await iconToBase64Png(FaQuestion, "#" + COLORS.primary, 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.brain, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 3", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("Types of Machine Learning", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 40, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Supervised, Unsupervised & Reinforcement Learning", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT are the 3 Types? Overview
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT Are the 3 Types of Machine Learning?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Three type cards
  const typeCards = [
    {
      icon: icons.gradCap, title: "Supervised\nLearning", color: COLORS.supervised,
      desc: "Learns with labeled examples",
      analogy: "Like a teacher with an answer key",
    },
    {
      icon: icons.puzzle, title: "Unsupervised\nLearning", color: COLORS.unsupervised,
      desc: "Finds patterns in unlabeled data",
      analogy: "Like sorting buttons without instructions",
    },
    {
      icon: icons.gamepad, title: "Reinforcement\nLearning", color: COLORS.reinforcement,
      desc: "Learns by trial & error with rewards",
      analogy: "Like training a dog with treats",
    },
  ];

  typeCards.forEach((card, i) => {
    const x = 0.5 + i * 3.15;
    // Card background
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 3.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Top color bar
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 0.06, fill: { color: card.color },
    });
    // Icon circle
    slide2.addShape(pres.shapes.OVAL, {
      x: x + 0.95, y: 1.6, w: 0.9, h: 0.9, fill: { color: card.color },
    });
    slide2.addImage({ data: card.icon, x: x + 1.1, y: 1.75, w: 0.6, h: 0.6 });
    // Title
    slide2.addText(card.title, {
      x: x + 0.2, y: 2.65, w: 2.5, h: 0.7,
      fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    // Description
    slide2.addText(card.desc, {
      x: x + 0.2, y: 3.35, w: 2.5, h: 0.5,
      fontSize: 13, fontFace: FONTS.body, color: card.color, bold: true, align: "center", margin: 0,
    });
    // Analogy
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.25, y: 3.95, w: 2.4, h: 0.7, fill: { color: COLORS.lightGray },
    });
    slide2.addText(card.analogy, {
      x: x + 0.3, y: 3.95, w: 2.3, h: 0.7,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, italic: true, align: "center", valign: "middle", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 3 - Supervised Learning Deep Dive
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addImage({ data: icons.gradCapWhite, x: 0.5, y: 0.22, w: 0.6, h: 0.6 });
  slide3.addText("Supervised Learning — Deep Dive", {
    x: 1.2, y: 0.2, w: 8.2, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // WHAT card
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 1.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 0.07, h: 1.0, fill: { color: COLORS.supervised },
  });
  slide3.addText([
    { text: "WHAT:  ", options: { bold: true, fontSize: 16, color: COLORS.supervised } },
    { text: "You give the computer input AND the correct answer", options: { fontSize: 15, color: COLORS.darkText } },
  ], { x: 0.85, y: 1.3, w: 8.4, h: 0.5, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide3.addText([
    { text: "HOW:  ", options: { bold: true, fontSize: 14, color: COLORS.supervised } },
    { text: "Like a teacher showing flashcards with answers on the back", options: { fontSize: 13, color: COLORS.medGray, italic: true } },
  ], { x: 0.85, y: 1.8, w: 8.4, h: 0.45, fontFace: FONTS.body, valign: "middle", margin: 0 });

  // Example cards
  const supExamples = [
    { icon: icons.envelope, title: "Email", result: "Spam / Not Spam", x: 0.5 },
    { icon: icons.dog, title: "Photo", result: "Cat / Dog", x: 3.55 },
    { icon: icons.home, title: "House Features", result: "Price: $350,000", x: 6.6 },
  ];

  slide3.addText("Examples of Supervised Learning:", {
    x: 0.5, y: 2.5, w: 9, h: 0.4,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.supervised, bold: true, margin: 0,
  });

  supExamples.forEach((ex) => {
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: ex.x, y: 2.95, w: 2.8, h: 1.6, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide3.addImage({ data: ex.icon, x: ex.x + 1.05, y: 3.05, w: 0.55, h: 0.55 });
    // Input label
    slide3.addText("Input: " + ex.title, {
      x: ex.x + 0.15, y: 3.65, w: 2.5, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    // Arrow
    slide3.addImage({ data: icons.arrowAccent, x: ex.x + 1.15, y: 3.98, w: 0.3, h: 0.2 });
    // Output label
    slide3.addText(ex.result, {
      x: ex.x + 0.15, y: 4.15, w: 2.5, h: 0.3,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.supervised, bold: true, align: "center", margin: 0,
    });
  });

  // Bottom key
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.55, fill: { color: COLORS.supervised },
  });
  slide3.addText("Key Idea: The computer learns from labeled data — input + correct answer pairs", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.55,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 4 - HOW Supervised Learning Works
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("HOW Does Supervised Learning Work?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Training step
  const processSteps = [
    { num: "1", title: "TRAINING", desc: "Show thousands of\nlabeled examples", color: COLORS.supervised },
    { num: "2", title: "TESTING", desc: "Give new unlabeled data,\ncheck predictions", color: COLORS.accentDark },
    { num: "3", title: "PREDICTING", desc: "Use on real-world\nnew data", color: COLORS.reinforcement },
  ];

  processSteps.forEach((step, i) => {
    const x = 0.5 + i * 3.15;
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.3, w: 2.9, h: 1.65, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.3, w: 2.9, h: 0.06, fill: { color: step.color },
    });
    slide4.addShape(pres.shapes.OVAL, {
      x: x + 1.0, y: 1.5, w: 0.7, h: 0.7, fill: { color: step.color },
    });
    slide4.addText(step.num, {
      x: x + 1.0, y: 1.5, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide4.addText(step.title, {
      x: x + 0.2, y: 2.25, w: 2.5, h: 0.3,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide4.addText(step.desc, {
      x: x + 0.2, y: 2.55, w: 2.5, h: 0.4,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
    if (i < 2) {
      slide4.addImage({ data: icons.arrowAccent, x: x + 2.95, y: 1.95, w: 0.3, h: 0.3 });
    }
  });

  // Two types section
  slide4.addText("Two Types of Supervised Learning:", {
    x: 0.5, y: 3.2, w: 9, h: 0.4,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });

  // Classification card
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.65, w: 4.25, h: 1.55, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.65, w: 0.07, h: 1.55, fill: { color: COLORS.supervised },
  });
  slide4.addImage({ data: icons.tag, x: 0.75, y: 3.75, w: 0.45, h: 0.45 });
  slide4.addText("Classification", {
    x: 1.35, y: 3.75, w: 3.2, h: 0.4,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.supervised, bold: true, margin: 0,
  });
  slide4.addText("Predicts CATEGORIES", {
    x: 1.35, y: 4.12, w: 3.2, h: 0.3,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide4.addText("Spam or Not Spam?\nCat or Dog?\nDisease or Healthy?", {
    x: 0.85, y: 4.42, w: 3.7, h: 0.7,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  // Regression card
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 3.65, w: 4.25, h: 1.55, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 3.65, w: 0.07, h: 1.55, fill: { color: COLORS.accentDark },
  });
  slide4.addImage({ data: icons.chartLine, x: 5.5, y: 3.75, w: 0.45, h: 0.45 });
  slide4.addText("Regression", {
    x: 6.1, y: 3.75, w: 3.2, h: 0.4,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accentDark, bold: true, margin: 0,
  });
  slide4.addText("Predicts NUMBERS", {
    x: 6.1, y: 4.12, w: 3.2, h: 0.3,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide4.addText("House price = $350,000?\nTemperature = 72\u00B0F?\nStock price = $142.50?", {
    x: 5.6, y: 4.42, w: 3.7, h: 0.7,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  // ============================================================
  // SLIDE 5 - Unsupervised Learning Deep Dive
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addImage({ data: icons.puzzleWhite, x: 0.5, y: 0.22, w: 0.6, h: 0.6 });
  slide5.addText("Unsupervised Learning — Deep Dive", {
    x: 1.2, y: 0.2, w: 8.2, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // WHAT card
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 1.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 0.07, h: 1.0, fill: { color: COLORS.unsupervised },
  });
  slide5.addText([
    { text: "WHAT:  ", options: { bold: true, fontSize: 16, color: COLORS.unsupervised } },
    { text: "You give input WITHOUT answers — the computer finds patterns on its own", options: { fontSize: 15, color: COLORS.darkText } },
  ], { x: 0.85, y: 1.3, w: 8.4, h: 0.5, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide5.addText([
    { text: "HOW:  ", options: { bold: true, fontSize: 14, color: COLORS.unsupervised } },
    { text: "Like sorting a pile of mixed buttons without being told the categories", options: { fontSize: 13, color: COLORS.medGray, italic: true } },
  ], { x: 0.85, y: 1.8, w: 8.4, h: 0.45, fontFace: FONTS.body, valign: "middle", margin: 0 });

  // Visual: Data in -> Groups out
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 4.25, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 4.25, h: 0.06, fill: { color: COLORS.unsupervised },
  });
  slide5.addText("How It Works", {
    x: 0.7, y: 2.65, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.unsupervised, bold: true, margin: 0,
  });
  slide5.addText([
    { text: "1. Feed UNLABELED data\n", options: { color: COLORS.darkText, bold: true } },
    { text: "   (no answers provided)\n\n", options: { color: COLORS.medGray, italic: true } },
    { text: "2. Algorithm finds PATTERNS\n", options: { color: COLORS.darkText, bold: true } },
    { text: "   (similarities, clusters, structure)\n\n", options: { color: COLORS.medGray, italic: true } },
    { text: "3. Data gets GROUPED\n", options: { color: COLORS.darkText, bold: true } },
    { text: "   (into meaningful categories)", options: { color: COLORS.medGray, italic: true } },
  ], { x: 0.8, y: 3.0, w: 3.7, h: 1.4, fontSize: 11, fontFace: FONTS.body, margin: 0 });

  // Examples card
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 2.5, w: 4.25, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 2.5, w: 4.25, h: 0.06, fill: { color: COLORS.unsupervised },
  });
  slide5.addText("Real-World Examples", {
    x: 5.45, y: 2.65, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.unsupervised, bold: true, margin: 0,
  });

  const unsupExamples = [
    { icon: icons.users, text: "Customer segmentation\n(group buyers by behavior)" },
    { icon: icons.newspaper, text: "Grouping similar\nnews articles together" },
    { icon: icons.search, text: "Detecting unusual patterns\n(fraud detection)" },
  ];

  unsupExamples.forEach((ex, i) => {
    const y = 3.1 + i * 0.45;
    slide5.addImage({ data: ex.icon, x: 5.5, y: y, w: 0.35, h: 0.35 });
    slide5.addText(ex.text, {
      x: 5.95, y: y, w: 3.3, h: 0.4,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
    });
  });

  // Bottom key
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.55, fill: { color: COLORS.unsupervised },
  });
  slide5.addText("Key Idea: No labels needed — the computer discovers hidden structure in the data", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.55,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 6 - Reinforcement Learning Deep Dive
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addImage({ data: icons.gamepadWhite, x: 0.5, y: 0.22, w: 0.6, h: 0.6 });
  slide6.addText("Reinforcement Learning — Deep Dive", {
    x: 1.2, y: 0.2, w: 8.2, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // WHAT card
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 1.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 0.07, h: 1.0, fill: { color: COLORS.reinforcement },
  });
  slide6.addText([
    { text: "WHAT:  ", options: { bold: true, fontSize: 16, color: COLORS.reinforcement } },
    { text: "An agent learns by doing actions and getting rewards or punishments", options: { fontSize: 15, color: COLORS.darkText } },
  ], { x: 0.85, y: 1.3, w: 8.4, h: 0.5, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide6.addText([
    { text: "HOW:  ", options: { bold: true, fontSize: 14, color: COLORS.reinforcement } },
    { text: "Like training a dog — reward for good behavior, no treat for bad behavior", options: { fontSize: 13, color: COLORS.medGray, italic: true } },
  ], { x: 0.85, y: 1.8, w: 8.4, h: 0.45, fontFace: FONTS.body, valign: "middle", margin: 0 });

  // RL Loop diagram
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 4.25, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.5, w: 4.25, h: 0.06, fill: { color: COLORS.reinforcement },
  });
  slide6.addText("The RL Loop", {
    x: 0.7, y: 2.65, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.reinforcement, bold: true, margin: 0,
  });
  slide6.addText([
    { text: "1. Agent takes an ACTION\n", options: { color: COLORS.darkText, bold: true } },
    { text: "   (robot moves forward)\n\n", options: { color: COLORS.medGray, italic: true } },
    { text: "2. Environment gives FEEDBACK\n", options: { color: COLORS.darkText, bold: true } },
    { text: "   (reward +1 or penalty -1)\n\n", options: { color: COLORS.medGray, italic: true } },
    { text: "3. Agent ADJUSTS strategy\n", options: { color: COLORS.darkText, bold: true } },
    { text: "   (try something different next time)", options: { color: COLORS.medGray, italic: true } },
  ], { x: 0.8, y: 3.0, w: 3.7, h: 1.4, fontSize: 11, fontFace: FONTS.body, margin: 0 });

  // Examples card
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 2.5, w: 4.25, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 2.5, w: 4.25, h: 0.06, fill: { color: COLORS.reinforcement },
  });
  slide6.addText("Real-World Examples", {
    x: 5.45, y: 2.65, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.reinforcement, bold: true, margin: 0,
  });

  const rlExamples = [
    { icon: icons.chess, text: "Game-playing AI\n(AlphaGo, chess engines)" },
    { icon: icons.robot, text: "Robot navigation\n(learn to walk, pick objects)" },
    { icon: icons.car, text: "Self-driving cars\n(learn driving strategies)" },
  ];

  rlExamples.forEach((ex, i) => {
    const y = 3.1 + i * 0.45;
    slide6.addImage({ data: ex.icon, x: 5.5, y: y, w: 0.35, h: 0.35 });
    slide6.addText(ex.text, {
      x: 5.95, y: y, w: 3.3, h: 0.4,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
    });
  });

  // Bottom key
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.55, fill: { color: COLORS.reinforcement },
  });
  slide6.addText("Key Idea: Learn by doing — maximize rewards through trial and error", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.55,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 7 - WHEN to Use Each Type?
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("WHEN Should You Use Each Type?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Decision table
  const tableRows = [
    { condition: "You have labeled data\n(input + correct answers)", type: "Supervised", color: COLORS.supervised, icon: icons.gradCap },
    { condition: "No labels — you want to\nfind hidden groups/patterns", type: "Unsupervised", color: COLORS.unsupervised, icon: icons.puzzle },
    { condition: "Need to learn a strategy\nthrough trial & error", type: "Reinforcement", color: COLORS.reinforcement, icon: icons.gamepad },
  ];

  // Table header
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 0.55, fill: { color: COLORS.darkBg },
  });
  slide7.addText("If you have...", {
    x: 0.7, y: 1.3, w: 4.5, h: 0.55,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, bold: true, valign: "middle", margin: 0,
  });
  slide7.addText("Use this type", {
    x: 5.5, y: 1.3, w: 3.8, h: 0.55,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, bold: true, valign: "middle", align: "center", margin: 0,
  });

  tableRows.forEach((row, i) => {
    const y = 1.85 + i * 1.05;
    // Row background
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.95, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.95, fill: { color: row.color },
    });
    // Condition text
    slide7.addText(row.condition, {
      x: 0.85, y: y, w: 4.35, h: 0.95,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, valign: "middle", margin: 0,
    });
    // Arrow
    slide7.addImage({ data: icons.arrowAccent, x: 5.3, y: y + 0.32, w: 0.3, h: 0.3 });
    // Type badge
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 5.9, y: y + 0.18, w: 2.5, h: 0.55, fill: { color: row.color },
    });
    slide7.addText(row.type, {
      x: 5.9, y: y + 0.18, w: 2.5, h: 0.55,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // Icon
    slide7.addImage({ data: row.icon, x: 8.65, y: y + 0.22, w: 0.45, h: 0.45 });
  });

  // Tip at bottom
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.55, fill: { color: COLORS.primary },
  });
  slide7.addImage({ data: icons.lightbulb, x: 0.7, y: 4.82, w: 0.35, h: 0.35 });
  slide7.addText("Tip: Most real-world ML applications use Supervised Learning!", {
    x: 1.15, y: 4.75, w: 8.1, h: 0.55,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - WHERE Each Type is Used
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("WHERE Is Each Type Used? (Real Examples)", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Supervised column
  const colWidth = 2.83;
  const columns = [
    {
      title: "Supervised", color: COLORS.supervised, icon: icons.gradCapWhite,
      items: [
        { icon: icons.stethoscope, text: "Medical diagnosis" },
        { icon: icons.chartLine, text: "Price prediction" },
        { icon: icons.envelope, text: "Spam filters" },
        { icon: icons.tag, text: "Image recognition" },
      ]
    },
    {
      title: "Unsupervised", color: COLORS.unsupervised, icon: icons.puzzleWhite,
      items: [
        { icon: icons.users, text: "Market segmentation" },
        { icon: icons.shield, text: "Anomaly detection" },
        { icon: icons.newspaper, text: "Topic modeling" },
        { icon: icons.sitemap, text: "Data compression" },
      ]
    },
    {
      title: "Reinforcement", color: COLORS.reinforcement, icon: icons.gamepadWhite,
      items: [
        { icon: icons.robot, text: "Robotics" },
        { icon: icons.chess, text: "Game AI" },
        { icon: icons.car, text: "Self-driving cars" },
        { icon: icons.trophy, text: "Resource optimization" },
      ]
    },
  ];

  columns.forEach((col, i) => {
    const x = 0.5 + i * 3.15;
    // Card
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.3, w: 2.9, h: 3.95, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Header band
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.3, w: 2.9, h: 0.65, fill: { color: col.color },
    });
    slide8.addImage({ data: col.icon, x: x + 0.2, y: 1.38, w: 0.45, h: 0.45 });
    slide8.addText(col.title, {
      x: x + 0.7, y: 1.3, w: 2.0, h: 0.65,
      fontSize: 16, fontFace: FONTS.body, color: COLORS.white, bold: true, valign: "middle", margin: 0,
    });

    // Items
    col.items.forEach((item, j) => {
      const y = 2.15 + j * 0.75;
      // Item background
      slide8.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.15, y: y, w: 2.6, h: 0.6, fill: { color: COLORS.lightGray },
      });
      slide8.addImage({ data: item.icon, x: x + 0.3, y: y + 0.1, w: 0.38, h: 0.38 });
      slide8.addText(item.text, {
        x: x + 0.8, y: y, w: 1.8, h: 0.6,
        fontSize: 12, fontFace: FONTS.body, color: COLORS.darkText, valign: "middle", margin: 0,
      });
    });
  });

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
    { color: COLORS.supervised, icon: icons.gradCap, type: "Supervised Learning", desc: "Give it labeled examples, it learns to predict — like studying with an answer key" },
    { color: COLORS.unsupervised, icon: icons.puzzle, type: "Unsupervised Learning", desc: "Give it data without labels, it finds hidden patterns — like sorting without instructions" },
    { color: COLORS.reinforcement, icon: icons.gamepad, type: "Reinforcement Learning", desc: "Let it learn by trial & error with rewards — like training a pet with treats" },
  ];

  takeaways.forEach((t, i) => {
    const y = 1.35 + i * 1.1;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.95, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.95, fill: { color: t.color },
    });
    // Icon
    slide9.addImage({ data: t.icon, x: 0.75, y: y + 0.22, w: 0.5, h: 0.5 });
    // Type name
    slide9.addText(t.type, {
      x: 1.45, y: y + 0.05, w: 7.8, h: 0.4,
      fontSize: 16, fontFace: FONTS.body, color: t.color, bold: true, margin: 0,
    });
    // Description
    slide9.addText(t.desc, {
      x: 1.45, y: y + 0.45, w: 7.8, h: 0.4,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Summary bar
  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.7, w: 9, h: 0.6, fill: { color: COLORS.primary },
  });
  slide9.addText("The type you choose depends on your DATA and your GOAL!", {
    x: 0.7, y: 4.7, w: 8.6, h: 0.6,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
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

  slide10.addText("In Module 4, we'll learn:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Data — The Fuel of AI", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("How data is collected, cleaned, and prepared for Machine Learning", {
    x: 0.5, y: 4.1, w: 9, h: 0.5,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.7, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_03_Types_of_ML/Module_03_Types_of_ML.pptx" });
  console.log("Module 3 presentation created successfully!");
}

createPresentation().catch(console.error);
