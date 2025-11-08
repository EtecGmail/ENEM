const { validateSignupData } = require('../scripts/components/modal.js');
const { createApiService } = require('../scripts/services/api.js');
const { createPlanScrollHandler } = require('../scripts/pages/onboarding.js');

let hasFailure = false;
const tests = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function test(name, fn) {
  tests.push({ name, fn });
}

test('Validação exige consentimento expresso', () => {
  const result = validateSignupData({
    'nome-completo': 'Ana Souza',
    email: 'ana@example.com',
    senha: 'segredo123',
    lgpd: false
  });

  assert(result.isValid === false, 'O formulário deveria estar inválido sem consentimento.');
  assert(result.errors.consent, 'Mensagem de consentimento ausente.');
});

test('Validação rejeita e-mail inválido', () => {
  const result = validateSignupData({
    'nome-completo': 'Ana Souza',
    email: 'ana@',
    senha: 'segredo123',
    lgpd: true
  });

  assert(result.isValid === false, 'E-mail inválido deveria falhar.');
  assert(result.errors.email, 'Mensagem de e-mail inválido deveria ser exibida.');
});

test('Fluxo válido retorna sucesso', () => {
  const result = validateSignupData({
    'nome-completo': 'Ana Souza',
    email: 'ana@example.com',
    senha: 'segredo123',
    lgpd: true
  });

  assert(result.isValid === true, 'Todos os dados corretos deveriam ser aceitos.');
});

test('CTA chama scroll para a seção de planos', () => {
  const scrollCalls = [];
  const handler = createPlanScrollHandler(() => ({
    scrollIntoView: options => scrollCalls.push(options)
  }));

  let prevented = false;
  handler({ preventDefault: () => { prevented = true; } });

  assert(prevented === true, 'O clique precisa impedir comportamento padrão.');
  assert(scrollCalls.length === 1, 'scrollIntoView deve ser chamado uma vez.');
  assert(scrollCalls[0] && scrollCalls[0].behavior === 'smooth', 'Scroll deve ser suave.');
});

test('Serviço de API mock cria usuário com sucesso', async () => {
  const api = createApiService({ useMock: true, delay: 0 });
  const response = await api.signup({ email: 'ana@example.com', plano: 'essencial' });

  assert(response.status === 201, 'Cadastro deve retornar status 201.');
  assert(response.data && response.data.data.id, 'Resposta deve conter ID de usuário.');
});

test('Serviço de API mock lista planos com limites definidos', async () => {
  const api = createApiService({ useMock: true, delay: 0 });
  const response = await api.listPlans();

  assert(response.status === 200, 'Listagem de planos deve retornar status 200.');
  assert(Array.isArray(response.data.data), 'Resposta deve conter array de planos.');
  assert(response.data.data.length === 3, 'Devem existir 3 planos mockados.');
});

(async function run() {
  for (const { name, fn } of tests) {
    try {
      await fn();
      console.log(`✔ ${name}`);
    } catch (error) {
      hasFailure = true;
      console.error(`✖ ${name}`);
      console.error(error.message);
    }
  }

  if (hasFailure) {
    console.error('\nAlguns testes falharam.');
    process.exit(1);
  } else {
    console.log('\nTodos os testes passaram.');
  }
})();
