import { state } from '../state/store.js';
import { saveDraft } from './draft.js';

export function togglePreview() {
  const formSection = document.getElementById('formSection');
  const previewSection = document.getElementById('previewSection');

  if (!formSection || !previewSection) return;

  if (previewSection.classList.contains('hidden')) {
    // Show preview - hide form on mobile/tablet, show both on desktop
    if (window.innerWidth < 1280) { // xl breakpoint
      formSection.classList.add('hidden');
    }
    previewSection.classList.remove('hidden');
    const btn = document.getElementById('togglePreview');
    if (btn) btn.textContent = 'Ocultar';
  } else {
    // Hide preview - show form
    formSection.classList.remove('hidden');
    previewSection.classList.add('hidden');
    const btn = document.getElementById('togglePreview');
    if (btn) btn.textContent = 'Vista Previa';
  }
}

export function showPreview() {
  const previewSection = document.getElementById('previewSection');
  const formSection = document.getElementById('formSection');

  if (!previewSection || !formSection) return;

  previewSection.classList.remove('hidden');
  if (window.innerWidth < 1024) {
    formSection.classList.add('hidden');
    const btn = document.getElementById('togglePreview');
    if (btn) btn.textContent = 'Ocultar';
  }
  updatePreview();
}

export function updatePreview(options = {}) {
  const { persist = true } = options;
  const form = document.getElementById('cvForm');
  if (!form) return;

  const formData = new FormData(form);

  const personalInfo = {
    fullName: formData.get('fullName') || 'Tu Nombre',
    title: formData.get('title') || 'Tu Título Profesional',
    location: formData.get('location') || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    linkedin: formData.get('linkedin') || '',
    github: formData.get('github') || ''
  };

  const profile = formData.get('profile') || '';
  const preview = document.getElementById('cvPreview');
  if (!preview) return;

  const contactItems = [];
  if (personalInfo.location) {
    contactItems.push(`<span class="flex items-center gap-1"><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>${personalInfo.location}</span>`);
  }
  if (personalInfo.phone) {
    contactItems.push(`<span class="flex items-center gap-1"><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>${personalInfo.phone}</span>`);
  }
  if (personalInfo.email) {
    contactItems.push(`<span class="flex items-center gap-1"><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>${personalInfo.email}</span>`);
  }
  if (personalInfo.linkedin) {
    contactItems.push(`<a href="${personalInfo.linkedin}" target="_blank" class="flex items-center gap-1 text-blue-600 hover:underline"><svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</a>`);
  }
  if (personalInfo.github) {
    contactItems.push(`<a href="${personalInfo.github}" target="_blank" class="flex items-center gap-1 text-blue-600 hover:underline"><svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>GitHub</a>`);
  }

  const contactLine = contactItems.length > 0 ? `<div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-stone-500 mt-2">${contactItems.join('')}</div>` : '';

  let headerHTML = '';
  if (state.profilePhoto) {
    headerHTML = `
      <header class="flex items-start gap-6 border-b-2 border-stone-300 pb-6 mb-6">
        <div class="flex-shrink-0">
          <img src="${state.profilePhoto}" class="w-28 h-36 object-cover rounded-lg border-2 border-stone-200">
        </div>
        <div class="flex-1 text-left">
          <h1 class="text-3xl font-serif font-bold text-stone-800 tracking-wide">${personalInfo.fullName}</h1>
          <p class="text-lg text-stone-600 font-medium mt-1">${personalInfo.title}</p>
          ${contactLine}
        </div>
      </header>
    `;
  } else {
    headerHTML = `
      <header class="text-center border-b-2 border-stone-300 pb-6 mb-6">
        <h1 class="text-3xl font-serif font-bold text-stone-800 tracking-wide">${personalInfo.fullName}</h1>
        <p class="text-lg text-stone-600 font-medium mt-1">${personalInfo.title}</p>
        ${contactLine}
      </header>
    `;
  }

  preview.innerHTML = `
    ${headerHTML}

    ${profile ? `
    <section class="mb-6">
      <h2 class="text-sm font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-1 mb-3">Perfil Profesional</h2>
      <p class="text-sm text-stone-600 leading-relaxed text-justify">${profile}</p>
    </section>
    ` : ''}

    ${(state.technicalSkills.length > 0 || state.softSkills.length > 0) ? `
    <section class="mb-6">
      <h2 class="text-sm font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-1 mb-3">Competencias</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${state.technicalSkills.length > 0 ? `
        <div>
          <h3 class="text-xs font-semibold text-stone-500 uppercase mb-2 flex items-center gap-1">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            Técnicas
          </h3>
          <p class="text-sm text-stone-600">${state.technicalSkills.join(' • ')}</p>
        </div>
        ` : ''}
        ${state.softSkills.length > 0 ? `
        <div>
          <h3 class="text-xs font-semibold text-stone-500 uppercase mb-2 flex items-center gap-1">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Blandas
          </h3>
          <p class="text-sm text-stone-600">${state.softSkills.join(' • ')}</p>
        </div>
        ` : ''}
      </div>
    </section>
    ` : ''}

    ${state.experience.some(exp => exp.role || exp.company) ? `
    <section class="mb-6">
      <h2 class="text-sm font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-1 mb-3 flex items-center gap-2">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        Experiencia Profesional
      </h2>
      <div class="space-y-4">
        ${state.experience.filter(exp => exp.role || exp.company).map(exp => `
        <div>
          <div class="flex justify-between items-start mb-1">
            <div>
              <h3 class="text-sm font-semibold text-stone-800">${exp.role}</h3>
              <p class="text-sm text-stone-600">${exp.company}</p>
            </div>
            <span class="text-xs text-stone-500 italic">${exp.period}</span>
          </div>
          ${exp.description ? `<p class="text-sm text-stone-600 leading-relaxed mb-2">${exp.description}</p>` : ''}
          ${exp.keyAchievements.length > 0 ? `
          <div class="mb-2">
            <h4 class="text-xs font-semibold text-stone-500 mb-1 flex items-center gap-1">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              Logros Clave:
            </h4>
            <ul class="list-disc list-inside text-sm text-stone-600 ml-1">
              ${exp.keyAchievements.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
            ${exp.techStack.length > 0 ? `<span class="flex items-center gap-1"><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>${exp.techStack.join(', ')}</span>` : ''}
            ${exp.tools.length > 0 ? `<span class="flex items-center gap-1"><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>${exp.tools.join(', ')}</span>` : ''}
          </div>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${state.education.some(edu => edu.degree || edu.institution) ? `
    <section class="mb-6">
      <h2 class="text-sm font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-1 mb-3 flex items-center gap-2">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
        Educación
      </h2>
      <div class="space-y-3">
        ${state.education.filter(edu => edu.degree || edu.institution).map(edu => `
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-sm font-semibold text-stone-800">${edu.degree}</h3>
            <p class="text-sm text-stone-600">${edu.institution}</p>
            <p class="text-xs text-stone-500">${edu.location}</p>
          </div>
          <span class="text-xs text-stone-500 italic">${edu.period}</span>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${state.languages.some(lang => lang.language) ? `
    <section class="mb-6">
      <h2 class="text-sm font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-1 mb-3 flex items-center gap-2">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
        Idiomas
      </h2>
      <div class="flex flex-wrap gap-4">
        ${state.languages.filter(lang => lang.language).map(lang => `
        <div class="text-sm">
          <span class="font-medium text-stone-700">${lang.language}</span>
          <span class="text-stone-500"> — ${lang.level}</span>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  `;

  if (persist) {
    saveDraft();
  }
}
