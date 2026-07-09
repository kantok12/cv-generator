import { generatePDF } from './pdf.js';

function generateCVPreviewContent() {
  const preview = document.getElementById('cvPreview');
  return preview ? preview.innerHTML : '<div class="p-4 text-danger">Vista previa no disponible</div>';
}

export function createModal(title, content, actions = [], size = 'md') {
  const existingModal = document.getElementById('modalOverlay');
  if (existingModal) {
    existingModal.remove();
  }

  const sizeClasses = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl',
    '2xl': 'modal-xl',
    '3xl': 'modal-xl',
    '4xl': 'modal-fullscreen-lg-down',
    full: 'modal-fullscreen'
  };

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'modalOverlay';
  modalOverlay.className = 'position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3';
  modalOverlay.style.zIndex = '1080';

  const modalDialog = document.createElement('div');
  modalDialog.className = `modal-dialog modal-dialog-centered ${sizeClasses[size]} w-100`;
  modalDialog.style.maxHeight = '90vh';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content shadow border-0';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  modalHeader.innerHTML = `
    <h3 class="modal-title h5 mb-0">${title}</h3>
    <button type="button" class="btn-close close-modal" aria-label="Close"></button>
  `;

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.innerHTML = content;

  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';

  actions.forEach((action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `btn ${action.className}`;
    button.textContent = action.text;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      action.onClick();
    });
    modalFooter.appendChild(button);
  });

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modalOverlay.appendChild(modalDialog);
  document.body.appendChild(modalOverlay);

  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.close-modal')?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) closeModal();
  });

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };

  document.addEventListener('keydown', handleEscape);
  return closeModal;
}

export function showValidationErrorModal(title, message) {
  return createModal(
    title,
    `<div class="alert alert-warning mb-0">${message}</div>`,
    [
      {
        text: 'Entendido',
        className: 'btn-primary',
        onClick: () => document.getElementById('modalOverlay')?.remove()
      }
    ]
  );
}

export function showConfirmDownloadModal(onConfirm, missingFields = []) {
  const hasMissingFields = missingFields.length > 0;

  const content = hasMissingFields
    ? `
      <div class="vstack gap-3">
        <div class="alert alert-warning mb-0">
          Algunos campos importantes están vacíos. Tu CV se verá más profesional si completas toda la información.
        </div>
        <div class="border rounded-3 p-3 bg-body-tertiary">
          <p class="fw-semibold mb-2">Campos faltantes:</p>
          <ul class="mb-0 ps-3">
            ${missingFields.map((field) => `<li>${field}</li>`).join('')}
          </ul>
        </div>
        <div class="alert alert-primary mb-0">
          ¿Deseas continuar con la descarga o prefieres completar la información?
        </div>
      </div>
    `
    : `
      <div class="alert alert-success mb-0">
        ¡Toda la información requerida está completa! Estás listo para descargar tu CV profesional.
      </div>
    `;

  return createModal(
    hasMissingFields ? 'Información Incompleta' : 'Confirmar Descarga',
    content,
    [
      {
        text: hasMissingFields ? 'Completar Información' : 'Cancelar',
        className: 'btn-outline-secondary',
        onClick: () => document.getElementById('modalOverlay')?.remove()
      },
      {
        text: 'Descargar de todos modos',
        className: 'btn-primary',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
          onConfirm();
        }
      }
    ]
  );
}

export function showSuccessModal() {
  return createModal(
    '¡Descarga Exitosa!',
    `<div class="alert alert-success mb-0">Tu CV ha sido descargado exitosamente. Revisa tu carpeta de descargas.</div>`,
    [
      {
        text: 'Perfecto',
        className: 'btn-success',
        onClick: () => document.getElementById('modalOverlay')?.remove()
      }
    ]
  );
}

export function showClearFormModal(onConfirm) {
  return createModal(
    'Limpiar Formulario',
    `
      <div class="vstack gap-3">
        <div class="alert alert-danger mb-0">
          ¿Estás seguro de que deseas limpiar todo el formulario? Esta acción eliminará toda la información ingresada y no se puede deshacer.
        </div>
        <div class="border rounded-3 p-3 bg-danger-subtle">
          <p class="small mb-0 text-danger-emphasis"><strong>Advertencia:</strong> Se perderán todos los datos ingresados incluyendo información personal, experiencia, educación, habilidades, etc.</p>
        </div>
      </div>
    `,
    [
      {
        text: 'Cancelar',
        className: 'btn-outline-secondary',
        onClick: () => document.getElementById('modalOverlay')?.remove()
      },
      {
        text: 'Sí, Limpiar Todo',
        className: 'btn-danger',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
          onConfirm();
        }
      }
    ]
  );
}

export function showPreviewModal() {
  const cvContent = generateCVPreviewContent();

  return createModal(
    'Vista Previa del CV',
    `<div class="bg-body-tertiary p-3 p-md-4 rounded-3">${cvContent}</div>`,
    [
      {
        text: 'Cerrar',
        className: 'btn-outline-secondary',
        onClick: () => document.getElementById('modalOverlay')?.remove()
      },
      {
        text: 'Descargar PDF',
        className: 'btn-primary',
        onClick: () => {
          document.getElementById('modalOverlay')?.remove();
          generatePDF();
        }
      }
    ],
    '4xl'
  );
}
