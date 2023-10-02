const { test, expect, chromium } = require("@playwright/test");

export const darazSelector = {
  darazAffiliateProgramLink: (page) => {
    return page.locator("//a[.='Daraz Affiliate Program']");
  },
  darazHeaderLogo: (page) => {
    return page.locator("//img[@alt='Daraz']");
  },
  darazSearchTextBox: (page) => {
    return page.locator("//input[@placeholder='Search in Daraz']");
  },
  darazSearchButton: (page) => {
    return page.locator("//button[.='SEARCH']");
  },
  darazMinimumPriceFilterTextbox: (page) => {
    return page.locator("//input[@placeholder='Min']", {
      waitUntil: "networkidle"
    });
  },
  darazMaximumPriceFilterTextbox: (page) => {
    return page.locator('//input[@placeholder="Max"]', {
      waitUntil: "networkidle"
    });
  },
  darazPriceFilterApplyButton: (page) => {
    return page.locator("//button[.='Apply']", {
      waitUntil: "networkidle"
    });
  },
  darazMobileCategoryFilter: (page) => {
    return page.locator("//a[.='Mobiles']");
  },
  darazPriceFilterTag: (page) => {
    return page.locator("//span[contains(text(),'Price')]");
  },
  darazBrandFilterTag: (page) => {
    return page.locator("//div[@class='ant-tag']//child::span[contains(text(),'Brand')]")
  },
  darazAddToCartButton: (page) => {
    return page.locator("//button[.='Add to Cart']", {
      waitUntil: "networkidle",
    });
  },
  darazdialogueCloseButton: (page) => {
    return page.locator(
      "//div[@class='cart-modal']//parent::div//following-sibling::a"
    );
  },
  darazLoginIcon: (page) => {
    return page.locator("//a[.='Login']");
  },
  darazLoginEmailTextBox: (page) => {
    return page.locator(
      "//input[@placeholder='Please enter your Phone Number or Email']"
    );
  },
  darazLoginPasswordTextBox: (page) => {
    return page.locator("//input[@placeholder='Please enter your password']");
  },
  darazLoginButton: (page) => {
    return page.locator("//button[.='LOGIN']");
  },
  darazSearchResultProducts: (page) => {
    return page.$$("//div[@data-qa-locator='product-item']");
  },
  darazCartIcon: (page) => {
    return page.locator("//span[@class='cart-icon']");
  },
  darazCartProductQuantityTextBox: (page) => {
    return page.locator(
      "//div[@class='quantity automation-item-quantity']//descendant::input"
    );
  },
  darazCartSelectAllProductCheckbox: (page) => {
    return page.locator(
      "//div[@class='list-header-container']//descendant::input"
    );
  },
  darazDeleteAllProductsButton: (page) => {
    return page.locator("//span[.='Delete']");
  },
  darazRemoveAllProductsConfirmationButton: (page) => {
    return page.locator("//button[.='REMOVE']");
  },
  darazFreeDeliveryPromotion: (page) => {
    return page.locator("//div[.='Free Delivery']");
  },
  darazCashOnDeliveryPromotion: (page) => {
    return page.locator("//div[.='Cash On Delivery']");
  },
  darazProductOutOfStockLabel: (page) => {
    return page.locator("//span[.='Out of stock']");
  },
  darazSamsungBrandCheckboxFilter: (page) => {
    return page.locator("//span[.='Samsung']//preceding-sibling::span//child::input", {
      waitUntil: "networkidle",
    })
  },
  darazProceedToCheckoutButton: (page) => {
    return page.locator("//button[contains(text(),'PROCEED TO CHECKOUT')]")
  },
  darazCheckoutDeleteIcon: (page) => {
    return page.locator("//span[@class='automation-btn-delete']//child::span")
  },
  darazCheckoutDeleteButton: (page) => {
    return page.locator("//button[.='Delete']")
  },
  darazCartEmptyText: (page) => {
    return page.locator("//div[@class='cart-empty-text']")
  }

};

//Function for loggin in to daraz
export async function loginDaraz(page) {
  await page.goto("/");
  await darazSelector.darazLoginIcon(page).click();
  await darazSelector.darazLoginEmailTextBox(page).fill("03027060398");
  await darazSelector.darazLoginPasswordTextBox(page).type("usman12345");
  await darazSelector.darazLoginButton(page).click();
  await page.waitForLoadState('load');
}

//Function for removing products from cart
export async function cartEmpty(cartEmptyText, page) {
  if(cartEmptyText){
    await expect(darazSelector.darazCartEmptyText(page)).toBeVisible();
    await page.goBack()
  }else{
    await darazSelector.darazCartSelectAllProductCheckbox(page).click();
    await darazSelector.darazDeleteAllProductsButton(page).click();
    await darazSelector.darazRemoveAllProductsConfirmationButton(page).click();
    await expect(darazSelector.darazCartEmptyText(page)).toBeVisible();
    await page.goBack();
  }
  
}


//Function for adding products to cart
export async function addToCart(productsSelector, page) {
  const products = await productsSelector(page);

  for (let i = 0; i < 2; i++) {
    const products = await productsSelector(page);
    const item = products[i];
    await item.click();
    const outOfStock = await darazSelector.darazProductOutOfStockLabel(page);
    if (await outOfStock.isVisible()) {
      await page.goBack();
    } else {
      //   await page.waitForTimeout(5000);
      await darazSelector.darazAddToCartButton(page).click();
      await page.goBack();
    }
    await page.waitForSelector('div[data-qa-locator="product-item"]');
  }
}
