const mongoose = require('mongoose')


const LocationSchema = new mongoose.Schema({
    city: String,
    pincode: String,
    lat: Number,
    lng: Number,
    address:String
})

module.exports = LocationSchema;