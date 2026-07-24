import { Page, Locator } from '@playwright/test';

export class CheckboxesPage {
  readonly page: Page;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    this.checkbox2 = page.locator('input[type="checkbox"]').nth(1);
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkboxes');
  }

  async isChecked(checkboxLocator: Locator): Promise<boolean> {
    return await checkboxLocator.isChecked();
  }

  async check(checkboxLocator: Locator): Promise<void> {
    const checked = await checkboxLocator.isChecked();
    if (!checked) {
      await checkboxLocator.click();
    }
  }

  async uncheck(checkboxLocator: Locator): Promise<void> {
    const checked = await checkboxLocator.isChecked();
    if (checked) {
      await checkboxLocator.click();
    }
  }
}