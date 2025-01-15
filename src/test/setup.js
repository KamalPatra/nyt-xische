import "@testing-library/jest-dom";
import { vi } from "vitest";
import "react-bootstrap";

vi.mock("../../config", () => ({
  config: {
    apiKey: "test-api-key",
  },
}));
