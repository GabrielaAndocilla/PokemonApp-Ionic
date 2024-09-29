import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  silent:false,
  moduleNameMapper: {
    '^@useCases/(.*)$': '<rootDir>/src/application/useCases/$1',
    '^@domains/(.*)$': '<rootDir>/src/domain/$1',
    '^@controllers/(.*)$': '<rootDir>/src/infrastructure/controllers/$1',
    '^@middleware/(.*)$': '<rootDir>/src/infrastructure/middleware/$1',
    '^@repositories/(.*)$': '<rootDir>/src/infrastructure/repositories/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
