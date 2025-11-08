const SIGNUP_MESSAGES = {
  required: 'Este campo é obrigatório',
  email: 'Por favor, insira um e-mail válido',
  password: 'A senha deve ter pelo menos 6 caracteres',
  consent: 'Você precisa concordar com o tratamento dos dados para continuar.'
};

function isValidEmail(email = '') {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateSignupData(values = {}) {
  const name = (values['nome-completo'] || values.nome || '').trim();
  const email = (values.email || '').trim();
  const password = (values.senha || '').trim();
  const consentValue =
    typeof values.lgpd !== 'undefined' ? values.lgpd : values.consent;
  const consent = Boolean(consentValue);

  const errors = {};

  if (!name) {
    errors.nome = SIGNUP_MESSAGES.required;
  }

  if (!email) {
    errors.email = SIGNUP_MESSAGES.required;
  } else if (!isValidEmail(email)) {
    errors.email = SIGNUP_MESSAGES.email;
  }

  if (!password) {
    errors.senha = SIGNUP_MESSAGES.required;
  } else if (password.length < 6) {
    errors.senha = SIGNUP_MESSAGES.password;
  }

  if (!consent) {
    errors.consent = SIGNUP_MESSAGES.consent;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Sistema de Modal Acessível
class ModalSystem {
  constructor() {
    this.modals = new Map();
    this.currentModal = null;
    this.previouslyFocused = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.init();
  }

  init() {
    if (typeof document === 'undefined') return;

    document.querySelectorAll('[data-modal]').forEach(modal => {
      this.registerModal(modal.id, modal);
    });

    document.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleKeydown);
  }

  registerModal(id, element) {
    if (!id || !element) return;

    element.setAttribute('aria-hidden', element.getAttribute('aria-hidden') ?? 'true');
    if (!element.style.display) {
      element.style.display = 'none';
    }

    const modalData = {
      element,
      triggers: document.querySelectorAll(`[data-target="${id}"]`),
      closeButtons: element.querySelectorAll('[data-dismiss="modal"]')
    };

    this.modals.set(id, modalData);

    modalData.triggers.forEach(trigger => {
      trigger.addEventListener('click', event => {
        if (event) event.preventDefault();
        this.open(id, trigger);
      });
    });

    modalData.closeButtons.forEach(button => {
      button.addEventListener('click', event => {
        if (event) event.preventDefault();
        this.close();
      });
    });
  }

  open(modalId, trigger = null) {
    if (this.currentModal) this.close();

    const modalData = this.modals.get(modalId);
    if (!modalData) return;

    this.currentModal = modalData;
    this.previouslyFocused = trigger || document.activeElement;

    modalData.element.setAttribute('aria-hidden', 'false');
    modalData.element.style.display = 'flex';

    const focusable = modalData.element.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && typeof focusable.focus === 'function') {
      focusable.focus();
    }

    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
    }

    this.dispatchEvent('modal:open', { modalId });
  }

  close() {
    if (!this.currentModal) return;

    const { element } = this.currentModal;

    element.setAttribute('aria-hidden', 'true');
    element.style.display = 'none';

    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = '';
    }

    if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
      this.previouslyFocused.focus();
    }

    this.dispatchEvent('modal:close', { modalId: element.id });

    this.currentModal = null;
    this.previouslyFocused = null;
  }

  handleClick(event) {
    if (!event || !this.currentModal) return;

    if (event.target === this.currentModal.element) {
      this.close();
    }
  }

  handleKeydown(event) {
    if (!event || !this.currentModal) return;

    if (event.key === 'Escape') {
      this.close();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  trapFocus(event) {
    const { element } = this.currentModal;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }

  dispatchEvent(name, detail) {
    if (typeof document === 'undefined') return;
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
  }
}

class SignupFormManager {
  constructor(formSelector = '#signup-form', options = {}) {
    this.form = typeof formSelector === 'string'
      ? document.querySelector(formSelector)
      : formSelector;

    this.submitter = options.submitter || (formData => this.submitForm(formData));
    this.successRedirect = options.successRedirect || 'onboarding.html';
    this.onSuccess =
      typeof options.onSuccess === 'function'
        ? options.onSuccess
        : url => {
            if (typeof window !== 'undefined') {
              window.location.href = url;
            }
          };
    this.onError = typeof options.onError === 'function' ? options.onError : null;

    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.setAttribute('novalidate', 'true');
    this.form.addEventListener('submit', event => this.handleSubmit(event));
    this.setupValidation();
  }

  getRequiredFields() {
    if (!this.form) return [];
    return Array.from(this.form.querySelectorAll('input[required]'));
  }

  setupValidation() {
    const fields = this.getRequiredFields();

    fields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));

      if (field.type === 'checkbox') {
        field.addEventListener('change', () => {
          if (field.checked) {
            this.clearError(field);
          }
        });
      } else {
        field.addEventListener('input', () => this.clearError(field));
      }
    });
  }

  validateField(field) {
    if (!field) return false;

    this.clearError(field);

    if (field.type === 'checkbox') {
      if (!field.checked) {
        this.showError(field, SIGNUP_MESSAGES.consent);
        return false;
      }
      return true;
    }

    const value = (field.value || '').trim();

    if (field.hasAttribute('required') && value.length === 0) {
      this.showError(field, SIGNUP_MESSAGES.required);
      return false;
    }

    if (field.type === 'email' && value.length > 0 && !isValidEmail(value)) {
      this.showError(field, SIGNUP_MESSAGES.email);
      return false;
    }

    if (field.type === 'password') {
      const minLength = Number(field.getAttribute('minlength')) || 6;
      if (value.length < minLength) {
        this.showError(field, SIGNUP_MESSAGES.password);
        return false;
      }
    }

    return true;
  }

  showError(field, message) {
    if (!field) return;

    const container = field.closest('.form-group') || field.parentElement;
    if (!container) return;

    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    const errorId = `${field.id || field.name}-error`;
    let errorElement = container.querySelector('.error-message');

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      container.appendChild(errorElement);
    }

    errorElement.id = errorId;
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    const describedBy = field.getAttribute('aria-describedby');
    field.setAttribute(
      'aria-describedby',
      describedBy ? `${describedBy} ${errorId}`.trim() : errorId
    );
  }

  clearError(field) {
    if (!field) return;

    const container = field.closest('.form-group') || field.parentElement;
    if (!container) return;

    field.classList.remove('error');
    field.removeAttribute('aria-invalid');

    const errorElement = container.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }

    const describedBy = (field.getAttribute('aria-describedby') || '')
      .split(' ')
      .filter(Boolean)
      .filter(id => !id.endsWith('-error'));

    if (describedBy.length > 0) {
      field.setAttribute('aria-describedby', describedBy.join(' '));
    } else {
      field.removeAttribute('aria-describedby');
    }
  }

  async handleSubmit(event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    if (!this.form) return false;

    const fields = this.getRequiredFields();
    const invalidFields = [];

    fields.forEach(field => {
      if (!this.validateField(field)) {
        invalidFields.push(field);
      }
    });

    if (invalidFields.length > 0) {
      const firstInvalid = invalidFields[0];
      if (firstInvalid && typeof firstInvalid.focus === 'function') {
        firstInvalid.focus();
      }
      return false;
    }

    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.classList.add('loading');
      submitButton.disabled = true;
      submitButton.textContent = 'Criando conta...';
    }

    try {
      await this.submitter(new FormData(this.form));
      this.onSuccess(this.successRedirect);
      return true;
    } catch (error) {
      this.showFormError('Erro ao criar conta. Tente novamente.');
      if (this.onError) {
        this.onError(error);
      }
      return false;
    } finally {
      if (submitButton) {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  }

  async submitForm() {
    return new Promise(resolve => {
      setTimeout(resolve, 600);
    });
  }

  showFormError(message) {
    if (!this.form) return;

    const existingError = this.form.querySelector('.form-error');
    if (existingError) existingError.remove();

    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-error form-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    this.form.insertBefore(errorElement, this.form.firstChild);
  }
}

function initializeModalSystem() {
  const modalSystem = new ModalSystem();
  const signupFormManager = new SignupFormManager('#signup-form');
  return { modalSystem, signupFormManager };
}

function bootstrapModalComponents() {
  const instances = initializeModalSystem();
  if (typeof window !== 'undefined') {
    window.modalSystem = instances.modalSystem;
    window.signupFormManager = instances.signupFormManager;
  }
  return instances;
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.ModalSystem = ModalSystem;
  window.SignupFormManager = SignupFormManager;
  window.validateSignupData = validateSignupData;
  window.initializeModalSystem = initializeModalSystem;
  window.bootstrapModalComponents = bootstrapModalComponents;

  document.addEventListener('DOMContentLoaded', () => {
    bootstrapModalComponents();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ModalSystem,
    SignupFormManager,
    validateSignupData,
    initializeModalSystem,
    bootstrapModalComponents
  };
}
