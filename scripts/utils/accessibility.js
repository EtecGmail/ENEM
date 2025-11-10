(function () {
  function enableFocusOutline() {
    function handleFirstTab(event) {
      if (event.key !== 'Tab') return;
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDown);
    }

    function handleMouseDown() {
      document.documentElement.classList.remove('user-is-tabbing');
      window.removeEventListener('mousedown', handleMouseDown);
      window.addEventListener('keydown', handleFirstTab);
    }

    window.addEventListener('keydown', handleFirstTab);
  }

  function enhanceSkipLinks() {
    const skipLinks = document.querySelectorAll('a[href^="#"].skip-link');
    skipLinks.forEach(link => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;

        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: false });
        target.addEventListener(
          'blur',
          () => {
            target.removeAttribute('tabindex');
          },
          { once: true }
        );
      });
    });
  }

  function syncAriaCurrent() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!navLinks.length) return;

    function updateAriaCurrent(hash) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
          link.setAttribute('aria-current', 'page');
          link.classList.add('active');
        } else {
          link.removeAttribute('aria-current');
          link.classList.remove('active');
        }
      });
    }

    updateAriaCurrent(window.location.hash || '#inicio');

    window.addEventListener('hashchange', () => {
      updateAriaCurrent(window.location.hash || '#inicio');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js-enabled');
    enableFocusOutline();
    enhanceSkipLinks();
    syncAriaCurrent();
  });
})();
