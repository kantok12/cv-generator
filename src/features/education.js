import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function addEducation() {
  const index = state.education.length;
  state.education.push({ degree: '', institution: '', location: '', period: '' });

  const container = document.getElementById('educationContainer');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'card border-secondary-subtle';
  div.dataset.index = String(index);
  div.innerHTML = `
    <div class="card-header bg-body-tertiary d-flex justify-content-between align-items-center">
      <span class="small fw-semibold text-primary">Educación #${index + 1}</span>
      ${index > 0 ? `<button type="button" data-action="remove-education" data-index="${index}" class="btn btn-sm btn-outline-danger">Eliminar</button>` : ''}
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label fw-semibold">Título / Grado *</label>
          <input type="text" name="edu-degree-${index}" placeholder="Ej: Licenciatura en Informática" class="form-control" data-action="edu-input" data-index="${index}" data-field="degree">
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Institución *</label>
          <input type="text" name="edu-institution-${index}" placeholder="Ej: Universidad Complutense" class="form-control" data-action="edu-input" data-index="${index}" data-field="institution">
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Ubicación *</label>
          <input type="text" name="edu-location-${index}" placeholder="Ej: Madrid, España" class="form-control" data-action="edu-input" data-index="${index}" data-field="location">
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Período *</label>
          <input type="text" name="edu-period-${index}" placeholder="Ej: 2018 - 2022" class="form-control" data-action="edu-input" data-index="${index}" data-field="period">
        </div>
      </div>
    </div>
  `;
  container.appendChild(div);
}

export function removeEducation(index) {
  state.education.splice(index, 1);
  document.querySelector(`#educationContainer [data-index="${index}"]`)?.remove();

  const container = document.getElementById('educationContainer');
  if (!container) return;

  container.innerHTML = '';
  const oldEducation = [...state.education];
  state.education = [];

  oldEducation.forEach((edu) => {
    addEducation();
    const newIndex = state.education.length - 1;
    state.education[newIndex] = { ...edu };

    const inputs = document.querySelectorAll(`#educationContainer [data-index="${newIndex}"] input`);
    if (inputs[0]) inputs[0].value = edu.degree;
    if (inputs[1]) inputs[1].value = edu.institution;
    if (inputs[2]) inputs[2].value = edu.location;
    if (inputs[3]) inputs[3].value = edu.period;
  });

  updatePreview();
}

export function updateEducation(index, field, value) {
  state.education[index][field] = value;
  updatePreview();
}

export function initEducation() {
  document.querySelectorAll('[data-action="add-education"]').forEach((btn) => {
    btn.addEventListener('click', addEducation);
  });

  const educationContainer = document.getElementById('educationContainer');
  if (!educationContainer) return;

  educationContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="remove-education"]');
    if (!btn) return;
    removeEducation(Number(btn.dataset.index));
  });

  educationContainer.addEventListener('input', (e) => {
    const input = e.target.closest('input[data-action="edu-input"]');
    if (!input) return;
    updateEducation(Number(input.dataset.index), input.dataset.field, input.value);
  });
}
