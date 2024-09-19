const { connect } = require("mongoose")

const connection = "mongodb://mongo:27017/film-registry"

const connectDb = () => {
  return connect(connection)
}

module.exports = connectDb
