import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage';

test.describe('Dropdown Feature', () => {
  let dropdownPage: DropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.goto();
  });

  test('TC07 — Chọn Option 1 từ dropdown', async () => {
    // Chọn Option 1 theo value attribute
    await dropdownPage.selectByValue('1');
    
    // Verify value đã được chọn
    const selectedValue = await dropdownPage.getSelectedOption();
    expect(selectedValue).toBe('1');
    
    // Verify text hiển thị đúng
    const selectedText = await dropdownPage.getSelectedOptionText();
    expect(selectedText).toContain('Option 1');
  });

  test('TC08 — Chọn Option 2 từ dropdown', async () => {
    // Chọn Option 2 theo label text
    await dropdownPage.selectByLabel('Option 2');
    
    // Verify value đã được chọn
    const selectedValue = await dropdownPage.getSelectedOption();
    expect(selectedValue).toBe('2');
  });

  test('TC09 — Verify trạng thái mặc định ban đầu của dropdown', async () => {
    // Theo trang demo the-internet, trạng thái mặc định ban đầu chưa chọn option hợp lệ (value trống hoặc text là "Please select an option")
    const selectedText = await dropdownPage.getSelectedOptionText();
    expect(selectedText).toContain('Please select an option');
  });
});