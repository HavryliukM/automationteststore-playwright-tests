import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Validácia URL, navigácie a breadcrumbs', async ({ page }) => {
  const homePage = new HomePage(page);

  // 1. Prejsť do kategórie Makeup
  await homePage.goto();
  await homePage.navigateToMakeup();

  // 2. Otvoriť podkategóriu (napr. "Cheeks")
  // Subkategórie sú na stránke Makeup ako odkazy v hlavnom obsahu
  await page.locator('a', { hasText: 'Cheeks' }).first().click();

  // 3. Overiť breadcrumb (Home > Makeup > Cheeks)
  const breadcrumbs = page.locator('ul.breadcrumb li');
  await expect(breadcrumbs.nth(0)).toContainText('Home');
  await expect(breadcrumbs.nth(1)).toContainText('Makeup');
  await expect(breadcrumbs.nth(2)).toContainText('Cheeks');

  // 4. Skontrolovať URL pattern
  expect(page.url()).toContain('path=');

  // 5. Vrátiť sa späť cez breadcrumb
  await breadcrumbs.nth(1).locator('a').click(); // Klik na 'Makeup'

  // 6. Overiť, že produkty sa zhodujú s pôvodnou kategóriou
  await expect(page.locator('.heading1 .maintext')).toContainText('Makeup');
});
