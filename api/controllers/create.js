const Film = require('../models/film')
const getErrorMessage = require("../helpers/getErrorMessage")

const create = async (req, res) => {
    const payload = new Film(req.body)

    await payload
        .save(payload)
        .then(data => {
            res.send(data)
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

module.exports = create