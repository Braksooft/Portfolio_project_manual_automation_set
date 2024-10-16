## Test Automation training

This is a example project to practice automation testing and test case writing task
The goal is to pass all test examples 

### Links

test site http://the-internet.herokuapp.com/


### Commands

    - check NodeJS version
    node -v
    - new project with Playwright
    npm init playwright@latest
    - record tests for given site
    npx playwright codegen http://the-internet.herokuapp.com/
    - run tests without browser GUI
    npx playwright test
    - run tests with browser GUI
    npx playwright test --headed
    - view report
    npx playwright show-report
    - Runs the tests in debug mode
    npx playwright test --debug
