import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Negatívne scenáre: vyhľadávanie neexistujúceho produktu', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  // 1. Zadať do vyhľadávania text „qwertynonsensesuperproduct123“
  await homePage.goto();
  await homePage.searchFor('qwertynonsensesuperproduct123');

  // 2. Overiť hlášku o nenájdení výsledkov, prázdny grid
  await searchResultsPage.verifyNoResults();

  // 3. Skontrolovať, či nezostali predchádzajúce výsledky
  // Skontrolovali sme v predchádzajúcom kroku vďaka .toHaveCount(0) nad zoznamom produktov.
  
  // 4. Skontrolovať, či je stránka vizuálne konzistentná
  // Overíme existenciu layoutu - header pre search zostal zachovaný
  // napríklad nadpis stránky 'Search'
  await searchResultsPage.page.locator('h1.heading1').waitFor();
});
