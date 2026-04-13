import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';

test('E2E Scenár: Vyhľadanie produktu a nákup', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);
  const cartPage = new CartPage(page);

  // 1. Otvoriť homepage Automation Test Store.
  await homePage.goto();

  // 2. Pomocou vyhľadávania nájsť produkt "Bronzer" - aby nás to nepresmerovalo hneď do detailu
  await homePage.searchFor('Bronzer');

  // 3. Overiť, že výsledky obsahujú hľadaný produkt.
  await searchResultsPage.verifyProductIncluded('Skinsheen Bronzer Stick');

  // 4. Otvoriť detail produktu.
  await searchResultsPage.openProduct('Skinsheen Bronzer Stick');

  // 5. Overiť názov produktu, cenu a dostupnosť
  await productDetailsPage.verifyProductDetails('Skinsheen Bronzer Stick');

  // 6. Pridať produkt do košíka.
  await productDetailsPage.addToCart();

  // 7. Overiť, že košík obsahuje 1 položku.
  // Automation Test Store po kliknutí na add to cart rovno presmeruje do košíka alebo ostane. 
  // Zvyčajne presmeruje do košíka, takže sme rovno v CartPage
  await cartPage.verifyItemCount(1);

  // 8. Prejsť do košíka (pre istotu, ak by nás to nepresmerovalo automaticky)
  // await homePage.goToCart();

  // 9. Overiť cenu a názov produktu v košíku.
  await cartPage.verifyProductInCart('Skinsheen Bronzer Stick');

  // 10. Odstrániť produkt z košíka a overiť, že košík je prázdny.
  await cartPage.removeItem(0);
  await cartPage.verifyCartIsEmpty();
});
