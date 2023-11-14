var http = require('http');

class HTTPUtils {

    //https://stackoverflow.com/a/67094088
    post(url, data, headers = null) {
        const dataString = JSON.stringify(data)

        if (!headers) headers = []

        headers['Content-Length'] = dataString.length
      
        const options = {
          method: 'POST',
          headers: headers,
          timeout: 10000, // in ms
        }
     
        return new Promise((resolve, reject) => {
          const req = http.request(url, options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
              return reject(new Error(`HTTP status code ${res.statusCode}`))
            }
      
            const body = []
            res.on('data', (chunk) => body.push(chunk))
            res.on('end', () => {
              const resString = Buffer.concat(body).toString()
              resolve(resString)
            })
          })
      
          req.on('error', (err) => {
            reject(err)
          })
      
          req.on('timeout', () => {
            req.destroy()
            reject(new Error('Request time out'))
          })
      
          req.write(dataString)
          req.end()
        })
      }
    
}

module.exports = new HTTPUtils()