export default {
  displayName: 'todos-frontend',
  preset: '../../jest.preset.js',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/todos-frontend',
};
