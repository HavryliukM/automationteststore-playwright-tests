import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly categoryMenuMakeup: Locator;
  readonly categoryMenuSkincare: Locator;
  readonly categoryMenuFragrance: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryMenuSkincare = page.locator('ul.categorymenu > li > a:has-text("Skincare")');
    this.categoryMenuMakeup = page.locator('ul.categorymenu > li > a:has-text("Makeup")');
    this.categoryMenuFragrance = page.locator('ul.categorymenu > li > a:has-text("Fragrance")');
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToSkincare() {
    await this.categoryMenuSkincare.click();
  }

  async navigateToMakeup() {
    await this.categoryMenuMakeup.click();
  }

  async navigateToFragrance() {
    await this.categoryMenuFragrance.click();
  }
}
