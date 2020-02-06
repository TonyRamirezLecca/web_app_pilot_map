const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlengths: 3
    },
    password: {
        type: String,
        required: true,
        minlengths: 6,
        trim: true
    },
    locations: [
        {
            formatted_address: String,
            coordinates: {
                lat: String,
                lng: String
            },
            date: Date
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;