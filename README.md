# Daraz E2E Tests using Playwright
​
This repository contains End-to-End (E2E) tests for the Daraz website implemented using Playwright. The tests are organized in spec file located in the [e2e](./e2e/) folder, with the main test logic encapsulated in a Page Object Model (POM) file named [darazPO.js](./e2e/darazPO.js).
​
## Dependencies
​
Before running the tests, make sure to install the necessary dependencies using npm:
​
```bash
npm install
```
​
# Running the Tests
To execute the E2E tests, you can use the following npm script:
```bash
npm run test
```
​
# Test File
[e2e/daraz.spec.js](./e2e/daraz.spec.js): Contains all the test cases for different functionalities on the Daraz website.
Test Cases
1. Verify Cart Is Empty
Description: This test verifies that the cart is initially empty.
Test Command: npm run test
2. Add to Cart Samsung Mobiles (Price: 25K-80K) and Update Quantity
Description: This test adds a Samsung mobile to the cart, specifies a price range, and updates the quantity.
Test Command: npm run test
3. Add to Cart Samsung Mobiles (Android 12) and Remove from Cart
Description: This test adds a Samsung mobile with Android 12 to the cart and then removes it from the cart.
Test Command: npm run test
4. Add to Cart Samsung Mobiles (Free Delivery, Price < 50K)
Description: This test adds a Samsung mobile to the cart with free delivery and a price less than 50K.
Test Command: npm run test
​
# Page Object Model (POM)
The main test logic and interactions with the Daraz website are encapsulated in the [darazPO.js](./e2e/darazPO.js) file. This follows the Page Object Model design pattern, making the tests more maintainable and readable.
