(function () {
  class SignupModalController {
    constructor(modal) {
      this.modal = modal;
      this.content = modal ? modal.querySelector('.modal-content') : null;
      this.closeButton = modal ? modal.querySelector('.modal-close') : null;
      this.focusable = [];
      this.previouslyFocused = null;
      this.handleKeydown = this.handleKeydown.bind(this);
      this.handleOverlayClick = this.handleOverlayClick.bind(this);
    }

    registerTriggers(selectors) {
      const triggers = document.querySelectorAll(selectors);
      triggers.forEach(trigger => {
        trigger.addEventListener('click', event => {
          event.preventDefault();
          this.open(trigger);
        });
      });
    }

    open(trigger) {
      if (!this.modal) return;

      this.previouslyFocused = trigger || document.activeElement;
      this.modal.setAttribute('aria-hidden', 'false');
      this.modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      this.focusable = Array.from(
        this.modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );

      const firstFocusable = this.focusable[0];
      if (firstFocusable) {
        firstFocusable.focus();
      }

      this.bindEvents();
    }

    close() {
      if (!this.modal) return;

      this.modal.setAttribute('aria-hidden', 'true');
      this.modal.style.display = 'none';
      document.body.style.overflow = '';

      this.unbindEvents();

      if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
        this.previouslyFocused.focus();
      }
    }

    bindEvents() {
      if (this.closeButton) {
        this.closeButton.addEventListener('click', () => this.close(), { once: true });
      }

      this.modal.addEventListener('keydown', this.handleKeydown);
      this.modal.addEventListener('click', this.handleOverlayClick);
    }

    unbindEvents() {
      this.modal.removeEventListener('keydown', this.handleKeydown);
      this.modal.removeEventListener('click', this.handleOverlayClick);
    }

    handleOverlayClick(event) {
      if (event.target === this.modal) {
        this.close();
      }
    }

    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.close();
        return;
      }

      if (event.key !== 'Tab' || this.focusable.length === 0) return;

      const first = this.focusable[0];
      const last = this.focusable[this.focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }
  }

  function setupSmoothScroll() {
    const links = document.querySelectorAll('a.nav-link[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', event => {
        const targetId = link.getAttribute('href').slice(1);
        const section = document.getElementById(targetId);
        if (!section) return;

        event.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', `#${targetId}`);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('signup-modal');
    const modalController = new SignupModalController(modalElement);

    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
    }

    modalController.registerTriggers('#cta-main, #signup-btn');

    const heroSecondaryCta = document.getElementById('cta-secondary');
    if (heroSecondaryCta) {
      heroSecondaryCta.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('trilhas')?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    setupSmoothScroll();
  });
})();
