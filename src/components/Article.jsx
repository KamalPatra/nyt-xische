import React from "react";
import { Image } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const Article = ({ title, abstract, eventKey, image }) => {
  return (
    <Accordion.Item eventKey={eventKey} data-testid="accordion-item">
      <Accordion.Header data-testid="accordion-header">
        {title}
      </Accordion.Header>
      <Accordion.Body data-testid="accordion-body">
        <div
          style={{
            width: "400px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {image && <Image src={image} data-testid="article-image" />}
          <p>{abstract}</p>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Article;
