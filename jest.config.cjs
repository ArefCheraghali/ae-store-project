// jest.config.cjs
module.exports = {
  // 1) use ts-jest to handle TS & JSX
  preset: "ts-jest",

  // 2) run your tests in jsdom
  testEnvironment: "jsdom",

  // 3) explicitly transform .ts/.tsx via ts-jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // 4) locate tests under src/, matching *.test.tsx or *.spec.tsx
  testMatch: ["<rootDir>/src/**/*.(test|spec).(ts|tsx)"],

  // 5) map your @/ alias to src/
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },

  // 6) add jest-dom matchers
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // 7) ignore build output & deps
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  // 8) include these file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
