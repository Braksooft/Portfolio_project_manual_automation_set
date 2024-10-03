import { test, expect } from '@playwright/test';
import { Login } from '../pages/login';


test.describe('Basic test', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    console.log('Enter the page');
  });

  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('A/B Testing', async ({ page }) => {
    // Arrange
    const ABTestingLink = page.getByRole('link', { name: 'A/B Testing' })
    const expectedHeader = page.getByText("A/B Test Variation 1")

    // Act
    // Click the A/B Testing link.
    await ABTestingLink.click()

    // Assert
    // Expects page to have a heading with the name of A/B Test Variation 1.
    await expect(expectedHeader).toHaveText("A/B Test Variation 1")
    console.log('test A/B Testing - passed')
  });

  test('Add Elements', async ({ page }) => {
    // Arrange
    const AddRemoveLink = page.getByRole('link', { name: 'Add/Remove Elements' })
    const AddElements = page.getByRole('button', { name: "Add Element" })
    const expectedElement = page.getByRole('button', { name: "Delete" })

    // Act
    await AddRemoveLink.click()
    // Add Element
    await AddElements.click()

    // Assert
    await expect(expectedElement).toBeVisible
    console.log('test Add/Remove Elements - passed')
  });

  test('Add/Remove Elements', async ({ page }) => {
    // Arrange
    const AddRemoveLink = page.getByRole('link', { name: 'Add/Remove Elements' })
    const AddElements = page.getByRole('button', { name: "Add Element" })
    const DeleteElement = page.getByRole('button', { name: "Delete" })
    const expectedElement = page.getByRole('button', { name: "Delete" })

    // Act
    await AddRemoveLink.click()
    // Add Element
    await AddElements.click()
    // assert check flow
    // await AddElements.click()
    // await DeleteElement.first().click()
    await DeleteElement.click()

    // Assert
    await expect(expectedElement).not.toBeVisible()
    console.log('test Remove Elements - passed')
  })
  test('Basic Auth', async ({ page }) => {
    // Arrange
    const basicAuth = page.getByRole('link', { name: 'Basic Auth' })
    const expectedElement = page.locator("p").filter({ hasText: 'Congratulations! You must have the proper credentials.' })

    // Act
    const login = new Login(page)
    await basicAuth.click()
    //paste basic auth in link (temporary action)
    await login.basic_auth()

    // Assert
    await expect(expectedElement).toHaveText("Congratulations! You must have the proper credentials.")
    console.log('test Basic Auth - passed')
  })

  // check out the new solution for basic auth

  test('Broken Images', async ({ page }) => {
    // Arrange
    let is404 = false;

    // Act
    page.on('response', response => {
      if (response.status() === 404) {
        console.log(`The page returned a 404 error: ${response.url()}`);
        is404 = true
      }
    });

    await page.goto('https://the-internet.herokuapp.com/broken_images');

    // Assert
    expect(is404).toBe(false)
  })
  test('Challenging DOoooM', async ({ page }) => {
    // Arrange
    const challengDomLink = page.getByRole('link', { name: 'Challenging DOM' })
    //elements
    const blueButton = page.locator('[class="button"]')
    const redButton = page.locator('[class="button alert"]')
    const greenButton = page.locator('[class="button success"]')
    const apeirian4	 = page.getByText("Apeirian4")
    const edit6 = page.getByText('edit').nth(6);
    const answer = page.locator('[id="canvas"]')
  
    // Act
    await challengDomLink.click()
    await blueButton.click()
    await redButton.click()
    await greenButton.click()
    
    // Assert
    await expect(blueButton).toBeVisible()
    await expect(redButton).toBeVisible()
    await expect(greenButton).toBeVisible()
    await expect(apeirian4).toBeVisible()
    await expect(edit6).toBeVisible()
    await expect(answer).toBeInViewport()
  })
  test('Checkboxes', async ({ page }) => {
    // Arrange
    const checkboxeslink = page.getByRole('link', { name: 'Checkboxes'})
    const checkboxes1 = page.locator("input").first()
    const checkboxes2 = page.getByRole('checkbox').nth(1)
    //elements
   
    // Act
    await checkboxeslink.click()
    await checkboxes1.check()
    await checkboxes2.uncheck()
    
    // Assert
    await expect(checkboxes1).toBeChecked()
    await expect(checkboxes2).not.toBeChecked()
  })
  //to do
  test('Context Menu', async ({ page }) => {
    // Arrange
    const contexMenulink = page.getByRole('link', { name: 'Context Menu'})
    const boxelement = page.locator('[oncontextmenu="displayMessage()"]')
   
    // Act
    await contexMenulink.click()
    await page.waitForSelector('[oncontextmenu="displayMessage()"]')
    await boxelement.click({button:'right'})
    
    // Assert
    // await expect(checkboxes1).toBeChecked()
  })

  test('Digest Authentication ', async ({ page }) => {
    // Arrange
    //Api reqest
    //elements
   
    // Act
    
    // Assert
    
  })
  test('Disappearing Elements', async ({ page }) => {
    // Arrange
    const disappearlink = page.getByRole('link', { name: 'Disappearing Elements'})
    const galleryButton = page.getByRole("button",{name:'Gallery'})
   
    // Act
    await disappearlink.click()
    await page.waitForSelector('li')
    const liElement = page.locator('li');
    const licount = await liElement.count()
  
    // Assert
    console.log(`button elements on page ${licount}`)
    await expect.soft(licount).toEqual(5) 
  })
  test('Drag and Drop', async ({ page }) => {
    // Arrange
    const dragAndDropink = page.getByRole('link', { name: 'Drag and Drop'})
    const boxA = page.locator('#column-a')
    const boxB = page.locator('#column-b')
  
    // Act
    await dragAndDropink.click()
    await boxA.dragTo(boxB)
    
    // Assert
    await expect(boxA).toHaveText("B")
  })
  test('Dropdown List', async ({ page }) => {
    // Arrange
    const dropDownlink = page.getByRole('link', { name: 'Dropdown'})
    const dropdownElement = page.locator('#dropdown')
    
    // Act
    await dropDownlink.click()
    await dropdownElement.selectOption({index :1})
    
    // Assert
    await expect(page.locator('#dropdown')).toContainText('Please select an option Option 1');
  })
  test('Dynamic Content', async ({ page }) => {
    // Arrange
    const dynamiclink = page.getByRole('link', { name: 'Dynamic Content'})
    
    // Act
    await dynamiclink.click()
    await page.goto('/dynamic_content?with_content=static')

    // Assert
    const currentUrl = page.url();
    await expect(currentUrl).toEqual('http://the-internet.herokuapp.com/dynamic_content?with_content=static')
  })

});