import WebSocket from 'ws';


export function configureSocket(wsServer: WebSocket.Server) {
    console.log('Start listening of web socket')

    wsServer.on('connection', function(client: WebSocket) {
        onConnect(wsServer, client)
    })

    wsServer.on('error', function(client: WebSocket, error: Error) {
        console.log(error.message)
        console.log(error)
    })
}

function onConnect(wsServer: WebSocket.Server, client: WebSocket) {
    console.log('User connected')
    client.send('Connected')
    client.on('message', function(message) {
        wsServer.clients.forEach((client) => {
            client.send(message)
        })
        console.log(message)
    })
    client.on('close', function() {
        console.log('User disconnected')
    })
}