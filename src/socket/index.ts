import WebSocket from 'ws';


export function onConnect(wsServer: WebSocket.Server, client: WebSocket) {
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