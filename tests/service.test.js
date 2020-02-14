const request = require('supertest')
const app = require('../src/app')

const Service = require("../src/models/service")

const { user, userId, setupDatabase } = require('./fixtures/db')

beforeEach(async () => {
    await setupDatabase()
})

test('Should give permission to access services if token is valid', async () => {
    const response = await request(app)
        .get('/get_services')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not give permission to access \"services\" if token is invalid', async () => {
    const response = await request(app)
        .get('/get_services')
        .set('Authorization', `Bearer InvalidToken`)
        .send()
        .expect(400)
})

// test('Should Failed to create Service If customer_name not existed', async () => {
//     const response = await request(app)
//         .post('/add_service')
//         .set('Authorization', `Bearer ${user.tokens[0].token}`)
//         .send({
//             "phone": "8547938611",
//             "type": "Computer",
//             "manufacture": "Dell",
//             "complaints": [{ "complaint": "Processor Not Working" }, { "complaint": "Power button Failed" }]
//         })
//         .expect(500)
// })


test('Should Failed to create Service If  manufacture not existed', async () => {
    const response = await request(app)
        .post('/add_service')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "customer_name": "Ali Akbar",
            "phone": "8547938611",
            "type": "Computer",
            "complaints": [{ "complaint": "Processor Not Working" }, { "complaint": "Power button Failed" }]
        })
        .expect(500)
})

test('Should Failed to create Service If type not existed', async () => {
    const response = await request(app)
        .post('/add_service')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "customer_name": "Ali Akbar",
            "phone": "8547938611",
            "manufacture": "Dell",
            "complaints": [{ "complaint": "Processor Not Working" }, { "complaint": "Power button Failed" }]
        })
        .expect(500)
})

test('Should Failed to create Service If phone not existed', async () => {
    const response = await request(app)
        .post('/add_service')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "customer_name": "Ali Akbar",
            "type": "Computer",
            "manufacture": "Dell",
            "complaints": [{ "complaint": "Processor Not Working" }, { "complaint": "Power button Failed" }]
        })
        .expect(500)
})

test('Should create Service If Below Fields are existed', async () => {
    const response = await request(app)
        .post('/add_service')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "customer_name": "Ali Akbar",
            "phone": "8547938611",
            "type": "Computer",
            "manufacture": "Dell",
            "complaints": [{ "complaint": "Processor Not Working" }, { "complaint": "Power button Failed" }]
        })
        .expect(201)
    const service = await Service.findById(response.body.service._id)
    expect(service).not.toBeNull()
})

test('Should create Service If Every Fields are existed', async () => {
    const response = await request(app)
        .post('/add_service')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            "customer_name":"Ali Akbar",
            "phone":"8547938611",
            "type": "Computer",
            "manufacture": "Dell",
            "complaints": [{ "complaint": "Processor Not Working" }, { "complaint": "Power button Failed" }],
            
            "address":"MyAddress",
            "model":"Model X",
            "returnedDevice":true,
            "checkOtherComplaint":true,
            "quickService":true,
            "currentStatus":"started",
            "recievedDate":"22/9/1997",
            "estimatedDeleveryDate":"22/09/1997",
            "estimatedAmount":2500,
            "advanceAmount":1000,
            "remarks": [{ "remark": "A Rea" }, { "complaint": "B Rea" }],
            "accessoriesCollected": [{ "accessory": "CPU" }, { "accessory": "RAM" }]
        })
        .expect(201)
    const service = await Service.findById(response.body.service._id)
    expect(service).not.toBeNull()
})
