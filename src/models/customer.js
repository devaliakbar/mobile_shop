const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, phone: {
        type: String,
        required: true,
        trim: true,
    }, address: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
})

customerSchema.virtual('services', {
    ref: 'Service',
    localField: '_id',
    foreignField: 'owner'
})

customerSchema.set('toObject', { virtuals: true })
customerSchema.set('toJSON', { virtuals: true })


const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer