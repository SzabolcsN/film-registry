const Film = require('../models/film')

const findAll = (req, res) => {
    let params = { isDeleted: false }
    if (Object.keys(req.query).length > 0) {
        if (req.query.age) {
            params.age = req.query.age
        }

        if (req.query.title) {
            params.title = { $regex: new RegExp(req.query.title, 'i') }
        }
    }

    Film.find(params)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving movies."
            })
        })
}

module.exports = findAll