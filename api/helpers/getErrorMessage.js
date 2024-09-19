module.exports = (errors) => {
    const messageKeys = Object.keys(errors);
    const messages = messageKeys.map((key) => errors[key].message)
    return messages.join(", ")
}