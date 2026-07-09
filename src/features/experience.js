import { state } from '../state/store.js';
import { updatePreview } from './preview.js';

export function addExperience() {
  const index = state.experience.length;
  state.experience.push({
    role: '',
    company: '',
    period: '',
    description: '',
    keyAchievements: [],
    techStack: [],
    tools: []
  });

  const container = document.getElementById('experienceContainer');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'card border-secondary-subtle';
  div.dataset.index = String(index);
  div.innerHTML = `
    <div class="card-header bg-body-tertiary d-flex justify-content-between align-items-center">
      <span class="small fw-semibold text-primary">Experiencia #${index + 1}</span>
      ${index > 0 ? `<button type="button" data-action="remove-experience" data-index="${index}" class="btn btn-sm btn-outline-danger">Eliminar</button>` : ''}
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label fw-semibold">Cargo *</label>
          <input type="text" name="exp-role-${index}" placeholder="Ej: Desarrollador Full Stack" class="form-control" data-action="exp-input" data-index="${index}" data-field="role">
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Empresa *</label>
          <input type="text" name="exp-company-${index}" placeholder="Ej: Tech Solutions S.A." class="form-control" data-action="exp-input" data-index="${index}" data-field="company">
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">Período *</label>
          <input type="text" name="exp-period-${index}" placeholder="Ej: Enero 2021 - Presente" class="form-control" data-action="exp-input" data-index="${index}" data-field="period">
        </div>
        <div class="col-12">
          <label class="form-label fw-semibold">Descripción *</label>
          <textarea name="exp-desc-${index}" rows="3" placeholder="Describe tus responsabilidades..." class="form-control" data-action="exp-input" data-index="${index}" data-field="description"></textarea>
        </div>
      </div>

      <div class="mt-4">
        <label class="form-label fw-semibold">Logros Clave</label>
        <div class="input-group mb-2">
          <input type="text" id="exp-achievement-${index}" placeholder="Ej: Incrementé eficiencia 30%" class="form-control" data-action="exp-array-input" data-exp-index="${index}" data-field="keyAchievements">
          <button type="button" data-action="add-exp-item" data-exp-index="${index}" data-field="keyAchievements" data-input-id="exp-achievement-${index}" class="btn btn-outline-primary">+</button>
        </div>
        <div id="exp-achievements-${index}" class="d-flex flex-wrap gap-2"></div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-md-6">
          <label class="form-label fw-semibold">Tech Stack</label>
          <div class="input-group mb-2">
            <input type="text" id="exp-tech-${index}" placeholder="Ej: React, Node.js..." class="form-control" data-action="exp-array-input" data-exp-index="${index}" data-field="techStack">
            <button type="button" data-action="add-exp-item" data-exp-index="${index}" data-field="techStack" data-input-id="exp-tech-${index}" class="btn btn-outline-primary">+</button>
          </div>
          <div id="exp-tech-list-${index}" class="d-flex flex-wrap gap-2"></div>
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Herramientas</label>
          <div class="input-group mb-2">
            <input type="text" id="exp-tools-${index}" placeholder="Ej: Git, Docker..." class="form-control" data-action="exp-array-input" data-exp-index="${index}" data-field="tools">
            <button type="button" data-action="add-exp-item" data-exp-index="${index}" data-field="tools" data-input-id="exp-tools-${index}" class="btn btn-outline-primary">+</button>
          </div>
          <div id="exp-tools-list-${index}" class="d-flex flex-wrap gap-2"></div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(div);
}

export function removeExperience(index) {
  state.experience.splice(index, 1);
  document.querySelector(`#experienceContainer [data-index="${index}"]`)?.remove();

  const container = document.getElementById('experienceContainer');
  if (!container) return;

  container.innerHTML = '';
  const oldExp = [...state.experience];
  state.experience = [];

  oldExp.forEach((exp) => {
    addExperience();
    const newIndex = state.experience.length - 1;
    state.experience[newIndex] = JSON.parse(JSON.stringify(exp));

    const el = document.querySelector(`#experienceContainer [data-index="${newIndex}"]`);
    if (!el) return;

    const inputs = el.querySelectorAll('input, textarea');
    if (inputs[0]) inputs[0].value = exp.role;
    if (inputs[1]) inputs[1].value = exp.company;
    if (inputs[2]) inputs[2].value = exp.period;
    if (inputs[3]) inputs[3].value = exp.description;

    renderExpArrayItems(newIndex, 'keyAchievements', 'exp-achievements');
    renderExpArrayItems(newIndex, 'techStack', 'exp-tech-list');
    renderExpArrayItems(newIndex, 'tools', 'exp-tools-list');
  });

  updatePreview();
}

export function updateExperience(index, field, value) {
  state.experience[index][field] = value;
  updatePreview();
}

export function addExpArrayItem(expIndex, field, inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const value = input.value.trim();
  if (!value) return;

  state.experience[expIndex][field].push(value);
  input.value = '';
  input.focus();

  const containerMap = {
    keyAchievements: 'exp-achievements',
    techStack: 'exp-tech-list',
    tools: 'exp-tools-list'
  };

  renderExpArrayItems(expIndex, field, containerMap[field]);
  updatePreview();
}

export function removeExpArrayItem(expIndex, field, itemIndex) {
  state.experience[expIndex][field].splice(itemIndex, 1);

  const containerMap = {
    keyAchievements: 'exp-achievements',
    techStack: 'exp-tech-list',
    tools: 'exp-tools-list'
  };

  renderExpArrayItems(expIndex, field, containerMap[field]);
  updatePreview();
}

export function renderExpArrayItems(expIndex, field, containerPrefix) {
  const container = document.getElementById(`${containerPrefix}-${expIndex}`);
  if (!container) return;

  const items = state.experience[expIndex][field];
  const colors = {
    keyAchievements: 'text-bg-success-subtle text-success border',
    techStack: 'text-bg-secondary-subtle text-secondary border',
    tools: 'text-bg-warning-subtle text-warning border'
  };

  container.innerHTML = items
    .map(
      (item, index) => `
    <span class="badge rounded-pill ${colors[field]} d-inline-flex align-items-center gap-2 px-3 py-2">
      ${item}
      <button type="button" data-action="remove-exp-item" data-exp-index="${expIndex}" data-field="${field}" data-item-index="${index}" class="btn btn-sm btn-link p-0 text-decoration-none text-reset">
        <span aria-hidden="true">&times;</span>
      </button>
    </span>
  `
    )
    .join('');
}

export function initExperience() {
  document.querySelectorAll('[data-action="add-experience"]').forEach((btn) => {
    btn.addEventListener('click', addExperience);
  });

  const experienceContainer = document.getElementById('experienceContainer');
  if (!experienceContainer) return;

  experienceContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('button[data-action="remove-experience"]');
    if (removeBtn) {
      removeExperience(Number(removeBtn.dataset.index));
      return;
    }

    const addItemBtn = e.target.closest('button[data-action="add-exp-item"]');
    if (addItemBtn) {
      addExpArrayItem(Number(addItemBtn.dataset.expIndex), addItemBtn.dataset.field, addItemBtn.dataset.inputId);
      return;
    }

    const removeItemBtn = e.target.closest('button[data-action="remove-exp-item"]');
    if (removeItemBtn) {
      removeExpArrayItem(
        Number(removeItemBtn.dataset.expIndex),
        removeItemBtn.dataset.field,
        Number(removeItemBtn.dataset.itemIndex)
      );
    }
  });

  experienceContainer.addEventListener('input', (e) => {
    const input = e.target.closest('[data-action="exp-input"]');
    if (!input) return;
    updateExperience(Number(input.dataset.index), input.dataset.field, input.value);
  });

  experienceContainer.addEventListener('keydown', (e) => {
    const input = e.target.closest('input[data-action="exp-array-input"]');
    if (!input) return;
    if (e.key !== 'Enter') return;
    e.preventDefault();
    addExpArrayItem(Number(input.dataset.expIndex), input.dataset.field, input.id);
  });
}
