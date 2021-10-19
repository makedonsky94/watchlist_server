import { InputFrame } from "../../model/input/input_frame";
import { OutputFrame } from "../../model/output/output_frame";
import { ProcessUser } from "./process_user";
import WebSocket from 'ws';

export class ProcessUserImpl implements ProcessUser {
    public readonly id: string;
    private readonly socket: WebSocket;
    private subscribers: ((input: InputFrame) => void)[] = [];
    private connectionIsAlive: boolean = true;

    constructor(id: string, socket: WebSocket) {
        this.id = id;
        this.socket = socket;
        this.socket.onmessage = (message) => {
            this.subscribers.forEach((subscriber) => {
                let inputFrame = JSON.parse(message.data as string) as InputFrame;
                subscriber(inputFrame);
            })
        }
        this.socket.onclose = (event) => {
            this.connectionIsAlive = false;
        }
    }

    sendData(output: OutputFrame) {
        let json = JSON.stringify(output);
        this.socket.send(json);
    }

    subscribeOnReceiveData(subscriber: (input: InputFrame) => void) {
        this.subscribers.push(subscriber);
    }

    unsubscribeOnReceiveData(subscriber: (input: InputFrame) => void) {
        let index = this.subscribers.indexOf(subscriber);
        if (index != -1) {
            this.subscribers.splice(index, 1);
        }
    }

    isAlive(): boolean {
        return this.connectionIsAlive;
    }
}