module.exports = {
  collectCoverageFrom: ['**/src/**/*.ts?(x)', '!**/*.d.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: 'tsconfig.jest.json',
    },
  },
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/ImageStub.ts',
    '\\.(css|scss)$': '<rootDir>/__mocks__/ImageStub.ts',
    '\\.(md)$': '<rootDir>/__mocks__/MarkdownStub.ts',
    'pages/(.*)$': '<rootDir>/pages/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    'public/(.*)$': '<rootDir>/public/$1',
  },
  preset: 'react-native-web',
  setupFiles: ['./jestSetup.js', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['./jestSetupAfter.ts'],
}
