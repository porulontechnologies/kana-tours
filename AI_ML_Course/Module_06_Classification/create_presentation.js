const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaProjectDiagram, FaSitemap, FaEnvelope, FaStethoscope,
  FaSmile, FaDog, FaShieldAlt, FaCheckCircle, FaArrowRight,
  FaBullseye, FaExclamationTriangle, FaLightbulb, FaListOl,
  FaBrain, FaBalanceScale, FaThList, FaChartBar, FaQuestion,
  FaCrosshairs, FaRandom, FaChartLine
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
  pres.title = "Module 6: Classification";

  // Pre-render icons
  const icons = {
    sitemap: await iconToBase64Png(FaSitemap, "#FFFFFF", 256),
    sitemapBlue: await iconToBase64Png(FaSitemap, "#" + COLORS.primary, 256),
    envelope: await iconToBase64Png(FaEnvelope, "#" + COLORS.primary, 256),
    stethoscope: await iconToBase64Png(FaStethoscope, "#" + COLORS.primary, 256),
    smile: await iconToBase64Png(FaSmile, "#" + COLORS.primary, 256),
    dog: await iconToBase64Png(FaDog, "#" + COLORS.primary, 256),
    shield: await iconToBase64Png(FaShieldAlt, "#" + COLORS.primary, 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    checkWhite: await iconToBase64Png(FaCheckCircle, "#FFFFFF", 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    bullseye: await iconToBase64Png(FaBullseye, "#" + COLORS.primary, 256),
    warning: await iconToBase64Png(FaExclamationTriangle, "#F59E0B", 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    listOl: await iconToBase64Png(FaListOl, "#" + COLORS.primary, 256),
    brain: await iconToBase64Png(FaBrain, "#FFFFFF", 256),
    balance: await iconToBase64Png(FaBalanceScale, "#" + COLORS.primary, 256),
    thList: await iconToBase64Png(FaThList, "#" + COLORS.primary, 256),
    chartBar: await iconToBase64Png(FaChartBar, "#" + COLORS.primary, 256),
    question: await iconToBase64Png(FaQuestion, "#" + COLORS.primary, 256),
    crosshairs: await iconToBase64Png(FaCrosshairs, "#" + COLORS.primary, 256),
    random: await iconToBase64Png(FaRandom, "#" + COLORS.primary, 256),
    projectDiagram: await iconToBase64Png(FaProjectDiagram, "#" + COLORS.primary, 256),
    chartLine: await iconToBase64Png(FaChartLine, "#" + COLORS.primary, 256),
    warningRed: await iconToBase64Png(FaExclamationTriangle, "#EF4444", 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.sitemap, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 6", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("Classification", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 44, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Teaching Computers to Sort and Decide", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is Classification?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT is Classification?", {
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
    { text: "Classification = Putting things into categories or groups", options: { bold: true, fontSize: 18, color: COLORS.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.55, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("The computer learns what each category looks like from labeled examples, then sorts new items.", {
    x: 0.85, y: 1.9, w: 8.4, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Sorting mail analogy - 3 cards
  slide2.addImage({ data: icons.lightbulb, x: 0.6, y: 2.6, w: 0.4, h: 0.4 });
  slide2.addText("Think of it like sorting mail:", {
    x: 1.1, y: 2.6, w: 4, h: 0.4,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0, valign: "middle",
  });

  const mailExamples = [
    { title: "Personal", desc: "Letters from friends\nand family", color: COLORS.primary, x: 0.5 },
    { title: "Work", desc: "Invoices, contracts,\nmeeting notes", color: COLORS.accentDark, x: 3.55 },
    { title: "Spam", desc: "Junk mail, ads,\nunwanted offers", color: "E85D75", x: 6.6 },
  ];

  mailExamples.forEach((ex) => {
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: ex.x, y: 3.15, w: 2.8, h: 1.35, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: ex.x, y: 3.15, w: 2.8, h: 0.06, fill: { color: ex.color },
    });
    slide2.addText(ex.title, {
      x: ex.x + 0.2, y: 3.3, w: 2.4, h: 0.4,
      fontSize: 16, fontFace: FONTS.body, bold: true, color: ex.color, align: "center", margin: 0,
    });
    slide2.addText(ex.desc, {
      x: ex.x + 0.2, y: 3.75, w: 2.4, h: 0.6,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom bar
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.55, fill: { color: COLORS.primary },
  });
  slide2.addText("The computer learns patterns from examples, then classifies new items automatically!", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.55,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW does Classification work?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Does Classification Work?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 3 Steps
  const steps = [
    { num: "1", title: "LEARN FROM\nEXAMPLES", desc: "Feed the computer labeled data\n(e.g., 1000 spam and 1000 non-spam emails)", color: COLORS.primary },
    { num: "2", title: "FIND DECISION\nBOUNDARIES", desc: "The model finds rules that\nseparate the categories", color: COLORS.accentDark },
    { num: "3", title: "CLASSIFY\nNEW ITEMS", desc: "New data is sorted into\ncategories automatically", color: "E85D75" },
  ];

  steps.forEach((step, i) => {
    const x = 0.5 + i * 3.15;
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 0.06, fill: { color: step.color },
    });
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 1.05, y: 1.55, w: 0.7, h: 0.7, fill: { color: step.color },
    });
    slide3.addText(step.num, {
      x: x + 1.05, y: 1.55, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide3.addText(step.title, {
      x: x + 0.15, y: 2.3, w: 2.6, h: 0.45,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide3.addText(step.desc, {
      x: x + 0.15, y: 2.75, w: 2.6, h: 0.5,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
    if (i < 2) {
      slide3.addImage({ data: icons.arrowAccent, x: x + 2.95, y: 2.05, w: 0.3, h: 0.3 });
    }
  });

  // Types of classification
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.6, w: 4.25, h: 1.6, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.6, w: 0.07, h: 1.6, fill: { color: COLORS.primary },
  });
  slide3.addText("Binary Classification", {
    x: 0.8, y: 3.7, w: 3.7, h: 0.35,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.primary, bold: true, margin: 0,
  });
  slide3.addText("Only 2 choices:\n  Yes / No\n  Spam / Not Spam\n  Pass / Fail", {
    x: 0.8, y: 4.05, w: 3.7, h: 1.0,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 3.6, w: 4.25, h: 1.6, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 3.6, w: 0.07, h: 1.6, fill: { color: COLORS.accent },
  });
  slide3.addText("Multi-class Classification", {
    x: 5.55, y: 3.7, w: 3.7, h: 0.35,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.accentDark, bold: true, margin: 0,
  });
  slide3.addText("Many choices:\n  Cat / Dog / Bird / Fish\n  Happy / Sad / Angry / Neutral\n  A / B / C / D / F (grades)", {
    x: 5.55, y: 4.05, w: 3.7, h: 1.0,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  // ============================================================
  // SLIDE 4 - Popular Classification Algorithms
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("Popular Classification Algorithms", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const algorithms = [
    {
      icon: icons.projectDiagram, title: "Decision Trees",
      desc: "Like a flowchart of Yes/No questions.\n\"Is it raining? Yes -> Bring umbrella.\nNo -> Check temperature...\"",
      color: COLORS.primary, x: 0.5, y: 1.35,
    },
    {
      icon: icons.bullseye, title: "K-Nearest Neighbors (KNN)",
      desc: "Look at the most similar examples nearby.\n\"Your 5 closest neighbors are cats,\nso you're probably a cat too!\"",
      color: COLORS.accentDark, x: 5.25, y: 1.35,
    },
    {
      icon: icons.chartLine, title: "Logistic Regression",
      desc: "Despite the name, it classifies!\nDraws a line to separate categories.\nGreat for binary yes/no decisions.",
      color: "7C3AED", x: 0.5, y: 3.15,
    },
    {
      icon: icons.random, title: "Random Forest",
      desc: "Many decision trees vote together.\nLike asking 100 experts and going\nwith the majority opinion.",
      color: "E85D75", x: 5.25, y: 3.15,
    },
  ];

  algorithms.forEach((algo) => {
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: algo.x, y: algo.y, w: 4.25, h: 1.55, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: algo.x, y: algo.y, w: 0.07, h: 1.55, fill: { color: algo.color },
    });
    slide4.addImage({ data: algo.icon, x: algo.x + 0.25, y: algo.y + 0.15, w: 0.45, h: 0.45 });
    slide4.addText(algo.title, {
      x: algo.x + 0.85, y: algo.y + 0.12, w: 3.1, h: 0.4,
      fontSize: 15, fontFace: FONTS.body, color: algo.color, bold: true, margin: 0, valign: "middle",
    });
    slide4.addText(algo.desc, {
      x: algo.x + 0.25, y: algo.y + 0.6, w: 3.8, h: 0.85,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // ============================================================
  // SLIDE 5 - WHEN to use Classification?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHEN Should You Use Classification?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Use classification when...
  slide5.addImage({ data: icons.check, x: 0.6, y: 1.35, w: 0.4, h: 0.4 });
  slide5.addText("Use Classification WHEN...", {
    x: 1.1, y: 1.35, w: 5, h: 0.4,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.accentDark, bold: true, margin: 0, valign: "middle",
  });

  const whenItems = [
    { text: "Your output is a CATEGORY, not a number", detail: "\"Is this a cat or a dog?\" not \"How much does it cost?\"" },
    { text: "You have LABELED training data", detail: "Examples where you already know the correct answer" },
    { text: "You need to DECIDE between discrete options", detail: "Approve/Reject, Positive/Negative, Type A/B/C" },
  ];

  whenItems.forEach((item, i) => {
    const y = 1.95 + i * 1.05;
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.9, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.9, fill: { color: COLORS.accent },
    });
    slide5.addImage({ data: icons.check, x: 0.75, y: y + 0.22, w: 0.35, h: 0.35 });
    slide5.addText(item.text, {
      x: 1.3, y: y + 0.05, w: 7.9, h: 0.4,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide5.addText(item.detail, {
      x: 1.3, y: y + 0.45, w: 7.9, h: 0.35,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
    });
  });

  // Bottom note - Classification vs Regression
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.0, w: 9, h: 0.35, fill: { color: COLORS.primary },
  });
  slide5.addText("Remember: Classification = categories | Regression = numbers (Module 5)", {
    x: 0.7, y: 5.0, w: 8.6, h: 0.35,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 6 - WHERE is Classification used?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("WHERE is Classification Used?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const usages = [
    { icon: icons.envelope, title: "Email Spam Detection", desc: "Spam or Not Spam?", x: 0.5, y: 1.35 },
    { icon: icons.stethoscope, title: "Medical Diagnosis", desc: "Disease or Healthy?", x: 3.55, y: 1.35 },
    { icon: icons.smile, title: "Sentiment Analysis", desc: "Positive or Negative review?", x: 6.6, y: 1.35 },
    { icon: icons.dog, title: "Image Recognition", desc: "Cat vs Dog vs Bird?", x: 0.5, y: 3.1 },
    { icon: icons.shield, title: "Fraud Detection", desc: "Legitimate or Fraud?", x: 3.55, y: 3.1 },
  ];

  usages.forEach((u) => {
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: u.x, y: u.y, w: 2.8, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Icon circle
    slide6.addShape(pres.shapes.OVAL, {
      x: u.x + 1.0, y: u.y + 0.15, w: 0.7, h: 0.7, fill: { color: COLORS.lightGray },
    });
    slide6.addImage({ data: u.icon, x: u.x + 1.1, y: u.y + 0.25, w: 0.5, h: 0.5 });
    slide6.addText(u.title, {
      x: u.x + 0.2, y: u.y + 0.9, w: 2.4, h: 0.3,
      fontSize: 13, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide6.addText(u.desc, {
      x: u.x + 0.2, y: u.y + 1.15, w: 2.4, h: 0.25,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // "And many more" card
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 6.6, y: 3.1, w: 2.8, h: 1.5, fill: { color: COLORS.primary }, shadow: makeShadow(),
  });
  slide6.addText("And Many More!", {
    x: 6.8, y: 3.35, w: 2.4, h: 0.4,
    fontSize: 14, fontFace: FONTS.body, bold: true, color: COLORS.white, align: "center", margin: 0,
  });
  slide6.addText("Credit scoring, customer\nchurn prediction, language\ndetection, handwriting\nrecognition...", {
    x: 6.8, y: 3.75, w: 2.4, h: 0.75,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  // Bottom bar
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.85, w: 9, h: 0.45, fill: { color: COLORS.accent },
  });
  slide6.addText("Classification is one of the most widely used ML techniques in the real world!", {
    x: 0.7, y: 4.85, w: 8.6, h: 0.45,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 7 - WHICH metrics measure success?
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("WHICH Metrics Measure Success?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Metrics cards - left column
  const metrics = [
    {
      title: "Accuracy",
      desc: "% of predictions that are correct",
      formula: "Correct / Total predictions",
      color: COLORS.primary,
    },
    {
      title: "Precision",
      desc: "Of predicted positives, how many are actually correct?",
      formula: "\"I said it's spam — am I right?\"",
      color: COLORS.accentDark,
    },
    {
      title: "Recall",
      desc: "Of actual positives, how many did we find?",
      formula: "\"Of all real spam, how much did I catch?\"",
      color: "7C3AED",
    },
  ];

  metrics.forEach((m, i) => {
    const y = 1.3 + i * 0.9;
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 5.2, h: 0.78, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.78, fill: { color: m.color },
    });
    slide7.addText(m.title, {
      x: 0.75, y: y + 0.02, w: 2, h: 0.35,
      fontSize: 15, fontFace: FONTS.body, color: m.color, bold: true, margin: 0,
    });
    slide7.addText(m.desc, {
      x: 0.75, y: y + 0.32, w: 4.7, h: 0.2,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
    });
    slide7.addText(m.formula, {
      x: 0.75, y: y + 0.52, w: 4.7, h: 0.2,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
    });
  });

  // Confusion Matrix - right side card
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 1.3, w: 3.5, h: 3.75, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 1.3, w: 3.5, h: 0.06, fill: { color: "E85D75" },
  });
  slide7.addText("Confusion Matrix", {
    x: 6.15, y: 1.4, w: 3.2, h: 0.4,
    fontSize: 14, fontFace: FONTS.body, color: "E85D75", bold: true, align: "center", margin: 0,
  });
  slide7.addText("Shows ALL prediction outcomes:", {
    x: 6.15, y: 1.75, w: 3.2, h: 0.25,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
  });

  // Matrix grid
  const matrixX = 6.35;
  const matrixY = 2.15;
  const cellW = 1.35;
  const cellH = 0.65;

  // Header row
  slide7.addText("Predicted\nPositive", {
    x: matrixX + cellW, y: matrixY, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", valign: "middle", margin: 0,
  });
  slide7.addText("Predicted\nNegative", {
    x: matrixX + cellW * 2, y: matrixY, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // Row headers
  slide7.addText("Actually\nPositive", {
    x: matrixX, y: matrixY + cellH, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", valign: "middle", margin: 0,
  });
  slide7.addText("Actually\nNegative", {
    x: matrixX, y: matrixY + cellH * 2, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // TP
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: matrixX + cellW, y: matrixY + cellH, w: cellW, h: cellH,
    fill: { color: COLORS.accentDark },
  });
  slide7.addText("TP\n(Correct!)", {
    x: matrixX + cellW, y: matrixY + cellH, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // FP
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: matrixX + cellW * 2, y: matrixY + cellH, w: cellW, h: cellH,
    fill: { color: "EF4444" },
  });
  slide7.addText("FN\n(Missed!)", {
    x: matrixX + cellW * 2, y: matrixY + cellH, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // FN
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: matrixX + cellW, y: matrixY + cellH * 2, w: cellW, h: cellH,
    fill: { color: "F59E0B" },
  });
  slide7.addText("FP\n(False alarm!)", {
    x: matrixX + cellW, y: matrixY + cellH * 2, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // TN
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: matrixX + cellW * 2, y: matrixY + cellH * 2, w: cellW, h: cellH,
    fill: { color: COLORS.accentDark },
  });
  slide7.addText("TN\n(Correct!)", {
    x: matrixX + cellW * 2, y: matrixY + cellH * 2, w: cellW, h: cellH,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // Goal note
  slide7.addText("Goal: Maximize TP & TN,\nminimize FP & FN", {
    x: 6.15, y: 4.25, w: 3.2, h: 0.6,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - Common Pitfalls
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("Common Pitfalls to Watch Out For", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const pitfalls = [
    {
      title: "Imbalanced Data",
      desc: "If 99% of emails are not spam and 1% are spam, a model that always says \"not spam\" gets 99% accuracy — but catches zero spam!",
      tip: "Use techniques like oversampling, undersampling, or weighted classes.",
      color: "EF4444",
    },
    {
      title: "Overfitting",
      desc: "The model memorizes the training data instead of learning general patterns. Works perfectly on training data, fails on new data.",
      tip: "Use cross-validation and keep models simple.",
      color: "F59E0B",
    },
    {
      title: "Not Enough Diverse Training Data",
      desc: "If your training data only has adult faces, the model may fail on children's faces.",
      tip: "Collect diverse, representative data for all categories.",
      color: "7C3AED",
    },
    {
      title: "Ignoring False Negatives in Critical Apps",
      desc: "In medical diagnosis, missing a disease (false negative) can be life-threatening!",
      tip: "In critical applications, optimize for recall over precision.",
      color: "E85D75",
    },
  ];

  pitfalls.forEach((p, i) => {
    const y = 1.3 + i * 0.95;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.85, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.85, fill: { color: p.color },
    });
    slide8.addImage({ data: icons.warningRed, x: 0.7, y: y + 0.07, w: 0.3, h: 0.3 });
    slide8.addText(p.title, {
      x: 1.15, y: y + 0.03, w: 3, h: 0.3,
      fontSize: 13, fontFace: FONTS.body, color: p.color, bold: true, margin: 0,
    });
    slide8.addText(p.desc, {
      x: 1.15, y: y + 0.32, w: 5.5, h: 0.25,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
    });
    slide8.addText(p.tip, {
      x: 1.15, y: y + 0.57, w: 8, h: 0.22,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
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
    "Classification teaches computers to sort items into categories",
    "Binary = 2 classes, Multi-class = many classes",
    "Decision Trees, KNN, Logistic Regression, and Random Forest are popular algorithms",
    "Accuracy alone is not enough — watch for imbalanced data",
    "Precision (how correct are positives) and Recall (how many positives found) both matter",
    "Always test your model on data it has never seen before",
  ];

  takeaways.forEach((text, i) => {
    const y = 1.3 + i * 0.67;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.57, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide9.addImage({ data: icons.check, x: 0.7, y: y + 0.08, w: 0.38, h: 0.38 });
    slide9.addText(text, {
      x: 1.25, y: y, w: 8, h: 0.57,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, valign: "middle", margin: 0,
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

  slide10.addText("In Module 7, we'll explore:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Neural Networks — How Computers Mimic the Brain", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.4, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_06_Classification/Module_06_Classification.pptx" });
  console.log("Module 6 presentation created successfully!");
}

createPresentation().catch(console.error);
