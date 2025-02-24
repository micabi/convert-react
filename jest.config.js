/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest", // 追加
  // testEnvironment: "node",
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },

  // $ ts-jest config:init
};