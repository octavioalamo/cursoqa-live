const { Client } = require('pg')

class PostgreDatabase {

    constructor(connectionData){
        global.databaseClient = new Client(connectionData)
    }

    async query(query){
        let result = null;
        //console.log(query)
        databaseClient.connect().catch(err => {console.log(err)})
        await databaseClient.query(query)
            .then(response => {
                result = response.rows[3].title
                databaseClient.end()
            })
            .catch(err => {
                console.log(err)
                databaseClient.end()
                console.log('Hubo un error')
            })

        return result
    }

}

module.exports = PostgreDatabase;
