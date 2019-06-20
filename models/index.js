const { Schema, model } = require('mongoose')

const db = {
    Articles: require('./articles.js')(Schema, model)
}

module.exports = db