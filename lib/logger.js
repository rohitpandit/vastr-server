const {createLogger, transports, format} = require('winston');
const {combine, timestamp, prettyPrint, splat} = format;

const logger = new createLogger({
    format: combine(
        splat(),
        timestamp(),
        prettyPrint()
    ),
    transports : [new transports.Console()]
})

module.exports = logger;