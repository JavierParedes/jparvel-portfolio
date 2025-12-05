// Site configuration and content data
// All content is centralized here for easy updates
import portfolioImg from '../images/portfolio.png';
import naosImg from '../images/NAOS.png';
import o2Img from '../images/O2.png';

export const siteConfig = {
  name: "JPARVEL",
  logo: "DV",
  tagline: "La Fuerza Oscura del Desarrollo Web",
  description: "Desarrollador Full Stack explorando la galaxia del código con tecnologías modernas. Que la Fuerza te acompañe en tu próximo proyecto.",
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
  { name: "Habilidades", href: "#services" },
  { name: "Misiones", href: "#projects" },
  { name: "Contacto", href: "#contact" },
];

export const heroData = {
  titleHighlight: "Desarrollador",
  titleMain: "Full Stack",
  subtitle: "Navegando por la galaxia del código, construyendo aplicaciones web que trascienden el hiperespacio. Del lado oscuro del desarrollo vengo.",
  primaryCta: { text: "Ver Misiones", href: "#projects" },
  secondaryCta: { text: "Contacto", href: "#contact" },
  floatingLetters: ["⚡", "★", "⬡", "◆", "✦", "⬢", "✧", "◇"],
  skills: [
    { name: "Frontend Development", percentage: 90 },
    { name: "Backend Development", percentage: 70 },
  ],
};

export const aboutData = {
  title: "Sobre Mí",
  subtitle: "Un Sith del Código",
  description: "Como un Jedi que domina el lado oscuro, he entrenado en las artes del desarrollo web full stack. Mi camino comenzó en el Templo del Código, donde aprendí que con paciencia, práctica y el aprendizaje continuo, cualquier desafío puede ser superado.",
  metadata: {
    founded: "2026",
    teamSize: "Analista - Programador",
    location: "Santa Cruz de Tenerife",
  },
  mission: "Construir experiencias web extraordinarias que lleven a los usuarios más allá de la galaxia, combinando diseño elegante con código limpio y eficiente.",
  skills: [
    { name: "React", percentage: 80 },
    { name: "Java / SpringBoot", percentage: 70 },
    { name: "Next.js", percentage: 70 },
    { name: "Astro & Tailwind", percentage: 70 },
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
    { value: "3+", label: "Años de Experiencia" },
    { value: "∞", label: "Tazas de Café" },
  ],
};

export const aboutCodeCard = {
  name: "Javier Paredes Vela",
  role: "Full Stack Developer",
  founded: 1988,
  headquarters: "Santa Cruz de Tenerife",
  specialties: ["Frontend", "Backend", "UI/UX"],
  industries: ["Web Developer", "SEO"],
};

export const experienceData = {
  title: "Experiencia Laboral",
  subtitle: "Mi Viaje por la Galaxia del Código",
  experiences: [
    {
      year: "2025 - Presente",
      title: "Middle Full Stack Developer",
      company: "Minsait - Indra",
      project: "NAOS - Junta de Andalucía",
      description: "Desarrollando soluciones completas de frontend y backend. Creando APIs RESTful y interfaces de usuario responsivas.",
      technologies: ["React", "Next.js", "Javascript", "Java / Springboot"],
    },
    {
      year: "2023 - 2025",
      title: "Junior Full Stack Developer",
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
  description: "Las herramientas que domino en mi viaje por la galaxia del desarrollo web.",
  services: [
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
      title: "Portfolio JPARVEL",
      description: "Portfolio personal creado para compartir mis habilidades y experiencia profesional.",
      category: "Frontend",
      image: portfolioImg,
      technologies: ["Astro", "TypeScript"],
      demoUrl: "#",
    },
    {
      title: "Minsait - Indra - NAOS",
      description: "Plataforma tecnológica asociada a la Junta Andalucía, presta servicios a personal y ciudadanos.",
      category: "Full Stack",
      image: naosImg,
      technologies: ["React.js", "Javascript", "Java / Springboot"],
      demoUrl: "http://naossuite.juntadeandalucia.es/autogestion",
    },
    {
      title: "Bitbox - O2",
      description: "Software de facturación online u offline en puntos de entregas para la empresa Ikea.",
      category: "Full Stack",
      image: o2Img,
      technologies: ["React.js", "Javascript", "Java / Springboot"],
      demoUrl: "https://bitboxonline.com/products",
    }
  ],
};

export const footerData = {
  description: "Desarrollador Full Stack navegando por la galaxia del código. Que la Fuerza te acompañe en tu próximo proyecto.",
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
