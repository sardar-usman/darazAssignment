const { test, expect, chromium } = require("@playwright/test");
import exp from "constants";
import { darazSelector, loginDaraz, addToCart, cartEmpty } from "../e2e/darazPO";

test.describe.serial("DARAZ E2E", () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await loginDaraz(page);
  });
  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });

  test("Verify Cart Is Emprty", async () => {
    await darazSelector.darazCartIcon(page).click();
    await page.waitForLoadState('domcontentloaded');
    const cartEmptyText = await darazSelector.darazCartEmptyText(page).isVisible()
    await cartEmpty(cartEmptyText, page)
  });


  test("Add to Cart Samsung Mobiles (Price: 25K-80K) and Update Quantity", async () => {
    await darazSelector.darazSearchTextBox(page).type("samsung mobile");
    await darazSelector.darazSearchButton(page).click();
    await darazSelector.darazCashOnDeliveryPromotion(page).first().click();
    await page.waitForLoadState('load');
    await darazSelector.darazMinimumPriceFilterTextbox(page).type("25000");
    await darazSelector.darazMaximumPriceFilterTextbox(page).type("80000");
    await darazSelector.darazPriceFilterApplyButton(page).click();
    await page.waitForLoadState('load');
    await expect(darazSelector.darazPriceFilterTag(page)).toBeVisible();
    await addToCart(darazSelector.darazSearchResultProducts, page);
    //update product quantites in cart
    await darazSelector.darazCartIcon(page).click();
    await darazSelector.darazCartProductQuantityTextBox(page).first().clear();
    await darazSelector.darazCartProductQuantityTextBox(page).first().type("2");
    //Remove All Products From The Cart
    await darazSelector.darazCartSelectAllProductCheckbox(page).click();
    await darazSelector.darazDeleteAllProductsButton(page).click();
    await darazSelector.darazRemoveAllProductsConfirmationButton(page).click();
    await page.goBack();
    await darazSelector.darazHeaderLogo(page).click();
  });


  test("Add to Cart Samsung Mobiles (Android 12) and Remove from Cart", async () => {
    await darazSelector.darazSearchTextBox(page).type("samsung mobile android 12");
    await darazSelector.darazSearchButton(page).click();
    await darazSelector.darazMobileCategoryFilter(page).click();
    await page.waitForLoadState('load');
    await darazSelector.darazSamsungBrandCheckboxFilter(page).click();
    await page.waitForLoadState('load');
    await expect(darazSelector.darazBrandFilterTag(page)).toBeVisible();
    await addToCart(darazSelector.darazSearchResultProducts, page);
    await darazSelector.darazCartIcon(page).click();
    await darazSelector.darazCartSelectAllProductCheckbox(page).click();
    await darazSelector.darazProceedToCheckoutButton(page).click();
    //Remove Single Product From Checkout Page
    await darazSelector.darazCheckoutDeleteIcon(page).first().click();
    await darazSelector.darazCheckoutDeleteButton(page).click();
    await page.goBack();
    // await darazSelector.darazHeaderLogo(page).click();
    // Remove All Products From The Cart
    // await darazSelector.darazCartIcon(page).click();
    // await darazSelector.darazCartSelectAllProductCheckbox(page).click();
    await darazSelector.darazDeleteAllProductsButton(page).click();
    await darazSelector.darazRemoveAllProductsConfirmationButton(page).click();
    await page.goBack();
    await darazSelector.darazHeaderLogo(page).click();
  });


  test("Add to Cart Samsung Mobiles (Free Delivery, Price < 50K)", async () => {
    await darazSelector.darazSearchTextBox(page).type("samsung mobile");
    await darazSelector.darazSearchButton(page).click();
    await darazSelector.darazFreeDeliveryPromotion(page).first().click();
    await page.waitForLoadState('load');
    await darazSelector.darazCashOnDeliveryPromotion(page).first().click();
    await page.waitForLoadState('load');
    await darazSelector.darazMaximumPriceFilterTextbox(page).type("50000");
    await darazSelector.darazPriceFilterApplyButton(page).click();
    await page.waitForLoadState('load');
    await expect(darazSelector.darazPriceFilterTag(page)).toBeVisible();
    await addToCart(darazSelector.darazSearchResultProducts, page);
  });

});
