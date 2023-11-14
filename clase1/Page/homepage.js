const {Key} = require('selenium-webdriver');
var BasePage = require ('../Page/basepage');
const RegisterPage = require('../Page/registerpage')

class HomePage extends BasePage{
    async enter_url(theURL){
        await this.go_to_url(theURL);
    }

    async goto_SignUp(){
        await this.clickById("sign_up")
        await RegisterPage.waitLoaded()
    }

}
module.exports = new HomePage();