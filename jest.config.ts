const config = {
  rootDir: process.cwd(),
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  testRegex: '/(__tests__|e2e)/.*\\.(test|spec)\\.(ts|tsx|js)$',
  modulePathIgnorePatterns: ['dist'],
  preset: 'ts-jest/presets/js-with-ts',
  snapshotSerializers: ['jest-emotion'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|gif|png|mp4|mkv|avi|webm|swf|wav|mid)$': 'jest-static-stubs/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: {
        allowJs: true,
      },
    },
  },
}

export default config
