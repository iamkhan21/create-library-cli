export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/docs/",
  ],
  transform: {
    "^.+\\.ts$": ["ts-jest"],
  },
};
