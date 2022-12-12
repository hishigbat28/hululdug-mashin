const http = require('http')
const fs = require('fs')
const { error } = require('console')
const urllib = require('url')
const path = require('path')
const { emitKeypressEvents } = require('readline')
const { parse } = require('path')

const server = http.createServer((req, res) => {
  const { headers, url, method } = req
  res.setHeader('content-type', 'text/html')
  if (url === '/' || url === '/index') {
    fs.readFile('./src/index.html', 'utf8', (error, data) => {
      res.statusCode = 200
      res.write(data)
      res.end()
    })
  } else if (url === '/login') {
    fs.readFile('./src/login.html/', 'utf8', (error, data) => {
      res.statusCode = 200
      res.write(data)
      res.end()
    })
  } else if (url === '/logincheck' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    })
    req.on('end', () => {
      const parsedbody = Buffer.concat(body).toString()
      const password = parsedbody.split('=')[2]
      if (password === 'Ganbat123') {
        res.statusCode = 302
        res.setHeader('Location', '/home')
      } else {
        res.statusCode = 302
        res.setHeader('Location', '/error')
      }
      res.end()
    })
  } else if (url === '/home') {
    fs.readFile('./src/home.html', 'utf8', (error, data) => {
      res.statusCode = 200
      res.write(data)
      res.end()
    })
  } else if (url === '/error') {
    fs.readFile('./src/error.html', 'utf8', (error, data) => {
      res.statusCode = 200
      res.write(data)
      res.end()
    })
  } else if (url.endsWith('.jpg') || url.endsWith('.png')) {
    const parsed = urllib.parse(url)
    const fileName = path.basename(parsed.pathname)
    fs.readFile('./src/img/' + fileName, (error, data) => {
      res.statusCode = 200
      res.setHeader('content-type', 'image/jpeg')
      res.setHeader('content-type', 'image/png')
      res.end(data)
    })
  } else if (url.endsWith('.css')) {
    const parsed = urllib.parse(url)
    const fileName = path.basename(parsed.pathname)
    fs.readFile('./src/css/' + fileName, (error, data) => {
      res.statusCode = 200
      res.setHeader('content-type', 'text/css')
      res.end(data)
    })
  } else if (url.endsWith('.pdf')) {
    const parsed = urllib.parse(url)
    const fileName = path.basename(parsed.pathname)
    fs.readFile('./src/pdf/' + fileName, (error, data) => {
      res.statusCode = 200
      res.setHeader('content-type', 'application/pdf')
      res.end(data)
    })
  } else if (url.endsWith('.js')) {
    const parsed = urllib.parse(url)
    const fileName = path.basename(parsed.pathname)
    fs.readFile('./src/js/' + fileName, (error, data) => {
      res.statusCode = 200
      res.setHeader('content-type', 'text/javascript')
      res.end(data)
    })
  } else {
    res.statusCode = 404
    res.write('<h1>404 not found</h1>')
    console.log(url)
    res.end()
  }
})
server.listen(5000, () => {
  console.log('5000 deer server aslaa')
})
