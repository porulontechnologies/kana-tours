const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaCamera, FaEye, FaImage, FaSearch, FaCar, FaHospital, FaShieldAlt,
  FaIndustry, FaMagic, FaCogs, FaCheckCircle, FaArrowRight, FaLightbulb,
  FaBrain, FaRobot, FaVideo, FaUserCircle, FaCut, FaFileAlt, FaMobileAlt,
  FaGlasses, FaPuzzlePiece, FaPhotoVideo, FaStar
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
  pres.title = "Module 9: Computer Vision";

  // Pre-render icons
  const icons = {
    camera: await iconToBase64Png(FaCamera, "#FFFFFF", 256),
    cameraBlue: await iconToBase64Png(FaCamera, "#" + COLORS.primary, 256),
    eye: await iconToBase64Png(FaEye, "#" + COLORS.primary, 256),
    eyeWhite: await iconToBase64Png(FaEye, "#FFFFFF", 256),
    image: await iconToBase64Png(FaImage, "#" + COLORS.primary, 256),
    search: await iconToBase64Png(FaSearch, "#" + COLORS.primary, 256),
    car: await iconToBase64Png(FaCar, "#" + COLORS.primary, 256),
    hospital: await iconToBase64Png(FaHospital, "#" + COLORS.primary, 256),
    shield: await iconToBase64Png(FaShieldAlt, "#" + COLORS.primary, 256),
    industry: await iconToBase64Png(FaIndustry, "#" + COLORS.primary, 256),
    magic: await iconToBase64Png(FaMagic, "#" + COLORS.primary, 256),
    cogs: await iconToBase64Png(FaCogs, "#" + COLORS.primary, 256),
    check: await iconToBase64Png(FaCheckCircle, "#" + COLORS.accent, 256),
    arrow: await iconToBase64Png(FaArrowRight, "#FFFFFF", 256),
    arrowAccent: await iconToBase64Png(FaArrowRight, "#" + COLORS.accent, 256),
    lightbulb: await iconToBase64Png(FaLightbulb, "#" + COLORS.accent, 256),
    brain: await iconToBase64Png(FaBrain, "#" + COLORS.primary, 256),
    robot: await iconToBase64Png(FaRobot, "#" + COLORS.primary, 256),
    video: await iconToBase64Png(FaVideo, "#" + COLORS.primary, 256),
    user: await iconToBase64Png(FaUserCircle, "#" + COLORS.primary, 256),
    cut: await iconToBase64Png(FaCut, "#" + COLORS.primary, 256),
    fileAlt: await iconToBase64Png(FaFileAlt, "#" + COLORS.primary, 256),
    mobile: await iconToBase64Png(FaMobileAlt, "#" + COLORS.primary, 256),
    glasses: await iconToBase64Png(FaGlasses, "#" + COLORS.primary, 256),
    puzzle: await iconToBase64Png(FaPuzzlePiece, "#" + COLORS.primary, 256),
    photoVideo: await iconToBase64Png(FaPhotoVideo, "#" + COLORS.primary, 256),
    star: await iconToBase64Png(FaStar, "#" + COLORS.primary, 256),
    checkWhite: await iconToBase64Png(FaCheckCircle, "#FFFFFF", 256),
  };

  // ============================================================
  // SLIDE 1 - Title Slide
  // ============================================================
  let slide1 = pres.addSlide();
  slide1.background = { color: COLORS.darkBg };

  slide1.addImage({ data: icons.camera, x: 4.4, y: 0.6, w: 1.2, h: 1.2 });

  slide1.addText("Module 9", {
    x: 0.5, y: 1.9, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.accent,
    align: "center", charSpacing: 6, bold: true, margin: 0,
  });

  slide1.addText("Computer Vision", {
    x: 0.5, y: 2.5, w: 9, h: 1.2,
    fontSize: 40, fontFace: FONTS.header, color: COLORS.white,
    align: "center", bold: true, margin: 0,
  });

  slide1.addText("Teaching Computers to See and Understand Images", {
    x: 0.5, y: 3.7, w: 9, h: 0.6,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle,
    align: "center", margin: 0,
  });

  slide1.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.04, fill: { color: COLORS.accent },
  });

  // ============================================================
  // SLIDE 2 - WHAT is Computer Vision?
  // ============================================================
  let slide2 = pres.addSlide();
  slide2.background = { color: COLORS.lightGray };

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide2.addText("WHAT is Computer Vision?", {
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
    { text: "CV = Teaching computers to \"see\" and interpret images/videos like humans do", options: { bold: true, fontSize: 18, color: COLORS.primary } },
  ], { x: 0.85, y: 1.35, w: 8.4, h: 0.55, fontFace: FONTS.body, valign: "middle", margin: 0 });
  slide2.addText("A field of AI that gives machines the ability to extract meaningful information from visual data", {
    x: 0.85, y: 1.9, w: 8.4, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, italic: true, margin: 0,
  });

  // Three comparison cards: Humans vs Computers
  const visionCards = [
    { title: "Humans See Objects", desc: "We see a cat, a tree,\na face instantly", icon: icons.eye, x: 0.5, color: COLORS.accent },
    { title: "Computers See Pixels", desc: "Just numbers!\nA grid of 0-255 values\nfor each color", icon: icons.cogs, x: 3.55, color: COLORS.primary },
    { title: "CV Bridges the Gap", desc: "Converts raw pixels\ninto understanding\nand meaning", icon: icons.brain, x: 6.6, color: "E85D75" },
  ];

  visionCards.forEach((card) => {
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: 2.7, w: 2.8, h: 1.8, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide2.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: 2.7, w: 2.8, h: 0.06, fill: { color: card.color },
    });
    slide2.addImage({ data: card.icon, x: card.x + 1.1, y: 2.9, w: 0.5, h: 0.5 });
    slide2.addText(card.title, {
      x: card.x + 0.2, y: 3.45, w: 2.4, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, bold: true, color: COLORS.darkText, align: "center", margin: 0,
    });
    slide2.addText(card.desc, {
      x: card.x + 0.2, y: 3.8, w: 2.4, h: 0.6,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Arrows between cards
  slide2.addImage({ data: icons.arrowAccent, x: 3.35, y: 3.3, w: 0.25, h: 0.25 });
  slide2.addImage({ data: icons.arrowAccent, x: 6.4, y: 3.3, w: 0.25, h: 0.25 });

  // Bottom takeaway
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.6, fill: { color: COLORS.primary },
  });
  slide2.addText("Think of it like this: A camera captures pixels, but Computer Vision understands the picture!", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.6,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 3 - HOW does Computer Vision work?
  // ============================================================
  let slide3 = pres.addSlide();
  slide3.background = { color: COLORS.lightGray };

  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide3.addText("HOW Does Computer Vision Work?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Pixel explanation card
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 0.75, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 0.07, h: 0.75, fill: { color: COLORS.accent },
  });
  slide3.addImage({ data: icons.image, x: 0.8, y: 1.42, w: 0.45, h: 0.45 });
  slide3.addText([
    { text: "Image = Grid of pixels  ", options: { bold: true, color: COLORS.primary } },
    { text: "Each pixel is a number (0-255) representing color intensity. A 1080p image has over 2 million pixels!", options: { color: COLORS.medGray } },
  ], { x: 1.4, y: 1.3, w: 7.9, h: 0.75, fontSize: 13, fontFace: FONTS.body, valign: "middle", margin: 0 });

  // 3 Steps
  const steps = [
    { num: "1", title: "DETECT EDGES", desc: "Find boundaries\nand shapes in\nthe image", color: COLORS.primary },
    { num: "2", title: "RECOGNIZE PATTERNS", desc: "Identify textures,\nfeatures, and\nrepeating elements", color: COLORS.accentDark },
    { num: "3", title: "IDENTIFY OBJECTS", desc: "Combine patterns\nto recognize what\nobjects are present", color: "E85D75" },
  ];

  steps.forEach((step, i) => {
    const x = 0.5 + i * 3.15;
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.25, w: 2.9, h: 1.9, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide3.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.25, w: 2.9, h: 0.06, fill: { color: step.color },
    });
    slide3.addShape(pres.shapes.OVAL, {
      x: x + 1.05, y: 2.45, w: 0.7, h: 0.7, fill: { color: step.color },
    });
    slide3.addText(step.num, {
      x: x + 1.05, y: 2.45, w: 0.7, h: 0.7,
      fontSize: 24, fontFace: FONTS.body, color: COLORS.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide3.addText(step.title, {
      x: x + 0.2, y: 3.2, w: 2.5, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide3.addText(step.desc, {
      x: x + 0.2, y: 3.55, w: 2.5, h: 0.55,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });

    if (i < 2) {
      slide3.addImage({ data: icons.arrowAccent, x: x + 2.95, y: 2.95, w: 0.25, h: 0.25 });
    }
  });

  // CNN explanation
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.35, w: 9, h: 0.9, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.35, w: 0.07, h: 0.9, fill: { color: COLORS.primary },
  });
  slide3.addImage({ data: icons.brain, x: 0.8, y: 4.5, w: 0.45, h: 0.45 });
  slide3.addText([
    { text: "Powered by CNNs (Convolutional Neural Networks)  ", options: { bold: true, color: COLORS.primary, fontSize: 14 } },
  ], { x: 1.4, y: 4.4, w: 7.9, h: 0.35, fontFace: FONTS.body, margin: 0 });
  slide3.addText("Special neural networks with \"filters\" that scan images for patterns, like a magnifying glass moving across a photo.", {
    x: 1.4, y: 4.75, w: 7.9, h: 0.4,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
  });

  // ============================================================
  // SLIDE 4 - Key Computer Vision Tasks
  // ============================================================
  let slide4 = pres.addSlide();
  slide4.background = { color: COLORS.lightGray };

  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide4.addText("Key Computer Vision Tasks", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const tasks = [
    { icon: icons.search, title: "Image Classification", desc: "What's in this image?", detail: "Is this a cat or a dog?", color: COLORS.primary },
    { icon: icons.eye, title: "Object Detection", desc: "Where are objects?", detail: "Find all cars in this photo", color: COLORS.accentDark },
    { icon: icons.user, title: "Face Recognition", desc: "Who is this person?", detail: "Unlock phone with your face", color: "7C3AED" },
    { icon: icons.cut, title: "Image Segmentation", desc: "Outline every object", detail: "Separate foreground from background", color: "E85D75" },
    { icon: icons.fileAlt, title: "OCR (Text Recognition)", desc: "Read text from images", detail: "Scan documents, read signs", color: "F59E0B" },
  ];

  tasks.forEach((task, i) => {
    const y = 1.3 + i * 0.82;
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.72, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide4.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.72, fill: { color: task.color },
    });
    slide4.addImage({ data: task.icon, x: 0.8, y: y + 0.13, w: 0.45, h: 0.45 });
    slide4.addText(task.title, {
      x: 1.4, y: y + 0.05, w: 2.5, h: 0.35,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide4.addText(task.desc, {
      x: 1.4, y: y + 0.38, w: 2.5, h: 0.3,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
    slide4.addText(task.detail, {
      x: 5.5, y: y + 0.1, w: 3.8, h: 0.5,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.primary, italic: true, align: "right", valign: "middle", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 5 - WHEN to use Computer Vision?
  // ============================================================
  let slide5 = pres.addSlide();
  slide5.background = { color: COLORS.lightGray };

  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide5.addText("WHEN to Use Computer Vision?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  // Use CV when... cards (2x2 grid)
  const whenItems = [
    { icon: icons.image, title: "Analyze Images / Video", desc: "When you have visual data that needs to be understood, classified, or searched through automatically", x: 0.5, y: 1.35 },
    { icon: icons.industry, title: "Automate Visual Inspection", desc: "Quality control in manufacturing: detect defective products on assembly lines without human fatigue", x: 5.25, y: 1.35 },
    { icon: icons.user, title: "Face / Object Recognition", desc: "Identify people, products, animals, or specific objects in images for security, retail, or organization", x: 0.5, y: 3.0 },
    { icon: icons.hospital, title: "Medical Imaging Analysis", desc: "Assist doctors by analyzing X-rays, MRIs, and CT scans to detect diseases earlier and more accurately", x: 5.25, y: 3.0 },
  ];

  whenItems.forEach((item) => {
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: item.x, y: item.y, w: 4.25, h: 1.4, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide5.addShape(pres.shapes.RECTANGLE, {
      x: item.x, y: item.y, w: 0.07, h: 1.4, fill: { color: COLORS.primary },
    });
    slide5.addImage({ data: item.icon, x: item.x + 0.3, y: item.y + 0.2, w: 0.5, h: 0.5 });
    slide5.addText(item.title, {
      x: item.x + 1.0, y: item.y + 0.1, w: 3.0, h: 0.4,
      fontSize: 15, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide5.addText(item.desc, {
      x: item.x + 1.0, y: item.y + 0.55, w: 3.0, h: 0.7,
      fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Bottom note
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.65, w: 9, h: 0.6, fill: { color: COLORS.primary },
  });
  slide5.addText("Rule of thumb: If a human needs to LOOK at something to make a decision, CV can likely help automate it!", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.6,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 6 - WHERE is CV used today?
  // ============================================================
  let slide6 = pres.addSlide();
  slide6.background = { color: COLORS.lightGray };

  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide6.addText("WHERE is Computer Vision Used Today?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const usages = [
    { icon: icons.mobile, title: "Phone Face Unlock", desc: "Your phone recognizes your face in milliseconds", x: 0.5, y: 1.35 },
    { icon: icons.car, title: "Self-Driving Cars", desc: "Tesla, Waymo detect roads, signs, pedestrians", x: 3.55, y: 1.35 },
    { icon: icons.hospital, title: "Medical X-Ray Analysis", desc: "AI detects tumors, fractures, diseases", x: 6.6, y: 1.35 },
    { icon: icons.shield, title: "Security Cameras", desc: "Smart surveillance with person detection", x: 0.5, y: 3.05 },
    { icon: icons.industry, title: "Factory Quality Control", desc: "Detect defective products automatically", x: 3.55, y: 3.05 },
    { icon: icons.glasses, title: "AR Filters & Google Lens", desc: "Augmented reality and visual search", x: 6.6, y: 3.05 },
  ];

  usages.forEach((u) => {
    slide6.addShape(pres.shapes.RECTANGLE, {
      x: u.x, y: u.y, w: 2.8, h: 1.45, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide6.addShape(pres.shapes.OVAL, {
      x: u.x + 0.25, y: u.y + 0.15, w: 0.6, h: 0.6, fill: { color: COLORS.lightGray },
    });
    slide6.addImage({ data: u.icon, x: u.x + 0.35, y: u.y + 0.25, w: 0.4, h: 0.4 });
    slide6.addText(u.title, {
      x: u.x + 1.0, y: u.y + 0.1, w: 1.6, h: 0.35,
      fontSize: 13, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide6.addText(u.desc, {
      x: u.x + 1.0, y: u.y + 0.5, w: 1.6, h: 0.7,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
    });
  });

  // Bottom note
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.7, w: 9, h: 0.55, fill: { color: COLORS.accent },
  });
  slide6.addText("Computer Vision is everywhere - you probably interact with it dozens of times every day!", {
    x: 0.7, y: 4.7, w: 8.6, h: 0.55,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.white, align: "center", valign: "middle",
    bold: true, margin: 0,
  });

  // ============================================================
  // SLIDE 7 - WHICH technologies power CV?
  // ============================================================
  let slide7 = pres.addSlide();
  slide7.background = { color: COLORS.lightGray };

  slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide7.addText("WHICH Technologies Power Computer Vision?", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 26, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const techs = [
    { icon: icons.brain, title: "CNNs", desc: "Convolutional Neural Networks — the main architecture for image recognition", color: COLORS.primary },
    { icon: icons.puzzle, title: "Transfer Learning", desc: "Reuse models pre-trained on millions of images — no need to start from scratch", color: COLORS.accentDark },
    { icon: icons.video, title: "YOLO", desc: "\"You Only Look Once\" — real-time object detection at incredible speed", color: "7C3AED" },
    { icon: icons.cogs, title: "OpenCV", desc: "The most popular open-source computer vision library (Python/C++)", color: "E85D75" },
    { icon: icons.star, title: "Pre-trained Models", desc: "ResNet, VGG, EfficientNet — powerful models ready to use or fine-tune", color: "F59E0B" },
  ];

  techs.forEach((tech, i) => {
    const y = 1.3 + i * 0.82;
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.72, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide7.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.07, h: 0.72, fill: { color: tech.color },
    });
    slide7.addImage({ data: tech.icon, x: 0.8, y: y + 0.13, w: 0.45, h: 0.45 });
    slide7.addText(tech.title, {
      x: 1.4, y: y + 0.05, w: 2.0, h: 0.35,
      fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
    });
    slide7.addText(tech.desc, {
      x: 3.4, y: y + 0.05, w: 5.9, h: 0.6,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.medGray, valign: "middle", margin: 0,
    });
  });

  // ============================================================
  // SLIDE 8 - The Amazing Things CV Can Do
  // ============================================================
  let slide8 = pres.addSlide();
  slide8.background = { color: COLORS.lightGray };

  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: COLORS.darkBg },
  });
  slide8.addText("The Amazing Things CV Can Do", {
    x: 0.6, y: 0.2, w: 8.8, h: 0.7,
    fontSize: 28, fontFace: FONTS.header, color: COLORS.white, bold: true, margin: 0,
  });

  const amazing = [
    { title: "Generate Images from Text", desc: "DALL-E, Midjourney, Stable Diffusion\ncreate photorealistic images\nfrom text descriptions", icon: icons.magic, color: COLORS.primary },
    { title: "Deepfakes", desc: "Face swapping technology\nthat can create realistic\nvideo of anyone", icon: icons.user, color: "E85D75" },
    { title: "Augmented Reality", desc: "Overlay digital objects\non the real world\nthrough your camera", icon: icons.glasses, color: COLORS.accentDark },
    { title: "Restore Old Photos", desc: "AI colorizes, denoises,\nand enhances old or\ndamaged photographs", icon: icons.photoVideo, color: "7C3AED" },
  ];

  amazing.forEach((item, i) => {
    const x = 0.35 + i * 2.4;
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 2.4, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
    });
    slide8.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.35, w: 2.2, h: 0.06, fill: { color: item.color },
    });
    slide8.addImage({ data: item.icon, x: x + 0.8, y: 1.55, w: 0.55, h: 0.55 });
    slide8.addText(item.title, {
      x: x + 0.15, y: 2.2, w: 1.9, h: 0.45,
      fontSize: 12, fontFace: FONTS.body, color: COLORS.darkText, bold: true, align: "center", margin: 0,
    });
    slide8.addText(item.desc, {
      x: x + 0.15, y: 2.65, w: 1.9, h: 0.8,
      fontSize: 10, fontFace: FONTS.body, color: COLORS.medGray, align: "center", margin: 0,
    });
  });

  // Self-driving navigation highlight
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.0, w: 9, h: 1.2, fill: { color: COLORS.cardBg }, shadow: makeShadow(),
  });
  slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.0, w: 0.07, h: 1.2, fill: { color: COLORS.accent },
  });
  slide8.addImage({ data: icons.car, x: 0.8, y: 4.15, w: 0.55, h: 0.55 });
  slide8.addText("Self-Driving Navigation", {
    x: 1.5, y: 4.1, w: 7.8, h: 0.4,
    fontSize: 16, fontFace: FONTS.body, color: COLORS.darkText, bold: true, margin: 0,
  });
  slide8.addText("Autonomous vehicles use CV to detect lane markings, traffic signs, pedestrians, and other vehicles in real-time. This is one of the most complex applications of computer vision, combining multiple CV tasks simultaneously.", {
    x: 1.5, y: 4.5, w: 7.8, h: 0.6,
    fontSize: 11, fontFace: FONTS.body, color: COLORS.medGray, margin: 0,
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
    "Computer Vision teaches machines to interpret images and videos like humans do",
    "Computers see pixels (numbers), not objects — CV converts pixels into understanding",
    "CNNs are the key architecture: they use filters to scan images for patterns",
    "Main tasks: Classification, Object Detection, Face Recognition, Segmentation, OCR",
    "CV powers everyday tech: face unlock, self-driving cars, medical imaging, AR filters",
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

  slide10.addText("In Module 10, we'll explore:", {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONTS.body, color: COLORS.subtitle, align: "center", margin: 0,
  });

  slide10.addText("AI Ethics & The Future of Artificial Intelligence", {
    x: 0.5, y: 3.55, w: 9, h: 0.6,
    fontSize: 22, fontFace: FONTS.body, color: COLORS.accent, bold: true, align: "center", margin: 0,
  });

  slide10.addText("Try the hands-on exercises that come with this module!", {
    x: 0.5, y: 4.4, w: 9, h: 0.5,
    fontSize: 14, fontFace: FONTS.body, color: COLORS.medGray, align: "center", italic: true, margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "E:/porulon/Kana/AI_ML_Course/Module_09_Computer_Vision/Module_09_Computer_Vision.pptx" });
  console.log("Module 9 presentation created successfully!");
}

createPresentation().catch(console.error);
