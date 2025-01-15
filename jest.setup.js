import "@testing-library/jest-dom";

// Mock import.meta.env
global.import = {
  meta: {
    env: {
      VITE_API_KEY: "test-api-key",
    },
  },
};
