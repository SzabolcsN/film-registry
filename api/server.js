const express = require('express')
const app = express()
const connectDb = require('./db/connection')
const cors = require('cors')

const PORT = 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require("./routes")(app)


app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`)

  connectDb()
    .then(() => {
      console.log('MongoDb connected')
    })
    .catch(err => {
      console.log("Can't connect to the database:", err)
      process.exit()
    })
})
