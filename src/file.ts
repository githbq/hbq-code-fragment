import * as fs from 'fs-extra-promise'
import * as path from 'path'

class DateArticle {
  title: string
  articles: Array<string>
}

(async () => {
  const cwd = process.cwd()
  const content = (await fs.readFileAsync(path.join(cwd, 'articles.txt'))).toString()
  debugger
  let dateArticles = []
  let dateArticle = null
  const lines = content.split(/\n/)
  for (const line of lines) {
    if (/^\s*\d+\s*$/.test(line)) {
      if (dateArticle) {
        dateArticle.title += ' 文章推荐(' + dateArticle.articles.filter(n => n.indexOf('http') !== -1).length + '篇)'
      }
      dateArticle = new DateArticle()
      dateArticle.title = '# ' + line.slice(0, 4) + '-' + line.slice(4, 6) + '-' + line.slice(6)
      dateArticle.articles = []
      dateArticles.push(dateArticle)
    } else if (line && !/^\s*$/.test(line)) {
      debugger
      if (line.indexOf('http') !== -1) {
        dateArticle.articles.push(`[${line.split('http')[0]}](http${line.split('http')[1]})`)
        dateArticle.articles.push('')
      } else {
        dateArticle.articles.push('' + line)
        dateArticle.articles.push('')
      }
    }

  }

  function toMd() {
    const strs = []
    dateArticles.forEach(n => {
      strs.push(n.title)

      n.articles.forEach(m => {
        strs.push(m)
      })
    })
    return strs.join('\n')
  }

  fs.writeFileAsync(path.join(cwd, 'articles.md'), toMd())
})()


