/// <reference types="jest" />

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toMatchImageSnapshot(options?: import('jest-image-snapshot').MatchImageSnapshotOptions): R
    }
  }
}

export {}
