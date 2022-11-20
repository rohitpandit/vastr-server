const http = require('http');
const app = require('../src/server.js');


const PORT = process.env.PORT || 5000;

httpServer = http.createServer(app);
httpServer.listen(PORT);
httpServer.on('listening', ()=>{
    console.log("Listening on: ", httpServer.address())
})