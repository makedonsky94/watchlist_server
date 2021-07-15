import WebSocket from 'ws';

const wsServer = new WebSocket.Server({port: 9000});

wsServer.on('connection', onConnect);



function onConnect(client: WebSocket) {
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