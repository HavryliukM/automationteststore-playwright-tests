import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly productNames: Locator;
  readonly removeButtons: Locator;
  readonly emptyCartMessage: Locator;
  readonly updateCartButton: Locator;
  
  constructor(page: Page) {
    super(page);
    // V tabuľke košíka
    this.cartItems = page.locator('table.table-striped tbody tr:has(td)'); // Každý riadok s produktom
    this.productNames = page.locator('table.table-striped tbody tr td.align_left a');
    this.removeButtons = page.locator('a[href*="remove"]');
    this.emptyCartMessage = page.locator('.contentpanel .alert-info, .contentpanel .alert-block, .contentpanel .content'); // Môže to byť div s textom "Your shopping cart is empty!"
    this.updateCartButton = page.locator('#cart_update');
  }

  async verifyItemCount(count: number) {
    // Košík môže mať extra riadky (total, etc.), preto count overujeme podľa removeButtons alebo podobne
    await expect(this.removeButtons).toHaveCount(count);
  }

  async verifyProductInCart(name: string) {
    await expect(this.productNames.filter({ hasText: name })).toBeVisible();
  }

  async removeItem(index: number = 0) {
    await this.removeButtons.nth(index).click();
  }

  async verifyCartIsEmpty() {
    await expect(this.page.locator('.contentpanel')).toContainText('Your shopping cart is empty!');
  }

  async updateQuantity(productName: string, qty: string) {
    const row = this.page.locator(`table.table-striped tbody tr`, { has: this.page.locator(`text=${productName}`) });
    const qtyInput = row.locator('input[name*="quantity"]');
    await qtyInput.fill(qty);
    await this.updateCartButton.click();
  }
}
