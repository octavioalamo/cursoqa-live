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
                result = response.rows[0]
                console.log('Query')
                databaseClient.end()
            })
            .catch(err => {
                console.log(err)
                databaseClient.end()
            })

        return result
    }

}

module.exports = PostgreDatabase;
