const bcrypt = require('bcrypt')
const authDal = require('./authDal')


const authService = {
    login : async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await authDal.getUser(email);
        if (!user) {
            throw new Error('Wrong email or password', {status: 400})
        }

        const passwordCheck = await bcrypt.compare(hashedPassword, user.password)
        if (!passwordCheck) {
            throw new Error('Wrong email or password', {status: 400})
        }

        const token = jwt.sign({ _id: user._id }, 'jwtSecret')
        return {token: token, admin: user.admin};
    },

    signup : async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.findOne({ email: email })
        if (user !== null) {
            throw new Error('Email not available!', {status: 400})
        }
        
        let newUser = await authDal.createUser(email, hashedPassword);
        const token = jwt.sign({ _id: newUser._id }, 'jwtSecret')
        return {token: token};
    }
}

module.exports = authService;