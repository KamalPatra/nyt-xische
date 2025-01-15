import React from "react";
import useMostPopularArticles from "../hooks/useMostPopularArticles";
import Article from "./Article";
import Accordion from "react-bootstrap/Accordion";

const ArticleList = () => {
  const { articles, loading, error } = useMostPopularArticles();

  if (loading) return <div>Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>New York Times Most Popular Articles</h1>
      <Accordion>
        {articles.map((article, index) => (
          <Article
            key={index}
            title={article.title}
            abstract={article.abstract}
            eventKey={index}
            image={article.imageUrl}
          />
        ))}
      </Accordion>
    </>
  );
};

export default ArticleList;
