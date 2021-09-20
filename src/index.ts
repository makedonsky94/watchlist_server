require('./repostory/internal/db/connection')
require('./route/index')

import { app } from './route/express'
import https from 'https'
import http from 'http'
import * as sslConfig from './.ssl.config.json'
import * as fs from 'fs'
import * as path from 'path'



if (sslConfig.ssl) {
  let options = {
    key: fs.readFileSync(path.resolve(sslConfig.path.key)),
    cert: fs.readFileSync(path.resolve(sslConfig.path.cert)),
    ca: fs.readFileSync(path.resolve(sslConfig.path.ca))
  }

  const server = https.createServer(options, app)
  server.listen(443, () => {
    console.log('listening on *:443');
  })
} else {
  const server = http.createServer(app)
  server.listen(80, () => {
    console.log('listening on *:80');
  })
}
