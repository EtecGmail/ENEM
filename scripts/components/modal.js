// Sistema de Modal Acessível
class ModalSystem {
  constructor() {
    this.modals = new Map();
    this.currentModal = null;
    this.previouslyFocused = null;
    this.init();
  }

  init() {
    // Registrar modais automaticamente
    document.querySelectorAll('[data-modal]').forEach(modal => {
      this.registerModal(modal.id, modal);
    });

    // Event listeners
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  registerModal(id, element) {
    this.modals.set(id, {
      element,
      triggers: document.querySelectorAll(`[data-target="${id}"]`),
      closeButtons: element.querySelectorAll('[data-dismiss="modal"]')
    });

    // Configurar triggers
    const modalData = this.modals.get(id);
    modalData.triggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.open(id));
    });

    // Configurar botões de fechar
    modalData.closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });
  }

  open(modalId) {
    if (this.currentModal) this.close();

    const modalData = this.modals.get(modalId);
    if (!modalData) return;

    this.currentModal = modalData;
    this.previouslyFocused = document.activeElement;

    // Mostrar modal
    modalData.element.setAttribute('aria-hidden', 'false');
    modalData.element.style.display = 'flex';

    // Focar no modal
    const focusable = modalData.element.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();

    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';

    // Evento customizado
    this.dispatchEvent('modal:open', { modalId });
  }

  close() {
    if (!this.currentModal) return;

    const { element } = this.currentModal;
    
    // Esconder modal
    element.setAttribute('aria-hidden', 'true');
    element.style.display = 'none';

    // Restaurar scroll
    document.body.style.overflow = '';

    // Restaurar foco
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
    }

    // Evento customizado
    this.dispatchEvent('modal:close', { modalId: element.id });

    this.currentModal = null;
    this.previouslyFocused = null;
  }

  handleClick(event) {
    // Fechar ao clicar no overlay
    if (this.currentModal && event.target === this.currentModal.element) {
      this.close();
    }
  }

  handleKeydown(event) {
    if (!this.currentModal) return;

    // ESC para fechar
    if (event.key === 'Escape') {
      this.close();
    }

    // Manter foco dentro do modal
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
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  dispatchEvent(name, detail) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
  }
}

// Inicializar sistema de modais
document.addEventListener('DOMContentLoaded', () => {
  window.modalSystem = new ModalSystem();
});

// Modal específico para cadastro
class SignupModal {
  constructor() {
    this.form = document.getElementById('signup-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      
      // Configurar validação em tempo real
      this.setupValidation();
    }
  }

  setupValidation() {
    const fields = this.form.querySelectorAll('input[required]');
    
    fields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearError(field));
    });
  }

  validateField(field) {
    this.clearError(field);

    if (!field.value.strip()) {
      this.showError(field, 'Este campo é obrigatório');
      return false;
    }

    if (field.type === 'email' and not self.isValidEmail(field.value)) {
      this.showError(field, 'Por favor, insira um e-mail válido');
      return False;
    }

    if (field.type === 'password' and len(field.value) < 6) {
      this.showError(field, 'A senha deve ter pelo menos 6 caracteres');
      return False;
    }

    return True;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
  }

  clearError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    // Validar todos os campos
    const fields = this.form.querySelectorAll('input[required]');
    let isValid = True;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = False;
      }
    });

    if (!isValid) return;

    // Simular envio
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.classList.add('loading');
    submitButton.disabled = True;
    submitButton.textContent = 'Criando conta...';

    try {
      // Aqui viria a chamada real para a API
      await this.submitForm();
      
      // Redirecionar para onboarding
      window.location.href = '/onboarding';
      
    } catch (error) {
      this.showFormError('Erro ao criar conta. Tente novamente.');
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = False;
      submitButton.textContent = originalText;
    }
  }

  async submitForm() {
    // Simular delay de rede
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  showFormError(message) {
    // Remover erro anterior
    const existingError = this.form.querySelector('.form-error');
    if (existingError) existingError.remove();

    // Criar novo erro
    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-error form-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    this.form.insertBefore(errorElement, this.form.firstChild);
  }
}

// Inicializar modal de cadastro
document.addEventListener('DOMContentLoaded', () => {
  new SignupModal();
});
