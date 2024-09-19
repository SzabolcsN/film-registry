const { ObjectId } = require('mongodb')

module.exports = (id) => {
    if (!id) {
        return null
    }
    const newId = new ObjectId(id)
    return newId
}