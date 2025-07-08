import '../styles/styles.css';
import router from './routes/routes.js';
import './scripts/sw-register.js';
import requestPermission from './scripts/notification.js';

requestPermission();


window.addEventListener('DOMContentLoaded', () => {
  router();
});

document.addEventListener('click', (e) => {
  const target = e.target.closest('a');

  if (!target) return;

  if (target.classList.contains('skip-link')) return;

  if (
    target.href.startsWith(window.location.origin) &&
    target.hash &&
    target.hash !== window.location.hash
  ) {
    e.preventDefault();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.hash = target.hash;
      });
    } else {
      window.location.hash = target.hash;
    }
  }
});

// Skip-link functionality (aksesibilitas)
const skipLink = document.querySelector('.skip-link');
const mainContent = document.querySelector('#main-content');

if (skipLink && mainContent) {
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainContent.focus();
    mainContent.scrollIntoView({ behavior: 'smooth' });
  });
}
