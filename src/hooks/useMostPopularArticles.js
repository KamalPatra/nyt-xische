import { useEffect, useState } from "react";
import { fetchMostPopularArticles } from "../services/mostPopularArticleService";

const useMostPopularArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMostPopularArticles = async () => {
    try {
      const data = await fetchMostPopularArticles();
      let newData = data.map((item) => ({
        title: item.title,
        abstract: item.abstract,
        imageUrl: item.media?.[0]?.["media-metadata"]?.[2]?.url,
      }));
      setArticles(newData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMostPopularArticles();
  }, []);

  return { articles, loading, error };
};

export default useMostPopularArticles;
