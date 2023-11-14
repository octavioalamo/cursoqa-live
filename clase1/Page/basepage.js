var webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.manage().setTimeouts({implicit: (10000)});

class BasePage{
    constructor(){
        global.driver = driver;
    }

    defaultTimeout(){
        return 10000
    }
    async go_to_url(theURL){
        await driver.get(theURL);
    }
    
    async maximize(){
        await driver.manage().window().maximize() 
    }
    
    async enterTextByCss(css, searchText){
        await driver.findElement(By.css(css)).sendKeys(searchText);
    }
    async clickById(id){
        await driver.findElement(By.id(id)).click();
    }
    async closeBrowser(){
        await driver.quit();
    }
}

module.exports = BasePage;