/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  }
};