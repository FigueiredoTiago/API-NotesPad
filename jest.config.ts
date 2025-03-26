import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",

  // A configuração do ts-jest deve ser movida para a seção transform
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json", // Defina outras configurações se necessário
      },
    ],
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
