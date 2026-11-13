// Site configuration and content data
// All content is centralized here for easy updates
import naosImg from '../images/NAOS.png';
import o2Img from '../images/O2.png';
import franVelaImg from '../images/franvela.png';
import asetemImg from '../images/asetem.png';
import jparvelStudioImg from '../images/jparvelstudio.png';

export const siteConfig = {
  name: "JPARVEL",
  logo: "DV",
  tagline: "La Fuerza Oscura del Desarrollo Web",
  description: "Forward Deployed AI Engineer explorando la galaxia de la inteligencia artificial. Del reto de negocio a soluciones de IA en producción.",
  email: "contact@jparvel.com",
  address: "Una galaxia muy, muy lejana",
  social: {
    github: "https://github.com/JavierParedes",
    linkedin: "https://www.linkedin.com/in/javier-paredes-vela-3a2233b4",
  },
};

export const navigation = [
  { name: "Inicio", href: "#home" },
  { name: "Sobre Mí", href: "#about" },
  { name: "Experiencia", href: "#experience" },
  { name: "Habilidades", href: "#services" },
  { name: "Misiones", href: "#projects" },
  { name: "Contacto", href: "#contact" },
];

export const heroData = {
  titleHighlight: "Forward Deployed",
  titleMain: "AI Engineer",
  subtitle: "Transformo retos de negocio en soluciones de inteligencia artificial. Agentes, LLMs y desarrollo full stack para llevar cada misión del prototipo a producción. Más de 4 años de experiencia en la galaxia del código.",
  primaryCta: { text: "Ver Misiones", href: "#projects" },
  secondaryCta: { text: "Contacto", href: "#contact" },
  floatingLetters: ["⚡", "★", "⬡", "◆", "✦", "⬢", "✧", "◇"],
};

export const aboutData = {
  title: "Sobre Mí",
  subtitle: "Un Sith del Código",
  description: "Como Forward Deployed AI Engineer, conecto necesidades de negocio con soluciones de inteligencia artificial. Combino más de 4 años de experiencia en desarrollo full stack con agentes, LLMs e integración de datos para llevar cada misión a producción.",
  metadata: {
    founded: "2018",
    teamSize: "Analista - Programador",
    location: "Santa Cruz de Tenerife",
  },
  mission: "Trabajar cerca del cliente para transformar retos reales en soluciones de IA útiles: entender el problema, construir prototipos, integrar datos y desplegar aplicaciones fiables con impacto medible. Que la Fuerza acompañe a cada misión, del primer prompt a producción.",
  skills: [
    { name: "LLMs & Prompt Engineering", percentage: 96 },
    { name: "Agentes de IA & Automatización", percentage: 95 },
    { name: "RAG & Integración de Datos", percentage: 93 },
    { name: "Desarrollo Full Stack & APIs", percentage: 95 },
    { name: "Despliegue, Evaluación & Observabilidad", percentage: 90 },
    { name: "Soluciones de Negocio & Colaboración con Clientes", percentage: 94 },
  ],
  timeline: [
    { year: "2018", title: "Inicio del Entrenamiento", description: "Primeros pasos como Padawan del desarrollo" },
    { year: "2020", title: "Caballero Jedi", description: "Dominando frameworks modernos y arquitecturas" },
    { year: "2022", title: "Maestro del Stack", description: "Liderando proyectos full stack complejos" },
    { year: "Presente", title: "Guardián del Código", description: "Construyendo el futuro de la web" },
  ],
  stats: [
    { value: "10K+", label: "Noches sin dormir" },
    { value: "50K+", label: "Líneas de Código" },
    { value: "4+", label: "Años de Experiencia" },
    { value: "∞", label: "Tazas de Café" },
  ],
};

export const aboutCodeCard = {
  name: "Javier Paredes Vela",
  role: "Forward Deployed AI Engineer",
  founded: 1988,
  headquarters: "Santa Cruz de Tenerife",
  specialties: ["AI Agents", "LLMs", "RAG"],
  industries: ["Full Stack", "Applied AI"],
};

export const experienceData = {
  title: "Experiencia Laboral",
  subtitle: "Mi Viaje por la Galaxia del Código",
  experiences: [
    {
      year: "2025 - Presente",
      title: "Developer Full Stack",
      company: "Minsait - Indra",
      project: "NAOS - Junta de Andalucía",
      description: "Desarrollando soluciones completas de frontend y backend. Creando APIs RESTful e interfaces de usuario responsivas.",
      technologies: ["React", "Next.js", "Javascript", "Java / Springboot"],
    },
    {
      year: "2023 - 2025",
      title: "Developer Full Stack",
      company: "Bitbox",
      project: "O2",
      description: "Retomando mi viaje en el desarrollo web. Fortaleciendo las bases del frontend y backend, participando en el proyecto solucionando bugs, analizando nuevas funcionalidades y realizando nuevos desarrollos.",
      technologies:  ["React", "Javascript", "Java / Springboot"],
    }
  ],
};

export const servicesData = {
  title: "Tecnologías",
  subtitle: "Habilidades de un Maestro Sith",
  description: "Las herramientas que conectan desarrollo full stack e inteligencia artificial para llevar cada misión a producción.",
  services: [
    {
      icon: "astromech",
      title: "Artificial Intelligence",
      description: "Como un droide astromecánico que resuelve cada misión, conecto modelos, datos y herramientas para crear asistentes inteligentes y automatizar procesos reales. Del prototipo al despliegue, con evaluación continua y foco en el negocio.",
      features: ["LLMs & Prompt Engineering", "Agentes de IA & Tool Calling", "RAG & Bases de Datos Vectoriales", "Automatización & APIs", "Evaluación & Observabilidad"],
    },
    {
      icon: "brain",
      title: "Frontend Development",
      description: "Interfaces de usuario que brillan como sables de Sith. React, Next.js, y Astro son mis armas principales.",
      features: ["React & Next.js", "Tailwind CSS", "Javascript"],
    },
    {
      icon: "message",
      title: "Backend Development",
      description: "APIs robustas como una nave Imperial. Java / Springboot y bases de datos son mi fuerte.",
      features: ["Java & Springboot", "REST & OpenAPI / Swagger", "Postgresql / Oracle"],
    },
    {
      icon: "eye",
      title: "UI/UX Design",
      description: "Diseños que capturan la esencia del lado oscuro. Experiencias de usuario intuitivas y elegantes.",
      features: ["Diseño Responsivo", "Animaciones", "Accesibilidad"],
    },
    {
      icon: "cloud",
      title: "Deployment",
      description: "Desplegando aplicaciones a través del hiperespacio.",
      features: ["Git & GitHub", "Docker"],
    },
  ],
};

export const projectsData = {
  title: "Misiones Completadas",
  subtitle: "Batallas Ganadas en el Código",
  description: "Proyectos que han navegado exitosamente a través del hiperespacio del desarrollo.",
  categories: ["Todas", "Frontend", "Full Stack"],
  projects: [
    {
      title: "Jparvel Studio",
      description: "Web personal donde se muestra de una manera más comercial todos mis trabajos y se ofrecen colaboraciones concretas a proyectos con un alcance definido.",
      category: "Frontend",
      image: jparvelStudioImg,
      technologies: ["Astro", "TypeScript"],
      demoUrl: "https://jparvelstudio.com",
    },
    {
      title: "Asetem Asesoria",
      description: "Web para una asesoría fiscal, laboral, contable y mercantil, ubicada en Santa Cruz de Tenerife.",
      category: "Frontend",
      image: asetemImg,
      technologies: ["Astro", "TypeScript"],
      demoUrl: "https://asetemasesoria.com/",
    },
    {
      title: "Web Fran Vela",
      description: "Portfolio personal del preparador físico Francisco Vela, referente en el fútbol español con una extensa trayectoria en clubes profesionales. La web recoge su carrera, metodología de trabajo, servicios de mentoría para entrenadores y profesionales del deporte, y un espacio donde compartir su conocimiento sobre el rendimiento físico en el fútbol de élite.",
      category: "Frontend",
      image: franVelaImg,
      technologies: ["Astro", "TypeScript"],
      demoUrl: "https://franvela.com",
    },
    {
      title: "Minsait - Indra - NAOS",
      description: "Plataforma tecnológica asociada a la Junta Andalucía, presta servicios a personal y ciudadanos.",
      category: "Full Stack",
      image: naosImg,
      technologies: ["React.js", "Javascript", "Java / Springboot"],
      demoUrl: "https://naossuite.juntadeandalucia.es/autogestion",
    },
    {
      title: "Bitbox - O2",
      description: "Software de facturación online u offline en puntos de entregas para la empresa Ikea.",
      category: "Full Stack",
      image: o2Img,
      technologies: ["React.js", "Javascript", "Java / Springboot"],
      demoUrl: "https://bitboxonline.com/products",
    },
  ],
};

export const footerData = {
  description: "Forward Deployed AI Engineer navegando por la galaxia de la inteligencia artificial. Que la Fuerza te acompañe en tu próximo proyecto.",
  links: [
    { name: "Inicio", href: "#home" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Habilidades", href: "#services" },
    { name: "Misiones", href: "#projects" },
  ],
  pages: [
    { name: "Contacto", href: "#contact" },
    { name: "Privacidad", href: "/privacy" },
    { name: "Términos", href: "/terms" },
  ],
  copyright: `© ${new Date().getFullYear()} JParvel. Recuerda que el lado oscuro está siempre contigo.`,
};
