const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const Service = require("../models/service")

const router = new express.Router()

router.get('/service_page', auth, (req, res) => {
    res.render('service/service', {
    })
})

router.get('/get_services', auth, async (req, res) => {
    try {
        const service = await Service.find({}).select({ complaints: { $slice: 1 }, serviceId: 1, type: 1, currentStatus: 1, quickService: 1 }).populate({ path: 'owner', select: 'name' }).exec()
        res.send(service)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router