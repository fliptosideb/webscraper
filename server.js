const axios = require('axios')
const cheerio = require('cheerio')
const db = require('mongojs')('stacks_db')


  axios.get('https://www.nytimes.com/column/learning-article-of-the-day')
  .then(({ data }) => {
    const $ = cheerio.load(data)
    const stackArr = []
    $('div.css-1cp3ece').each((i, elem) => {
      stackArr.push({
        title: $(elem).children('.css-4jyr1y').children('a').children('.css-1dq8tca').text(),
        summary: $(elem).children('.css-4jyr1y').children('a').children('.css-1echdzn').text(),
        link: `https://www.nytimes.com${$(elem).children('.css-4jyr1y').children('a').attr('href')}`
      })
    })
    // db.stacks.insert(stackArr, _ => console.log('stacks added!'))
    console.log(stackArr)
  })
  .catch(e => console.log(e))

