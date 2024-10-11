// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DEFAULT_THEME } = require('@cucumber/pretty-formatter');

module.exports = {
  default: {
    publishQuiet: true,
    paths: ['./apps/blazing/test/acceptance/features/**/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['./apps/blazing/test/acceptance/main.ts'],
    format: ['@cucumber/pretty-formatter'],
    formatOptions: {
      colorsEnabled: true,
      theme: { ...DEFAULT_THEME },
    },
  },
};
