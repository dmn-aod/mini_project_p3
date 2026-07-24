import { Page, Locator } from '@playwright/test';

// Page Object cho trang Dropdown
// URL: https://the-internet.herokuapp.com/dropdown

export class DropdownPage {
  readonly page: Page;
  readonly dropdownSelect: Locator;

  constructor(page: Page) {
    this.page = page;

    // Dropdown select element
    this.dropdownSelect = page.locator('#dropdown');
  }

  // Điều hướng đến trang dropdown
  async goto(): Promise<void> {
    await this.page.goto('/dropdown');
  }

  // Chọn option theo value attribute
  async selectByValue(value: string): Promise<void> {
    await this.dropdownSelect.selectOption({ value: value });
  }

  // Chọn option theo text hiển thị
  async selectByLabel(label: string): Promise<void> {
    await this.dropdownSelect.selectOption({ label: label });
  }

  // Lấy giá trị value của option đang được chọn
  async getSelectedOption(): Promise<string> {
    return await this.dropdownSelect.inputValue();
  }

  // Lấy text hiển thị của option đang được chọn
  async getSelectedOptionText(): Promise<string> {
    const selectedValue = await this.dropdownSelect.inputValue();
    // Lấy text của option có value tương ứng
    return await this.dropdownSelect.locator(`option[value="${selectedValue}"]`).innerText();
  }
}