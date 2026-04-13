import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  readonly sortBySelect: Locator;
  readonly productGrids: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    super(page);
    this.sortBySelect = page.locator('#sort');
    this.productGrids = page.locator('.thumbnails .col-md-3.col-sm-6.col-xs-12');
    this.productNames = page.locator('.thumbnails .col-md-3.col-sm-6.col-xs-12 .prdocutname');
  }

  async sortBy(option: string) {
    // e.g. "Name A - Z" value is often "pd.name-ASC" or "p.sort_order-ASC", but we might select by label
    await this.sortBySelect.selectOption({ label: option });
    // Počkáme, kým sa stránka nezaktualizuje
    await this.page.waitForLoadState('load');
  }

  async verifyProductsAreSorted(direction: 'asc' | 'desc') {
    const titles = await this.productNames.allTextContents();
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
    if (direction === 'desc') {
      sortedTitles.reverse();
    }
    expect(titles).toEqual(sortedTitles);
  }

  async openProduct(name: string) {
    const link = this.page.locator(`a.prdocutname`).filter({ hasText: name }).first();
    await link.click();
    await this.page.waitForLoadState('load');
  }
}
