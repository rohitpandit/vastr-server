const http = require('http');
const app = require('../server.js');
const logger = require('./logger.js');


const PORT = process.env.PORT || 5000;

httpServer = http.createServer(app);
httpServer.listen(PORT);
httpServer.on('listening', ()=>{
    logger.info("Listening on: ", httpServer.address())
})