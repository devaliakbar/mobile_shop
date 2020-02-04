const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    serviceId: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    manufacture: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        trim: true
    },
    returnedDevice: {
        type: Boolean,
        default: false
    },
    checkOtherComplaint: {
        type: Boolean,
        default: false
    },
    quickService: {
        type: Boolean,
        default: false
    },
    currentStatus: {
        type: String,
        trim: true,
        default: "On Going"
    },
    recievedDate: {
        type: String,
        trim: true
    },
    estimatedDeleveryDate: {
        type: String,
        trim: true
    },
    actualDeleveredDate: {
        type: String,
        trim: true
    },
    estimatedAmount: {
        type: Number,
        trim: true
    },
    advanceAmount: {
        type: Number,
        trim: true
    },
    totalAmount: {
        type: Number,
        trim: true
    },
    complaints: [{
        complaint: {
            type: String,
            required: true,
            trim: true
        }
    }],
    remarks: [{
        remark: {
            type: String,
            trim: true
        }
    }],
    details: [{
        detail: {
            type: String,
            trim: true
        }
    }],
    spares: [{
        spare: {
            type: String,
            trim: true
        }
    }],
    accessoriesCollected: [{
        accessory: {
            type: String,
            trim: true
        }
    }],
}, {
    timestamps: true
})

serviceSchema.pre('save', async function (next) {
    if (this.isNew) {
        var currentIndex = 0

        const latestService = await Service.findOne({}, {}, { sort: { 'createdAt': -1 } })
        if (latestService != null) {
            currentIndex = latestService.serviceId
        }
        currentIndex++

        const currentService = this
        currentService.serviceId = currentIndex

    }
    next()
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service