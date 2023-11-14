const APICommands = require("./common/APICommands")
const { faker } = require('@faker-js/faker');


async function main(){
    const response = await APICommands.createAccount(faker.internet.email(), 'Octavio','Alamo', 'secreto')
    console.log(response)
}

main()