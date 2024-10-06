import { Page } from '@playwright/test';

export class Popup {
    constructor(protected page: Page) {}

    async catchPopup(): Promise<void> {
        try{
            const alertDialog = await this.page.waitForSelector('[class="modal-title"]',{ timeout: 5000})

            if(alertDialog){
                await this.page.locator("p").filter({hasText:/Close/}).click()
            }
        } catch(error){
            console.log('Popup did not apper.')
        }
    }}
