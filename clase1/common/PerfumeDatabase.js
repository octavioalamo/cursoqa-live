const PostgreDatabase = require('../common/PostgreDatabase')

class PerfumeDatabase extends PostgreDatabase{
    constructor(){
        super({
            user: 'postgres',
            host: 'localhost',
            database: 'perfume',
            password: 'root',
            port: 5432,
          })
    }

    async getActivationCode(email){
        const result = await this.query(`SELECT activation_code FROM users where email='${email}'`)
        if (result!=null){
            return result[0].activation_code
        }else{
            return null
        }
        
    }
}

module.exports = new PerfumeDatabase()