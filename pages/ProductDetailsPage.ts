import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly stockStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('h1.productname, .maintext').first();
    this.productPrice = page.locator('.productprice, .productpageprice').first();
    this.addToCartButton = page.locator('a.cart, .cart').first();
    this.stockStatus = page.locator('.productinfo .instock, .productinfo .outofstock').first();
  }

  async verifyProductDetails(expectedName: string) {
    // Čakáme kým sa zmení URL a heading je viditeľný
    await expect(this.productName).toBeVisible({ timeout: 15000 });
    await expect(this.productName).toContainText(expectedName);
    await expect(this.productPrice).toBeVisible();
  }

  async addToCart() {
    // Tlačidlo musí byť nielen viditeľné ale aj stabilné
    await this.addToCartButton.waitFor({ state: 'visible' });
    await this.addToCartButton.click();
    // Počkáme na akciu (košík sa často loaduje)
    await this.page.waitForLoadState('load');
  }
}
