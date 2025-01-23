module.exports = {
  rootDir: "../../",
  clearMocks: true,
  resetModules: true,
  restoreMocks: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.test.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "types\\.ts",
    "index\\.ts",
    ".+\\.d\\.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/fixtures/",
    "/utils/",
    "<rootDir>/src/di.ts",
  ],
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  testEnvironment: "node",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    "^@apps/(.*)$": "<rootDir>/src/apps/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  cache: true,
};
