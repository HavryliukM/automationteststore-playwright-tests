import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';

test('Test kategórií + filtrácie', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);

  // 1. Prejsť do kategórie „Skincare“
  await homePage.goto();
  await homePage.navigateToSkincare();

  // 2. Overiť, že sa zobrazí zoznam produktov
  // Ak sú tam aspoň nejaké produkty, productGrids nájde viac než 0
  await categoryPage.productGrids.first().waitFor();

  // 3. Použiť dostupný filter („Sort By“ → „Name A–Z“)
  // automationteststore má option "Date Old > New", "Name A - Z"
  await categoryPage.sortBy('Name A - Z');

  // 4. Overiť, že produkty sú zoradené podľa názvu
  await categoryPage.verifyProductsAreSorted('asc');

  // 5. Otvoriť náhodný produkt a skontrolovať jeho detail
  // Otvoríme prvý produkt
  const firstProductName = await categoryPage.productNames.nth(0).innerText();
  await categoryPage.openProduct(firstProductName.trim());
});
