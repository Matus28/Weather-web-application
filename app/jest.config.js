/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsConfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/src/utils/CSSStub.ts",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
