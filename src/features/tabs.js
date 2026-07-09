export function initTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      document.querySelectorAll('.tab-btn').forEach((b) => {
        b.classList.remove('active', 'btn-primary', 'text-white');
        b.classList.add('btn-outline-primary');
        b.setAttribute('aria-selected', 'false');
      });
      
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('active', 'btn-primary', 'text-white');
      btn.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.add('d-none');
      });
      document.getElementById(`tab-${tab}`)?.classList.remove('d-none');
    });
  });
}

export function initThemeToggle() {
  const savedTheme = localStorage.getItem('cv-theme') || 'light';
  const root = document.documentElement;
  root.setAttribute('data-bs-theme', savedTheme);
  document.body.setAttribute('data-theme', savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-bs-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-bs-theme', nextTheme);
      document.body.setAttribute('data-theme', nextTheme);
      localStorage.setItem('cv-theme', nextTheme);
    });
  }
}
