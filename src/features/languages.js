import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function addLanguage() {
  const index = state.languages.length;
  state.languages.push({ language: '', level: '' });

  const container = document.getElementById('languagesContainer');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'card border-secondary-subtle';
  div.dataset.index = String(index);
  div.innerHTML = `
    <div class="card-header bg-body-tertiary d-flex justify-content-between align-items-center">
      <span class="small fw-semibold text-primary">Idioma #${index + 1}</span>
      ${index > 0 ? `<button type="button" data-action="remove-language" data-index="${index}" class="btn btn-sm btn-outline-danger">Eliminar</button>` : ''}
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label fw-semibold">Idioma *</label>
          <input type="text" name="lang-name-${index}" placeholder="Ej: Español, Inglés..." class="form-control" data-action="lang-input" data-index="${index}" data-field="language">
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Nivel *</label>
          <input type="text" name="lang-level-${index}" placeholder="Ej: Nativo, B2, C1..." class="form-control" data-action="lang-input" data-index="${index}" data-field="level">
        </div>
      </div>
    </div>
  `;
  container.appendChild(div);
}

export function removeLanguage(index) {
  state.languages.splice(index, 1);
  document.querySelector(`#languagesContainer [data-index="${index}"]`)?.remove();

  const container = document.getElementById('languagesContainer');
  if (!container) return;

  container.innerHTML = '';
  const oldLanguages = [...state.languages];
  state.languages = [];

  oldLanguages.forEach((lang) => {
    addLanguage();
    const newIndex = state.languages.length - 1;
    state.languages[newIndex] = { ...lang };

    const inputs = document.querySelectorAll(`#languagesContainer [data-index="${newIndex}"] input`);
    if (inputs[0]) inputs[0].value = lang.language;
    if (inputs[1]) inputs[1].value = lang.level;
  });

  updatePreview();
}

export function updateLanguage(index, field, value) {
  state.languages[index][field] = value;
  updatePreview();
}

export function initLanguages() {
  document.querySelectorAll('[data-action="add-language"]').forEach((btn) => {
    btn.addEventListener('click', addLanguage);
  });

  const languagesContainer = document.getElementById('languagesContainer');
  if (!languagesContainer) return;

  languagesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="remove-language"]');
    if (!btn) return;
    removeLanguage(Number(btn.dataset.index));
  });

  languagesContainer.addEventListener('input', (e) => {
    const input = e.target.closest('input[data-action="lang-input"]');
    if (!input) return;
    updateLanguage(Number(input.dataset.index), input.dataset.field, input.value);
  });
}
