import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchMostPopularArticles } from "./mostPopularArticleService";

vi.mock("axios");

describe("mostPopularArticleService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch articles successfully", async () => {
    const mockResponse = {
      status: 200,
      data: {
        results: [
          {
            title: "Test Article",
            abstract: "Test Abstract",
            media: [
              {
                "media-metadata": [{}, {}, { url: "test-url.jpg" }],
              },
            ],
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchMostPopularArticles();
    expect(result).toEqual(mockResponse.data.results);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("api-key=test-api-key")
    );
  });

  it("should handle API error", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));
    await expect(fetchMostPopularArticles()).rejects.toThrow("API Error");
  });
});
