import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArticleList from "./ArticleList";
import useMostPopularArticles from "../hooks/useMostPopularArticles";

vi.mock("../hooks/useMostPopularArticles");

describe("ArticleList", () => {
  it("should render loading state", () => {
    useMostPopularArticles.mockReturnValue({
      articles: [],
      loading: true,
      error: null,
    });

    render(<ArticleList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    useMostPopularArticles.mockReturnValue({
      articles: [],
      loading: false,
      error: "API Error",
    });

    render(<ArticleList />);
    expect(screen.getByText("API Error")).toBeInTheDocument();
  });

  it("should render articles", () => {
    const mockArticles = [
      {
        title: "Test Article",
        abstract: "Test Abstract",
        imageUrl: "test-url.jpg",
      },
    ];

    useMostPopularArticles.mockReturnValue({
      articles: mockArticles,
      loading: false,
      error: null,
    });

    render(<ArticleList />);
    expect(
      screen.getByText("New York Times Most Popular Articles")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });
});
