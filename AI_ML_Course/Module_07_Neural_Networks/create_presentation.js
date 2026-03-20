const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBrain, FaCogs, FaLayerGroup, FaRocket, FaCheckCircle, FaArrowRight,
  FaLightbulb, FaNetworkWired, FaProjectDiagram, FaImage, FaComments,
  FaMicrophone, FaGamepad, FaPaintBrush, FaCar, FaEye, FaMemory,
  FaLanguage, FaMagic, FaDatabase, FaChartLine, FaSitemap,
  FaExclamationTriangle, FaBook
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
const C = {
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

const F = { header: "Georgia", body: "Calibri" };

const shadow = () => ({
  type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.12,
});

// Helper: dark header bar
function addHeader(slide, pres, text) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.darkBg } });
  slide.addText(text, {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: F.header, color: C.white, bold: true, margin: 0,
  });
}

// Helper: card with left accent bar
function addCard(slide, pres, x, y, w, h, accentColor) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.cardBg }, shadow: shadow() });
  if (accentColor) {
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color: accentColor } });
  }
}

// Helper: card with top accent bar
function addTopCard(slide, pres, x, y, w, h, accentColor) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.cardBg }, shadow: shadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.06, fill: { color: accentColor || C.primary } });
}

// Helper: bottom banner
function addBanner(slide, pres, text, y, h, color) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: h || 0.8, fill: { color: color || C.primary } });
  slide.addText(text, {
    x: 0.7, y, w: 8.6, h: h || 0.8,
    fontSize: 15, fontFace: F.body, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
  });
}

async function createPresentation() {
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "AI & ML Course";
  pres.title = "Module 7: Neural Networks & Deep Learning";

  // Pre-render icons
  const icons = {
    brain: await iconToBase64Png(FaBrain, "#FFFFFF", 256),
    brainBlue: await iconToBase64Png(FaBrain, "#" + C.primary, 256),
    brainAccent: await iconToBase64Png(FaBrain, "#" + C.accent, 256),
    cogs: await iconToBase64Png(FaCogs, "#" + C.primary, 256),
    layers: await iconToBase64Png(FaLayerGroup, "#" + C.primary, 256),
    layersWhite: await iconToBase64Png(FaLayerGroup, "#FFFFFF", 256),
    rocket: await iconToBase64Png(FaRocket, "#" + C.primary, 256),
    rocketWhite: await iconToBase64Png(FaRocket, "#FFFFFF", 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + C.accent, 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + C.accent, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + C.accent, 256),
    network: await iconToBase64Png(FaNetworkWired, "#" + C.primary, 256),
    networkWhite: await iconToBase64Png(FaNetworkWired, "#FFFFFF", 256),
    project: await iconToBase64Png(FaProjectDiagram, "#" + C.primary, 256),
    image: await iconToBase64Png(FaImage, "#" + C.primary, 256),
    comments: await iconToBase64Png(FaComments, "#" + C.primary, 256),
    mic: await iconToBase64Png(FaMicrophone, "#" + C.primary, 256),
    gamepad: await iconToBase64Png(FaGamepad, "#" + C.primary, 256),
    paintbrush: await iconToBase64Png(FaPaintBrush, "#" + C.primary, 256),
    car: await iconToBase64Png(FaCar, "#" + C.primary, 256),
    eye: await iconToBase64Png(FaEye, "#" + C.primary, 256),
    memory: await iconToBase64Png(FaMemory, "#" + C.primary, 256),
    language: await iconToBase64Png(FaLanguage, "#" + C.primary, 256),
    magic: await iconToBase64Png(FaMagic, "#" + C.primary, 256),
    database: await iconToBase64Png(FaDatabase, "#" + C.primary, 256),
    chart: await iconToBase64Png(FaChartLine, "#" + C.primary, 256),
    sitemap: await iconToBase64Png(FaSitemap, "#" + C.primary, 256),
    warning: await iconToBase64Png(FaExclamationTriangle, "#" + C.orange, 256),
    book: await iconToBase64Png(FaBook, "#FFFFFF", 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: C.darkBg };

  slide1.addImage({ data: icons.networkWhite, x: 4.15, y: 0.5, w: 1.3, h: 1.3 });

  // Decorative small nodes
  const nodePositions = [
    { x: 2.5, y: 0.9, s: 0.15 }, { x: 7.2, y: 0.7, s: 0.12 },
    { x: 3.2, y: 1.7, s: 0.1 }, { x: 6.5, y: 1.5, s: 0.13 },
  ];
  nodePositions.forEach(n => {
    slide1.addShape(pres.shapes.OVAL, {
      x: n.x, y: n.y, w: n.s, h: n.s, fill: { color: C.accent }, transparency: 50,
    });
  });

  slide1.addText("Module 7", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: F.body, color: C.accent, align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("Neural Networks &\nDeep Learning", {
    x: 0.5, y: 2.4, w: 9, h: 1.3,
    fontSize: 40, fontFace: F.header, color: C.white, align: "center", bold: true, margin: 0,
  });

  slide1.addText("How Computers Learn Like the Human Brain", {
    x: 0.5, y: 3.75, w: 9, h: 0.6,
    fontSize: 18, fontFace: F.body, color: C.subtitle, align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: C.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is a Neural Network?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: C.lightGray };
  addHeader(slide2, pres, "WHAT is a Neural Network?");

  // Main definition card
  addCard(slide2, pres, 0.5, 1.3, 9, 1.1, C.primary);
  slide2.addImage({ data: icons.brainBlue, x: 0.75, y: 1.5, w: 0.55, h: 0.55 });
  slide2.addText("Inspired by the Human Brain", {
    x: 1.5, y: 1.35, w: 7.7, h: 0.5,
    fontSize: 18, fontFace: F.body, color: C.primary, bold: true, margin: 0,
  });
  slide2.addText("Made of layers of \"neurons\" (math functions) connected together", {
    x: 1.5, y: 1.85, w: 7.7, h: 0.45,
    fontSize: 14, fontFace: F.body, color: C.medGray, margin: 0,
  });

  // Flow diagram: Input -> Hidden Layers -> Output
  const flowBoxes = [
    { label: "INPUT", color: C.primary, x: 0.8 },
    { label: "HIDDEN\nLAYERS", color: C.purple, x: 3.6 },
    { label: "OUTPUT", color: C.accent, x: 6.4 },
  ];
  flowBoxes.forEach((box, i) => {
    slide2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: box.x, y: 2.7, w: 2.2, h: 0.95, rectRadius: 0.1, fill: { color: box.color }, shadow: shadow(),
    });
    slide2.addText(box.label, {
      x: box.x, y: 2.7, w: 2.2, h: 0.95,
      fontSize: 14, fontFace: F.body, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    if (i < 2) {
      slide2.addImage({ data: icons.arrowAccent, x: box.x + 2.35, y: 2.95, w: 0.35, h: 0.35 });
    }
  });

  // Analogy card
  addCard(slide2, pres, 0.5, 4.0, 9, 1.2, C.accent);
  slide2.addImage({ data: icons.lightbulb, x: 0.75, y: 4.15, w: 0.5, h: 0.5 });
  slide2.addText("Analogy: The Team of Workers", {
    x: 1.45, y: 4.05, w: 7.8, h: 0.45,
    fontSize: 16, fontFace: F.body, color: C.darkText, bold: true, margin: 0,
  });
  slide2.addText("Like a team of workers -- each person does a small job, together they solve complex problems.\nOne counts colors, another spots edges, another recognizes shapes. Together? They see a face!", {
    x: 1.45, y: 4.5, w: 7.8, h: 0.65,
    fontSize: 12, fontFace: F.body, color: C.medGray, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW do Neural Networks Work?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: C.lightGray };
  addHeader(slide3, pres, "HOW Do Neural Networks Work?");

  // 3-Step neuron process
  const neuronSteps = [
    { num: "1", title: "RECEIVE", desc: "Each neuron receives\ninputs (numbers)", color: C.primary },
    { num: "2", title: "COMPUTE", desc: "Multiply by weights,\nadd bias", color: C.purple },
    { num: "3", title: "ACTIVATE", desc: "Apply activation\nfunction & output", color: C.accentDark },
  ];

  neuronSteps.forEach((step, i) => {
    const x = 0.5 + i * 3.15;
    addTopCard(slide3, pres, x, 1.3, 2.9, 1.7, step.color);
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 1.05, y: 1.5, w: 0.65, h: 0.65, fill: { color: step.color },
    });
    slide3.addText(step.num, {
      x: x + 1.05, y: 1.5, w: 0.65, h: 0.65,
      fontSize: 22, fontFace: F.body, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide3.addText(step.title, {
      x: x + 0.2, y: 2.2, w: 2.5, h: 0.35,
      fontSize: 14, fontFace: F.body, color: C.darkText, bold: true, align: "center", margin: 0,
    });
    slide3.addText(step.desc, {
      x: x + 0.2, y: 2.55, w: 2.5, h: 0.45,
      fontSize: 11, fontFace: F.body, color: C.medGray, align: "center", margin: 0,
    });
    if (i < 2) {
      slide3.addImage({ data: icons.arrowAccent, x: x + 2.95, y: 1.95, w: 0.3, h: 0.3 });
    }
  });

  // Decision analogy
  addCard(slide3, pres, 0.5, 3.25, 5.5, 1.05, C.accent);
  slide3.addImage({ data: icons.lightbulb, x: 0.75, y: 3.4, w: 0.45, h: 0.45 });
  slide3.addText("Like Making a Decision", {
    x: 1.35, y: 3.3, w: 4.4, h: 0.4,
    fontSize: 14, fontFace: F.body, color: C.darkText, bold: true, margin: 0,
  });
  slide3.addText("Weigh the pros and cons, then decide yes or no!", {
    x: 1.35, y: 3.7, w: 4.4, h: 0.45,
    fontSize: 12, fontFace: F.body, color: C.medGray, margin: 0,
  });

  // Training card
  addCard(slide3, pres, 6.2, 3.25, 3.3, 1.05, C.primary);
  slide3.addImage({ data: icons.cogs, x: 6.45, y: 3.4, w: 0.45, h: 0.45 });
  slide3.addText("Training", {
    x: 7.05, y: 3.3, w: 2.2, h: 0.4,
    fontSize: 14, fontFace: F.body, color: C.darkText, bold: true, margin: 0,
  });
  slide3.addText("Adjust weights until correct\nanswers are produced!", {
    x: 7.05, y: 3.7, w: 2.3, h: 0.45,
    fontSize: 12, fontFace: F.body, color: C.medGray, margin: 0,
  });

  // Bottom banner
  addBanner(slide3, pres, "The network learns by making mistakes and adjusting -- just like us!", 4.6, 0.7, C.primary);

  // ============================================================
  // SLIDE 4 - The Layers Explained Simply
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: C.lightGray };
  addHeader(slide4, pres, "The Layers Explained Simply");

  // Three layer cards
  const layerCards = [
    {
      title: "Input Layer", icon: icons.database, color: C.primary,
      desc: "Receives raw data", detail: "Pixels, numbers, words",
    },
    {
      title: "Hidden Layers", icon: icons.sitemap, color: C.purple,
      desc: "Finds patterns", detail: "More layers = more\ncomplex patterns",
    },
    {
      title: "Output Layer", icon: icons.chart, color: C.accentDark,
      desc: "Gives the answer", detail: "Classification, prediction,\ngeneration",
    },
  ];

  layerCards.forEach((layer, i) => {
    const x = 0.5 + i * 3.15;
    addTopCard(slide4, pres, x, 1.3, 2.9, 2.3, layer.color);
    slide4.addImage({ data: layer.icon, x: x + 1.1, y: 1.5, w: 0.55, h: 0.55 });
    slide4.addText(layer.title, {
      x: x + 0.2, y: 2.15, w: 2.5, h: 0.4,
      fontSize: 16, fontFace: F.body, color: C.darkText, bold: true, align: "center", margin: 0,
    });
    slide4.addText(layer.desc, {
      x: x + 0.2, y: 2.55, w: 2.5, h: 0.35,
      fontSize: 13, fontFace: F.body, color: layer.color, bold: true, align: "center", margin: 0,
    });
    slide4.addText(layer.detail, {
      x: x + 0.2, y: 2.9, w: 2.5, h: 0.55,
      fontSize: 11, fontFace: F.body, color: C.medGray, align: "center", margin: 0,
    });

    if (i < 2) {
      slide4.addImage({ data: icons.arrowAccent, x: x + 2.95, y: 2.25, w: 0.3, h: 0.3 });
    }
  });

  // Deep Learning callout
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.9, w: 9, h: 1.3, fill: { color: C.darkBg },
  });
  slide4.addImage({ data: icons.layersWhite, x: 0.9, y: 4.1, w: 0.65, h: 0.65 });
  slide4.addText("Deep Learning = Many Hidden Layers", {
    x: 1.75, y: 3.95, w: 7.5, h: 0.55,
    fontSize: 20, fontFace: F.body, color: C.accent, bold: true, margin: 0,
  });
  slide4.addText("A simple neural network might have 1-2 hidden layers. A deep network can have hundreds!\nThe more layers, the more abstract and complex the patterns it can detect.", {
    x: 1.75, y: 4.5, w: 7.5, h: 0.6,
    fontSize: 12, fontFace: F.body, color: C.subtitle, margin: 0,
  });

  // ============================================================
  // SLIDE 5 - WHAT is Deep Learning?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: C.lightGray };
  addHeader(slide5, pres, "WHAT is Deep Learning?");

  // Main definition card
  addCard(slide5, pres, 0.5, 1.3, 9, 1.0, C.primary);
  slide5.addText([
    { text: "Deep Learning = Neural Networks with MANY layers", options: { bold: true, fontSize: 18, color: C.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.5, fontFace: F.body, valign: "middle", margin: 0 });
  slide5.addText("Why \"deep\"? Because of the depth -- many hidden layers stacked on top of each other.", {
    x: 0.85, y: 1.85, w: 8.4, h: 0.4,
    fontSize: 13, fontFace: F.body, color: C.medGray, italic: true, margin: 0,
  });

  // Three power examples
  const dlExamples = [
    { icon: icons.comments, title: "ChatGPT", desc: "Understands & generates\nhuman language", color: C.primary },
    { icon: icons.image, title: "Image Recognition", desc: "Identifies faces, objects,\nscenes in photos", color: C.purple },
    { icon: icons.car, title: "Self-Driving Cars", desc: "Sees the road, makes\ndriving decisions", color: C.accentDark },
  ];

  dlExamples.forEach((ex, i) => {
    const x = 0.5 + i * 3.15;
    addTopCard(slide5, pres, x, 2.6, 2.9, 1.6, ex.color);
    slide5.addImage({ data: ex.icon, x: x + 1.1, y: 2.8, w: 0.55, h: 0.55 });
    slide5.addText(ex.title, {
      x: x + 0.2, y: 3.4, w: 2.5, h: 0.35,
      fontSize: 14, fontFace: F.body, color: C.darkText, bold: true, align: "center", margin: 0,
    });
    slide5.addText(ex.desc, {
      x: x + 0.2, y: 3.75, w: 2.5, h: 0.45,
      fontSize: 11, fontFace: F.body, color: C.medGray, align: "center", margin: 0,
    });
  });

  addBanner(slide5, pres, "Deep Learning is the technology behind the AI revolution we see today!", 4.5, 0.75, C.primary);

  // ============================================================
  // SLIDE 6 - WHEN to Use Neural Networks?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: C.lightGray };
  addHeader(slide6, pres, "WHEN to Use Neural Networks?");

  // USE section (left)
  addTopCard(slide6, pres, 0.5, 1.3, 4.25, 3.0, C.accent);
  slide6.addText("USE Neural Networks When...", {
    x: 0.7, y: 1.5, w: 3.8, h: 0.45,
    fontSize: 16, fontFace: F.body, color: C.accentDark, bold: true, margin: 0,
  });

  const useItems = [
    { icon: icons.database, text: "You have LOTS of data\n(thousands+ examples)" },
    { icon: icons.brainBlue, text: "The problem is complex\n(images, language, speech)" },
    { icon: icons.chart, text: "Other algorithms aren't\ngood enough" },
  ];
  useItems.forEach((item, i) => {
    const y = 2.05 + i * 0.7;
    slide6.addImage({ data: item.icon, x: 0.8, y: y + 0.05, w: 0.4, h: 0.4 });
    slide6.addText(item.text, {
      x: 1.4, y: y, w: 3.1, h: 0.6,
      fontSize: 12, fontFace: F.body, color: C.darkText, margin: 0,
    });
  });

  // DON'T USE section (right)
  addTopCard(slide6, pres, 5.25, 1.3, 4.25, 3.0, C.red);
  slide6.addText("DON'T Use When...", {
    x: 5.45, y: 1.5, w: 3.8, h: 0.45,
    fontSize: 16, fontFace: F.body, color: C.red, bold: true, margin: 0,
  });

  const dontItems = [
    { icon: icons.warning, text: "You have a small dataset\n(less than a few hundred)" },
    { icon: icons.warning, text: "The problem is simple\n(e.g., basic yes/no rules)" },
    { icon: icons.warning, text: "You need to explain WHY\nthe model made a decision" },
  ];
  dontItems.forEach((item, i) => {
    const y = 2.05 + i * 0.7;
    slide6.addImage({ data: item.icon, x: 5.55, y: y + 0.05, w: 0.4, h: 0.4 });
    slide6.addText(item.text, {
      x: 6.15, y: y, w: 3.1, h: 0.6,
      fontSize: 12, fontFace: F.body, color: C.darkText, margin: 0,
    });
  });

  addBanner(slide6, pres, "Neural networks are powerful but not always the right tool. Use the simplest solution that works!", 4.6, 0.7, C.primary);

  // ============================================================
  // SLIDE 7 - WHERE are Neural Networks Used?
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: C.lightGray };
  addHeader(slide7, pres, "WHERE Are Neural Networks Used?");

  const useCases = [
    { icon: icons.eye, title: "Image Recognition", desc: "Faces, objects, medical scans", x: 0.5, y: 1.35 },
    { icon: icons.comments, title: "Language AI", desc: "ChatGPT, translation, writing", x: 3.55, y: 1.35 },
    { icon: icons.mic, title: "Speech", desc: "Siri, Alexa, voice assistants", x: 6.6, y: 1.35 },
    { icon: icons.gamepad, title: "Gaming", desc: "AlphaGo, game AI opponents", x: 0.5, y: 3.05 },
    { icon: icons.paintbrush, title: "AI Art", desc: "DALL-E, Midjourney, Stable Diffusion", x: 3.55, y: 3.05 },
    { icon: icons.car, title: "Self-Driving Cars", desc: "Tesla Autopilot, Waymo", x: 6.6, y: 3.05 },
  ];

  useCases.forEach((u) => {
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: u.x, y: u.y, w: 2.8, h: 1.45, fill: { color: C.cardBg }, shadow: shadow(),
    });
    slide7.addShape(pres.shapes.OVAL, {
      x: u.x + 0.25, y: u.y + 0.2, w: 0.6, h: 0.6, fill: { color: C.lightGray },
    });
    slide7.addImage({ data: u.icon, x: u.x + 0.35, y: u.y + 0.3, w: 0.4, h: 0.4 });
    slide7.addText(u.title, {
      x: u.x + 1.0, y: u.y + 0.15, w: 1.6, h: 0.35,
      fontSize: 14, fontFace: F.body, color: C.darkText, bold: true, margin: 0,
    });
    slide7.addText(u.desc, {
      x: u.x + 1.0, y: u.y + 0.5, w: 1.6, h: 0.7,
      fontSize: 11, fontFace: F.body, color: C.medGray, margin: 0,
    });
  });

  addBanner(slide7, pres, "Neural networks are behind almost every \"smart\" technology you use daily!", 4.75, 0.55, C.primary);

  // ============================================================
  // SLIDE 8 - WHICH Types of Neural Networks Exist?
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: C.lightGray };
  addHeader(slide8, pres, "WHICH Types of Neural Networks Exist?");

  const nnTypes = [
    {
      title: "CNN", subtitle: "Convolutional", icon: icons.eye, color: C.primary,
      desc: "For IMAGES", detail: "Like eyes -- spots\nvisual patterns",
    },
    {
      title: "RNN", subtitle: "Recurrent", icon: icons.memory, color: C.purple,
      desc: "For SEQUENCES", detail: "Like memory -- remembers\nprevious inputs",
    },
    {
      title: "Transformer", subtitle: "", icon: icons.language, color: C.accentDark,
      desc: "For LANGUAGE", detail: "Powers ChatGPT,\nBERT, GPT-4",
    },
    {
      title: "GAN", subtitle: "Generative Adversarial", icon: icons.magic, color: C.red,
      desc: "CREATES content", detail: "Makes new images,\nmusic, videos",
    },
  ];

  nnTypes.forEach((t, i) => {
    const x = 0.35 + i * 2.4;
    addTopCard(slide8, pres, x, 1.3, 2.15, 3.0, t.color);

    // Icon
    slide8.addImage({ data: t.icon, x: x + 0.75, y: 1.5, w: 0.55, h: 0.55 });

    // Title
    slide8.addText(t.title, {
      x: x + 0.1, y: 2.15, w: 1.95, h: 0.4,
      fontSize: 18, fontFace: F.body, color: C.darkText, bold: true, align: "center", margin: 0,
    });

    // Subtitle
    if (t.subtitle) {
      slide8.addText(t.subtitle, {
        x: x + 0.1, y: 2.5, w: 1.95, h: 0.3,
        fontSize: 9, fontFace: F.body, color: C.medGray, align: "center", margin: 0,
      });
    }

    // Purpose badge
    const badgeY = t.subtitle ? 2.85 : 2.75;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.2, y: badgeY, w: 1.75, h: 0.35, fill: { color: t.color },
    });
    slide8.addText(t.desc, {
      x: x + 0.2, y: badgeY, w: 1.75, h: 0.35,
      fontSize: 10, fontFace: F.body, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });

    // Detail
    slide8.addText(t.detail, {
      x: x + 0.1, y: badgeY + 0.45, w: 1.95, h: 0.6,
      fontSize: 10, fontFace: F.body, color: C.medGray, align: "center", margin: 0,
    });
  });

  addBanner(slide8, pres, "Different architectures for different tasks -- no single network does everything!", 4.6, 0.7, C.primary);

  // ============================================================
  // SLIDE 9 - Key Takeaways
  // ============================================================
  let slide9 = pres.addSlide();
  slide9.background = { color: C.lightGray };
  addHeader(slide9, pres, "Key Takeaways");

  const takeaways = [
    "Neural networks are inspired by the human brain -- layers of connected neurons",
    "Each neuron receives inputs, processes them with weights, and passes the output forward",
    "Deep Learning = neural networks with many hidden layers for complex problems",
    "Use neural networks when you have lots of data and complex patterns to find",
    "Different types (CNN, RNN, Transformer, GAN) are designed for different tasks",
  ];

  takeaways.forEach((text, i) => {
    const y = 1.3 + i * 0.78;
    slide9.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.65, fill: { color: C.cardBg }, shadow: shadow(),
    });
    slide9.addImage({ data: icons.check, x: 0.7, y: y + 0.1, w: 0.42, h: 0.42 });
    slide9.addText(text, {
      x: 1.3, y: y, w: 7.9, h: 0.65,
      fontSize: 14, fontFace: F.body, color: C.darkText, valign: "middle", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 10 - What's Next?
  // ============================================================
  let slide10 = pres.addSlide();
  slide10.background = { color: C.darkBg };

  slide10.addImage({ data: icons.arrow, x: 4.4, y: 0.7, w: 1.2, h: 1.2 });

  slide10.addText("What's Next?", {
    x: 0.5, y: 2.0, w: 9, h: 0.8,
    fontSize: 36, fontFace: F.header, color: C.white, bold: true, align: "center", margin: 0,
  });

  slide10.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 2.85, w: 3, h: 0.04, fill: { color: C.accent },
  });

  slide10.addText("In Module 8, we'll explore:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: F.body, color: C.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Natural Language Processing (NLP)", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 24, fontFace: F.body, color: C.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("How computers understand, interpret, and generate human language", {
    x: 0.5, y: 4.1, w: 9, h: 0.5,
    fontSize: 16, fontFace: F.body, color: C.subtitle, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.7, w: 9, h: 0.4,
    fontSize: 14, fontFace: F.body, color: C.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_07_Neural_Networks/Module_07_Neural_Networks.pptx" });
  console.log("Module 7 presentation created successfully!");
}

createPresentation().catch(console.error);
