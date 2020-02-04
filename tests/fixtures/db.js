const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')

const userId = new mongoose.Types.ObjectId()
const user = new User({
    _id: userId,
    username: "admin",
    password: "admin",
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.JWT_SECRET)
    }]
})


const setupDatabase = async () => {
    await User.deleteMany()
    await new User(user).save()
}

module.exports = {
    user,
    userId,
    setupDatabase
}
