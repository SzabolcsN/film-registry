const Film = require('../models/film')
const getErrorMessage = require("../helpers/getErrorMessage")
const convertToObjectId = require("../helpers/convertToObjectId")

const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "The data to be updated cannot be empty"
        })
    }

    const id = convertToObjectId(req.params.id)

    Film.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { runValidators: true, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Something went wrong"
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            if (err?.name === "ValidationError") {
                const message = getErrorMessage(err.errors)
                return res.status(400).send({ message: message || "Something went wrong" })
            }
            res.status(500).send({
                message: "Something went wrong"
            })
        })
}

module.exports = update