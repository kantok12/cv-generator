import { state } from '../state/store.js';
import { addSkill } from './skills.js';
import { addEducation } from './education.js';
import { addLanguage } from './languages.js';
import { addExperience, addExpArrayItem } from './experience.js';
import { updatePreview } from './preview.js';

const profileTemplate = {
  personal: {
    fullName: 'Claudio Muñoz Herrera',
    title: 'Fullstack Developer & ML Engineer',
    location: 'Valparaíso, Región de Valparaíso, Chile',
    phone: '949522854',
    email: 'cla.munozh@gmail.com',
    linkedin: 'https://www.linkedin.com/in/claudio-munoz-herrera-a002961a0',
    github: ''
  },
  profile:
    'Profesional multidisciplinario, autodidacta y orientado al aprendizaje continuo, con experiencia en desarrollo full stack, automatización, chatbots, bases de datos, DevOps, soporte técnico y redes. Me enfoco en construir soluciones funcionales, escalables y con impacto real en organizaciones.',
  technicalSkills: [
    'React',
    'Node.js',
    'TypeScript',
    'Python',
    'Express',
    'PostgreSQL',
    'Docker',
    'GCP',
    'Firebase',
    'Tailwind CSS',
    'Zustand',
    'React Query',
    'Zod',
    'React Hook Form',
    'Jest',
    'Supertest',
    'Git',
    'GitHub',
    'JWT',
    'Google Drive API',
    'Recharts',
    'Postman'
  ],
  softSkills: [
    'Autodidacta',
    'Resolución de problemas',
    'Adaptabilidad',
    'Pensamiento analítico',
    'Trabajo multidisciplinario',
    'Atención al detalle',
    'Comunicación efectiva',
    'Aprendizaje continuo'
  ],
  education: [
    {
      degree: 'Ingeniería en conectividad y redes',
      institution: 'Duoc UC',
      location: 'Informática, comunicaciones y servicios de asistencia',
      period: '2017 - 2022'
    }
  ],
  languages: [
    {
      language: 'Español',
      level: 'Nativo'
    }
  ],
  experience: [
    {
      role: 'Ingeniero de Unidad de Apoyo',
      company: 'Bel-Ray Chile Ltda.',
      period: 'agosto de 2025 - Presente',
      description:
        'Brindo soporte técnico y analítico en la gestión de bases de datos, dashboards y reportes estratégicos para fortalecer la toma de decisiones.',
      keyAchievements: [
        'Diseñé y desarrollé desde cero el sistema completo de gestión de personal e industrial.',
        'Integré backend y frontend en una solución funcional y escalable.'
      ],
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'React', 'TypeScript'],
      tools: ['Docker', 'GCP', 'Firebase']
    },
    {
      role: 'Desarrollador de software',
      company: 'Black Nexus SPA',
      period: 'diciembre de 2024 - junio de 2025',
      description:
        'Desarrollo de aplicaciones con interfaces gráficas y arquitectura modular para gestión documental y visualización de datos.',
      keyAchievements: [
        'Construí una SPA en React 18 + TypeScript con más de 15 páginas.',
        'Implementé backend con Node.js, PostgreSQL, GCP y Docker.',
        'Apliqué validación con React Hook Form, Zod y pruebas con Jest.'
      ],
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GCP'],
      tools: ['Docker', 'Jest', 'React Query', 'Zustand']
    },
    {
      role: 'Desarrollador full stack',
      company: 'EcoAlliance SpA',
      period: 'marzo de 2025 - mayo de 2025',
      description:
        'Desarrollo de chatbot inteligente y automatización de procesos con integración multicanal.',
      keyAchievements: [
        'Implementé integración con WhatsApp, Telegram y web.',
        'Diseñé flujos de procesamiento de lenguaje natural y APIs para automatización.'
      ],
      techStack: ['Python', 'Node.js', 'OpenAI', 'Dialogflow'],
      tools: ['Twilio', 'Firebase', 'MongoDB', 'PostgreSQL']
    },
    {
      role: 'Soporte Técnico Especializado - Experiencia en Apple y Gestión de Sistemas',
      company: 'MacOnline Chile',
      period: 'septiembre de 2023 - octubre de 2024',
      description:
        'Soporte técnico, reparación y gestión de plataformas para dispositivos Apple y control de inventario.',
      keyAchievements: [
        'Gestioné reparaciones y seguimiento en Fixably y GSX.',
        'Aseguré la confidencialidad y protección de datos de clientes y dispositivos.'
      ],
      techStack: ['Apple Support', 'GSX', 'Fixably'],
      tools: ['Inventario', 'Mesa de ayuda', 'Atención al cliente']
    },
    {
      role: 'Soporte Técnico y Gestión de Plataformas',
      company: 'inmasoft',
      period: 'marzo de 2021 - mayo de 2023',
      description:
        'Soporte a usuario final, mantenimiento y gestión de plataformas educativas y empresariales.',
      keyAchievements: [
        'Trabajé con Google Workspace y control de clases virtuales.',
        'Aseguré la operatividad y confidencialidad de la información.'
      ],
      techStack: ['Google Workspace', 'Soporte técnico', 'Gestión de plataformas'],
      tools: ['Atención a usuarios', 'Control de incidencias']
    },
    {
      role: 'Encargado de Oficina - Valparaíso',
      company: 'Corporación SLEP',
      period: 'junio de 2022 - abril de 2023',
      description:
        'Gestión de oficina, inventario, reparaciones y protección de activos críticos en plataforma Odoo.',
      keyAchievements: [
        'Implementé medidas de seguridad para datos y activos.',
        'Gestioné abastecimiento, mantenimiento y reparación de impresoras Epson.'
      ],
      techStack: ['Odoo', 'Gestión documental', 'Inventario'],
      tools: ['Control de activos', 'Soporte administrativo']
    },
    {
      role: 'Técnico Instalador - Experiencia en Ciberseguridad y Telecomunicaciones',
      company: '',
      period: 'septiembre de 2021 - marzo de 2023',
      description:
        'Instalación de cableado estructurado, redes, CCTV, DVR, access points y monitoreo de infraestructuras críticas.',
      keyAchievements: [
        'Apliqué principios de ciberseguridad en routers, switches y segmentación de redes.',
        'Aseguré continuidad operativa y protección de la infraestructura.'
      ],
      techStack: ['Cisco', 'Fortinet', 'Ubiquiti', 'CCTV'],
      tools: ['DVR', 'Access Points', 'Cableado estructurado']
    },
    {
      role: 'Estudiante en prácticas',
      company: 'Armada de Chile',
      period: 'diciembre de 2019 - febrero de 2020',
      description:
        'Gestión de cuentas, Active Directory, Fortinet, Cisco y monitoreo de sistemas en un entorno crítico.',
      keyAchievements: [
        'Administré accesos y permisos de usuarios.',
        'Fortalecí la seguridad y confidencialidad de los datos.'
      ],
      techStack: ['Active Directory', 'Fortinet', 'Cisco'],
      tools: ['Monitoreo', 'Gestión de usuarios']
    }
  ]
};

function clearTextFields() {
  document.querySelectorAll('input, textarea').forEach((input) => {
    if (input.type === 'file') return;
    input.value = '';
  });
}

function resetState() {
  state.technicalSkills = [];
  state.softSkills = [];
  state.education = [];
  state.languages = [];
  state.experience = [];
}

function resetDynamicContainers() {
  document.getElementById('techSkills')?.replaceChildren();
  document.getElementById('softSkills')?.replaceChildren();
  document.getElementById('educationContainer')?.replaceChildren();
  document.getElementById('languagesContainer')?.replaceChildren();
  document.getElementById('experienceContainer')?.replaceChildren();
}

function setField(name, value) {
  const field = document.querySelector(`[name="${name}"]`);
  if (!field) return;
  field.value = value;
}

function addSkills(values, type) {
  const inputId = type === 'tech' ? 'techSkillInput' : 'softSkillInput';
  const input = document.getElementById(inputId);
  if (!input) return;

  values.forEach((value) => {
    input.value = value;
    addSkill(type);
  });
}

function populateEducation(items) {
  items.forEach((item, index) => {
    addEducation();
    const fields = document.querySelectorAll(`#educationContainer [data-index="${index}"] input`);
    if (fields[0]) fields[0].value = item.degree;
    if (fields[1]) fields[1].value = item.institution;
    if (fields[2]) fields[2].value = item.location;
    if (fields[3]) fields[3].value = item.period;

    state.education[index] = { ...item };
  });
}

function populateLanguages(items) {
  items.forEach((item, index) => {
    addLanguage();
    const fields = document.querySelectorAll(`#languagesContainer [data-index="${index}"] input`);
    if (fields[0]) fields[0].value = item.language;
    if (fields[1]) fields[1].value = item.level;

    state.languages[index] = { ...item };
  });
}

function populateExperience(items) {
  items.forEach((item, index) => {
    addExperience();

    const row = document.querySelector(`#experienceContainer [data-index="${index}"]`);
    if (!row) return;

    const inputs = row.querySelectorAll('input, textarea');
    if (inputs[0]) inputs[0].value = item.role;
    if (inputs[1]) inputs[1].value = item.company;
    if (inputs[2]) inputs[2].value = item.period;
    if (inputs[3]) inputs[3].value = item.description;

    state.experience[index] = {
      role: item.role,
      company: item.company,
      period: item.period,
      description: item.description,
      keyAchievements: [],
      techStack: [],
      tools: []
    };

    item.keyAchievements.forEach((achievement) => {
      const achievementInput = document.getElementById(`exp-achievement-${index}`);
      if (achievementInput) achievementInput.value = achievement;
      addExpArrayItem(index, 'keyAchievements', `exp-achievement-${index}`);
    });

    item.techStack.forEach((tech) => {
      const techInput = document.getElementById(`exp-tech-${index}`);
      if (techInput) techInput.value = tech;
      addExpArrayItem(index, 'techStack', `exp-tech-${index}`);
    });

    item.tools.forEach((tool) => {
      const toolInput = document.getElementById(`exp-tools-${index}`);
      if (toolInput) toolInput.value = tool;
      addExpArrayItem(index, 'tools', `exp-tools-${index}`);
    });
  });
}

export function autoFillFromProfilePdf() {
  clearTextFields();
  resetState();
  resetDynamicContainers();

  setField('fullName', profileTemplate.personal.fullName);
  setField('title', profileTemplate.personal.title);
  setField('location', profileTemplate.personal.location);
  setField('phone', profileTemplate.personal.phone);
  setField('email', profileTemplate.personal.email);
  setField('linkedin', profileTemplate.personal.linkedin);
  setField('github', profileTemplate.personal.github);
  setField('profile', profileTemplate.profile);

  addSkills(profileTemplate.technicalSkills, 'tech');
  addSkills(profileTemplate.softSkills, 'soft');
  populateEducation(profileTemplate.education);
  populateLanguages(profileTemplate.languages);
  populateExperience(profileTemplate.experience);

  updatePreview();
}
