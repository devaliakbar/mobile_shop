const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()

        const cookieConfig = {
            httpOnly: true,
            //secure: true, 
            maxAge: 1000000000,
            signed: true
        };
        res.cookie(process.env.COOKIE_SECRET, token, cookieConfig);

        res.send({ user })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router