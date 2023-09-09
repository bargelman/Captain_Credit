import data from "../fixtures/data.json";

describe("Task 1", () => {

  it('Your Order button verification', () => {
    cy.navigateToTrackYourPackagePage(data.TrackYourPackageUrl);
    cy.ClickOnElement("[class=a-button-text]", "Your Orders");
    cy.verificationSplitedText(".a-section.a-spacing-top-medium.a-text-center" ,data.noPreviousOrderText);
 });
});

describe("Task 2", () => {

  beforeEach("Setup", () => {
    cy.visitToAmazon();
    cy.viewport(1920, 1080);
    cy.get("#nav-logo", { timeout: 10000 }).should("be.visible");
    cy.addProductToCartBySearch(data.itemForSearch, data.itemForSearchId, data.addToCartVerification);
    cy.addProductToCartByUrl(data.itemUrl, data.itemColorLocator, data.itemUrlColor, data.addToCartVerification, data.previousCartCount);
    cy.CheckCartItems(data.purchaseList);
  });

  it("Verify free shipping isn't avalible", () => {
    cy.CheckFreeShippingProgresBar();
  });

  it("Verify free shipping avalible", () => {
    cy.get('[data-asin="B07PBT2K43"] [data-action="a-dropdown-button"]').click();
    cy.get('[aria-labelledby="quantity_3"]', { timeout: 5000 }).click();
    cy.CheckFreeShippingProgresBar();
  });

  afterEach("CleanUp", () => {
    cy.findElement(`[data-asin="B07PBT2K43"] [value="Delete"]`).click();
    cy.findElement(`[data-asin="B08T1F2XN3"] [value="Delete"]`).click();
  });
});
