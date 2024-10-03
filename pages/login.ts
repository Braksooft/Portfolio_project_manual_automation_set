import { Page } from '@playwright/test';

export class Login {
    constructor(protected page: Page) {}

    async basic_auth(): Promise<void> {
         await this.page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth");
    }
}
