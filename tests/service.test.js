const request = require('supertest')
const app = require('../src/app')

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

test('Should not give permission to access services if token is invalid', async () => {
    const response = await request(app)
        .get('/get_services')
        .set('Authorization', `Bearer InvalidToken`)
        .send()
        .expect(400)
})