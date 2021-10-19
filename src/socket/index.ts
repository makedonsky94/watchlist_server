import WebSocket from 'ws';
import { StockProcessController } from '../rpc/controller/stock_process_controller';
import { StockProcessControllerImpl } from '../rpc/controller/stock_process_controller_impl';


export function configureSocket(wsServer: WebSocket.Server) {
    console.log('Configuration of websocket')

    wsServer.on('listening', function(client: WebSocket) {
        console.log('Start listening of web socket')
    })

    wsServer.on('connection', function(client: WebSocket) {
        onConnect(wsServer, client)
    })

    wsServer.on('error', function(client: WebSocket, error: Error) {
        console.log(error.message)
        console.error(error.message)
        console.log(error)
    })
}

function onConnect(wsServer: WebSocket.Server, client: WebSocket) {
    console.log('User connected')
    client.send('Connected')
    let controller: StockProcessController = new StockProcessControllerImpl();
    controller.onConnect(client);
    // client.onmessage = (event) => {
    //     wsServer.clients.forEach((client) => {
    //         client.send(event.data)
    //     })
    //     console.log(event)
    // }
    // client.on('close', function() {
    //     console.log('User disconnected')
    // })
}