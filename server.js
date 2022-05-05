//Require modules and set their names for future reference
const http = require('http')
const fs = require('fs')
const minimist = require('minimist')
// Use minimist to process one argument `--port=` on the command line after `node server.js`.
var argv = minimist(process.argv.slice(2))
// Define allowed argument name 'port'.
var allowedName = 'port'
// Define a const `port` using the argument from the command line. 
// Make this const default to port 3000 if there is no argument given for `--port`.
const port = argv[allowedName] || 3000
// Use the fs module to create an arrow function using `fs.readFile`.
// The function must read a file located at `./www/index.html` and do some stuff with it.
fs.readFile('./www/index.html', 'utf8', (err,data) => {
    //Check for errors, and return if found
    if (err) {
        console.error(err)
        return
        process.exit(1)
    }
    //Create the server, and have it respond with the data from readFile
    const server = http.createServer((req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
    })
    //Have the server listen on port from command line
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })

})