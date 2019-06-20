const { Articles } = require('../models')

module.exports = app => {
    app.get('/articles', (req, res) => {
        Articles.find({}, (e, articles) => {
            if(e) throw e
            res.json(articles)
        })
    })
}