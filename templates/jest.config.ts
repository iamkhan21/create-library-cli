export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.ts$": ["ts-jest"],
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};
