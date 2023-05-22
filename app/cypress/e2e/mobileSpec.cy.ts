interface User {
  _id: string;
  email: string;
  password: string;
  __v: number;
}

describe("weather app test", () => {
  before(() => {
    Cypress.session.clearCurrentSessionData();
  });

  beforeEach(() => {
    cy.viewport(320, 568);
  });

  it("passes", () => {
    cy.visit("/");
  });

  it("removes testing user if already exist", () => {
    cy.login("admin@gmail.com", "Admin123!");
    cy.get("div.username")
      .should("have.text", "admin")
      .then(() => {
        const token = JSON.parse(
          `${window.localStorage.getItem("user")}`
        ).token;

        cy.request({
          method: "GET",
          url: "http://localhost:4000/api/user",
          auth: {
            bearer: token,
          },
        }).then((res) => {
          const testUser = res.body.filter(
            (user: User) => user.email === "testCypress@gmail.com"
          )[0];

          if (testUser) {
            cy.request({
              method: "DELETE",
              url: "http://localhost:4000/api/user",
              auth: {
                bearer: token,
              },
              body: {
                email: "testCypress@gmail.com",
              },
            }).then((response) => {
              expect(response.body).to.have.all.keys(
                "acknowledged",
                "deletedCount"
              );
              expect(response.body).to.deep.equal({
                acknowledged: true,
                deletedCount: 1,
              });
            });
          }
        });
      });
    cy.get(".user-button").find("button").click();
    cy.findByText("Logout").click();
  });

  it("tests Title showing in AppBar before authentication", () => {
    cy.get(".user-button").children().first().click();
    cy.findByText("Signup").click();
    cy.get(".page-title").should("have.text", "Signup");
    cy.get(".user-button").children().first().click();
    cy.findByText("Login").click();
    cy.get(".page-title").should("have.text", "Login");
  });

  it("tests if there is only home page avalible if visitor is not authenticated", () => {
    cy.get(".drawer-menu")
      .children()
      .first()
      .click()
      .then(() => {
        cy.get("ul").children().should("have.length", 1);
        cy.get("ul").find("div").should("have.text", "Home");
        cy.get("ul").findByText("Home").click();
      });
  });

  it("tests if there is only login/signup option if visitior is not authenticated", () => {
    cy.get(".user-button").children().first().click();
    cy.get("#menu-appbar")
      .find("ul")
      .then(() => {
        cy.get("li").should("have.length", 2);
        cy.get("li").first().should("have.text", "Login");
        cy.get("li").last().should("have.text", "Signup");
      });
  });

  it("signs up a new user", () => {
    cy.signup("testCypress@gmail.com", "Test123!", "Test123!");
    cy.get("div.username").should("have.text", "testCypress");
  });

  it("shows cities page for current authenticated user", () => {
    cy.get(".drawer-menu")
      .children()
      .first()
      .click()
      .then(() => {
        cy.get("ul").children().should("have.length", 2);
        cy.get("ul").children().first().should("have.text", "Home");
        cy.get("ul").children().last().should("have.text", "Cities");
        cy.get("ul").findByText("Cities").click();
      });
    cy.get(".page-title").should("have.text", "Cities");
  });

  it("tests if authenticated user have only option to log out (no login, no signup)", () => {
    cy.get(".user-button").find("button").click();
    cy.get("#menu-appbar")
      .find("ul")
      .then(() => {
        cy.get("li").should("have.length", 1);
        cy.get("li").first().should("have.text", "Logout");
        cy.get("li").find("a").click();
      });
    cy.get(".page-title").should("have.text", "Login");
  });
});
