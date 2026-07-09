import { state } from '../state/store.js';
import { saveDraft } from './draft.js';

export function togglePreview() {
  const formSection = document.getElementById('formSection');
  const previewSection = document.getElementById('previewSection');

  if (!formSection || !previewSection) return;

  const isHidden = previewSection.classList.contains('d-none');

  if (isHidden) {
    if (window.innerWidth < 992) {
      formSection.classList.add('d-none');
    }
    previewSection.classList.remove('d-none');
    const btn = document.getElementById('togglePreview');
    if (btn) btn.textContent = 'Ocultar CV';
  } else {
    formSection.classList.remove('d-none');
    previewSection.classList.add('d-none');
    const btn = document.getElementById('togglePreview');
    if (btn) btn.textContent = 'Ver / Ocultar CV';
  }
}

export function showPreview() {
  const previewSection = document.getElementById('previewSection');
  const formSection = document.getElementById('formSection');

  if (!previewSection || !formSection) return;

  previewSection.classList.remove('d-none');
  if (window.innerWidth < 992) {
    formSection.classList.add('d-none');
    const btn = document.getElementById('togglePreview');
    if (btn) btn.textContent = 'Ocultar CV';
  }
  updatePreview({ persist: false });
}

function fieldValue(formData, name, fallback = '') {
  const value = formData.get(name);
  return value ? String(value) : fallback;
}

export function updatePreview(options = {}) {
  const { persist = true } = options;
  const form = document.getElementById('cvForm');
  if (!form) return;

  const formData = new FormData(form);
  const personalInfo = {
    fullName: fieldValue(formData, 'fullName', 'Tu Nombre'),
    title: fieldValue(formData, 'title', 'Tu Título Profesional'),
    location: fieldValue(formData, 'location'),
    phone: fieldValue(formData, 'phone'),
    email: fieldValue(formData, 'email'),
    linkedin: fieldValue(formData, 'linkedin'),
    github: fieldValue(formData, 'github')
  };

  const profile = fieldValue(formData, 'profile');
  const preview = document.getElementById('cvPreview');
  if (!preview) return;

  const contactItems = [];
  if (personalInfo.location) contactItems.push(`<span class="d-inline-flex align-items-center gap-1"><span>📍</span>${personalInfo.location}</span>`);
  if (personalInfo.phone) contactItems.push(`<span class="d-inline-flex align-items-center gap-1"><span>☎</span>${personalInfo.phone}</span>`);
  if (personalInfo.email) contactItems.push(`<span class="d-inline-flex align-items-center gap-1"><span>✉</span>${personalInfo.email}</span>`);
  if (personalInfo.linkedin) contactItems.push(`<a href="${personalInfo.linkedin}" target="_blank" class="text-decoration-none">LinkedIn</a>`);
  if (personalInfo.github) contactItems.push(`<a href="${personalInfo.github}" target="_blank" class="text-decoration-none">GitHub</a>`);

  const contactLine = contactItems.length
    ? `<div class="d-flex flex-wrap justify-content-center gap-3 small text-secondary mt-3">${contactItems.join('')}</div>`
    : '';

  const photoBlock = state.profilePhoto
    ? `<div class="flex-shrink-0"><img src="${state.profilePhoto}" class="rounded-4 border border-2 border-light shadow-sm" style="width: 140px; height: 180px; object-fit: cover;" alt="Foto de perfil"></div>`
    : '';

  const headerHTML = state.profilePhoto
    ? `
      <header class="d-flex align-items-start gap-4 border-bottom pb-4 mb-4">
        ${photoBlock}
        <div class="flex-grow-1">
          <h1 class="display-6 fw-bold mb-2">${personalInfo.fullName}</h1>
          <p class="fs-5 text-secondary mb-0">${personalInfo.title}</p>
          ${contactLine}
        </div>
      </header>
    `
    : `
      <header class="text-center border-bottom pb-4 mb-4">
        <h1 class="display-6 fw-bold mb-2">${personalInfo.fullName}</h1>
        <p class="fs-5 text-secondary mb-0">${personalInfo.title}</p>
        ${contactLine}
      </header>
    `;

  const hasSkills = state.technicalSkills.length > 0 || state.softSkills.length > 0;
  const hasExperience = state.experience.some((exp) => exp.role || exp.company);
  const hasEducation = state.education.some((edu) => edu.degree || edu.institution);
  const hasLanguages = state.languages.some((lang) => lang.language);

  preview.innerHTML = `
    <div class="cv-preview-document">
      ${headerHTML}

      ${profile ? `
      <section class="mb-4">
        <h2 class="h6 text-uppercase fw-bold border-bottom pb-2 mb-3">Perfil Profesional</h2>
        <p class="mb-0 text-secondary lh-base">${profile}</p>
      </section>
      ` : ''}

      ${hasSkills ? `
      <section class="mb-4">
        <h2 class="h6 text-uppercase fw-bold border-bottom pb-2 mb-3">Competencias</h2>
        <div class="row g-4">
          ${state.technicalSkills.length > 0 ? `
          <div class="col-md-6">
            <h3 class="small text-uppercase fw-semibold text-secondary mb-2">Técnicas</h3>
            <div class="d-flex flex-wrap gap-2">
              ${state.technicalSkills.map(skill => `<span class="badge rounded-pill text-bg-light border">${skill}</span>`).join('')}
            </div>
          </div>
          ` : ''}
          ${state.softSkills.length > 0 ? `
          <div class="col-md-6">
            <h3 class="small text-uppercase fw-semibold text-secondary mb-2">Blandas</h3>
            <div class="d-flex flex-wrap gap-2">
              ${state.softSkills.map(skill => `<span class="badge rounded-pill text-bg-light border">${skill}</span>`).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      </section>
      ` : ''}

      ${hasExperience ? `
      <section class="mb-4">
        <h2 class="h6 text-uppercase fw-bold border-bottom pb-2 mb-3">Experiencia Profesional</h2>
        <div class="vstack gap-4">
          ${state.experience.filter((exp) => exp.role || exp.company).map((exp) => `
            <article>
              <div class="d-flex justify-content-between align-items-start gap-3 mb-1">
                <div>
                  <h3 class="h6 fw-semibold mb-1">${exp.role}</h3>
                  <p class="mb-0 text-secondary">${exp.company}</p>
                </div>
                <span class="small text-secondary fst-italic">${exp.period}</span>
              </div>
              ${exp.description ? `<p class="mb-2 text-secondary">${exp.description}</p>` : ''}
              ${exp.keyAchievements.length > 0 ? `
              <div class="mb-2">
                <h4 class="small fw-semibold text-secondary text-uppercase mb-2">Logros Clave</h4>
                <ul class="ps-3 mb-0 text-secondary">
                  ${exp.keyAchievements.map((achievement) => `<li>${achievement}</li>`).join('')}
                </ul>
              </div>
              ` : ''}
              <div class="d-flex flex-wrap gap-3 small text-secondary">
                ${exp.techStack.length > 0 ? `<span><strong>Tecnologías:</strong> ${exp.techStack.join(', ')}</span>` : ''}
                ${exp.tools.length > 0 ? `<span><strong>Herramientas:</strong> ${exp.tools.join(', ')}</span>` : ''}
              </div>
            </article>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${hasEducation ? `
      <section class="mb-4">
        <h2 class="h6 text-uppercase fw-bold border-bottom pb-2 mb-3">Educación</h2>
        <div class="vstack gap-3">
          ${state.education.filter((edu) => edu.degree || edu.institution).map((edu) => `
            <article class="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h3 class="h6 fw-semibold mb-1">${edu.degree}</h3>
                <p class="mb-0 text-secondary">${edu.institution}</p>
                <p class="mb-0 small text-secondary">${edu.location}</p>
              </div>
              <span class="small text-secondary fst-italic">${edu.period}</span>
            </article>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${hasLanguages ? `
      <section class="mb-4">
        <h2 class="h6 text-uppercase fw-bold border-bottom pb-2 mb-3">Idiomas</h2>
        <div class="d-flex flex-wrap gap-3">
          ${state.languages.filter((lang) => lang.language).map((lang) => `
            <div>
              <span class="fw-semibold">${lang.language}</span>
              <span class="text-secondary"> — ${lang.level}</span>
            </div>
          `).join('')}
        </div>
      </section>
      ` : ''}
    </div>
  `;

  if (persist) {
    saveDraft();
  }
}
