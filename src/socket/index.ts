import WebSocket from 'ws';
import { StockProcessController } from '../rpc/controller/stock_process_controller';
import { StockProcessControllerImpl } from '../rpc/controller/stock_process_controller_impl';


export function configureSocket(wsServer: WebSocket.Server) {
    console.log('Configuration of websocket');

    wsServer.on('listening', function(client: WebSocket) {
        console.log('Start listening of web socket');
    })

    wsServer.on('connection', function(client: WebSocket) {
        onConnect(wsServer, client);
    })


    wsServer.on('error', function(client: WebSocket, error: Error): void {
        console.error(error);
    })
}

function onConnect(wsServer: WebSocket.Server, client: WebSocket) {
    console.log('User connected');
    let controller: StockProcessController = new StockProcessControllerImpl();
    controller.onConnect(client);
}