import data from "../fixtures/data.json";

// Base
Cypress.Commands.add("visitToAmazon", () => {
  cy.visit("/");
});

Cypress.Commands.add("loginToAccount", () => {
  cy.get('.nav-right [data-nav-role="signin"]').trigger("mouseover");
  cy.ClickOnElement("#nav-al-container", "Sign in");
  cy.get("#ap_email").type(data.email + "{enter}");
  cy.get("#ap_password").type(data.password + "{enter}");
});

// UI Actions
Cypress.Commands.add("ClickOnElement", (selector, name) => {
  return cy.get(selector).contains(name).click();
});

Cypress.Commands.add("searchForItem", (selector, str) => {
  cy.get(selector).type(str + "{enter}");
});

Cypress.Commands.add("findElement", (selector) => {
  cy.get(selector, { timeout: 5000 });
});

Cypress.Commands.add("getText", (selector) => {
  cy.get(selector, { timeout: 5000 }).then((element) => {
    let textValue = element.text();
    const parsedtextValue = textValue.trim();
    return parsedtextValue;
  });
});

// Verifications
Cypress.Commands.add("verificationText", (selector, expectedText) => {
  cy.get(selector, { timeout: 5000 }).then((element) => {
    let actualText = element.text();
    const parsedActualText = actualText.trim();
    expect(expectedText).to.eq(parsedActualText);
  });
});

Cypress.Commands.add("verificationSplitedText", (selector, expectedText) => {
  cy.get(selector, { timeout: 5000 }).then((element) => {
    let actualText = element.text().split(".")[0];
    const parsedActualText = actualText.trim();
    expect(expectedText).to.eq(parsedActualText);
  });
});

Cypress.Commands.add("compareTexts", (actualText, expectedText) => {
  const parsedActualText = actualText.trim();
  const parsedExpectedText = expectedText.trim();
  expect(parsedActualText).to.eq(parsedExpectedText);
});

// UI Flows
Cypress.Commands.add("navigateToTrackYourPackagePage", (TrackYourPackageUrl) => {
  cy.visitToAmazon();
  cy.viewport(1920, 1080);
  cy.loginToAccount(); // If Capcha appears need to clean page cookies
  cy.ClickOnElement("#nav-main", "Customer Service");
  cy.ClickOnElement(".help-topics li", `Where's my stuff`);
  cy.visit(TrackYourPackageUrl)
  cy.url().should('include', 'GENAFPTNLHV7ZACW')
});

// Another product was chosen because the requested product is not shipped to Israel and the task requires a check for the possibility of   shipping to Israel
Cypress.Commands.add("addProductToCartBySearch",(productDiscription, productId, addToCartVerification) => { 
    cy.searchForItem('input[name="field-keywords"]', productDiscription);
    cy.wait(1000);
    cy.findElement(`[data-asin=` + productId + `] [class="a-section aok-relative s-image-square-aspect"]`).click();
    cy.ClickOnElement("#add-to-cart-button", "Add to Cart");
    cy.verificationText("#sw-atc-details-single-container #NATC_SMART_WAGON_CONF_MSG_SUCCESS span", addToCartVerification);
  }
);

Cypress.Commands.add("addProductToCartByUrl",(productUrl,itemColorLocator ,colorVerification ,addToCartVerification,previousCartCount) => {
    cy.visit(productUrl);
    cy.findElement("#color_name_4").click();
    cy.wait(4000)
    cy.verificationText(".po-color .a-span9 span", colorVerification);
    cy.verificationText("#nav-cart-count", previousCartCount);
    cy.ClickOnElement("#add-to-cart-button", "Add to Cart");
    cy.verificationText("#sw-atc-details-single-container #NATC_SMART_WAGON_CONF_MSG_SUCCESS span", addToCartVerification);
  }
);

Cypress.Commands.add("CheckCartItems", (purchaseList) => {
  // navigation to cart
  cy.findElement("#sw-gtc span a").click();
  cy.findElement(`[data-name="Active Items"] .sc-list-item-content .a-truncate-cut`).each(($el, index) => {
    console.log(index, $el.text());
    expect($el.text()).to.contain(purchaseList[index]);
  });
});

Cypress.Commands.add("CheckFreeShippingProgresBar", () => {
  cy.get(".a-meter").invoke("attr", "aria-valuenow").then((ProgresValue) => {
      const IntProgresValue = parseInt(ProgresValue, 10);
      if (IntProgresValue == 100) {
        expect(true).to.be.true;
      } else {
        expect(false).to.be.false;
      }
    });
});

