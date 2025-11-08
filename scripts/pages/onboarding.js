(function () {
  function setupSmoothScroll() {
    const links = document.querySelectorAll('a.nav-link[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', event => {
        const targetId = link.getAttribute('href').slice(1);
        const section = document.getElementById(targetId);
        if (!section) return;

        event.preventDefault();
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        if (typeof history !== 'undefined') {
          history.replaceState(null, '', `#${targetId}`);
        }
      });
    });
  }

  function createPlanScrollHandler(sectionResolver) {
    return function handlePlanCTA(event) {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }

      const section = sectionResolver();
      if (section && typeof section.scrollIntoView === 'function') {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }

  function setupPlanCTA() {
    const heroSecondaryCta = document.getElementById('cta-secondary');
    if (!heroSecondaryCta) return;

    const resolveSection = () => document.getElementById('planos');
    heroSecondaryCta.addEventListener('click', createPlanScrollHandler(resolveSection));
  }

  function initializeLandingPage() {
    setupPlanCTA();
    setupSmoothScroll();
  }

  if (typeof window !== 'undefined') {
    window.setupPlanCTA = setupPlanCTA;
    window.setupSmoothScroll = setupSmoothScroll;
    window.initializeLandingPage = initializeLandingPage;
    window.createPlanScrollHandler = createPlanScrollHandler;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      setupPlanCTA,
      setupSmoothScroll,
      initializeLandingPage,
      createPlanScrollHandler
    };
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeLandingPage);
  }
})();
