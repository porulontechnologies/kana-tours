const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBrain, FaCogs, FaClock, FaMapMarkerAlt, FaLayerGroup,
  FaCheckCircle, FaArrowRight, FaLightbulb, FaRobot,
  FaEnvelope, FaMicrophone, FaStethoscope, FaShieldAlt,
  FaCar, FaFilm, FaLanguage, FaChalkboardTeacher,
  FaTshirt, FaBicycle, FaDatabase, FaSearch, FaStar,
  FaProjectDiagram, FaBookOpen, FaRocket
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

// Color palette - Deep Tech Blue theme (matches Module 1)
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
  orange: "F59E0B",
  red: "E85D75",
  purple: "7C3AED",
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
  pres.title = "Module 2: What is Machine Learning?";

  // Pre-render icons
  const icons = {
    brain: await iconToBase64Png(FaBrain, "#FFFFFF", 256),
    brainBlue: await iconToBase64Png(FaBrain, "#" + COLORS.primary, 256),
    cogs: await iconToBase64Png(FaCogs, "#" + COLORS.primary, 256),
    cogsWhite: await iconToBase64Png(FaCogs, "#FFFFFF", 256),
    clock: await iconToBase64Png(FaClock, "#" + COLORS.primary, 256),
    mapMarker: await iconToBase64Png(FaMapMarkerAlt, "#" + COLORS.primary, 256),
    layers: await iconToBase64Png(FaLayerGroup, "#" + COLORS.primary, 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    arrowPrimary: await iconToBase64Png(FaArrowRight, "#" + COLORS.primary, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    robot: await iconToBase64Png(FaRobot, "#" + COLORS.primary, 256),
    envelope: await iconToBase64Png(FaEnvelope, "#" + COLORS.primary, 256),
    mic: await iconToBase64Png(FaMicrophone, "#" + COLORS.primary, 256),
    stethoscope: await iconToBase64Png(FaStethoscope, "#" + COLORS.primary, 256),
    shield: await iconToBase64Png(FaShieldAlt, "#" + COLORS.primary, 256),
    car: await iconToBase64Png(FaCar, "#" + COLORS.primary, 256),
    film: await iconToBase64Png(FaFilm, "#" + COLORS.primary, 256),
    language: await iconToBase64Png(FaLanguage, "#" + COLORS.primary, 256),
    teacher: await iconToBase64Png(FaChalkboardTeacher, "#FFFFFF", 256),
    tshirt: await iconToBase64Png(FaTshirt, "#FFFFFF", 256),
    bicycle: await iconToBase64Png(FaBicycle, "#FFFFFF", 256),
    database: await iconToBase64Png(FaDatabase, "#" + COLORS.primary, 256),
    search: await iconToBase64Png(FaSearch, "#" + COLORS.primary, 256),
    star: await iconToBase64Png(FaStar, "#" + COLORS.primary, 256),
    project: await iconToBase64Png(FaProjectDiagram, "#" + COLORS.primary, 256),
    book: await iconToBase64Png(FaBookOpen, "#" + COLORS.primary, 256),
    rocket: await iconToBase64Png(FaRocket, "#" + COLORS.primary, 256),
    rocketWhite: await iconToBase64Png(FaRocket, "#FFFFFF", 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide (Dark Background)
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.cogsWhite, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 2", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("What is Machine Learning?", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 40, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Teaching Computers to Learn From Experience", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is ML?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT is Machine Learning?", {
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
  slide2.addImage({ data: icons.brainBlue, x: 0.75, y: 1.5, w: 0.45, h: 0.45 });
  slide2.addText([
    { text: "ML = A subset of AI where computers learn from DATA", options: { bold: true, fontSize: 18, color: COLORS.primary } },
  ], { x: 1.35, y: 1.35, w: 7.9, h: 0.55, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("Instead of being explicitly programmed with every rule, the computer figures out patterns on its own!", {
    x: 1.35, y: 1.9, w: 7.9, h: 0.5,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Analogy card
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.7, w: 9, h: 1.4, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.7, w: 0.07, h: 1.4, fill: { color: COLORS.accent },
  });
  slide2.addImage({ data: icons.lightbulb, x: 0.75, y: 2.85, w: 0.45, h: 0.45 });
  slide2.addText("Cooking Analogy", {
    x: 1.35, y: 2.8, w: 7.9, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide2.addText([
    { text: "Traditional way: ", options: { bold: true, color: COLORS.medGray } },
    { text: "Give someone a recipe book with every single rule for cooking.\n", options: { color: COLORS.medGray } },
    { text: "Machine Learning way: ", options: { bold: true, color: COLORS.primary } },
    { text: "Show them 1,000 recipes and let them figure out the patterns!", options: { color: COLORS.primary } },
  ], { x: 1.35, y: 3.25, w: 7.9, h: 0.8, fontSize: 13, fontFace: FONTS.body, margin: 0 });

  // Bottom banner
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.4, w: 9, h: 0.8, fill: { color: COLORS.primary },
  });
  slide2.addText("ML is how computers go from \"do what I say\" to \"learn from what you see\"", {
    x: 0.7, y: 4.4, w: 8.6, h: 0.8,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    italic: true, bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW does ML work? (Traditional vs ML comparison)
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Does Machine Learning Work?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Traditional Programming card (LEFT)
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.25, h: 2.6, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.25, h: 0.06, fill: { color: COLORS.medGray },
  });
  slide3.addText("Traditional Programming", {
    x: 0.7, y: 1.55, w: 3.85, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
  });

  // Traditional flow boxes
  const tradBoxY = 2.15;
  // Input box
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: tradBoxY, w: 1.3, h: 0.55, fill: { color: COLORS.primary },
  });
  slide3.addText("Input\n(Data)", {
    x: 0.8, y: tradBoxY, w: 1.3, h: 0.55,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Plus sign
  slide3.addText("+", {
    x: 2.1, y: tradBoxY, w: 0.35, h: 0.55,
    fontSize: 20, fontFace: FONTS.body, color: COLORS.medGray, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Rules box
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 2.45, y: tradBoxY, w: 1.3, h: 0.55, fill: { color: COLORS.medGray },
  });
  slide3.addText("Rules\n(Program)", {
    x: 2.45, y: tradBoxY, w: 1.3, h: 0.55,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Equals
  slide3.addText("=", {
    x: 3.75, y: tradBoxY, w: 0.35, h: 0.55,
    fontSize: 20, fontFace: FONTS.body, color: COLORS.medGray, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Output box
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 4.1, y: tradBoxY, w: 0.5, h: 0.55, fill: { color: COLORS.accent },
  });
  slide3.addText("Out", {
    x: 4.1, y: tradBoxY, w: 0.5, h: 0.55,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  slide3.addText("You write ALL the rules by hand.\nThe computer just follows instructions.", {
    x: 0.8, y: 2.9, w: 3.7, h: 0.8,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
  });

  // VS divider
  slide3.addShape(pres.shapes.OVAL, {
    x: 4.5, y: 2.25, w: 1, h: 1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("VS", {
    x: 4.5, y: 2.25, w: 1, h: 1,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // Machine Learning card (RIGHT)
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 1.35, w: 4.25, h: 2.6, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 1.35, w: 4.25, h: 0.06, fill: { color: COLORS.accent },
  });
  slide3.addText("Machine Learning", {
    x: 5.45, y: 1.55, w: 3.85, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
  });

  // ML flow boxes
  const mlBoxY = 2.15;
  // Input box
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 5.55, y: mlBoxY, w: 1.3, h: 0.55, fill: { color: COLORS.primary },
  });
  slide3.addText("Input\n(Data)", {
    x: 5.55, y: mlBoxY, w: 1.3, h: 0.55,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Plus sign
  slide3.addText("+", {
    x: 6.85, y: mlBoxY, w: 0.35, h: 0.55,
    fontSize: 20, fontFace: FONTS.body, color: COLORS.medGray, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Output box
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 7.2, y: mlBoxY, w: 1.3, h: 0.55, fill: { color: COLORS.accent },
  });
  slide3.addText("Output\n(Answers)", {
    x: 7.2, y: mlBoxY, w: 1.3, h: 0.55,
    fontSize: 10, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Equals
  slide3.addText("=", {
    x: 8.5, y: mlBoxY, w: 0.35, h: 0.55,
    fontSize: 20, fontFace: FONTS.body, color: COLORS.medGray, bold: true, align: "center", valign: "middle", margin: 0,
  });
  // Rules box (output)
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 8.85, y: mlBoxY, w: 0.5, h: 0.55, fill: { color: COLORS.orange },
  });
  slide3.addText("Rules", {
    x: 8.85, y: mlBoxY, w: 0.5, h: 0.55,
    fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  slide3.addText("The computer figures out the RULES itself!\nYou just provide data and answers.", {
    x: 5.55, y: 2.9, w: 3.7, h: 0.8,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.accentDark, align: "center", bold: true, margin: 0,
  });

  // Bottom key insight
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.25, w: 9, h: 0.95, fill: { color: COLORS.primary },
  });
  slide3.addText("The BIG Difference", {
    x: 0.7, y: 4.25, w: 8.6, h: 0.4,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });
  slide3.addText("Traditional: Human writes rules  |  ML: Computer DISCOVERS rules from data", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.5,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 4 - WHEN should you use ML?
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("WHEN Should You Use Machine Learning?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 4 reason cards in 2x2 grid
  const reasons = [
    { title: "Rules Are Too Complex", desc: "Some problems have thousands of rules that are impossible to write manually.", example: "Ex: Recognizing a cat in a photo", color: COLORS.primary, x: 0.5, y: 1.35 },
    { title: "Patterns Change Over Time", desc: "The rules of the game keep shifting, so static programs become outdated fast.", example: "Ex: Spam email detection", color: COLORS.accentDark, x: 5.0, y: 1.35 },
    { title: "You Have Lots of Data", desc: "ML thrives when there are many examples to learn from.", example: "Ex: Millions of past transactions", color: COLORS.purple, x: 0.5, y: 3.0 },
    { title: "You Need Personalization", desc: "Every user is different and needs a unique experience.", example: "Ex: Netflix recommendations", color: COLORS.orange, x: 5.0, y: 3.0 },
  ];

  reasons.forEach((r) => {
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: r.x, y: r.y, w: 4.5, h: 1.4, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: r.x, y: r.y, w: 0.07, h: 1.4, fill: { color: r.color },
    });
    slide4.addText(r.title, {
      x: r.x + 0.25, y: r.y + 0.1, w: 4.0, h: 0.35,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide4.addText(r.desc, {
      x: r.x + 0.25, y: r.y + 0.5, w: 4.0, h: 0.4,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
    slide4.addText(r.example, {
      x: r.x + 0.25, y: r.y + 0.95, w: 4.0, h: 0.3,
      fontSize: 11, fontFace: FONTS.body, color: r.color, italic: true, bold: true, margin: 0,
    });
  });

  // Bottom banner
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.65, w: 9, h: 0.55, fill: { color: COLORS.primary },
  });
  slide4.addText("If you can describe the rules easily, you don't need ML. If you can't — ML is the answer!", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.55,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 5 - WHERE is ML used?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHERE is Machine Learning Used?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const usages = [
    { icon: icons.envelope, title: "Email Spam Filters", desc: "Learns to spot junk mail", x: 0.5, y: 1.35 },
    { icon: icons.mic, title: "Voice Assistants", desc: "Siri, Alexa, Google understand speech", x: 3.55, y: 1.35 },
    { icon: icons.stethoscope, title: "Medical Diagnosis", desc: "Detects diseases from scans & data", x: 6.6, y: 1.35 },
    { icon: icons.shield, title: "Fraud Detection", desc: "Banks catch suspicious transactions", x: 0.5, y: 3.05 },
    { icon: icons.car, title: "Self-Driving Cars", desc: "Learns to navigate roads safely", x: 3.55, y: 3.05 },
    { icon: icons.film, title: "Recommendations", desc: "Netflix, Spotify, YouTube pick for you", x: 6.6, y: 3.05 },
  ];

  usages.forEach((u) => {
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: u.x, y: u.y, w: 2.8, h: 1.45, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Icon circle
    slide5.addShape(pres.shapes.OVAL, {
      x: u.x + 1.0, y: u.y + 0.15, w: 0.65, h: 0.65, fill: { color: COLORS.lightGray },
    });
    slide5.addImage({ data: u.icon, x: u.x + 1.1, y: u.y + 0.25, w: 0.45, h: 0.45 });
    slide5.addText(u.title, {
      x: u.x + 0.15, y: u.y + 0.85, w: 2.5, h: 0.3,
      fontSize: 13, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide5.addText(u.desc, {
      x: u.x + 0.15, y: u.y + 1.1, w: 2.5, h: 0.3,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Language translation - 7th item as bottom banner
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.7, w: 9, h: 0.55, fill: { color: COLORS.primary },
  });
  slide5.addImage({ data: icons.arrow, x: 0.7, y: 4.8, w: 0.35, h: 0.35 });
  slide5.addText("+ Language Translation (Google Translate), Search Engines, and thousands more!", {
    x: 1.2, y: 4.7, w: 8.1, h: 0.55,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 6 - WHICH types of ML exist?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("WHICH Types of Machine Learning Exist?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const mlTypes = [
    {
      title: "Supervised\nLearning",
      desc: "Learning WITH answers.\nYou provide data AND the correct labels.",
      analogy: "Teacher grading\nhomework",
      icon: icons.teacher,
      color: COLORS.primary,
      x: 0.5,
    },
    {
      title: "Unsupervised\nLearning",
      desc: "Finding HIDDEN patterns.\nThe computer groups data on its own.",
      analogy: "Sorting laundry\nby color",
      icon: icons.tshirt,
      color: COLORS.accentDark,
      x: 3.55,
    },
    {
      title: "Reinforcement\nLearning",
      desc: "Learning by TRIAL & ERROR.\nRewards for good actions, penalties for bad.",
      analogy: "Learning to ride\na bike",
      icon: icons.bicycle,
      color: COLORS.purple,
      x: 6.6,
    },
  ];

  mlTypes.forEach((t) => {
    // Main card
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: t.x, y: 1.35, w: 2.8, h: 3.3, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Top color bar
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: t.x, y: 1.35, w: 2.8, h: 0.06, fill: { color: t.color },
    });
    // Title
    slide6.addText(t.title, {
      x: t.x + 0.15, y: 1.5, w: 2.5, h: 0.65,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    // Description
    slide6.addText(t.desc, {
      x: t.x + 0.15, y: 2.2, w: 2.5, h: 0.85,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
    // Analogy box
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: t.x + 0.2, y: 3.2, w: 2.4, h: 1.2, fill: { color: t.color },
    });
    slide6.addImage({ data: t.icon, x: t.x + 0.9, y: 3.3, w: 0.55, h: 0.55 });
    slide6.addText("Analogy:", {
      x: t.x + 0.3, y: 3.85, w: 2.2, h: 0.2,
      fontSize: 9, fontFace: FONTS.body, color: COLORS.white, align: "center", margin: 0, italic: true,
    });
    slide6.addText(t.analogy, {
      x: t.x + 0.3, y: 4.0, w: 2.2, h: 0.35,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 7 - The ML Process (Simple Steps)
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("The ML Process (Simple Steps)", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const mlSteps = [
    { num: "1", title: "Collect\nData", color: COLORS.primary },
    { num: "2", title: "Prepare &\nClean Data", color: "5B7FFF" },
    { num: "3", title: "Choose a\nModel", color: COLORS.accentDark },
    { num: "4", title: "Train the\nModel", color: COLORS.purple },
    { num: "5", title: "Test &\nEvaluate", color: COLORS.orange },
    { num: "6", title: "Use It!", color: COLORS.red },
  ];

  mlSteps.forEach((step, i) => {
    const x = 0.35 + i * 1.58;
    // Card
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 1.35, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Top color bar
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 1.35, h: 0.06, fill: { color: step.color },
    });
    // Number circle
    slide7.addShape(pres.shapes.OVAL, {
      x: x + 0.35, y: 1.6, w: 0.65, h: 0.65, fill: { color: step.color },
    });
    slide7.addText(step.num, {
      x: x + 0.35, y: 1.6, w: 0.65, h: 0.65,
      fontSize: 22, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // Title
    slide7.addText(step.title, {
      x: x + 0.05, y: 2.4, w: 1.25, h: 0.8,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", valign: "top", margin: 0,
    });

    // Arrow between steps
    if (i < 5) {
      slide7.addImage({ data: icons.arrowAccent, x: x + 1.38, y: 2.15, w: 0.22, h: 0.22 });
    }
  });

  // Explanation row below the steps
  const stepDetails = [
    "Gather examples\n(images, numbers,\ntext, etc.)",
    "Remove errors,\nfill gaps, organize\nthe data",
    "Pick an algorithm\nthat fits your\nproblem",
    "Feed data to the\nmodel so it can\nlearn patterns",
    "Check if the model\nworks well on\nnew data",
    "Deploy to the\nreal world and\nkeep improving",
  ];

  stepDetails.forEach((detail, i) => {
    const x = 0.35 + i * 1.58;
    slide7.addText(detail, {
      x: x, y: 3.55, w: 1.35, h: 1.0,
      fontSize: 8, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom note
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.6, w: 9, h: 0.6, fill: { color: COLORS.primary },
  });
  slide7.addText("This process is iterative — you go back and improve at each step!", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.6,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - ML Vocabulary Made Simple
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("ML Vocabulary Made Simple", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const vocabItems = [
    { term: "Feature", def: "An input characteristic the model uses to learn", example: "Height, weight, color of a fruit", color: COLORS.primary },
    { term: "Label", def: "The answer or category you want to predict", example: "\"Apple\" or \"Orange\" — the correct answer", color: COLORS.accentDark },
    { term: "Training", def: "The teaching phase where the model studies data", example: "Like studying for an exam with practice tests", color: COLORS.purple },
    { term: "Model", def: "The learned pattern — the \"brain\" of your ML system", example: "The recipe the computer wrote after studying", color: COLORS.orange },
    { term: "Prediction", def: "The model's answer when given new, unseen data", example: "\"I think this fruit is an apple!\"", color: COLORS.red },
  ];

  vocabItems.forEach((item, i) => {
    const y = 1.3 + i * 0.72;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.62, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.62, fill: { color: item.color },
    });
    // Term badge
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.75, y: y + 0.12, w: 1.3, h: 0.38, fill: { color: item.color },
    });
    slide8.addText(item.term, {
      x: 0.75, y: y + 0.12, w: 1.3, h: 0.38,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // Definition
    slide8.addText(item.def, {
      x: 2.2, y: y + 0.02, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    // Example
    slide8.addText(item.example, {
      x: 2.2, y: y + 0.32, w: 3.8, h: 0.25,
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
    "ML is a subset of AI — computers learn patterns from DATA, not from rules you write",
    "Traditional programming: you write rules | ML: the computer discovers rules",
    "Three types: Supervised (with labels), Unsupervised (find patterns), Reinforcement (trial & error)",
    "Use ML when rules are too complex, data changes, or you need personalization",
    "ML follows a process: Collect → Clean → Choose → Train → Test → Deploy",
  ];

  takeaways.forEach((text, i) => {
    const y = 1.35 + i * 0.78;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.65, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide9.addImage({ data: icons.check, x: 0.7, y: y + 0.1, w: 0.42, h: 0.42 });
    slide9.addText(text, {
      x: 1.3, y: y, w: 7.9, h: 0.65,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, valign: "middle", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 10 - What's Next?
  // ============================================================
  let slide10 = pres.addSlide();
  slide10.background = { color: COLORS.darkBg };

  slide10.addImage({ data: icons.rocketWhite, x: 4.4, y: 0.7, w: 1.2, h: 1.2 });

  slide10.addText("What's Next?", {
    x: 0.5, y: 2.0, w: 9, h: 0.8,
    fontSize: 36, fontFace: FONTS.header, color: COLORS.white, bold: true, align: "center", margin: 0,
  });

  slide10.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 2.85, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  slide10.addText("In Module 3, we'll learn:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Types of Machine Learning — Deep Dive", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Supervised, Unsupervised, and Reinforcement Learning in detail with real examples", {
    x: 0.5, y: 4.1, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.7, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_02_What_is_Machine_Learning/Module_02_What_is_ML.pptx" });
  console.log("Module 2 presentation created successfully!");
}

createPresentation().catch(console.error);
