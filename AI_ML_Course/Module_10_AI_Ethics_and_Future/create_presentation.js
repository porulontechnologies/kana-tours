const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBrain, FaBalanceScale, FaExclamationTriangle, FaShieldAlt,
  FaUserShield, FaGlobeAmericas, FaHandshake, FaRocket,
  FaCheckCircle, FaArrowRight, FaLightbulb, FaUsers,
  FaEye, FaLock, FaGavel, FaHeart, FaGraduationCap,
  FaStar, FaBookOpen, FaTrophy, FaDatabase, FaChartLine,
  FaComments, FaCamera, FaCode, FaClipboardCheck
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
  warning: "F59E0B",
  danger: "EF4444",
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
  pres.title = "Module 10: AI Ethics & The Future";

  // Pre-render icons
  const icons = {
    balance: await iconToBase64Png(FaBalanceScale, "#FFFFFF", 256),
    balanceBlue: await iconToBase64Png(FaBalanceScale, "#" + COLORS.primary, 256),
    warning: await iconToBase64Png(FaExclamationTriangle, "#" + COLORS.warning, 256),
    warningWhite: await iconToBase64Png(FaExclamationTriangle, "#FFFFFF", 256),
    shield: await iconToBase64Png(FaShieldAlt, "#" + COLORS.primary, 256),
    userShield: await iconToBase64Png(FaUserShield, "#" + COLORS.primary, 256),
    globe: await iconToBase64Png(FaGlobeAmericas, "#" + COLORS.primary, 256),
    handshake: await iconToBase64Png(FaHandshake, "#" + COLORS.primary, 256),
    rocket: await iconToBase64Png(FaRocket, "#" + COLORS.primary, 256),
    rocketWhite: await iconToBase64Png(FaRocket, "#FFFFFF", 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    checkWhite: await iconToBase64Png(FaCheckCircle, "#FFFFFF", 256),
    arrow: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    users: await iconToBase64Png(FaUsers, "#" + COLORS.primary, 256),
    eye: await iconToBase64Png(FaEye, "#" + COLORS.primary, 256),
    lock: await iconToBase64Png(FaLock, "#" + COLORS.primary, 256),
    gavel: await iconToBase64Png(FaGavel, "#" + COLORS.primary, 256),
    heart: await iconToBase64Png(FaHeart, "#" + COLORS.primary, 256),
    grad: await iconToBase64Png(FaGraduationCap, "#" + COLORS.primary, 256),
    star: await iconToBase64Png(FaStar, "#" + COLORS.accent, 256),
    starWhite: await iconToBase64Png(FaStar, "#FFFFFF", 256),
    book: await iconToBase64Png(FaBookOpen, "#" + COLORS.primary, 256),
    trophy: await iconToBase64Png(FaTrophy, "#FFFFFF", 256),
    database: await iconToBase64Png(FaDatabase, "#" + COLORS.primary, 256),
    chart: await iconToBase64Png(FaChartLine, "#" + COLORS.primary, 256),
    comments: await iconToBase64Png(FaComments, "#" + COLORS.primary, 256),
    camera: await iconToBase64Png(FaCamera, "#" + COLORS.primary, 256),
    code: await iconToBase64Png(FaCode, "#" + COLORS.primary, 256),
    brain: await iconToBase64Png(FaBrain, "#" + COLORS.primary, 256),
    clipboard: await iconToBase64Png(FaClipboardCheck, "#" + COLORS.primary, 256),
    lockDanger: await iconToBase64Png(FaLock, "#" + COLORS.danger, 256),
    eyeDanger: await iconToBase64Png(FaEye, "#" + COLORS.danger, 256),
    warningDanger: await iconToBase64Png(FaExclamationTriangle, "#" + COLORS.danger, 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.balance, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 10", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("AI Ethics & The Future", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 40, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Using AI Responsibly — What Comes Next?", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT are AI Ethics?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT Are AI Ethics?", {
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
    { text: "Rules and principles for using AI responsibly", options: { bold: true, fontSize: 18, color: COLORS.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.55, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("Ensuring AI is fair, transparent, safe, and beneficial for everyone.", {
    x: 0.85, y: 1.9, w: 8.4, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Three cards for why it matters
  const ethicsCards = [
    { icon: icons.balanceBlue, title: "Fairness", desc: "AI should treat all people equally and without discrimination", x: 0.5 },
    { icon: icons.eye, title: "Transparency", desc: "We should understand how and why AI makes decisions", x: 3.55 },
    { icon: icons.shield, title: "Safety", desc: "AI must be reliable, secure, and not cause harm", x: 6.6 },
  ];

  ethicsCards.forEach((card) => {
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: 2.7, w: 2.8, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide2.addImage({ data: card.icon, x: card.x + 1.1, y: 2.85, w: 0.5, h: 0.5 });
    slide2.addText(card.title, {
      x: card.x + 0.2, y: 3.35, w: 2.4, h: 0.4,
      fontSize: 14, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide2.addText(card.desc, {
      x: card.x + 0.2, y: 3.7, w: 2.4, h: 0.45,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom emphasis
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.5, w: 9, h: 0.8, fill: { color: COLORS.primary },
  });
  slide2.addText("Why it matters: AI makes decisions that affect real people's lives every day.", {
    x: 0.7, y: 4.5, w: 8.6, h: 0.8,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW Can AI Be Biased?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Can AI Be Biased?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Three bias type cards
  const biasTypes = [
    { num: "1", title: "TRAINING DATA BIAS", desc: "Historical discrimination\nbaked into the data AI\nlearns from", color: COLORS.primary },
    { num: "2", title: "ALGORITHMIC BIAS", desc: "The model amplifies\nexisting patterns and\nmakes them worse", color: COLORS.warning },
    { num: "3", title: "REPRESENTATION BIAS", desc: "Training data isn't\ndiverse enough to\nrepresent everyone", color: COLORS.danger },
  ];

  biasTypes.forEach((bias, i) => {
    const x = 0.5 + i * 3.15;
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.9, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.9, h: 0.06, fill: { color: bias.color },
    });
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 1.05, y: 1.65, w: 0.7, h: 0.7, fill: { color: bias.color },
    });
    slide3.addText(bias.num, {
      x: x + 1.05, y: 1.65, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide3.addText(bias.title, {
      x: x + 0.2, y: 2.45, w: 2.5, h: 0.35,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide3.addText(bias.desc, {
      x: x + 0.2, y: 2.8, w: 2.5, h: 0.55,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    if (i < 2) {
      slide3.addImage({ data: icons.arrow, x: x + 2.95, y: 2.15, w: 0.3, h: 0.3 });
    }
  });

  // Real examples box
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.65, w: 9, h: 1.55, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.65, w: 0.07, h: 1.55, fill: { color: COLORS.danger },
  });
  slide3.addImage({ data: icons.warning, x: 0.85, y: 3.8, w: 0.45, h: 0.45 });
  slide3.addText("Real-World Examples of AI Bias", {
    x: 1.45, y: 3.75, w: 7.8, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide3.addText([
    { text: "Hiring AI: ", options: { bold: true, color: COLORS.primary } },
    { text: "Amazon's AI recruiting tool penalized resumes that included the word \"women's\"", options: { color: COLORS.medGray } },
    { text: "\n" },
    { text: "Facial Recognition: ", options: { bold: true, color: COLORS.primary } },
    { text: "Studies showed much higher error rates for darker-skinned faces vs lighter-skinned faces", options: { color: COLORS.medGray } },
    { text: "\n" },
    { text: "Healthcare AI: ", options: { bold: true, color: COLORS.primary } },
    { text: "An algorithm used to predict health needs was biased against Black patients", options: { color: COLORS.medGray } },
  ], { x: 1.45, y: 4.2, w: 7.8, h: 0.95, fontSize: 11, fontFace: FONTS.body, margin: 0, lineSpacingMultiple: 1.3 });

  // ============================================================
  // SLIDE 4 - Key Ethical Concerns
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("Key Ethical Concerns in AI", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 2x3 grid of concern cards
  const concerns = [
    { icon: icons.lock, title: "Privacy", desc: "Massive data collection & surveillance of personal information", x: 0.5, y: 1.35 },
    { icon: icons.users, title: "Job Displacement", desc: "AI automating tasks that humans currently do for a living", x: 3.55, y: 1.35 },
    { icon: icons.warningDanger, title: "Deepfakes", desc: "AI-generated fake videos, images, and misinformation", x: 6.6, y: 1.35 },
    { icon: icons.eyeDanger, title: "Surveillance", desc: "Facial recognition & tracking used without consent", x: 0.5, y: 3.05 },
    { icon: icons.code, title: "Black Box AI", desc: "AI makes decisions but can't explain why or how", x: 3.55, y: 3.05 },
    { icon: icons.shield, title: "Autonomous Weapons", desc: "AI-powered weapons that select targets without human control", x: 6.6, y: 3.05 },
  ];

  concerns.forEach((c) => {
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: 2.8, h: 1.45, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide4.addShape(pres.shapes.OVAL, {
      x: c.x + 0.2, y: c.y + 0.2, w: 0.55, h: 0.55, fill: { color: COLORS.lightGray },
    });
    slide4.addImage({ data: c.icon, x: c.x + 0.28, y: c.y + 0.28, w: 0.4, h: 0.4 });
    slide4.addText(c.title, {
      x: c.x + 0.9, y: c.y + 0.15, w: 1.7, h: 0.35,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide4.addText(c.desc, {
      x: c.x + 0.9, y: c.y + 0.5, w: 1.7, h: 0.75,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Bottom bar
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.5, fill: { color: COLORS.danger },
  });
  slide4.addText("These are not hypothetical — they are real challenges we face TODAY.", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 5 - WHEN Does AI Need Human Oversight?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHEN Does AI Need Human Oversight?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Intro text
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 0.65, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 0.07, h: 0.65, fill: { color: COLORS.primary },
  });
  slide5.addText("Not all AI decisions are equal. Some require a human in the loop.", {
    x: 0.85, y: 1.35, w: 8.4, h: 0.65,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.primary, bold: true, valign: "middle", margin: 0,
  });

  const oversightItems = [
    { icon: icons.heart, title: "High-Stakes Decisions", desc: "Medical diagnoses, legal sentencing, loan approvals — where mistakes ruin lives", color: COLORS.danger },
    { icon: icons.balanceBlue, title: "When Fairness Is Critical", desc: "Hiring, college admissions, insurance — must be free from discrimination", color: COLORS.primary },
    { icon: icons.lightbulb, title: "When AI Lacks Context", desc: "AI can't understand cultural nuance, sarcasm, or complex human situations", color: COLORS.warning },
    { icon: icons.gavel, title: "When Accountability Matters", desc: "Someone must be responsible when things go wrong — AI can't be held liable", color: COLORS.purple },
  ];

  oversightItems.forEach((item, i) => {
    const y = 2.2 + i * 0.72;
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.62, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.62, fill: { color: item.color },
    });
    slide5.addImage({ data: item.icon, x: 0.8, y: y + 0.1, w: 0.4, h: 0.4 });
    slide5.addText(item.title, {
      x: 1.35, y: y + 0.02, w: 2.5, h: 0.3,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide5.addText(item.desc, {
      x: 1.35, y: y + 0.32, w: 7.9, h: 0.28,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Bottom
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.0, w: 9, h: 0.3, fill: { color: COLORS.accent },
  });
  slide5.addText("Rule of thumb: The higher the stakes, the more human oversight is needed.", {
    x: 0.7, y: 5.0, w: 8.6, h: 0.3,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 6 - WHERE Are AI Regulations Happening?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("WHERE Are AI Regulations Happening?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const regulations = [
    {
      title: "EU AI Act",
      status: "MOST COMPREHENSIVE",
      statusColor: COLORS.accent,
      desc: "World's first comprehensive AI law.\nClassifies AI systems by risk level.\nBans certain AI practices outright.",
      cardColor: COLORS.primary,
    },
    {
      title: "US AI Initiatives",
      status: "GROWING REGULATION",
      statusColor: COLORS.warning,
      desc: "Executive orders on AI safety.\nNIST AI Risk Framework.\nState-level AI legislation emerging.",
      cardColor: "7C3AED",
    },
    {
      title: "Industry Self-Regulation",
      status: "VOLUNTARY STANDARDS",
      statusColor: COLORS.medGray,
      desc: "Google, Microsoft, OpenAI publish\nAI principles. Responsible AI\nframeworks & safety testing.",
      cardColor: "E85D75",
    },
  ];

  regulations.forEach((reg, i) => {
    const x = 0.5 + i * 3.15;
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 2.8, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 0.06, fill: { color: reg.cardColor },
    });
    slide6.addText(reg.title, {
      x: x + 0.2, y: 1.6, w: 2.5, h: 0.45,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3, y: 2.15, w: 2.3, h: 0.35, fill: { color: reg.statusColor },
    });
    slide6.addText(reg.status, {
      x: x + 0.3, y: 2.15, w: 2.3, h: 0.35,
      fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide6.addText(reg.desc, {
      x: x + 0.2, y: 2.7, w: 2.5, h: 1.2,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom note
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.45, w: 9, h: 0.8, fill: { color: COLORS.primary },
  });
  slide6.addText("AI regulation is evolving fast — the goal is to encourage innovation while protecting people.", {
    x: 0.7, y: 4.45, w: 8.6, h: 0.8,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 7 - WHICH Principles Guide Ethical AI?
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("WHICH Principles Guide Ethical AI?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const principles = [
    { icon: icons.balanceBlue, title: "Fairness", desc: "No discrimination — treat all groups equally", x: 0.5, y: 1.35 },
    { icon: icons.eye, title: "Transparency", desc: "Decisions should be explainable and understandable", x: 5.0, y: 1.35 },
    { icon: icons.lock, title: "Privacy", desc: "Protect personal data and respect user consent", x: 0.5, y: 2.55 },
    { icon: icons.shield, title: "Safety", desc: "AI must be reliable, secure, and do no harm", x: 5.0, y: 2.55 },
    { icon: icons.gavel, title: "Accountability", desc: "Humans remain responsible for AI outcomes", x: 0.5, y: 3.75 },
    { icon: icons.heart, title: "Beneficence", desc: "AI should help humanity and improve lives", x: 5.0, y: 3.75 },
  ];

  principles.forEach((p) => {
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: p.y, w: 4.25, h: 0.95, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: p.y, w: 0.07, h: 0.95, fill: { color: COLORS.accent },
    });
    slide7.addShape(pres.shapes.OVAL, {
      x: p.x + 0.25, y: p.y + 0.18, w: 0.55, h: 0.55, fill: { color: COLORS.lightGray },
    });
    slide7.addImage({ data: p.icon, x: p.x + 0.33, y: p.y + 0.26, w: 0.4, h: 0.4 });
    slide7.addText(p.title, {
      x: p.x + 0.95, y: p.y + 0.1, w: 3.0, h: 0.35,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide7.addText(p.desc, {
      x: p.x + 0.95, y: p.y + 0.48, w: 3.0, h: 0.35,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Bottom
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.95, w: 9, h: 0.35, fill: { color: COLORS.accent },
  });
  slide7.addText("These 6 principles form the foundation of responsible AI development worldwide.", {
    x: 0.7, y: 4.95, w: 8.6, h: 0.35,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - The Future of AI
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("The Future of AI — What's Coming Next?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const futureItems = [
    { icon: icons.heart, title: "Healthcare Revolution", desc: "Early disease detection, personalized medicine, drug discovery", color: COLORS.danger },
    { icon: icons.grad, title: "Personalized Education", desc: "AI tutors that adapt to each student's learning style", color: COLORS.primary },
    { icon: icons.globe, title: "Climate Solutions", desc: "Optimizing energy, predicting weather patterns, reducing waste", color: COLORS.accent },
    { icon: icons.brain, title: "Creative AI Tools", desc: "AI-powered art, music, writing, and design assistants", color: COLORS.purple },
    { icon: icons.handshake, title: "Human-AI Collaboration", desc: "AI as a partner that enhances human capabilities", color: COLORS.warning },
  ];

  futureItems.forEach((item, i) => {
    const y = 1.3 + i * 0.72;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.62, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.62, fill: { color: item.color },
    });
    slide8.addImage({ data: item.icon, x: 0.8, y: y + 0.1, w: 0.4, h: 0.4 });
    slide8.addText(item.title, {
      x: 1.4, y: y + 0.03, w: 2.8, h: 0.3,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide8.addText(item.desc, {
      x: 1.4, y: y + 0.33, w: 7.8, h: 0.25,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Bottom emphasis
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.95, w: 9, h: 0.35, fill: { color: COLORS.primary },
  });
  slide8.addText("Both exciting opportunities AND serious challenges ahead — your generation shapes this future!", {
    x: 0.7, y: 4.95, w: 8.6, h: 0.35,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 9 - Course Summary & Key Takeaways
  // ============================================================
  let slide9 = pres.addSlide();
  slide9.background = { color: COLORS.lightGray };

  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide9.addText("Course Summary — Your AI & ML Journey", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const modules = [
    { num: "01", title: "What is AI?", icon: icons.brain },
    { num: "02", title: "Machine Learning", icon: icons.code },
    { num: "03", title: "Types of ML", icon: icons.chart },
    { num: "04", title: "Data: Fuel of AI", icon: icons.database },
    { num: "05", title: "Regression", icon: icons.chart },
    { num: "06", title: "Classification", icon: icons.clipboard },
    { num: "07", title: "Neural Networks", icon: icons.brain },
    { num: "08", title: "NLP", icon: icons.comments },
    { num: "09", title: "Computer Vision", icon: icons.camera },
    { num: "10", title: "Ethics & Future", icon: icons.balanceBlue },
  ];

  // 2x5 grid
  modules.forEach((mod, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const x = 0.35 + col * 1.88;
    const y = 1.35 + row * 1.65;

    slide9.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 1.72, h: 1.35, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 1.72, h: 0.05, fill: { color: i === 9 ? COLORS.accent : COLORS.primary },
    });
    // Module number circle
    slide9.addShape(pres.shapes.OVAL, {
      x: x + 0.58, y: y + 0.2, w: 0.55, h: 0.55, fill: { color: i === 9 ? COLORS.accent : COLORS.primary },
    });
    slide9.addText(mod.num, {
      x: x + 0.58, y: y + 0.2, w: 0.55, h: 0.55,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide9.addText(mod.title, {
      x: x + 0.1, y: y + 0.85, w: 1.52, h: 0.4,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
  });

  // Bottom
  slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.8, w: 9, h: 0.5, fill: { color: COLORS.primary },
  });
  slide9.addText("You've covered the complete foundations of AI & Machine Learning!", {
    x: 0.7, y: 4.8, w: 8.6, h: 0.5,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 10 - Congratulations!
  // ============================================================
  let slide10 = pres.addSlide();
  slide10.background = { color: COLORS.darkBg };

  slide10.addImage({ data: icons.trophy, x: 4.4, y: 0.4, w: 1.2, h: 1.2 });

  slide10.addText("Congratulations!", {
    x: 0.5, y: 1.7, w: 9, h: 0.8,
    fontSize: 38, fontFace: FONTS.header, color: COLORS.white, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Your AI & ML Journey Continues", {
    x: 0.5, y: 2.4, w: 9, h: 0.5,
    fontSize: 20, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 3.0, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  slide10.addText("You now understand the fundamentals of AI & Machine Learning!", {
    x: 0.5, y: 3.2, w: 9, h: 0.4,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  // Next steps cards
  const nextSteps = [
    { text: "Take online courses (Coursera, fast.ai)", x: 0.5 },
    { text: "Practice on Kaggle competitions", x: 2.8 },
    { text: "Build your own AI projects", x: 5.1 },
    { text: "Stay curious & keep learning!", x: 7.4 },
  ];

  nextSteps.forEach((step, i) => {
    slide10.addShape(pres.shapes.RECTANGLE, {
      x: step.x, y: 3.75, w: 2.1, h: 0.7, fill: { color: COLORS.primary },
    });
    slide10.addImage({ data: icons.checkWhite, x: step.x + 0.1, y: 3.85, w: 0.3, h: 0.3 });
    slide10.addText(step.text, {
      x: step.x + 0.45, y: 3.75, w: 1.5, h: 0.7,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.white, bold: true, valign: "middle", margin: 0,
    });
  });

  // Quote
  slide10.addText('"The best way to predict the future is to create it."', {
    x: 0.5, y: 4.7, w: 9, h: 0.5,
    fontSize: 16, fontFace: FONTS.header, color: COLORS.accent, italic: true, align: "center", margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_10_AI_Ethics_and_Future/Module_10_AI_Ethics.pptx" });
  console.log("Module 10 presentation created successfully!");
}

createPresentation().catch(console.error);
