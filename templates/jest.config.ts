export default {
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/docs/",
  ],
  transform: {
    "^.+\\.ts$": ["@swc/jest"],
  },
};
