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

  it("passes", () => {
    cy.visit("http://localhost:3000/");
  });

  it("removes testing user if already exist", () => {
    cy.login("admin@gmail.com", "Admin123!");
    cy.get("div.authentication")
      .children()
      .first()
      .should("have.text", "admin@gmail.com")
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
    cy.get(".authentication").find('[href="/"]').click();
  });

  it("signs up a new user", () => {
    cy.signup("testCypress@gmail.com", "Test123!", "Test123!");
    cy.get("div.authentication")
      .children()
      .first()
      .should("have.text", "testCypress@gmail.com");
  });

  it("set actual locations with autolocation button", () => {
    cy.get(".city-name__textfield").find("button").click();
    cy.wait(2000);
    cy.get(".city-name__textfield").within(() => {
      cy.get("input").then(($inputVal) => {
        expect($inputVal.attr("value")).to.not.equal("");
      });
      cy.get("input").clear();
      cy.get("input").then(($inputVal) => {
        expect($inputVal.attr("value")).to.equal("");
      });
    });
  });

  it("finds city Bratislava with typing in search bar and returns forecast data", () => {
    cy.get(".city-name__textfield").within(() => {
      cy.get('input[type="text"]').type("Bratislava");
    });
    cy.contains("Find").click();
    cy.get(".weather-cards").should("be.visible");
    cy.contains("Bratislava")
      .parent()
      .then(($parDiv) => {
        expect($parDiv.attr("class")).to.equal("current-weather__city");
      });
    cy.get(".week-forecast-list")
      .children()
      .then(($divForec) => {
        expect($divForec.length).to.equal(7);
        cy.contains("Today").should("be.visible");
      });
    cy.get(".today-forecast-list")
      .children()
      .then(($divElements) => {
        expect($divElements.length).to.equal(6);
      });
    cy.get(".air-condition-list")
      .children()
      .then(($divElements) => {
        expect($divElements.length).to.equal(5);
        cy.contains("Wind speed").should("be.visible");
        cy.contains("Wind direction").should("be.visible");
        cy.contains("Real feel").should("be.visible");
        cy.contains("UV Index").should("be.visible");
        cy.contains("Humidity").should("be.visible");
      });
  });

  it("returns empty list of user's cities (nothing added yed)", () => {
    cy.get('[href="/cities"]').should("be.visible").click();
    cy.get(".city-name__textfield").should("be.visible");
    cy.get(".city-weather-container").children().should("have.length", 0);
  });

  it("adds Bratislava city to the user's list of cities", () => {
    cy.get(".city-name__textfield")
      .children()
      .within(() => {
        cy.get("input").type("Bratislava");
      });
    cy.contains("Add city").click();
    cy.get(".city-list")
      .should("be.visible")
      .within(() => {
        cy.contains("Bratislava")
          .should("be.visible")
          .parent()
          .should("have.class", "city-block-description");
      });
    cy.get(".selected-city-weather")
      .should("be.visible")
      .within(() => {
        cy.contains("Bratislava")
          .parent()
          .should("have.class", "selected-city-weather__city");
      });
    cy.get(".today-forecast-list")
      .should("be.visible")
      .children()
      .should("have.length", 3);
    cy.get(".week-forecast-list")
      .should("be.visible")
      .children()
      .should("have.length", 3);
    cy.get(".week-forecast-list").within(() => {
      cy.contains("Today").should("be.visible");
    });
  });

  it("adds Poprad to city list and select it", () => {
    cy.get(".city-name__textfield")
      .children()
      .within(() => {
        cy.get("input").type("Poprad");
      });
    cy.contains("Add city").click();
    cy.get(".city-list").within(() => {
      cy.contains("Poprad").should("be.visible").click();
    });
    cy.get(".selected-city-weather")
      .should("be.visible")
      .within(() => {
        cy.contains("Poprad");
      });
  });

  it("removes Poprad from the city list", () => {
    cy.get(".city-list").within(() => {
      cy.contains("Poprad")
        .parent()
        .parent()
        .should("be.visible")
        .within(() => {
          cy.get("button").click();
        });
    });
    cy.get(".city-list").should("have.length", 1);
    cy.get(".city-list").within(() => {
      cy.contains("Bratislava").should("be.visible");
    });
    cy.get(".selected-city-weather")
      .should("be.visible")
      .within(() => {
        cy.contains("Bratislava");
      });
  });

  it("adds city Kosice to list of cities from Home Page", () => {
    cy.contains("Home").click();
    cy.get(".city-name__textfield").within(() => {
      cy.get("input").type("Kosice");
    });
    cy.contains("Find").click();
    cy.get(".current-weather__add").within(() => {
      cy.get("button").should("be.visible").click();
    });
    cy.contains("Cities").click();
    cy.get(".city-list").children().should("have.length", 2);
    cy.get(".city-list").within(() => {
      cy.contains("Kosice").should("be.visible");
    });
  });

  it("adds city Nitra as default city, that is shown by default in Home page", () => {
    cy.contains("Home").click();
    cy.get(".city-name__textfield").within(() => {
      cy.get("input").type("Nitra");
    });
    cy.contains("Find").click();
    cy.get(".current-weather-switch")
      .click()
      .then(() => {
        cy.get(".MuiSwitch-switchBase").should("have.class", "Mui-checked");
      });
    cy.contains("Cities").click();
    cy.get(".city-list").children().should("have.length", 3);
    cy.get(".city-list").within(() => {
      cy.contains("Nitra").should("be.visible");
    });
    cy.contains("Home").click();
    cy.contains("Nitra").should("be.visible");
  });
});
