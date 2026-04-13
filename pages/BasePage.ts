import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartTopIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input#filter_keyword');
    this.searchButton = page.locator('div.button-in-search');
    this.cartTopIcon = page.locator('.topcart .dropdown-toggle');
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('load');
  }

  async goToCart() {
    await this.cartTopIcon.click();
  }
}
