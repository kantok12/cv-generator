import { state } from '../state/store.js';
import { addEducation } from './education.js';
import { addLanguage } from './languages.js';
import { addExperience } from './experience.js';
import { updatePreview } from './preview.js';
import { clearSavedDraft } from './draft.js';

export function clearForm() {
  // Limpiar todos los inputs y textareas
  document.querySelectorAll('input, textarea').forEach(input => {
    if (input.type === 'file') {
      input.value = '';
    } else {
      input.value = '';
    }
  });

  // Limpiar estado global
  state.profilePhoto = null;
  state.technicalSkills = [];
  state.softSkills = [];
  state.education = [];
  state.languages = [];
  state.experience = [];

  // Limpiar vista previa de foto
  const photoPreview = document.getElementById('photoPreview');
  const photoPlaceholder = document.getElementById('photoPlaceholder');
  const removePhotoBtn = document.getElementById('removePhotoBtn');
  
  if (photoPreview) {
    photoPreview.classList.add('d-none');
    photoPreview.src = '';
  }
  
  if (photoPlaceholder) {
    photoPlaceholder.classList.remove('d-none');
  }
  
  if (removePhotoBtn) {
    removePhotoBtn.classList.add('d-none');
  }

  // Limpiar contenedores dinámicos
  const techSkillsContainer = document.getElementById('techSkills');
  const softSkillsContainer = document.getElementById('softSkills');
  const educationContainer = document.getElementById('educationContainer');
  const languagesContainer = document.getElementById('languagesContainer');
  const experienceContainer = document.getElementById('experienceContainer');

  if (techSkillsContainer) techSkillsContainer.innerHTML = '';
  if (softSkillsContainer) softSkillsContainer.innerHTML = '';
  if (educationContainer) educationContainer.innerHTML = '';
  if (languagesContainer) languagesContainer.innerHTML = '';
  if (experienceContainer) experienceContainer.innerHTML = '';

  // Reinicializar datos por defecto
  addEducation();
  addLanguage();
  addExperience();

  // Actualizar vista previa
  clearSavedDraft();
  updatePreview({ persist: false });
}
