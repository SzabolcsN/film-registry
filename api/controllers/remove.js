const Film = require('../models/film')

const remove = (req, res) => {
  const id = req.params.id

  Film.findByIdAndUpdate(id, { isDeleted: true }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Something went wrong"
        })
      } else {
        res.send({
          message: "The movie was successfully deleted!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Something went wrong"
      })
    })
}

module.exports = remove