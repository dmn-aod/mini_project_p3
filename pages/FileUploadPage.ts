import { Page, Locator } from '@playwright/test';

// Page Object cho trang File Upload
// URL: https://the-internet.herokuapp.com/upload

export class FileUploadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFileName: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Input file ẩn (type="file")
    this.fileInput = page.locator('#file-upload');
    
    // Nút submit để upload
    this.uploadButton = page.locator('#file-submit');
    
    // Hiển thị tên file đã upload (sau khi submit)
    this.uploadedFileName = page.locator('#uploaded-files');
    
    // Tiêu đề trang confirm upload thành công
    this.successHeading = page.locator('h3');
  }

  // Điều hướng đến trang upload
  async goto(): Promise<void> {
    await this.page.goto('/upload');
  }

  // Upload file theo đường dẫn tuyệt đối
  async uploadFile(filePath: string): Promise<void> {
    // setInputFiles cho phép upload file mà không cần mở dialog
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  // Lấy tên file đã upload thành công
  async getUploadedFileName(): Promise<string> {
    await this.uploadedFileName.waitFor({ state: 'visible' });
    return await this.uploadedFileName.innerText();
  }

  // Kiểm tra upload có thành công không (dựa vào heading)
  async isUploadSuccessful(): Promise<boolean> {
    const heading = await this.successHeading.innerText();
    return heading.includes('File Uploaded');
  }
}