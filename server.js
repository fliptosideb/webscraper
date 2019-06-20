const axios = require('axios')
const { join } = require('path')
const cheerio = require('cheerio')
const db = require('mongojs')('nyt_db')
const express = require('express')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('.hbs', require('express-handlebars')({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

require('./routes')(app)

require('mongoose').connect('mongodb://localhost/nyt_db', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
  .then(_ => app.listen(3000))
  .catch(e => console.log(e))


axios.get('https://www.nytimes.com/column/learning-article-of-the-day')
  .then(({ data }) => {
    const $ = cheerio.load(data)
    const nytArr = []
    $('div.css-1cp3ece').each((i, elem) => {
      nytArr.push({
        title: $(elem).children('.css-4jyr1y').children('a').children('.css-1dq8tca').text(),
        summary: $(elem).children('.css-4jyr1y').children('a').children('.css-1echdzn').text(),
        link: `https://www.nytimes.com${$(elem).children('.css-4jyr1y').children('a').attr('href')}`
      })
    })
    db.articles.insert(nytArr, _ => console.log('Articles added!'))
    console.log(nytArr)
  })
  .catch(e => console.log(e))

