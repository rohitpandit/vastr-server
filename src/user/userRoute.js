const verifyUser = require('../middlewares/verifyUser');
const userSevice = require('./userService');
const logger = require('../lib/logger')

const userRoute = (app)=>{
    app.get('/user',verifyUser, async (req, res) => {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }
    
            const user = await userSevice.findUser(req.userId); 
            res.status(200).json({ user: user });
        } catch (error) {
            logger.error('',error);
            res.status(error.status).json({ message: error.message });
        }
    });
    
    app.post('/user',verifyUser, async (req, res) => {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }

            const { address, name } = req.body;
            let user = await userSevice.updateProfile(req.userId, name, address)
            
            res.status(200).json({ user: user });
        } catch (error) {
            console.log('',error);
            res.status(error.status).json({ message: error.message });
        }
    });
}

module.exports = userRoute