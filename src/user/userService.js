const userDal = require("./userDal");

const userService = {
    findUser: (userId)=>{
        return userDal.getUserById(userId);
    },

    updateProfile: (userId, name, address) =>{
        return userDal.updateProfile(userId, name, address);
    }
}

module.exports = userService;