const mongoose = require("mongoose")
const { Schema, model } = mongoose

const filmSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: [100, "The title entered is too long"],
    },
    age: {
        type: String,
        enum: {
            values: ["1", "12", "16", "18"],
            message: "{VALUE} wrong value"
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: [1000, "The description entered is too long"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Film = model("Film", filmSchema)

module.exports = Film