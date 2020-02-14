const express = require('express')
const auth = require('../middleware/auth')


const router = new express.Router()

router.get('/home', auth, (req, res) => {
    res.render('home/home', {
    })
})



module.exports = router