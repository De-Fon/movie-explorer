module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^\\.\\./services/tmdb(?:\\.js)?$': '<rootDir>/__mocks__/tmdb.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg|webp|ico)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/src/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
