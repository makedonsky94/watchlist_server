require('./repostory/internal/db/connection')
require('./route/index')


import { configureSocket } from './socket'
import WebSocket from 'ws'

import { app } from './route/express'
import https from 'https'
import http, { Server } from 'http'

import * as sslConfig from './.ssl.config.json'
import * as fs from 'fs'
import * as path from 'path'


let server: Server;
if (sslConfig.ssl) {
  let options = {
    key: fs.readFileSync(path.resolve(sslConfig.path.key)),
    cert: fs.readFileSync(path.resolve(sslConfig.path.cert)),
    ca: fs.readFileSync(path.resolve(sslConfig.path.ca))
  }

  server = https.createServer(options, app)
  server.listen(443, () => {
    console.log('listening on *:443')
  })

} else {
  server = http.createServer(app)
  server.listen(80, () => {
    console.log('listening on *:80')
  })
}

const wsServer = new WebSocket.Server({
  server: server
})

configureSocket(wsServer)