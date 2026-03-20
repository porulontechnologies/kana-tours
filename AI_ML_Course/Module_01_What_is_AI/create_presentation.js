const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBrain, FaCogs, FaHistory, FaGlobeAmericas, FaLayerGroup,
  FaBalanceScale, FaRocket, FaCheckCircle, FaArrowRight,
  FaMobileAlt, FaShoppingCart, FaHeartbeat, FaCar, FaGamepad,
  FaUsers, FaRobot, FaLightbulb, FaComments, FaCamera, FaLanguage, FaPaintBrush
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

// Color palette - Deep Tech Blue theme
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
  pres.title = "Module 1: What is Artificial Intelligence?";

  // Pre-render icons
  const icons = {
    brain: await iconToBase64Png(FaBrain, "#FFFFFF", 256),
    cogs: await iconToBase64Png(FaCogs, "#" + COLORS.primary, 256),
    history: await iconToBase64Png(FaHistory, "#" + COLORS.primary, 256),
    globe: await iconToBase64Png(FaGlobeAmericas, "#" + COLORS.primary, 256),
    layers: await iconToBase64Png(FaLayerGroup, "#" + COLORS.primary, 256),
    balance: await iconToBase64Png(FaBalanceScale, "#" + COLORS.primary, 256),
    rocket: await iconToBase64Png(FaRocket, "#" + COLORS.primary, 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    mobile: await iconToBase64Png(FaMobileAlt, "#" + COLORS.primary, 256),
    cart: await iconToBase64Png(FaShoppingCart, "#" + COLORS.primary, 256),
    heart: await iconToBase64Png(FaHeartbeat, "#" + COLORS.primary, 256),
    car: await iconToBase64Png(FaCar, "#" + COLORS.primary, 256),
    gamepad: await iconToBase64Png(FaGamepad, "#" + COLORS.primary, 256),
    users: await iconToBase64Png(FaUsers, "#" + COLORS.primary, 256),
    robot: await iconToBase64Png(FaRobot, "#FFFFFF", 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    brainBlue: await iconToBase64Png(FaBrain, "#" + COLORS.primary, 256),
    comments: await iconToBase64Png(FaComments, "#" + COLORS.primary, 256),
    camera: await iconToBase64Png(FaCamera, "#" + COLORS.primary, 256),
    language: await iconToBase64Png(FaLanguage, "#" + COLORS.primary, 256),
    paintbrush: await iconToBase64Png(FaPaintBrush, "#" + COLORS.primary, 256),
    checkWhite: await iconToBase64Png(FaCheckCircle, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide (Dark Background)
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  // Brain icon at top
  slide1.addImage({ data: icons.brain, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 1", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("What is Artificial Intelligence?", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 40, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Making Computers Smart — A Beginner's Journey", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  // Bottom accent bar
  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is AI?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  // Title area
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT is Artificial Intelligence?", {
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
    { text: "AI = Teaching computers to think and act like humans", options: { bold: true, fontSize: 18, color: COLORS.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.55, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("Like teaching a child — you show examples, explain rules, and they learn!", {
    x: 0.85, y: 1.9, w: 8.4, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Examples in 3 cards
  const examples = [
    { title: "Siri / Alexa", desc: "Answering your questions", icon: icons.comments, x: 0.5 },
    { title: "Netflix", desc: "Recommending movies you'll love", icon: icons.gamepad, x: 3.55 },
    { title: "Google Maps", desc: "Finding the fastest route", icon: icons.globe, x: 6.6 },
  ];

  examples.forEach((ex) => {
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: ex.x, y: 2.7, w: 2.8, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide2.addImage({ data: ex.icon, x: ex.x + 1.1, y: 2.85, w: 0.5, h: 0.5 });
    slide2.addText(ex.title, {
      x: ex.x + 0.2, y: 3.35, w: 2.4, h: 0.4,
      fontSize: 14, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide2.addText(ex.desc, {
      x: ex.x + 0.2, y: 3.7, w: 2.4, h: 0.4,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom definition
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.5, w: 9, h: 0.8, fill: { color: COLORS.primary },
  });
  slide2.addText('"AI is software that can learn, reason, and make decisions"', {
    x: 0.7, y: 4.5, w: 8.6, h: 0.8,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    italic: true, bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW does AI work?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Does AI Work? (The Simple Version)", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 3 Steps as connected cards
  const steps = [
    { num: "1", title: "FEED DATA", desc: "We give the computer LOTS of examples to study", color: COLORS.primary },
    { num: "2", title: "FIND PATTERNS", desc: "The computer spots patterns and rules in the data", color: COLORS.accentDark },
    { num: "3", title: "MAKE PREDICTIONS", desc: "It uses those patterns to make smart decisions", color: "E85D75" },
  ];

  steps.forEach((step, i) => {
    const x = 0.5 + i * 3.15;
    // Card
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.9, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Top accent
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.9, h: 0.06, fill: { color: step.color },
    });
    // Number circle
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 1.05, y: 1.65, w: 0.7, h: 0.7, fill: { color: step.color },
    });
    slide3.addText(step.num, {
      x: x + 1.05, y: 1.65, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // Title
    slide3.addText(step.title, {
      x: x + 0.2, y: 2.45, w: 2.5, h: 0.4,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    // Description
    slide3.addText(step.desc, {
      x: x + 0.2, y: 2.8, w: 2.5, h: 0.5,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    // Arrow between cards
    if (i < 2) {
      slide3.addImage({ data: icons.arrowAccent, x: x + 2.95, y: 2.15, w: 0.3, h: 0.3 });
    }
  });

  // Cooking analogy
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 0.07, h: 1.5, fill: { color: COLORS.accent },
  });
  slide3.addImage({ data: icons.lightbulb, x: 0.85, y: 3.9, w: 0.5, h: 0.5 });
  slide3.addText("Real-World Analogy: Learning to Cook", {
    x: 1.5, y: 3.85, w: 7.8, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide3.addText([
    { text: "You taste many dishes ", options: { color: COLORS.primary, bold: true } },
    { text: "(data)  →  ", options: { color: COLORS.medGray } },
    { text: "Notice what spices work ", options: { color: COLORS.accentDark, bold: true } },
    { text: "(patterns)  →  ", options: { color: COLORS.medGray } },
    { text: "Create your own recipes ", options: { color: "E85D75", bold: true } },
    { text: "(predictions)", options: { color: COLORS.medGray } },
  ], { x: 1.5, y: 4.35, w: 7.8, h: 0.7, fontSize: 14, fontFace: FONTS.body, margin: 0 });

  // ============================================================
  // SLIDE 4 - WHEN did AI start?
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("WHEN Did AI Start? A Brief Timeline", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Timeline events
  const timeline = [
    { year: "1950", event: "Alan Turing asks\n\"Can machines think?\"" },
    { year: "1956", event: "The term \"Artificial\nIntelligence\" is born" },
    { year: "1997", event: "IBM Deep Blue beats\nworld chess champion" },
    { year: "2011", event: "Apple launches Siri" },
    { year: "2016", event: "AlphaGo beats Go\nworld champion" },
    { year: "2022+", event: "ChatGPT & the AI\nrevolution begins" },
  ];

  // Timeline line
  slide4.addShape(pres.shapes.LINE, {
    x: 1.2, y: 2.7, w: 7.6, h: 0, line: { color: COLORS.primary, width: 2 },
  });

  timeline.forEach((item, i) => {
    const x = 0.8 + i * 1.5;
    const isTop = i % 2 === 0;

    // Dot on timeline
    slide4.addShape(pres.shapes.OVAL, {
      x: x + 0.25, y: 2.55, w: 0.3, h: 0.3, fill: { color: COLORS.primary },
    });

    if (isTop) {
      // Year above
      slide4.addText(item.year, {
        x: x - 0.15, y: 1.4, w: 1.1, h: 0.35,
        fontSize: 14, fontFace: FONTS.body, color: COLORS.primary, bold: true, align: "center", margin: 0,
      });
      slide4.addText(item.event, {
        x: x - 0.15, y: 1.75, w: 1.1, h: 0.65,
        fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
      });
    } else {
      // Year below
      slide4.addText(item.year, {
        x: x - 0.15, y: 3.05, w: 1.1, h: 0.35,
        fontSize: 14, fontFace: FONTS.body, color: COLORS.primary, bold: true, align: "center", margin: 0,
      });
      slide4.addText(item.event, {
        x: x - 0.15, y: 3.4, w: 1.1, h: 0.65,
        fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
      });
    }
  });

  // Key point
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.35, w: 9, h: 0.85, fill: { color: COLORS.primary },
  });
  slide4.addText("AI has been developing for 70+ years — it's not new, it's just getting really good!", {
    x: 0.7, y: 4.35, w: 8.6, h: 0.85,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 5 - WHERE is AI used?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHERE is AI Used Today? (You Already Use It!)", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 2x3 grid of usage cards
  const usages = [
    { icon: icons.mobile, title: "Your Phone", desc: "Face unlock, voice assistant, autocorrect", x: 0.5, y: 1.35 },
    { icon: icons.users, title: "Social Media", desc: "Recommendations, photo filters, spam detection", x: 3.55, y: 1.35 },
    { icon: icons.cart, title: "Shopping", desc: "Product recommendations, price predictions", x: 6.6, y: 1.35 },
    { icon: icons.heart, title: "Healthcare", desc: "Disease detection, drug discovery", x: 0.5, y: 3.15 },
    { icon: icons.car, title: "Transportation", desc: "GPS navigation, self-driving cars", x: 3.55, y: 3.15 },
    { icon: icons.gamepad, title: "Entertainment", desc: "Netflix/Spotify, video game AI opponents", x: 6.6, y: 3.15 },
  ];

  usages.forEach((u) => {
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: u.x, y: u.y, w: 2.8, h: 1.5, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Icon circle
    slide5.addShape(pres.shapes.OVAL, {
      x: u.x + 0.25, y: u.y + 0.2, w: 0.6, h: 0.6, fill: { color: COLORS.lightGray },
    });
    slide5.addImage({ data: u.icon, x: u.x + 0.35, y: u.y + 0.3, w: 0.4, h: 0.4 });
    slide5.addText(u.title, {
      x: u.x + 1.0, y: u.y + 0.15, w: 1.6, h: 0.35,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide5.addText(u.desc, {
      x: u.x + 1.0, y: u.y + 0.5, w: 1.6, h: 0.7,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // ============================================================
  // SLIDE 6 - WHICH types of AI?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("WHICH Types of AI Exist?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const aiTypes = [
    {
      title: "Narrow AI (Weak AI)",
      status: "WE HAVE THIS TODAY",
      statusColor: COLORS.accent,
      desc: "Good at ONE specific task.\nExamples: Siri, chess AI, spam filters",
      cardColor: COLORS.primary,
    },
    {
      title: "General AI (Strong AI)",
      status: "DOESN'T EXIST YET",
      statusColor: "F59E0B",
      desc: "Can do ANY task a human can.\nThinks, learns, and adapts like a person",
      cardColor: "7C3AED",
    },
    {
      title: "Super AI",
      status: "SCIENCE FICTION (FOR NOW)",
      statusColor: "EF4444",
      desc: "Smarter than all humans combined.\nOnly exists in movies and books",
      cardColor: "DC2626",
    },
  ];

  aiTypes.forEach((t, i) => {
    const x = 0.5 + i * 3.15;
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 2.8, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Top color bar
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.9, h: 0.06, fill: { color: t.cardColor },
    });
    // Title
    slide6.addText(t.title, {
      x: x + 0.2, y: 1.6, w: 2.5, h: 0.45,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    // Status badge
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3, y: 2.15, w: 2.3, h: 0.35, fill: { color: t.statusColor },
    });
    slide6.addText(t.status, {
      x: x + 0.3, y: 2.15, w: 2.3, h: 0.35,
      fontSize: 9, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // Description
    slide6.addText(t.desc, {
      x: x + 0.2, y: 2.7, w: 2.5, h: 1.2,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Note
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.45, w: 9, h: 0.8, fill: { color: COLORS.primary },
  });
  slide6.addText("Almost ALL AI today is Narrow AI — really good at one thing, but can't do everything.", {
    x: 0.7, y: 4.45, w: 8.6, h: 0.8,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 7 - AI vs Human Intelligence
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("AI vs Human Intelligence", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // AI card (left)
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.25, h: 2.7, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.25, h: 0.06, fill: { color: COLORS.primary },
  });
  slide7.addImage({ data: icons.robot, x: 1.2, y: 1.55, w: 0.45, h: 0.45 });
  slide7.addText("AI is FASTER at:", {
    x: 2.9, y: 1.55, w: 1.7, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.primary, bold: true, margin: 0, align: "center",
  });
  slide7.addText([
    { text: "Calculations & math", options: { bullet: true, breakLine: true } },
    { text: "Processing huge amounts of data", options: { bullet: true, breakLine: true } },
    { text: "Repetitive tasks without errors", options: { bullet: true, breakLine: true } },
    { text: "Working 24/7 without breaks", options: { bullet: true } },
  ], {
    x: 0.8, y: 2.2, w: 3.7, h: 1.7,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
  });

  // Human card (right)
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 1.35, w: 4.25, h: 2.7, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 1.35, w: 4.25, h: 0.06, fill: { color: COLORS.accent },
  });
  slide7.addImage({ data: icons.brainBlue, x: 5.95, y: 1.55, w: 0.45, h: 0.45 });
  slide7.addText("Humans are BETTER at:", {
    x: 7.25, y: 1.55, w: 2.1, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.accentDark, bold: true, margin: 0, align: "center",
  });
  slide7.addText([
    { text: "Creativity & imagination", options: { bullet: true, breakLine: true } },
    { text: "Understanding emotions", options: { bullet: true, breakLine: true } },
    { text: "Common sense reasoning", options: { bullet: true, breakLine: true } },
    { text: "Adapting to brand-new situations", options: { bullet: true } },
  ], {
    x: 5.55, y: 2.2, w: 3.7, h: 1.7,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
  });

  // Bottom takeaway
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.35, w: 9, h: 0.9, fill: { color: COLORS.primary },
  });
  slide7.addText("AI is a TOOL that helps humans, not a replacement.\nThink of it as a very powerful calculator for thinking tasks.", {
    x: 0.7, y: 4.35, w: 8.6, h: 0.9,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - Real-World AI Examples
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("Real-World AI You Can Try Right Now!", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const tools = [
    { icon: icons.comments, title: "ChatGPT", desc: "Have a conversation with AI", detail: "chat.openai.com" },
    { icon: icons.camera, title: "Google Lens", desc: "Point your camera to identify objects", detail: "Built into Google app" },
    { icon: icons.language, title: "Google Translate", desc: "Translate any language instantly", detail: "translate.google.com" },
    { icon: icons.paintbrush, title: "Canva AI", desc: "Create designs with AI help", detail: "canva.com" },
    { icon: icons.rocket, title: "DALL-E / Midjourney", desc: "Create images from text descriptions", detail: "Text-to-image AI" },
  ];

  tools.forEach((tool, i) => {
    const y = 1.3 + i * 0.82;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.72, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.72, fill: { color: COLORS.primary },
    });
    slide8.addImage({ data: tool.icon, x: 0.8, y: y + 0.13, w: 0.45, h: 0.45 });
    slide8.addText(tool.title, {
      x: 1.4, y: y + 0.05, w: 2.5, h: 0.35,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide8.addText(tool.desc, {
      x: 1.4, y: y + 0.38, w: 4, h: 0.3,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
    slide8.addText(tool.detail, {
      x: 6.5, y: y + 0.1, w: 2.8, h: 0.5,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.primary, italic: true, align: "right", valign: "middle", margin: 0,
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
    "AI = Teaching computers to learn from data and make decisions",
    "AI is already part of your daily life (phone, social media, shopping)",
    "Current AI is Narrow — really good at specific tasks only",
    "AI is a powerful tool, not magic and not a replacement for humans",
    "You don't need to be a scientist to understand and use AI!",
  ];

  takeaways.forEach((text, i) => {
    const y = 1.35 + i * 0.78;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.65, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    // Check icon
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

  slide10.addText("In Module 2, we'll learn:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("What is Machine Learning — The Engine That Powers AI", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.4, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_01_What_is_AI/Module_01_What_is_AI.pptx" });
  console.log("Module 1 presentation created successfully!");
}

createPresentation().catch(console.error);
