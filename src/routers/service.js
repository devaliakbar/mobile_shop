const express = require('express')
const auth = require('../middleware/auth')
const Service = require("../models/service")
const Customer = require("../models/customer")

const router = new express.Router()

router.get('/service_page', auth, (req, res) => {
    res.render('service/service', {
    })
})

router.get('/get_services', auth, async (req, res) => {
    var skip = parseInt(req.query.skip ? req.query.skip : 0)
    const limit = 10

    const match = {}
    if (req.query.name) {
        match.owner.name = { "$regex": 'aju', "$options": "i" }
    }

    try {
        const service = await Service.find({}).select({ complaints: { $slice: 1 }, serviceId: 1, type: 1, currentStatus: 1, quickService: 1 }).sort({ serviceId: 1 }).limit(limit).skip(skip).populate({ path: 'owner', select: 'name' }).exec()
        res.send(service)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/add_service_page', auth, (req, res) => {
    res.render('service/add_service', {
    })
})

router.post('/add_service', auth, async (req, res) => {
    try {
        var customer = await Customer.findOne({ phone: req.body.phone })
        if (!customer) {
            customer = new Customer({
                name: req.body.customer_name,
                phone: req.body.phone,
                address: req.body.address,
            })

            await customer.save()
        }

        const service = new Service({
            ...req.body,
            "totalAmount": req.body.advanceAmount,
            owner: customer._id
        })

        delete service.customer_name
        delete service.phone
        delete service.address

        await service.save()
        res.status(201).send({ service, customer })
    } catch (e) {
        res.status(500).send(e)
    }
    res.send()

})

router.get('/get_customer_name', auth, async (req, res) => {
    const match = {}

    if (req.query.name) {
        match.name = { "$regex": req.query.name, "$options": "i" }
    }

    if (req.query.phone) {
        match.phone = { "$regex": req.query.phone, "$options": "i" }
    }

    try {
        const customer = await Customer.find(match).select({ name: 1, phone: 1 }).sort({ name: 1 }).limit(10).skip(0)
        res.send(customer)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/get_accessories_name', auth, async (req, res) => {
    const match = {}

    if (req.query.accs) {
        match['accessoriesCollected.accessory'] = { "$regex": req.query.accs, "$options": "i" }
    }
    try {
        const service = await Service.find(match).select({ 'accessoriesCollected.accessory': 1 })
        var returnAccessoriesList = []
        for (var i = 0; i < service.length; i++) {
            const tempService = service[i]
            for (var j = 0; j < tempService.accessoriesCollected.length; j++) {
                if (returnAccessoriesList.length >= 10) {
                    console.log(returnAccessoriesList.length)
                    break;
                }
                if (req.query.accs) {
                    if (tempService.accessoriesCollected[j].accessory.toLowerCase().search(req.query.accs.toLowerCase()) != -1) {
                        if (!returnAccessoriesList.includes(tempService.accessoriesCollected[j].accessory)) {
                            returnAccessoriesList.push(tempService.accessoriesCollected[j].accessory)
                        }
                    }
                } else {
                    if (!returnAccessoriesList.includes(tempService.accessoriesCollected[j].accessory)) {
                        returnAccessoriesList.push(tempService.accessoriesCollected[j].accessory)
                    }
                }
            }
            if (returnAccessoriesList.length >= 10) {
                break;
            }
        }

        res.send(returnAccessoriesList.sort())
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router