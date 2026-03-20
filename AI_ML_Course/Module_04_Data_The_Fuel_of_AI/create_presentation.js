const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaDatabase, FaCogs, FaTable, FaImage, FaFileAlt, FaMicrophone,
  FaChartLine, FaCloudDownloadAlt, FaSearch, FaBug, FaArrowRight,
  FaCheckCircle, FaLightbulb, FaBrain, FaRocket, FaExclamationTriangle,
  FaCut, FaBalanceScale, FaSortAmountUp, FaGlobe, FaServer,
  FaWifi, FaPollH, FaUsers, FaFolderOpen, FaFilter, FaSyncAlt,
  FaRandom, FaChartBar, FaThermometerHalf, FaDollarSign, FaEnvelope,
  FaClock, FaSatelliteDish, FaMusic
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
  pres.title = "Module 4: Data — The Fuel of AI";

  // Pre-render icons
  const icons = {
    database: await iconToBase64Png(FaDatabase, "#FFFFFF", 256),
    databaseBlue: await iconToBase64Png(FaDatabase, "#" + COLORS.primary, 256),
    cogs: await iconToBase64Png(FaCogs, "#" + COLORS.primary, 256),
    table: await iconToBase64Png(FaTable, "#" + COLORS.primary, 256),
    image: await iconToBase64Png(FaImage, "#" + COLORS.primary, 256),
    fileAlt: await iconToBase64Png(FaFileAlt, "#" + COLORS.primary, 256),
    microphone: await iconToBase64Png(FaMicrophone, "#" + COLORS.primary, 256),
    chartLine: await iconToBase64Png(FaChartLine, "#" + COLORS.primary, 256),
    cloudDownload: await iconToBase64Png(FaCloudDownloadAlt, "#" + COLORS.primary, 256),
    search: await iconToBase64Png(FaSearch, "#" + COLORS.primary, 256),
    bug: await iconToBase64Png(FaBug, "#" + COLORS.red, 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    brain: await iconToBase64Png(FaBrain, "#" + COLORS.primary, 256),
    rocket: await iconToBase64Png(FaRocket, "#FFFFFF", 256),
    warning: await iconToBase64Png(FaExclamationTriangle, "#" + COLORS.orange, 256),
    cut: await iconToBase64Png(FaCut, "#" + COLORS.primary, 256),
    balance: await iconToBase64Png(FaBalanceScale, "#" + COLORS.primary, 256),
    sortUp: await iconToBase64Png(FaSortAmountUp, "#" + COLORS.primary, 256),
    globe: await iconToBase64Png(FaGlobe, "#" + COLORS.primary, 256),
    server: await iconToBase64Png(FaServer, "#" + COLORS.primary, 256),
    wifi: await iconToBase64Png(FaWifi, "#" + COLORS.primary, 256),
    poll: await iconToBase64Png(FaPollH, "#" + COLORS.primary, 256),
    users: await iconToBase64Png(FaUsers, "#" + COLORS.primary, 256),
    folder: await iconToBase64Png(FaFolderOpen, "#" + COLORS.primary, 256),
    filter: await iconToBase64Png(FaFilter, "#" + COLORS.primary, 256),
    sync: await iconToBase64Png(FaSyncAlt, "#" + COLORS.primary, 256),
    random: await iconToBase64Png(FaRandom, "#" + COLORS.primary, 256),
    chartBar: await iconToBase64Png(FaChartBar, "#" + COLORS.primary, 256),
    thermometer: await iconToBase64Png(FaThermometerHalf, "#" + COLORS.primary, 256),
    dollar: await iconToBase64Png(FaDollarSign, "#" + COLORS.primary, 256),
    envelope: await iconToBase64Png(FaEnvelope, "#" + COLORS.primary, 256),
    clock: await iconToBase64Png(FaClock, "#" + COLORS.primary, 256),
    satellite: await iconToBase64Png(FaSatelliteDish, "#" + COLORS.primary, 256),
    music: await iconToBase64Png(FaMusic, "#" + COLORS.primary, 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide (Dark Background)
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.database, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 4", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("Data — The Fuel of AI", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 40, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("No Data, No AI: Understanding What Makes AI Smart", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is Data?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT is Data?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Main definition card
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 1.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 0.07, h: 1.0, fill: { color: COLORS.primary },
  });
  slide2.addText([
    { text: "Data = Facts, numbers, text, images — anything measurable or recordable", options: { bold: true, fontSize: 17, color: COLORS.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.5, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("Data is the raw material that AI learns from — without it, AI can't do anything!", {
    x: 0.85, y: 1.85, w: 8.4, h: 0.45,
    fontSize: 13, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Structured vs Unstructured - two cards
  const dataTypes = [
    {
      title: "Structured Data",
      icon: icons.table,
      desc: "Organized in rows & columns\nlike spreadsheets and databases",
      examples: "Excel tables, SQL databases,\nCSV files, forms",
      color: COLORS.primary,
      x: 0.5,
    },
    {
      title: "Unstructured Data",
      icon: icons.image,
      desc: "No fixed format — messy\nand harder to organize",
      examples: "Photos, emails, social media\nposts, videos, audio",
      color: COLORS.purple,
      x: 5.25,
    },
  ];

  dataTypes.forEach((dt) => {
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: dt.x, y: 2.6, w: 4.25, h: 1.7, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: dt.x, y: 2.6, w: 4.25, h: 0.06, fill: { color: dt.color },
    });
    slide2.addImage({ data: dt.icon, x: dt.x + 0.25, y: 2.8, w: 0.45, h: 0.45 });
    slide2.addText(dt.title, {
      x: dt.x + 0.85, y: 2.78, w: 3.1, h: 0.4,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide2.addText(dt.desc, {
      x: dt.x + 0.25, y: 3.3, w: 3.8, h: 0.5,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
    slide2.addText(dt.examples, {
      x: dt.x + 0.25, y: 3.8, w: 3.8, h: 0.4,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.primary, italic: true, margin: 0,
    });
  });

  // Cooking analogy
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.55, w: 9, h: 0.7, fill: { color: COLORS.primary },
  });
  slide2.addImage({ data: icons.lightbulb, x: 0.7, y: 4.65, w: 0.4, h: 0.4 });
  slide2.addText("Analogy: Data is to AI what ingredients are to cooking — you need the right ones to make a great dish!", {
    x: 1.25, y: 4.55, w: 8.0, h: 0.7,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW does AI use Data?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Does AI Use Data?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 4 Steps pipeline
  const pipeline = [
    { num: "1", title: "DATA", desc: "Raw facts\n& numbers", color: COLORS.primary, icon: icons.databaseBlue },
    { num: "2", title: "FEATURES", desc: "Key characteristics\nextracted", color: COLORS.accentDark, icon: icons.search },
    { num: "3", title: "MODEL LEARNS", desc: "Finds patterns\n& rules", color: COLORS.purple, icon: icons.brain },
    { num: "4", title: "PREDICTIONS", desc: "Makes smart\ndecisions", color: COLORS.red, icon: icons.chartLine },
  ];

  pipeline.forEach((step, i) => {
    const x = 0.35 + i * 2.42;
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.15, h: 2.0, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.4, w: 2.15, h: 0.06, fill: { color: step.color },
    });
    // Number circle
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 0.72, y: 1.6, w: 0.65, h: 0.65, fill: { color: step.color },
    });
    slide3.addText(step.num, {
      x: x + 0.72, y: 1.6, w: 0.65, h: 0.65,
      fontSize: 22, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide3.addText(step.title, {
      x: x + 0.1, y: 2.35, w: 1.95, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide3.addText(step.desc, {
      x: x + 0.1, y: 2.7, w: 1.95, h: 0.55,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    // Arrow between steps
    if (i < 3) {
      slide3.addImage({ data: icons.arrowAccent, x: x + 2.18, y: 2.2, w: 0.28, h: 0.28 });
    }
  });

  // Garbage In = Garbage Out warning
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.4, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.7, w: 0.07, h: 1.4, fill: { color: COLORS.orange },
  });
  slide3.addImage({ data: icons.warning, x: 0.85, y: 3.85, w: 0.5, h: 0.5 });
  slide3.addText("Garbage In = Garbage Out (GIGO)", {
    x: 1.5, y: 3.85, w: 7.8, h: 0.45,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.orange, bold: true, margin: 0,
  });
  slide3.addText([
    { text: "If you feed bad data to an AI model, you get bad results.\n", options: { color: COLORS.darkText, fontSize: 13 } },
    { text: "Example: Train a spam filter on random emails → it won't know what spam looks like!", options: { color: COLORS.medGray, fontSize: 12, italic: true } },
  ], { x: 1.5, y: 4.3, w: 7.8, h: 0.7, fontFace: FONTS.body, margin: 0 });

  // ============================================================
  // SLIDE 4 - Types of Data
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("Types of Data AI Works With", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const dataKinds = [
    { icon: icons.sortUp, title: "Numbers", desc: "Age, price, temperature,\nscores, measurements", color: COLORS.primary, x: 0.5, y: 1.35 },
    { icon: icons.envelope, title: "Text", desc: "Emails, reviews, tweets,\narticles, chat messages", color: COLORS.accentDark, x: 3.55, y: 1.35 },
    { icon: icons.image, title: "Images", desc: "Photos, X-rays, satellite\nimages, diagrams", color: COLORS.purple, x: 6.6, y: 1.35 },
    { icon: icons.music, title: "Audio", desc: "Speech recordings, music,\npodcasts, sound effects", color: COLORS.red, x: 1.7, y: 3.15 },
    { icon: icons.clock, title: "Time Series", desc: "Stock prices, weather over\ntime, sensor readings", color: COLORS.orange, x: 4.8, y: 3.15 },
  ];

  dataKinds.forEach((dk) => {
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: dk.x, y: dk.y, w: 2.8, h: 1.55, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: dk.x, y: dk.y, w: 2.8, h: 0.06, fill: { color: dk.color },
    });
    // Icon circle
    slide4.addShape(pres.shapes.OVAL, {
      x: dk.x + 1.0, y: dk.y + 0.2, w: 0.6, h: 0.6, fill: { color: COLORS.lightGray },
    });
    slide4.addImage({ data: dk.icon, x: dk.x + 1.1, y: dk.y + 0.3, w: 0.4, h: 0.4 });
    slide4.addText(dk.title, {
      x: dk.x + 0.2, y: dk.y + 0.85, w: 2.4, h: 0.3,
      fontSize: 14, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide4.addText(dk.desc, {
      x: dk.x + 0.2, y: dk.y + 1.1, w: 2.4, h: 0.4,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 5 - WHERE does Data come from?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHERE Does Data Come From?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const sources = [
    { icon: icons.server, title: "Databases", desc: "Company records,\ncustomer info", x: 0.5, y: 1.35 },
    { icon: icons.globe, title: "APIs", desc: "Weather, maps,\nsocial data feeds", x: 2.65, y: 1.35 },
    { icon: icons.search, title: "Web Scraping", desc: "Extracting data\nfrom websites", x: 4.8, y: 1.35 },
    { icon: icons.wifi, title: "Sensors / IoT", desc: "Smart devices,\nwearables, cameras", x: 6.95, y: 1.35 },
    { icon: icons.poll, title: "Surveys", desc: "Questionnaires &\nuser feedback", x: 0.5, y: 3.05 },
    { icon: icons.users, title: "Social Media", desc: "Posts, comments,\nlikes, shares", x: 2.65, y: 3.05 },
    { icon: icons.folder, title: "Public Datasets", desc: "Kaggle, government\ndata, research", x: 4.8, y: 3.05 },
  ];

  sources.forEach((src) => {
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: src.x, y: src.y, w: 1.95, h: 1.45, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide5.addImage({ data: src.icon, x: src.x + 0.7, y: src.y + 0.15, w: 0.45, h: 0.45 });
    slide5.addText(src.title, {
      x: src.x + 0.1, y: src.y + 0.65, w: 1.75, h: 0.3,
      fontSize: 12, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide5.addText(src.desc, {
      x: src.x + 0.1, y: src.y + 0.95, w: 1.75, h: 0.4,
      fontSize: 9, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Bottom tip
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.7, w: 9, h: 0.6, fill: { color: COLORS.primary },
  });
  slide5.addText("Tip: Start with free public datasets on Kaggle.com or data.gov to practice!", {
    x: 0.7, y: 4.7, w: 8.6, h: 0.6,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 6 - Data Quality Matters!
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("Data Quality Matters!", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const problems = [
    { title: "Missing Values", desc: "Empty cells, null fields", icon: "?", color: COLORS.red },
    { title: "Duplicates", desc: "Same record appears twice", icon: "2x", color: COLORS.orange },
    { title: "Outliers", desc: "Age = 999, Price = -$50", icon: "!", color: COLORS.purple },
    { title: "Incorrect Data", desc: "Typos, wrong formats", icon: "X", color: "DC2626" },
    { title: "Bias", desc: "Unbalanced representation", icon: "~", color: "6366F1" },
  ];

  problems.forEach((p, i) => {
    const y = 1.3 + i * 0.63;
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 5.5, h: 0.53, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.53, fill: { color: p.color },
    });
    // Icon badge
    slide6.addShape(pres.shapes.OVAL, {
      x: 0.75, y: y + 0.07, w: 0.38, h: 0.38, fill: { color: p.color },
    });
    slide6.addText(p.icon, {
      x: 0.75, y: y + 0.07, w: 0.38, h: 0.38,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide6.addText(p.title, {
      x: 1.3, y: y + 0.02, w: 2.0, h: 0.25,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide6.addText(p.desc, {
      x: 1.3, y: y + 0.27, w: 4.5, h: 0.22,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Right side - analogy card
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 6.3, y: 1.3, w: 3.2, h: 2.85, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 6.3, y: 1.3, w: 3.2, h: 0.06, fill: { color: COLORS.accent },
  });
  slide6.addImage({ data: icons.lightbulb, x: 7.55, y: 1.5, w: 0.5, h: 0.5 });
  slide6.addText("Cooking Analogy", {
    x: 6.5, y: 2.1, w: 2.8, h: 0.35,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
  });
  slide6.addText("Cooking with rotten\ningredients = bad meal\n\nBad data = bad AI\n\nAlways check your\ningredients first!", {
    x: 6.5, y: 2.5, w: 2.8, h: 1.5,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
  });

  // Bottom warning
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.45, w: 9, h: 0.8, fill: { color: COLORS.orange },
  });
  slide6.addText("Data scientists spend up to 80% of their time cleaning data — it's that important!", {
    x: 0.7, y: 4.45, w: 8.6, h: 0.8,
    fontSize: 15, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 7 - WHICH steps to prepare data?
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("WHICH Steps to Prepare Data?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // 4 steps pipeline
  const prepSteps = [
    { num: "1", title: "COLLECT", desc: "Gather raw data from\nvarious sources", icon: icons.cloudDownload, color: COLORS.primary },
    { num: "2", title: "CLEAN", desc: "Fix errors, fill gaps,\nremove duplicates", icon: icons.filter, color: COLORS.accentDark },
    { num: "3", title: "TRANSFORM", desc: "Normalize, scale,\nencode categories", icon: icons.sync, color: COLORS.purple },
    { num: "4", title: "SPLIT", desc: "Divide into training\nand testing sets", icon: icons.random, color: COLORS.red },
  ];

  prepSteps.forEach((step, i) => {
    const x = 0.35 + i * 2.42;
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.15, h: 2.15, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.15, h: 0.06, fill: { color: step.color },
    });
    // Number circle
    slide7.addShape(pres.shapes.OVAL, {
      x: x + 0.72, y: 1.55, w: 0.65, h: 0.65, fill: { color: step.color },
    });
    slide7.addText(step.num, {
      x: x + 0.72, y: 1.55, w: 0.65, h: 0.65,
      fontSize: 22, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide7.addText(step.title, {
      x: x + 0.1, y: 2.3, w: 1.95, h: 0.35,
      fontSize: 14, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide7.addText(step.desc, {
      x: x + 0.1, y: 2.65, w: 1.95, h: 0.65,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    if (i < 3) {
      slide7.addImage({ data: icons.arrowAccent, x: x + 2.18, y: 2.15, w: 0.28, h: 0.28 });
    }
  });

  // 80/20 Rule card
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.8, w: 9, h: 1.35, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.8, w: 0.07, h: 1.35, fill: { color: COLORS.accent },
  });
  slide7.addImage({ data: icons.lightbulb, x: 0.85, y: 3.95, w: 0.5, h: 0.5 });
  slide7.addText("The 80/20 Rule for Train/Test Split", {
    x: 1.5, y: 3.92, w: 7.8, h: 0.45,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  // Visual bar showing 80/20
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 1.5, y: 4.45, w: 5.6, h: 0.35, fill: { color: COLORS.primary },
  });
  slide7.addText("80% Training Data", {
    x: 1.5, y: 4.45, w: 5.6, h: 0.35,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 7.1, y: 4.45, w: 1.4, h: 0.35, fill: { color: COLORS.accent },
  });
  slide7.addText("20% Test", {
    x: 7.1, y: 4.45, w: 1.4, h: 0.35,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
  });
  slide7.addText("Use 80% to teach the model, 20% to check if it actually learned!", {
    x: 1.5, y: 4.85, w: 7.8, h: 0.25,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // ============================================================
  // SLIDE 8 - WHEN is data enough?
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("WHEN Is Data Enough?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const insights = [
    {
      title: "More Data = Better AI (Usually)",
      desc: "Larger datasets help models find more patterns and make better predictions",
      icon: icons.chartBar,
      color: COLORS.primary,
    },
    {
      title: "Quality > Quantity",
      desc: "1,000 clean, accurate records beat 100,000 messy ones",
      icon: icons.check,
      color: COLORS.accentDark,
    },
    {
      title: "Diminishing Returns",
      desc: "After a point, adding more data gives smaller improvements",
      icon: icons.chartLine,
      color: COLORS.purple,
    },
    {
      title: "Balanced Data Matters",
      desc: "If 99% of emails are not-spam, the AI won't learn to detect spam well",
      icon: icons.balance,
      color: COLORS.orange,
    },
  ];

  insights.forEach((ins, i) => {
    const y = 1.3 + i * 0.88;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.75, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.75, fill: { color: ins.color },
    });
    // Icon
    slide8.addImage({ data: ins.icon, x: 0.8, y: y + 0.15, w: 0.42, h: 0.42 });
    slide8.addText(ins.title, {
      x: 1.4, y: y + 0.05, w: 7.8, h: 0.32,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide8.addText(ins.desc, {
      x: 1.4, y: y + 0.38, w: 7.8, h: 0.3,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Bottom note
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.9, w: 9, h: 0.4, fill: { color: COLORS.primary },
  });
  slide8.addText("Rule of Thumb: Start with what you have, improve data quality, then collect more if needed.", {
    x: 0.7, y: 4.9, w: 8.6, h: 0.4,
    fontSize: 12, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle", bold: true, margin: 0,
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
    "Data is the fuel that powers all AI — no data, no intelligence",
    "Data comes in many forms: numbers, text, images, audio, and time series",
    "Garbage In = Garbage Out — data quality is critical for good AI",
    "Data preparation (collect, clean, transform, split) takes most of the work",
    "Quality matters more than quantity — balanced, clean data wins",
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

  slide10.addImage({ data: icons.rocket, x: 4.4, y: 0.7, w: 1.2, h: 1.2 });

  slide10.addText("What's Next?", {
    x: 0.5, y: 2.0, w: 9, h: 0.8,
    fontSize: 36, fontFace: FONTS.header, color: COLORS.white, bold: true, align: "center", margin: 0,
  });

  slide10.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 2.85, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  slide10.addText("In Module 5, we'll learn:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Linear Regression — Predicting Numbers with AI", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Now that you understand data, let's use it to make predictions!", {
    x: 0.5, y: 4.4, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_04_Data_The_Fuel_of_AI/Module_04_Data.pptx" });
  console.log("Module 4 presentation created successfully!");
}

createPresentation().catch(console.error);
