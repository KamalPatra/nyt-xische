describe("Articles App", () => {
  const API_URL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json*";

  const mockArticleResponse = {
    status: "OK",
    results: [
      {
        title: "Read the Special Counsel Report on the Trump Election Case",
        abstract:
          "The former special counsel Jack Smith stood behind his prosecution of President-elect Donald J. Trump in a report released early Tuesday.",
        media: [
          {
            type: "image",
            "media-metadata": [
              {
                url: "https://static01.nyt.com/images/2025/01/14/small.png",
                format: "Standard Thumbnail",
              },
              {
                url: "https://static01.nyt.com/images/2025/01/14/medium.png",
                format: "mediumThreeByTwo210",
              },
              {
                url: "https://static01.nyt.com/images/2025/01/14/large.png",
                format: "mediumThreeByTwo440",
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    cy.intercept("GET", API_URL, {
      statusCode: 200,
      body: mockArticleResponse,
    }).as("getArticles");
  });

  it("displays loading state", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Loading...").should("be.visible");
  });

  it("displays error message when API fails", () => {
    cy.intercept("GET", API_URL, {
      statusCode: 500,
      body: { fault: { faultstring: "Server error" } },
    }).as("getArticlesError");

    cy.visit("http://localhost:5173");
    cy.contains("Error").should("be.visible");
  });

  it("loads and displays articles with correct content", () => {
    cy.visit("http://localhost:5173");
    cy.wait("@getArticles");

    cy.contains("New York Times Most Popular Articles").should("be.visible");

    cy.get('[data-testid="accordion-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="accordion-header"]').should(
          "contain",
          "Read the Special Counsel Report"
        );

        cy.get('[data-testid="accordion-header"]').click();

        cy.get('[data-testid="accordion-body"]').within(() => {
          cy.get("p").should(
            "contain",
            "The former special counsel Jack Smith"
          );

          cy.get("img")
            .should("have.attr", "src")
            .and("eq", "https://static01.nyt.com/images/2025/01/14/large.png");
        });
      });
  });

  it("handles articles without images correctly", () => {
    const noImageResponse = {
      status: "OK",
      results: [
        {
          title: "Article Without Image",
          abstract: "This is an article without an image.",
          media: [],
        },
      ],
    };

    cy.intercept("GET", API_URL, {
      statusCode: 200,
      body: noImageResponse,
    }).as("getArticlesNoImage");

    cy.visit("http://localhost:5173");
    cy.wait("@getArticlesNoImage");

    cy.get('[data-testid="accordion-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="accordion-header"]').click();
        cy.get("img").should("not.exist");
      });
  });

  it("allows expanding and collapsing articles", () => {
    cy.visit("http://localhost:5173");
    cy.wait("@getArticles");

    cy.get('[data-testid="accordion-item"]')
      .first()
      .within(() => {
        cy.get('[data-testid="accordion-body"]').should("not.be.visible");

        cy.get('[data-testid="accordion-header"]').click();
        cy.get('[data-testid="accordion-body"]').should("be.visible");

        cy.get('[data-testid="accordion-header"]').click();
        cy.get('[data-testid="accordion-body"]').should("not.be.visible");
      });
  });
});
