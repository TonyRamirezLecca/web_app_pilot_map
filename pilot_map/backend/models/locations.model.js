const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    username: {
        type: String,
        required: true,
    }, 
    location: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;