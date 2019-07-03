const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let filename = `.${q.path}.html`
  
  if (q.path === '/') {
    filename = './index.html';
  } 
  
  const exists = fs.exists(filename, (data) => {
    if (!data) filename = '404.html';

    fs.readFile(filename, (err, data) => {
      if (err) {
        console.log('error!')
        res.end()
      }

      res.writeHead(200, {'Content-Type': 'text/html' })
      res.write(data);
      res.end();
    })
  })
}).listen(8080)