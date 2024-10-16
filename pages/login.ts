import { Page } from '@playwright/test';

export class Login {
    constructor(protected page: Page) { }

    async basic_auth(): Promise<void> {
        await this.page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth");
    }
    // async basic_auth_negativ(): Promise<void> {
    //     const canceButton = this.page.getByRole('button', { name: 'cancel' })
    //     this.page.goto("http://test:test@the-internet.herokuapp.com/basic_auth");
    //     await canceButton.click()
    // }
}
