import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  readonly productNames: Locator;
  readonly emptyContentMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productNames = page.locator('.thumbnails .prdocutname');
    this.emptyContentMessage = page.locator('.contentpanel div:text-matches("There is no product that matches the search criteria.", "i")');
  }

  async verifyProductIncluded(expectedName: string) {
    const product = this.page.locator(`a.prdocutname`).filter({ hasText: expectedName });
    await expect(product.first()).toBeVisible();
  }

  async openProduct(expectedName: string) {
    const link = this.page.locator(`a.prdocutname`).filter({ hasText: expectedName }).first();
    await link.click();
    // Počkáme na navigáciu
    await this.page.waitForLoadState('load');
  }

  async verifyNoResults() {
    await expect(this.emptyContentMessage).toBeVisible();
    await expect(this.productNames).toHaveCount(0);
  }
}
