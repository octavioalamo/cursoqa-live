const PerfumeDatabase = require('./common/PerfumeDatabase')

async function main(){
    const code = await PerfumeDatabase.getActivationCode('testjueves21@gmail.com')
    console.log(code)
}
main()