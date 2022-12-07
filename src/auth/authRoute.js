const logger = require('../lib/logger')
const authService = require('./authService')

const authRoute = (app) =>{
    app.post('/auth/login', async (req, res)=>{
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.status(400).json({ message: 'Enter email and password' })
                return
            }

            let {token, admin} = await authService.login(email, password);
            return res.status(200).json({ token: token, admin: admin })
        } catch (error) {          
            logger.error('',error)
            return res.status(error.status).json({ message: error.message })
        }
    })

    app.post('/auth/signup', async (req, res)=>{
        try {
            const { email, password } = req.body

            if (!email || !password) {
                res.status(400).json({ message: 'Enter email and password' })
                return
            }

            let {token} = await authService.signup(email, password);
            return res.status(200).json({ token: token })
        } catch (error) {
            console.log('error:', error)
            logger.error('',error);
            return res.status(error.status).json({message: error.message})
        }
    })
}

module.exports = authRoute;