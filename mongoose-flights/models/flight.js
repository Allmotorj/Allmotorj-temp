const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },

    arrival: {
        type: Date,
        default: () => {
            const date = new Date()
            date.setFullYear(date.getFullYear())
            return date
        }
    }, 
}, {
    timestamps: true
})

const flightSchema = new Schema({
    
    destinations: [destinationSchema],
    
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },

    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },

    flightNo: {
        type: Number,
        require: true,
        min: 10,
        max: 9999, 
    },

    departs: {
        type: Date,
        default: () => {
            const date = new Date()
            date.setFullYear(date.getFullYear() +1)
            return date
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);