import { test, expect } from '@playwright/test';
import { Login } from '../pages/login';
import { Popup } from '../pages/popup-killer';


test.describe('Basic test', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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
    expect(is404).toBe(true)
    console.log('test Broken Images - passed')
  })
  test('Challenging DOoooM', async ({ page }) => {
    // Arrange
    const challengDomLink = page.getByRole('link', { name: 'Challenging DOM' })
    //elements
    const blueButton = page.locator('[class="button"]')
    const redButton = page.locator('[class="button alert"]')
    const greenButton = page.locator('[class="button success"]')
    const apeirian4 = page.getByText("Apeirian4")
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
    console.log('test Challenging DOoooM - passed')
  })
  test('Checkboxes', async ({ page }) => {
    // Arrange
    const checkboxeslink = page.getByRole('link', { name: 'Checkboxes' })
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
    console.log('test Checkboxes - passed')
  })
  //to do
  test('Context Menu', async ({ page }) => {
    // Arrange
    const contexMenulink = page.getByRole('link', { name: 'Context Menu' })
    const boxelement = page.locator('[oncontextmenu="displayMessage()"]')

    // Act
    await contexMenulink.click()
    await page.waitForSelector('[oncontextmenu="displayMessage()"]')
    await boxelement.click({ button: 'right' })

    // Assert
    // await expect(checkboxes1).toBeChecked()
    console.log('test Context Menu- to fix')
  })

  test('Digest Authentication ', async ({page, browser }) => {
    // Arrange
    const username = 'admin';
    const password = 'admin';
    const url = "http://the-internet.herokuapp.com/digest_auth"
    

    const context = await browser.newContext({
      httpCredentials: {
        username: username,
        password: password,
      },
    });
  
    const newPage = await context.newPage();
    // Act
    await newPage.goto(url);
    const successMessage = newPage.getByText("Congratulations! You must have the proper credentials.")

    // Assert
    await expect(successMessage).toBeVisible()
    console.log('Digest Authentication - passed');
  })
  test('Disappearing Elements', async ({ page }) => {
    // Arrange
    const disappearlink = page.getByRole('link', { name: 'Disappearing Elements' })
    const galleryButton = page.getByRole("button", { name: 'Gallery' })

    // Act
    await disappearlink.click()
    await page.waitForSelector('li')
    const liElement = page.locator('li');
    const licount = await liElement.count()

    // Assert
    console.log(`button elements on page ${licount}`)
    await expect.soft(licount).toEqual(5)
    console.log('test Disappearing Elements - passed')
  })
  test('Drag and Drop', async ({ page }) => {
    // Arrange
    const dragAndDropink = page.getByRole('link', { name: 'Drag and Drop' })
    const boxA = page.locator('#column-a')
    const boxB = page.locator('#column-b')

    // Act
    await dragAndDropink.click()
    await boxA.dragTo(boxB)

    // Assert
    await expect(boxA).toHaveText("B")
    console.log('test Drag and Drop - passed')
  })
  test('Dropdown List', async ({ page }) => {
    // Arrange
    const dropDownlink = page.getByRole('link', { name: 'Dropdown' })
    const dropdownElement = page.locator('#dropdown')

    // Act
    await dropDownlink.click()
    await dropdownElement.selectOption({ index: 1 })

    // Assert
    await expect(page.locator('#dropdown')).toContainText('Please select an option Option 1');
    console.log('test Dropdown List - passed')
  })
  test('Dynamic Content', async ({ page }) => {
    // Arrange
    const dynamiclink = page.getByRole('link', { name: 'Dynamic Content' })

    // Act
    await dynamiclink.click()
    // adding parameters to a link
    await page.goto('/dynamic_content?with_content=static')

    // Assert
    const currentUrl = page.url();
    await expect(currentUrl).toEqual('http://the-internet.herokuapp.com/dynamic_content?with_content=static')
    console.log('test Dynamic Content - passed')
  })

  test('Dynamic Controls #1', async ({ page }) => {
    // Arrange
    const dynamiclink = page.getByRole('link', { name: 'Dynamic Controls' })
    const buttonRemove = page.locator('[onclick="swapCheckbox()"]')
    const expectedMessage = page.locator("#message")
    // Act
    await dynamiclink.click()
    await buttonRemove.click()
    // Assert
    await expect(expectedMessage).toContainText("It's gone!");
    console.log('test Dynamic Controls #1 - passed')
  })

  test('Dynamic Controls #2', async ({ page }) => {
    // Arrange
    const dynamiclink = page.getByRole('link', { name: 'Dynamic Controls' })
    const buttonEnable = page.locator('[onclick="swapInput()"]')
    const inputtext = page.locator("input").last()
    const expectedMessage = page.locator("#message")
    // Act
    await dynamiclink.click()
    await buttonEnable.click()
    await inputtext.fill("Enable field text")

    // Assert
    await expect(expectedMessage).toContainText("It's enabled!")
    console.log('test Dynamic Controls #2 - passed')
  })
  test('Dynamically Loaded Page Elements #1', async ({ page }) => {
    // Arrange
    const dynamiclink = page.getByRole('link', { name: 'Dynamic Loading' })
    const exampleOne = page.getByText("Example 1")
    const helloWorldMessage = page.locator("#finish")
    const startButton = page.locator("button").filter({ hasText: "Start" })

    // Act
    await dynamiclink.click()
    await exampleOne.click()
    // Checking element state 
    // await expect(helloWorldMessage).toBeHidden()
    // await expect(helloWorldMessage).toBeVisible()
    await startButton.click()
    await page.waitForLoadState('load')

    // Assert
    await expect(helloWorldMessage).toBeVisible()
    await expect(helloWorldMessage).toContainText("Hello World!")
    console.log('test Dynamically Loaded Page Elements #1 - passed')
  })
  test('Dynamically Loaded Page Elements #2', async ({ page }) => {
    // Arrange
    const dynamiclink = page.getByRole('link', { name: 'Dynamic Loading' })
    const exampleOne = page.getByText("Example 2")
    const helloWorldMessage = page.locator("#finish")
    const startButton = page.locator("button").filter({ hasText: "Start" })

    // Act
    await dynamiclink.click()
    await exampleOne.click()
    await startButton.click()
    await page.waitForLoadState('load')

    // Assert
    await expect(helloWorldMessage).toBeVisible()
    await expect(helloWorldMessage).toContainText("Hello World!")
    console.log('test Dynamically Loaded Page Elements #2 - passed')
  })
  test('Entry Ad', async ({ page }) => {
    // Arrange
    const enterlink = page.getByRole('link', { name: 'Entry Ad' })
    const expectMessage = page.getByText("This is a modal window")
    const popup = new Popup(page)

    // Act
    await enterlink.click()
    await popup.catchPopup()
    // Assert
    await expect(expectMessage).not.toBeInViewport()
    console.log('test Entry Ad- passed')
  })
  test('Exit Intent', async ({ page }) => {
    // Arrange
    const exitlink = page.getByRole('link', { name: 'Exit Intent' })
    const expectMessage = page.getByText("This is a modal window")
  
    // Act
    await exitlink.click()
    await page.waitForLoadState("domcontentloaded")
    await page.mouse.move( 500, 500);
    await page.mouse.move( 500, -10);

    // Assert
    await expect(expectMessage).toBeVisible()
    console.log('test Exit Intent - passed')
  })
  test('File Download', async ({ page }) => {

    // this case to rethink

    // // Arrange
    // const downloadlink = page.getByRole('link', { name: 'File Download' })
   
    // // Act
    // await downloadlink.click()
  
    // // Assert
    console.log('test To Do  - passed')
  })
  test('File Uploader #1', async ({ page }) => {
    // // Arrange
    const filePath = './file_input/example.jpg';
    const uploadlink = page.getByRole('link', { name: 'File Upload' })
    const chooseFile = page.locator('#file-upload')
    const uploadFile = page.locator('#file-submit')
    const expectMessage = page.getByText('File Uploaded!')
   
    // // Act
    await uploadlink.click()
    await chooseFile.setInputFiles(filePath)
    await uploadFile.click()

    // // Assert
    await expect(expectMessage).toHaveText("File Uploaded!");
    console.log('test Uploader #1 - passed')
  })
  test('Drag and Drop File Upload', async ({ page }) => {
    // Arrange
    const filePath = './file_input/example.jpg';
    const uploadlink = page.getByRole('link', { name: 'File Upload' })
    // const uploadFile = page.locator('#file-submit')
    const uploadArea = page.locator('#drag-drop-upload');
    const successMessage = page.getByText('example.jpg');
  
    // Act
    await uploadlink.click()

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      uploadArea.click(), 
    ]);
    await fileChooser.setFiles(filePath);

    // await uploadFile.click()
    // affter upload Internal Server Error :) 

    await expect(successMessage).toBeVisible();
    console.log('Drag and Drop File Upload - passed');
  });
  test('Floating Menu', async ({ page }) => {
    // // Arrange
    const floatinglink = page.getByRole('link', { name: 'Floating Menu' })
    const targetElement = page.locator("p").nth(3)
    const homeMenu = page.locator("li").filter({hasText: "Home"})
    
  
   
    // // Act
    await floatinglink.click()
    await targetElement.scrollIntoViewIfNeeded();
    await homeMenu.click();
    const currentURL = page.url()
  
    // // Assert
    await expect(currentURL).toBe('http://the-internet.herokuapp.com/floating_menu#home');
    console.log('test Uploader #1 - passed')
  })
  test('Form Authentication', async ({ page }) => {
    // // Arrange
    const formlink = page.getByRole('link', { name: 'Form Authentication' })
    const expectErrorMessage = page.locator('[class="flash error"]')
    const expectSuccessMessage = page.locator('[class="flash success"]')
    const login = ["tomsmith","SuperSecretPassword!"]
    const loginincorrect = ["test","test2"]
    const username = page.locator('[id="username"]')
    const password = page.locator('[id="password"]')
    const loginButton = page.locator('[type="submit"]')
    
    // // Act
    await formlink.click()
    await username.fill(loginincorrect[0])
    await password.fill(loginincorrect[1])
    await loginButton.click()
    await expect(expectErrorMessage).toContainText('Your username is invalid!');

    await username.fill(login[0])
    await password.fill(login[1])
    await loginButton.click()
    
    await expect(expectSuccessMessage).toContainText(' You logged into a secure area! ');

    // // Assert
    console.log('test Form Authentication - passed')
  })
});