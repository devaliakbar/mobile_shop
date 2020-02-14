const app = require('./app')
const port = process.env.PORT


const User = require("./models/user")
const Service = require('./models/service')

test()
async function test() {
    // const user = new User({
    //     username: "admin",
    //     password: "admin"
    // })
    // await user.save()


    const service = await Service.find({  }).populate({ path: 'owner', select: 'name' ,match:{name:"Bros"}}).exec()
    console.log(service)

}

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})