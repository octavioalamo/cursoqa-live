const homepage = require('../Page/homepage');
const registerpage = require('../Page/registerpage');
const assert = require('assert');
const { faker } = require('@faker-js/faker');

describe('Registro de usuarios', function(){
    this.timeout(50000);

    this.beforeEach(async function(){
        var baseurl = 'http://localhost:3000/';
        await homepage.enter_url(baseurl);
        await homepage.maximize()

        await homepage.goto_SignUp();
    })

    this.afterAll(function() {
        //driver.quit()
    })
    
    it('debe mostrar una alerta diciendo que se ha enviado un correo si todos los parámetros son correctos', async function(){

        const password = faker.internet.password()

        await registerpage.fillForm(faker.internet.email(),
            faker.person.firstName(),
            faker.person.lastName(),
            password,
            password
        )

        await registerpage.sendForm()

    
        try{
            await registerpage.waitAlertPresent()
            const alertText = await (await registerpage.successAlert()).getText()
            assert.equal(alertText, 'Activation code has been sent to your email!')
        }catch{
            assert.fail('Alert not found')
        }
    })

    it('si le damos a enviar sin introducir ningun campo se muestran todos los errores de validación', async function(){
        await registerpage.sendForm();
        await registerpage.checkValidationError(1, 'Email cannot be empty', 'Email')
        await registerpage.checkValidationError(2, 'First name cannot be empty', 'First name')
        await registerpage.checkValidationError(3, 'Last name cannot be empty', 'Last name')
        await registerpage.checkValidationError(4, 'The password must be between 6 and 16 characters long', 'Password')
        await registerpage.checkValidationError(5, 'The password confirmation must be between 6 and 16 characters long', 'Password confirmation')
    })
})