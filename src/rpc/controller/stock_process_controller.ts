import WebSocket from 'ws';

export interface StockProcessController {
    onConnect(socket: WebSocket): void;
}