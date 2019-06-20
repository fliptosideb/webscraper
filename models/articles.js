module.exports = (Schema, model) => model('Articles', new Schema({
        title: String,
        summary: String,
        link: String
    }))

