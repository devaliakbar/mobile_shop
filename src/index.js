const app = require('./app')
const port = process.env.PORT
const Customer = require("./models/customer")
const Service = require("./models/service")
const User = require("./models/user")

test()
async function test() {

    // const task = new User({
    //     username: "admin",
    //     password: "admin"
    // })
    // await task.save()

    // const service = new Service({
    //     type: "Computer",
    //     manufacture: "Dell",
    //     owner: "5e38affd93837e0441b98a11",
    //     complaints: [{ complaint: "Processor Not Working" }, { complaint: "Power button Failed" }]
    // })
    // await service.save()

    // const customer = new Customer({ name: "Akri", phone: "pokk" })
    // await customer.save()


    // const customer = await Customer.findById('5e36f283951e6d01dcb5dfdf')
    // await customer.populate('services').execPopulate()
    // console.log(customer)


    // const service = await Service.findById('5e36f29ae93d1f01e0609731')
    // await service.populate('owner').execPopulate()
    // console.log(service)
}



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})