import { initTabs, initThemeToggle } from '../features/tabs.js';
import { initSkills } from '../features/skills.js';
import { initEducation, addEducation } from '../features/education.js';
import { initLanguages, addLanguage } from '../features/languages.js';
import { initExperience, addExperience } from '../features/experience.js';
import { handlePhotoUpload, removePhoto } from '../features/photo.js';
import { togglePreview, showPreview, updatePreview } from '../features/preview.js';
import { generatePDF } from '../features/pdf.js';
import { showPreviewModal, showClearFormModal } from '../features/modals.js';
import { clearForm } from '../features/clearForm.js';
import { autoFillFromProfilePdf } from '../features/autofill.js';
import { loadSavedDraft } from '../features/draft.js';

let appInitialized = false;

function initDefaultData() {
  addEducation();
  addLanguage();
  addExperience();
}

function initStaticListeners() {
  document.querySelectorAll('input, textarea').forEach((input) => {
    if (input.type !== 'file') {
      input.addEventListener('input', updatePreview);
    }
  });

  document.getElementById('togglePreview')?.addEventListener('click', togglePreview);
  document.getElementById('togglePreviewCloseBtn')?.addEventListener('click', togglePreview);

  const photoInput = document.getElementById('profilePhoto');
  photoInput?.addEventListener('change', handlePhotoUpload);

  document.getElementById('removePhotoBtn')?.addEventListener('click', removePhoto);

  document.getElementById('previewBtn')?.addEventListener('click', showPreviewModal);

  document.getElementById('downloadBtn')?.addEventListener('click', generatePDF);

  document.getElementById('autoFillBtn')?.addEventListener('click', autoFillFromProfilePdf);

  document.getElementById('clearBtn')?.addEventListener('click', () => {
    showClearFormModal(clearForm);
  });
}

export function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  initThemeToggle();
  initTabs();
  const restored = loadSavedDraft();
  if (!restored) {
    initDefaultData();
  }
  initStaticListeners();
  initSkills();
  initEducation();
  initLanguages();
  initExperience();
  updatePreview({ persist: false });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, { once: true });
} else {
  initApp();
}
