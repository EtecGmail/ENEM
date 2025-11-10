const fs = require('fs');
const path = require('path');

const JS_DIRECTORIES = ['scripts', 'tests'];
const PROBLEM_CHECKS = [
  {
    message: 'Remova espaços em branco no final das linhas.',
    test: content => /[ \t]+$/m.test(content)
  }
];

function collectJsFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectJsFiles(entryPath);
    }
    if (entry.isFile() && entry.name.endsWith('.js')) {
      return [entryPath];
    }
    return [];
  });
}

function lintFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];

  PROBLEM_CHECKS.forEach(({ test, message }) => {
    if (test(content)) {
      issues.push(message);
    }
  });

  return issues;
}

function run() {
  const files = JS_DIRECTORIES.flatMap(dir => (fs.existsSync(dir) ? collectJsFiles(dir) : []));
  let hasErrors = false;

  files.forEach(file => {
    const issues = lintFile(file);
    if (issues.length) {
      hasErrors = true;
      console.error(`\n${file}`);
      issues.forEach(issue => console.error(`  - ${issue}`));
    }
  });

  if (hasErrors) {
    console.error('\nFalha na verificação de lint.');
    process.exit(1);
  } else {
    console.log('Lint concluído sem erros.');
  }
}

run();
