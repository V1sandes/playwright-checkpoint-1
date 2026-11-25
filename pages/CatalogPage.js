export class CatalogPage {
  constructor(page) {
    this.page = page;
  }

  async search(query) {
    // BEGIN
    const searchInput = this.page.getByRole('searchbox').or(this.page.getByPlaceholder(/search/i));
    await searchInput.fill(query);
    // END
  }

  async selectBrand(brand) {
    // BEGIN
    const brandCheckbox = this.page.getByRole('checkbox', { name: brand, exact: true });
    await brandCheckbox.check();
    // END
  }

  async openProduct(name) {
    // BEGIN
    const card = this.page.locator('.card').filter({ hasText: name });
    await card.getByText(name, { exact: true }).first().click();
    // END
  }

  async nextPage() {
    // BEGIN
    await this.page.getByRole('link', { name: 'Next', exact: true }).first().click();
    // END
  }
}

