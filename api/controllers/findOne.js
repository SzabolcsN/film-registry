const Film = require('../models/film')
const convertToObjectId = require("../helpers/convertToObjectId")

const findOne = (req, res) => {
  let id = req.params.id

  if (!id) {
    return res.status(400).send("Entering 'id' is mandatory")
  }

  id = convertToObjectId(id)

  Film.findOne({ _id: id, isDeleted: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Movie not found" })
      }
      else {
        res.send(data)
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Something went wrong"})
    })
}

module.exports = findOne