/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  coverageProvider: 'v8',
  clearMocks: true,
  bail: true,
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@errors/(.*)$': '<rootDir>/src/shared/errors/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/shared/infra/http/middlewares/$1',
    '^@container/(.*)$': '<rootDir>/src/shared/container/$1',
    '^@providers/(.*)$': '<rootDir>/src/shared/providers/$1',
  },
};

export default config;
