const request = require('supertest')
const app = require('../src/app')

const { user, userId, setupDatabase } = require('./fixtures/db')

beforeEach(async () => {
    await setupDatabase()
})


test('Should Login Admin with password and username : admin', async () => {
    await request(app).post('/login').send({
        username: "admin",
        password: "admin"
    }).expect(200)
})

test('Should Fail Login Admin without password and username : admin', async () => {
    await request(app).post('/login').send({
        username: "wrong username",
        password: "wrong password"
    }).expect(400)
})