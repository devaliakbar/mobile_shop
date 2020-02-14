const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

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

        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        const cookieConfig = {
            httpOnly: true,
            //secure: true, 
            maxAge: Date.now(),
            signed: true
        };
        res.cookie(process.env.COOKIE_SECRET, cookieConfig);

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router