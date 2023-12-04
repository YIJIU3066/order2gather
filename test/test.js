require("chromedriver");

const { Builder, By, Key } = require("selenium-webdriver");
let assert = require("chai").assert;

describe('Visit Login', () => {
    it('Should Display Login Page', async () => {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000');
            await driver.findElement(By.xpath('/html/body/div/nav/div/div[2]/a'))
                        .click()

            await driver.findElement(By.xpath('/html/body/div/div/button'))
                        .click()
                        
            console.log("Test Passed")
        } finally {
            await driver.quit();
        }
    })
})