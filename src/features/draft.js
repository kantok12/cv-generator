import { state } from '../state/store.js';
import { renderSkills } from './skills.js';
import { addEducation } from './education.js';
import { addLanguage } from './languages.js';
import { addExperience, renderExpArrayItems } from './experience.js';

const DRAFT_KEY = 'cv-generator-draft';

function getFormValues() {
  const form = document.getElementById('cvForm');
  if (!form) return {};

  const formData = new FormData(form);
  return {
    fullName: String(formData.get('fullName') || ''),
    title: String(formData.get('title') || ''),
    location: String(formData.get('location') || ''),
    phone: String(formData.get('phone') || ''),
    email: String(formData.get('email') || ''),
    linkedin: String(formData.get('linkedin') || ''),
    github: String(formData.get('github') || ''),
    profile: String(formData.get('profile') || '')
  };
}

function syncPhotoPreview() {
  const previewImg = document.getElementById('photoPreview');
  const placeholder = document.getElementById('photoPlaceholder');
  const removeBtn = document.getElementById('removePhotoBtn');

  if (state.profilePhoto) {
    if (previewImg) {
      previewImg.src = state.profilePhoto;
      previewImg.classList.remove('hidden');
    }
    placeholder?.classList.add('hidden');
    removeBtn?.classList.remove('hidden');
  } else {
    if (previewImg) {
      previewImg.src = '';
      previewImg.classList.add('hidden');
    }
    placeholder?.classList.remove('hidden');
    removeBtn?.classList.add('hidden');
  }
}

function clearDynamicDom() {
  document.getElementById('techSkills')?.replaceChildren();
  document.getElementById('softSkills')?.replaceChildren();
  document.getElementById('educationContainer')?.replaceChildren();
  document.getElementById('languagesContainer')?.replaceChildren();
  document.getElementById('experienceContainer')?.replaceChildren();
}

function resetState() {
  state.profilePhoto = null;
  state.technicalSkills = [];
  state.softSkills = [];
  state.education = [];
  state.languages = [];
  state.experience = [];
}

function setField(name, value) {
  const field = document.querySelector(`[name="${name}"]`);
  if (field) field.value = value;
}

export function saveDraft() {
  const payload = {
    form: getFormValues(),
    state: {
      profilePhoto: state.profilePhoto,
      technicalSkills: state.technicalSkills,
      softSkills: state.softSkills,
      education: state.education,
      languages: state.languages,
      experience: state.experience
    }
  };

  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('No se pudo guardar el borrador del CV:', error);
  }
}

export function clearSavedDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    console.warn('No se pudo limpiar el borrador del CV:', error);
  }
}

export function loadSavedDraft() {
  let raw = null;
  try {
    raw = localStorage.getItem(DRAFT_KEY);
  } catch (error) {
    console.warn('No se pudo leer el borrador del CV:', error);
    return false;
  }

  if (!raw) return false;

  let draft;
  try {
    draft = JSON.parse(raw);
  } catch (error) {
    console.warn('El borrador del CV está corrupto:', error);
    return false;
  }

  const form = draft?.form || {};
  const savedState = draft?.state || {};
  const savedTechnicalSkills = Array.isArray(savedState.technicalSkills) ? [...savedState.technicalSkills] : [];
  const savedSoftSkills = Array.isArray(savedState.softSkills) ? [...savedState.softSkills] : [];
  const savedEducation = Array.isArray(savedState.education) ? [...savedState.education] : [];
  const savedLanguages = Array.isArray(savedState.languages) ? [...savedState.languages] : [];
  const savedExperience = Array.isArray(savedState.experience) ? [...savedState.experience] : [];

  resetState();
  clearDynamicDom();

  setField('fullName', form.fullName || '');
  setField('title', form.title || '');
  setField('location', form.location || '');
  setField('phone', form.phone || '');
  setField('email', form.email || '');
  setField('linkedin', form.linkedin || '');
  setField('github', form.github || '');
  setField('profile', form.profile || '');

  state.profilePhoto = savedState.profilePhoto || null;
  syncPhotoPreview();

  state.technicalSkills = [...savedTechnicalSkills];
  state.softSkills = [...savedSoftSkills];

  savedTechnicalSkills.forEach((skill) => {
    const input = document.getElementById('techSkillInput');
    if (input) input.value = skill;
  });
  renderSkills('tech');

  savedSoftSkills.forEach((skill) => {
    const input = document.getElementById('softSkillInput');
    if (input) input.value = skill;
  });
  renderSkills('soft');

  savedEducation.forEach((edu) => {
    addEducation();
    const index = state.education.length - 1;
    const fields = document.querySelectorAll(`#educationContainer [data-index="${index}"] input`);
    if (fields[0]) fields[0].value = edu.degree || '';
    if (fields[1]) fields[1].value = edu.institution || '';
    if (fields[2]) fields[2].value = edu.location || '';
    if (fields[3]) fields[3].value = edu.period || '';
    state.education[index] = { ...edu };
  });

  savedLanguages.forEach((lang) => {
    addLanguage();
    const index = state.languages.length - 1;
    const fields = document.querySelectorAll(`#languagesContainer [data-index="${index}"] input`);
    if (fields[0]) fields[0].value = lang.language || '';
    if (fields[1]) fields[1].value = lang.level || '';
    state.languages[index] = { ...lang };
  });

  savedExperience.forEach((exp) => {
    addExperience();
    const index = state.experience.length - 1;
    const row = document.querySelector(`#experienceContainer [data-index="${index}"]`);
    if (!row) return;

    const inputs = row.querySelectorAll('input, textarea');
    if (inputs[0]) inputs[0].value = exp.role || '';
    if (inputs[1]) inputs[1].value = exp.company || '';
    if (inputs[2]) inputs[2].value = exp.period || '';
    if (inputs[3]) inputs[3].value = exp.description || '';

    state.experience[index] = {
      role: exp.role || '',
      company: exp.company || '',
      period: exp.period || '',
      description: exp.description || '',
      keyAchievements: Array.isArray(exp.keyAchievements) ? [...exp.keyAchievements] : [],
      techStack: Array.isArray(exp.techStack) ? [...exp.techStack] : [],
      tools: Array.isArray(exp.tools) ? [...exp.tools] : []
    };

    renderExpArrayItems(index, 'keyAchievements', 'exp-achievements');
    renderExpArrayItems(index, 'techStack', 'exp-tech-list');
    renderExpArrayItems(index, 'tools', 'exp-tools-list');
  });

  return true;
}
