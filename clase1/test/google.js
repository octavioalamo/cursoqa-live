const assert = require('assert');
const {By,Key,Builder,until} = require("selenium-webdriver");

const SeleniumHelper = require('../common/seleniumHelper.js')


require("chromedriver"); 
//require("geckodriver");

const timeout = 10000;



describe("Navegación con Google", function () {
    this.timeout(50000);

    it("should show the correct title", async function(){
        var searchString = "meneame";

        const driver = await new Builder().forBrowser("chrome").build();

        const helper = new SeleniumHelper(driver) 
    
        await driver.get("http://google.com");
    
        await driver.findElement(By.id("L2AGLb")).click()
    
        await helper.waitDOMReady()

        await driver.findElement(By.name("q")).sendKeys(searchString, Key.RETURN);

        await driver.wait(until.elementIsVisible(await driver.findElement(By.id('result-stats')), timeout))
    
        var title = await driver.getTitle();
        assert.equal(title, 'meneame - Buscar con Google');
    
        await driver.quit()
    })
})
