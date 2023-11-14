module.exports =  class SeleniumHelper {

    constructor(driver){
        this.driver = driver
    }

     async waitDOMReady(){
        const drv = this.driver
        await this.driver.wait(function() {
            return drv.executeScript('return document.readyState').then(function(readyState) {
              return readyState === 'complete';
            });
        });
    }
}
