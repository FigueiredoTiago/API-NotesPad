import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
