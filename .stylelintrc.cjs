module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': [
      '^[a-z0-9\\-]+$',
      {
        message: 'Use nomes de classe em kebab-case para consistência.'
      }
    ],
    'color-hex-length': 'short'
  }
};
