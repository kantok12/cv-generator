import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function renderSkills(type) {
  const containerId = type === 'tech' ? 'techSkills' : 'softSkills';
  const container = document.getElementById(containerId);
  if (!container) return;

  const skills = type === 'tech' ? state.technicalSkills : state.softSkills;
  const bgColor = type === 'tech' ? 'bg-slate-100 text-slate-700' : 'bg-rose-50 text-rose-700';

  container.innerHTML = skills
    .map(
      (skill, index) => `
    <span class="${bgColor} px-3 py-1.5 text-sm rounded-full flex items-center gap-1">
      ${skill}
      <button type="button" data-action="remove-skill" data-skill-type="${type}" data-skill-index="${index}" class="hover:text-rose-500">
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </span>
  `
    )
    .join('');
}

export function addSkill(type) {
  const inputId = type === 'tech' ? 'techSkillInput' : 'softSkillInput';
  const input = document.getElementById(inputId);
  if (!input) return;

  const value = input.value.trim();
  if (!value) return;

  if (type === 'tech') {
    state.technicalSkills.push(value);
  } else {
    state.softSkills.push(value);
  }

  input.value = '';
  input.focus();
  renderSkills(type);
  updatePreview();
}

export function removeSkill(type, index) {
  if (type === 'tech') {
    state.technicalSkills.splice(index, 1);
  } else {
    state.softSkills.splice(index, 1);
  }
  renderSkills(type);
  updatePreview();
}

export function handleSkillKeyDown(event, type) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSkill(type);
  }
}

export function initSkills() {
  const techSkillInput = document.getElementById('techSkillInput');
  if (techSkillInput) {
    techSkillInput.addEventListener('keydown', (event) => handleSkillKeyDown(event, 'tech'));
  }

  const softSkillInput = document.getElementById('softSkillInput');
  if (softSkillInput) {
    softSkillInput.addEventListener('keydown', (event) => handleSkillKeyDown(event, 'soft'));
  }

  document.querySelectorAll('[data-action="add-skill-tech"]').forEach((btn) => {
    btn.addEventListener('click', () => addSkill('tech'));
  });

  document.querySelectorAll('[data-action="add-skill-soft"]').forEach((btn) => {
    btn.addEventListener('click', () => addSkill('soft'));
  });

  const techSkillsContainer = document.getElementById('techSkills');
  if (techSkillsContainer) {
    techSkillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action="remove-skill"]');
      if (!btn) return;
      removeSkill(btn.dataset.skillType, Number(btn.dataset.skillIndex));
    });
  }

  const softSkillsContainer = document.getElementById('softSkills');
  if (softSkillsContainer) {
    softSkillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action="remove-skill"]');
      if (!btn) return;
      removeSkill(btn.dataset.skillType, Number(btn.dataset.skillIndex));
    });
  }
}
