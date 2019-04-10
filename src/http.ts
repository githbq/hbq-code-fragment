const http = require('http')
const fs = require('fs')
const path = require('path')
const { version } = require('../../package.json')

const port = parseInt(process.argv[2] || '9000')
const mimeType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css'
}

http.createServer((req, res) => {
  let pathname

  if (req.url === '/') {
    pathname = 'index.html'
  } else if (req.url === '/sdk.js') {
    pathname = path.resolve(__dirname, `../dist/zpfe-exp-web-sdk-${version}.js`)
  } else if (req.url === '/style.css') {
    pathname = 'style.css'
  } else if (req.url.includes('/api')) {
    res.write('{"variables":{"var1":"blue","var2":"red"}}')
    res.end()

    return
  } else {
    res.statusCode = 404
    res.end(`${req.url} is not fond.`)

    return
  }

  fs.readFile(pathname, 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500
      res.end(`Error getting the file: ${err}.`)
    } else {
      const ext = path.parse(pathname).ext

      res.setHeader('Content-type', mimeType[ext] || 'text/plain')
      res.end(data)
    }
  })
}).listen(port)

console.log(`Server listening on port ${port}`)
