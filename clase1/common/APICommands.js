const httpUtils = require("../common/httpUtils")

class APICommands{

    async createAccount(email,firstName,lastName,password){
        const data =   
        {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            password2: password,
            captcha:""
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        }

        const response = await httpUtils.post('http://localhost:8080/api/v1/registration', data, headers)
        return response
    }
}

module.exports = new APICommands()