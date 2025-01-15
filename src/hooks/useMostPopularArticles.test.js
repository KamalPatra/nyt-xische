import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useMostPopularArticles from "./useMostPopularArticles";
import { fetchMostPopularArticles } from "../services/mostPopularArticleService";

vi.mock("../services/mostPopularArticleService");

describe("useMostPopularArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle successful article fetch", async () => {
    const mockArticles = [
      {
        title: "Test Article",
        abstract: "Test Abstract",
        media: [
          {
            "media-metadata": [{}, {}, { url: "test-url.jpg" }],
          },
        ],
      },
    ];

    fetchMostPopularArticles.mockResolvedValue(mockArticles);

    const { result } = renderHook(() => useMostPopularArticles());

    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual([
      {
        title: "Test Article",
        abstract: "Test Abstract",
        imageUrl: "test-url.jpg",
      },
    ]);
    expect(result.current.error).toBe(null);
  });

  it("should handle error", async () => {
    fetchMostPopularArticles.mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useMostPopularArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("API Error");
    expect(result.current.articles).toEqual([]);
  });
});
