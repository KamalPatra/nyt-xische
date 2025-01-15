import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Article from "./Article";

describe("Article", () => {
  const mockProps = {
    title: "Test Article",
    abstract: "Test Abstract",
    eventKey: "0",
    image: "test-image.jpg",
  };

  it("should render article with all props", () => {
    render(<Article {...mockProps} />);

    expect(screen.getByTestId("accordion-item")).toBeInTheDocument();
    expect(screen.getByTestId("accordion-header")).toBeInTheDocument();
    expect(screen.getByTestId("accordion-body")).toBeInTheDocument();
    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Test Abstract")).toBeInTheDocument();
    expect(screen.getByTestId("article-image")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
  });

  it("should render without image", () => {
    const propsWithoutImage = { ...mockProps, image: undefined };
    render(<Article {...propsWithoutImage} />);

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Test Abstract")).toBeInTheDocument();
  });
});
