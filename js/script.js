/* ============================
   Main site JavaScript
   ============================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile menu toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  /* ---------- 2. Simple contact form validation ---------- */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput  = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const msgInput   = document.getElementById('message');
      const out        = document.getElementById('form-msg');

      const name  = nameInput?.value.trim();
      const email = emailInput?.value.trim();
      const msg   = msgInput?.value.trim();

      // Reset previous states
      [nameInput, emailInput, msgInput].forEach(el => {
        el.classList.remove('error', 'success');
      });

      if (!name || !email || !msg) {
        [nameInput, emailInput, msgInput].forEach(el => el.classList.add('error'));
        out.textContent = 'All fields are required.';
        out.style.color = 'red';
        return;
      }

      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        emailInput.classList.add('error');
        out.textContent = 'Enter a valid email address.';
        out.style.color = 'red';
        return;
      }

      // Success
      [nameInput, emailInput, msgInput].forEach(el => el.classList.add('success'));
      out.textContent = 'Message sent successfully!';
      out.style.color = 'green';
      form.reset();
    });
  }

  /* ---------- 3. Theme toggle with localStorage ---------- */
  const THEME_KEY = 'site-theme';
  const toggleBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  function reflectToggleUI() {
    if (!toggleBtn) return;
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    toggleBtn.setAttribute('aria-pressed', String(isDark));

    const moon = toggleBtn.querySelector('.moon');
    const sun  = toggleBtn.querySelector('.sun');

    if (moon) moon.hidden = isDark;  // moon shows when light
    if (sun)  sun.hidden  = !isDark; // sun shows when dark
  }

  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  reflectToggleUI();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
      reflectToggleUI();
    });
  }

});
