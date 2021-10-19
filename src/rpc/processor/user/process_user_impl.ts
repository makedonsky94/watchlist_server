import { InputFrame } from "../../model/input/input_frame";
import { OutputFrame } from "../../model/output/output_frame";
import { ProcessUser } from "./process_user";
import WebSocket from 'ws';
import { ResponseType } from "../../model/output/response_type";
import { Error } from "../../model/output/error";

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

    sendError(error: Error) {
        if (error.frame.type != ResponseType.Error) {
            console.error("expected argument with type error but received " + error.frame.type)
        }
        let json = JSON.stringify(error.frame);
        this.socket.send(json);
        this.socket.close(error.reason);
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