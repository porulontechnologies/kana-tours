const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaChartLine, FaCogs, FaCalculator, FaCheckCircle, FaArrowRight,
  FaHome, FaBriefcase, FaFlask, FaChartBar, FaBullhorn,
  FaLightbulb, FaExclamationTriangle, FaBullseye, FaRulerCombined,
  FaThermometerHalf, FaMoneyBillWave, FaBalanceScale, FaTimesCircle,
  FaRegChartBar, FaDollarSign, FaStar
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
  pres.title = "Module 5: Linear Regression";

  // Pre-render icons
  const icons = {
    chartLine: await iconToBase64Png(FaChartLine, "#FFFFFF", 256),
    chartLineBlue: await iconToBase64Png(FaChartLine, "#" + COLORS.primary, 256),
    cogs: await iconToBase64Png(FaCogs, "#" + COLORS.primary, 256),
    calculator: await iconToBase64Png(FaCalculator, "#" + COLORS.primary, 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    checkWhite: await iconToBase64Png(FaCheckCircle, "#FFFFFF", 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    home: await iconToBase64Png(FaHome, "#" + COLORS.primary, 256),
    briefcase: await iconToBase64Png(FaBriefcase, "#" + COLORS.primary, 256),
    flask: await iconToBase64Png(FaFlask, "#" + COLORS.primary, 256),
    chartBar: await iconToBase64Png(FaChartBar, "#" + COLORS.primary, 256),
    bullhorn: await iconToBase64Png(FaBullhorn, "#" + COLORS.primary, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    warning: await iconToBase64Png(FaExclamationTriangle, "#" + COLORS.primary, 256),
    bullseye: await iconToBase64Png(FaBullseye, "#" + COLORS.primary, 256),
    ruler: await iconToBase64Png(FaRulerCombined, "#" + COLORS.primary, 256),
    thermo: await iconToBase64Png(FaThermometerHalf, "#" + COLORS.primary, 256),
    money: await iconToBase64Png(FaMoneyBillWave, "#" + COLORS.primary, 256),
    balance: await iconToBase64Png(FaBalanceScale, "#" + COLORS.primary, 256),
    timesCircle: await iconToBase64Png(FaTimesCircle, "#EF4444", 256),
    dollar: await iconToBase64Png(FaDollarSign, "#" + COLORS.primary, 256),
    star: await iconToBase64Png(FaStar, "#" + COLORS.accent, 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.chartLine, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 5", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("Linear Regression", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 42, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Your First ML Algorithm \u2014 Predicting Numbers", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is Linear Regression?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT is Linear Regression?", {
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
    { text: "Drawing the best straight line through data points", options: { bold: true, fontSize: 18, color: COLORS.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.55, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("It predicts a NUMBER (not a category) \u2014 like predicting price, temperature, or score.", {
    x: 0.85, y: 1.9, w: 8.4, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Two key point cards
  const whatCards = [
    { icon: icons.chartLineBlue, title: "Predicts Numbers", desc: "Continuous values like $250,000 or 72.5\u00B0F \u2014 not categories like \"yes\" or \"no\"", x: 0.5 },
    { icon: icons.ruler, title: "Best Fit Line", desc: "Finds the ONE line that best represents the pattern in all your data points", x: 5.15 },
  ];

  whatCards.forEach((card) => {
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: 2.7, w: 4.35, h: 1.3, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide2.addImage({ data: card.icon, x: card.x + 0.25, y: 2.9, w: 0.5, h: 0.5 });
    slide2.addText(card.title, {
      x: card.x + 0.9, y: 2.85, w: 3.2, h: 0.4,
      fontSize: 15, fontFace: FONTS.body, bold: true, color: COLORS.darkText, margin: 0,
    });
    slide2.addText(card.desc, {
      x: card.x + 0.9, y: 3.25, w: 3.2, h: 0.6,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Analogy box
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.25, w: 9, h: 1.0, fill: { color: COLORS.primary },
  });
  slide2.addImage({ data: icons.lightbulb, x: 0.75, y: 4.45, w: 0.45, h: 0.45 });
  slide2.addText("Analogy: If taller people tend to weigh more, you can draw a line on a graph to predict someone's weight just from their height!", {
    x: 1.4, y: 4.25, w: 7.9, h: 1.0,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW does it work?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Does Linear Regression Work?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Formula card
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 1.2, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 0.07, h: 1.2, fill: { color: COLORS.accent },
  });
  slide3.addText("The Magic Formula:", {
    x: 0.85, y: 1.4, w: 3, h: 0.4,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, bold: true, margin: 0,
  });
  slide3.addText("y = mx + b", {
    x: 0.85, y: 1.75, w: 3.5, h: 0.65,
    fontSize: 36, fontFace: FONTS.header, color: COLORS.primary, bold: true, margin: 0,
  });

  // Explanation boxes for m and b
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 4.5, y: 1.45, w: 2.3, h: 0.95, fill: { color: COLORS.primary },
  });
  slide3.addText("m = slope", {
    x: 4.6, y: 1.5, w: 2.1, h: 0.35,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, bold: true, margin: 0,
  });
  slide3.addText("How steep the line is", {
    x: 4.6, y: 1.85, w: 2.1, h: 0.35,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.subtitle, margin: 0,
  });

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 7.0, y: 1.45, w: 2.3, h: 0.95, fill: { color: COLORS.accentDark },
  });
  slide3.addText("b = intercept", {
    x: 7.1, y: 1.5, w: 2.1, h: 0.35,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, bold: true, margin: 0,
  });
  slide3.addText("Where line crosses y-axis", {
    x: 7.1, y: 1.85, w: 2.1, h: 0.35,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.white, margin: 0,
  });

  // 3 Step cards
  const howSteps = [
    { num: "1", title: "PLOT DATA", desc: "Place all your data points on a scatter plot (x,y pairs)", color: COLORS.primary },
    { num: "2", title: "FIND BEST LINE", desc: "The algorithm finds the line that minimizes total distance to all points", color: COLORS.accentDark },
    { num: "3", title: "PREDICT!", desc: "Use the line equation to predict y for any new x value", color: "E85D75" },
  ];

  howSteps.forEach((step, i) => {
    const x = 0.5 + i * 3.15;
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.85, w: 2.9, h: 1.85, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.85, w: 2.9, h: 0.06, fill: { color: step.color },
    });
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 1.05, y: 3.05, w: 0.7, h: 0.7, fill: { color: step.color },
    });
    slide3.addText(step.num, {
      x: x + 1.05, y: 3.05, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide3.addText(step.title, {
      x: x + 0.2, y: 3.85, w: 2.5, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide3.addText(step.desc, {
      x: x + 0.2, y: 4.2, w: 2.5, h: 0.45,
      fontSize: 10.5, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    if (i < 2) {
      slide3.addImage({ data: icons.arrowAccent, x: x + 2.95, y: 3.55, w: 0.3, h: 0.3 });
    }
  });

  // ============================================================
  // SLIDE 4 - The Math Made Simple
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("The Math Made Simple", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Slope card
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.35, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.35, h: 0.06, fill: { color: COLORS.primary },
  });
  slide4.addText("Slope (m)", {
    x: 0.8, y: 1.55, w: 3.8, h: 0.45,
    fontSize: 20, fontFace: FONTS.header, color: COLORS.primary, bold: true, margin: 0,
  });
  slide4.addText("How much y changes when x changes by 1", {
    x: 0.8, y: 2.0, w: 3.8, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
  });
  slide4.addText("Example: For every extra sq. ft., the house price goes up $150. That means m = 150.", {
    x: 0.8, y: 2.45, w: 3.8, h: 0.7,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Intercept card
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.35, w: 4.35, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.35, w: 4.35, h: 0.06, fill: { color: COLORS.accent },
  });
  slide4.addText("Intercept (b)", {
    x: 5.45, y: 1.55, w: 3.8, h: 0.45,
    fontSize: 20, fontFace: FONTS.header, color: COLORS.accentDark, bold: true, margin: 0,
  });
  slide4.addText("The starting point \u2014 value of y when x = 0", {
    x: 5.45, y: 2.0, w: 3.8, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
  });
  slide4.addText("Example: A house with 0 sq. ft. \"costs\" $50,000 (the base price). That means b = 50,000.", {
    x: 5.45, y: 2.45, w: 3.8, h: 0.7,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Worked example card
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.6, w: 9, h: 1.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.6, w: 0.07, h: 1.0, fill: { color: COLORS.primary },
  });
  slide4.addImage({ data: icons.calculator, x: 0.8, y: 3.8, w: 0.45, h: 0.45 });
  slide4.addText("Worked Example:  price = 150 \u00D7 sqft + 50,000", {
    x: 1.45, y: 3.65, w: 7.8, h: 0.45,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.primary, bold: true, margin: 0,
  });
  slide4.addText("A 1,200 sq. ft. house: price = 150 \u00D7 1200 + 50,000 = $230,000", {
    x: 1.45, y: 4.1, w: 7.8, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, margin: 0,
  });

  // Reassurance
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.85, w: 9, h: 0.45, fill: { color: COLORS.accent },
  });
  slide4.addText("Don't worry about memorizing formulas \u2014 computers calculate this for you!", {
    x: 0.7, y: 4.85, w: 8.6, h: 0.45,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 5 - WHEN to use Linear Regression?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHEN to Use Linear Regression?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // When to use cards
  const whenCards = [
    { icon: icons.bullseye, title: "Predicting Numbers", desc: "Your output is a continuous number\n(not a category like yes/no)", x: 0.5, y: 1.35 },
    { icon: icons.chartLineBlue, title: "Linear Relationship", desc: "The relationship between input and\noutput looks roughly like a straight line", x: 3.55, y: 1.35 },
    { icon: icons.cogs, title: "Continuous Output", desc: "Values can be anything on a range\n(e.g., $0 to $1,000,000)", x: 6.6, y: 1.35 },
  ];

  whenCards.forEach((card) => {
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: card.y, w: 2.8, h: 1.7, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide5.addImage({ data: card.icon, x: card.x + 1.1, y: card.y + 0.15, w: 0.5, h: 0.5 });
    slide5.addText(card.title, {
      x: card.x + 0.2, y: card.y + 0.7, w: 2.4, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide5.addText(card.desc, {
      x: card.x + 0.2, y: card.y + 1.05, w: 2.4, h: 0.55,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Real examples
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.3, w: 9, h: 0.45, fill: { color: COLORS.primary },
  });
  slide5.addText("Real-World Examples Where Linear Regression Shines", {
    x: 0.7, y: 3.3, w: 8.6, h: 0.45,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  const examples = [
    { icon: icons.home, title: "House Prices", desc: "Size \u2192 Price", x: 0.5 },
    { icon: icons.thermo, title: "Temperature", desc: "Season \u2192 Temp", x: 2.6 },
    { icon: icons.money, title: "Salary", desc: "Experience \u2192 Pay", x: 4.7 },
    { icon: icons.chartBar, title: "Sales", desc: "Ad spend \u2192 Revenue", x: 6.8 },
  ];

  examples.forEach((ex) => {
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: ex.x, y: 4.0, w: 1.85, h: 1.25, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide5.addImage({ data: ex.icon, x: ex.x + 0.65, y: 4.1, w: 0.45, h: 0.45 });
    slide5.addText(ex.title, {
      x: ex.x + 0.1, y: 4.55, w: 1.65, h: 0.3,
      fontSize: 11, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide5.addText(ex.desc, {
      x: ex.x + 0.1, y: 4.82, w: 1.65, h: 0.3,
      fontSize: 9.5, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 6 - WHERE is it used?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("WHERE is Linear Regression Used?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const industries = [
    { icon: icons.home, title: "Real Estate", desc: "Predicting house prices based on size, location, bedrooms, age of the building", color: COLORS.primary },
    { icon: icons.briefcase, title: "Business", desc: "Sales forecasting, demand prediction, inventory planning, budget estimation", color: COLORS.accentDark },
    { icon: icons.flask, title: "Science", desc: "Analyzing trends in experiments, climate data, population growth patterns", color: "7C3AED" },
    { icon: icons.dollar, title: "Finance", desc: "Stock price direction, risk assessment, economic indicator relationships", color: "E85D75" },
    { icon: icons.bullhorn, title: "Marketing", desc: "Ad spend vs revenue, customer lifetime value, campaign ROI prediction", color: "F59E0B" },
  ];

  industries.forEach((ind, i) => {
    const y = 1.3 + i * 0.82;
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.72, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.72, fill: { color: ind.color },
    });
    slide6.addImage({ data: ind.icon, x: 0.8, y: y + 0.13, w: 0.45, h: 0.45 });
    slide6.addText(ind.title, {
      x: 1.45, y: y + 0.05, w: 2.0, h: 0.35,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide6.addText(ind.desc, {
      x: 1.45, y: y + 0.38, w: 7.8, h: 0.3,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
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

  // MAE card
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.35, h: 2.2, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.35, h: 0.06, fill: { color: COLORS.primary },
  });
  slide7.addText("Mean Absolute Error (MAE)", {
    x: 0.8, y: 1.55, w: 3.8, h: 0.45,
    fontSize: 17, fontFace: FONTS.header, color: COLORS.primary, bold: true, margin: 0,
  });
  slide7.addText("Average mistake size", {
    x: 0.8, y: 2.0, w: 3.8, h: 0.35,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide7.addText("\"On average, my predictions are off by $X\"\n\nLower MAE = Better predictions\n\nEasy to understand and explain!", {
    x: 0.8, y: 2.35, w: 3.8, h: 1.05,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  // R-squared card
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.35, w: 4.35, h: 2.2, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.35, w: 4.35, h: 0.06, fill: { color: COLORS.accent },
  });
  slide7.addText("R\u00B2 Score", {
    x: 5.45, y: 1.55, w: 3.8, h: 0.45,
    fontSize: 17, fontFace: FONTS.header, color: COLORS.accentDark, bold: true, margin: 0,
  });
  slide7.addText("How well the line fits the data", {
    x: 5.45, y: 2.0, w: 3.8, h: 0.35,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide7.addText("Score from 0 to 1:\n  0.0 = line explains nothing\n  0.5 = decent fit\n  0.9 = excellent fit\n  1.0 = perfect (suspicious!)", {
    x: 5.45, y: 2.35, w: 3.8, h: 1.05,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  // Good vs Bad fit comparison
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.8, w: 4.35, h: 1.1, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addImage({ data: icons.check, x: 0.75, y: 3.95, w: 0.4, h: 0.4 });
  slide7.addText("Good Fit (R\u00B2 = 0.92)", {
    x: 1.3, y: 3.9, w: 3.3, h: 0.35,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.accentDark, bold: true, margin: 0,
  });
  slide7.addText("Points cluster tightly around the line. Predictions are reliable and consistent.", {
    x: 1.3, y: 4.25, w: 3.3, h: 0.55,
    fontSize: 10.5, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 3.8, w: 4.35, h: 1.1, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addImage({ data: icons.timesCircle, x: 5.4, y: 3.95, w: 0.4, h: 0.4 });
  slide7.addText("Bad Fit (R\u00B2 = 0.15)", {
    x: 5.95, y: 3.9, w: 3.3, h: 0.35,
    fontSize: 14, fontFace: FONTS.body, color: "EF4444", bold: true, margin: 0,
  });
  slide7.addText("Points are scattered far from the line. Predictions are unreliable \u2014 try a different approach.", {
    x: 5.95, y: 4.25, w: 3.3, h: 0.55,
    fontSize: 10.5, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - Common Mistakes
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("Common Mistakes to Avoid", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const mistakes = [
    {
      title: "Assuming Everything is Linear",
      desc: "Not all relationships are straight lines! Always plot your data first to check.",
      color: "EF4444",
    },
    {
      title: "Ignoring Outliers",
      desc: "A few extreme data points can drag your line way off. Identify and handle them.",
      color: "F59E0B",
    },
    {
      title: "Not Enough Data",
      desc: "With too few points, your line won't generalize. More data = more reliable results.",
      color: "7C3AED",
    },
    {
      title: "Overfitting vs Underfitting",
      desc: "Too complex = memorizes noise (overfit). Too simple = misses patterns (underfit).",
      color: COLORS.primary,
    },
  ];

  mistakes.forEach((m, i) => {
    const y = 1.3 + i * 0.95;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.85, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.85, fill: { color: m.color },
    });
    // Number circle
    slide8.addShape(pres.shapes.OVAL, {
      x: 0.8, y: y + 0.15, w: 0.55, h: 0.55, fill: { color: m.color },
    });
    slide8.addText(String(i + 1), {
      x: 0.8, y: y + 0.15, w: 0.55, h: 0.55,
      fontSize: 18, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide8.addText(m.title, {
      x: 1.55, y: y + 0.08, w: 7.7, h: 0.35,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide8.addText(m.desc, {
      x: 1.55, y: y + 0.43, w: 7.7, h: 0.35,
      fontSize: 11.5, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
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
    "Linear regression draws the best straight line through your data",
    "It predicts numbers using y = mx + b (slope and intercept)",
    "Use it when the relationship between variables looks roughly linear",
    "MAE tells you average error; R\u00B2 tells you how well the line fits",
    "Always visualize your data first \u2014 not everything is linear!",
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

  slide10.addText("In Module 6, we'll learn:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Classification \u2014 Predicting Categories Instead of Numbers", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Is this email spam or not? Will the customer buy or leave?\nClassification answers YES/NO and category questions!", {
    x: 0.5, y: 4.15, w: 9, h: 0.6,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.8, w: 9, h: 0.4,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_05_Linear_Regression/Module_05_Linear_Regression.pptx" });
  console.log("Module 5 presentation created successfully!");
}

createPresentation().catch(console.error);
