module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  "roots": [
    "./test"

  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  coverageReporters: ["json-summary"]
}