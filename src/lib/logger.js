const {createLogger, transports, format} = require('winston');
const {combine, timestamp, prettyPrint, splat} = format;

const logger = new createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports : [new transports.Console()]
})

logger.stream = {
    write: (message, encoding)=>{
        logger.info(message)
    }
}

module.exports = logger;