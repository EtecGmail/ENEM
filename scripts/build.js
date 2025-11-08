const fs = require('fs');
const path = require('path');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function fileContains(filePath, snippet) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.includes(snippet);
}

function run() {
  const root = process.cwd();
  const indexPath = path.join(root, 'index.html');
  const onboardingPath = path.join(root, 'onboarding.html');

  assert(fs.existsSync(indexPath), 'index.html não encontrado.');
  assert(fs.existsSync(onboardingPath), 'onboarding.html não encontrado.');

  assert(fileContains(indexPath, "id='lgpd-consent'"), 'Checkbox de consentimento não encontrado.');
  ['id=\'termos\'', "id='privacidade'", "id='lgpd'"].forEach(anchor => {
    assert(fileContains(indexPath, anchor), `Seção legal ${anchor} ausente.`);
  });

  console.log('Verificações básicas concluídas.');
}

try {
  run();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
