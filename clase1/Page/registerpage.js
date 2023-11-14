const {Key, By, until} = require('selenium-webdriver');
var BasePage = require ('../Page/basepage');
const assert = require('assert');

class RegisterPage extends BasePage{

    SubmitButton(){
         return driver.findElement(By.css("button"))
    }

    async waitLoaded(){
        await driver.wait(until.elementIsVisible(this.SubmitButton()), this.defaultTimeout());
    }

    async fillForm(email, firstName, lastName, pass1, pass2){
        await driver.findElement(By.name("email")).sendKeys(email);
        await driver.findElement(By.name("firstName")).sendKeys(firstName);
        await driver.findElement(By.name("lastName")).sendKeys(lastName);
        await driver.findElement(By.name("password")).sendKeys(pass1);
        await driver.findElement(By.name("password2")).sendKeys(pass2);
    }

    async sendForm(){
        await driver.findElement(By.css("button")).click()
    }

    async checkValidationError(inputIndex, message, field){
        const selector = `form > div:nth-child(${inputIndex}) > div > div`
        
        try{
            await driver.wait(until.elementLocated((By.css(selector))), this.defaultTimeout())
            const alertText = await (await driver.findElement(By.css(selector))).getText()
            assert.equal(alertText, message)
        }catch{
            assert.fail(`${field} validation error not found`)
        }
    }

    async waitAlertPresent(){
        await driver.wait(until.elementLocated((By.className("alert-success"))), this.defaultTimeout())
    }

    async successAlert(){
        return await driver.findElement(By.className("alert-success"))
    }

}

module.exports = new RegisterPage();