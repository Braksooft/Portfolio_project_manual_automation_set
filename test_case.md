##Test Case: A/B Testing 
ID: 1.1
Title: Verification of opening page view in A/B Testing 
Environment: http://the-internet.herokuapp.com/
Version: 
Precondition: The user is not logged in and is on the homepage.
##Steps to Reproduce:
1.Open the A/B test page at http://the-internet.herokuapp.com/.
2.Identify the button to initiate the A/B Testing .
3.Click the "A/B Testing"button.
4.Observe whether the new page view opens correctly.
5.Check if the URL changes according to the expected.
##Expected Result:
After clicking the "A/B Testing" button, the user should be redirected to a new page view.
The URL should indicate the /abtest.
The new page view should be displayed correctly, without loading errors.
##End Conditions:
The user should be on the new page view.

##Test Case: Add/Remove Elements
ID: 2.1
Title: Verification of adding an element on the "Add/Remove Elements" page
Environment: http://the-internet.herokuapp.com
Version:
Precondition: The user is not logged in and is on the homepage.
##Steps to Reproduce:
1.Open the homepage at http://the-internet.herokuapp.com.
2.Identify the button to navigate to the "Add/Remove Elements" page.
3.Click the "Add/Remove Elements" button.
4.On the "Add/Remove Elements" page, locate the "Add Element" button.
5.Click the "Add Element" button.
6.Observe whether a new element "Delete" button appears in the viewport.
##Expected Result: 
After clicking the "Add Element" button, a new element should be added to the page.
The new element should be visible in the viewport without any loading errors.
##End Conditions:
The user should see at least one new element added to the page after clicking the "Add Element" button.

##Test Case: Basic Auth
ID: 3.1
Title: Verification of Basic Authentication on the Basic Auth page
Environment: https://the-internet.herokuapp.com
Version:
Precondition: The user is not logged in and is on the homepage.
##Steps to Reproduce:
1.Open the homepage at https://the-internet.herokuapp.com.
2.Identify and click the "Basic Auth" link.
3.A popup should appear asking for credentials.
4.Enter the username: admin and password: admin.
5.Click the "OK" button to submit the credentials.
6.Observe the message displayed after authentication.
##Expected Result:
If correct credentials (admin / admin) are entered, the user should see the message: "Congratulations! You must have the proper credentials."
If incorrect credentials are entered, a popup should appear again.
If press cancel button a popup should disappear and message should appear on page "Not authorized."
##End Conditions:
The user should be able to access the content behind Basic Auth only with valid credentials.
##Notes:
Ensure that you test both valid and invalid credentials to verify the functionality.
Check for any visual elements or alerts that confirm successful or failed authentication attempts.

##Test Case: Broken Images
ID: 4.1
Title: Verification of broken images on the "Broken Images" page
Environment: https://the-internet.herokuapp.com
Version:
Precondition: The user is not logged in and is on the homepage.
##Steps to Reproduce:
1.Open the homepage at https://the-internet.herokuapp.com.
2.Click the "Broken Images" link.
3.Observe the images displayed on the page.
4.For each image, check the HTTP status code of the image requests.
5.Verify that any broken images return a 404 status code.
##Expected Result:
The images that are broken should return a 404 status code when their requests are made.
Any valid images should return a 200 status code.
##End Conditions:
The user should be able to see which images are broken based on the status codes returned.