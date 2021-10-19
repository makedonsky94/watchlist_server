import { setInterval } from "timers";
import { InputFrame } from "../model/input/input_frame";
import { OutputFrame } from "../model/output/output_frame";
import { ProcessUser } from "./user/process_user";
import { ResponseType } from "../model/output/response_type";
import { Tick } from "../model/output/tick";
import { Command } from "../model/input/comand";
import { Error, ErrorReason } from "../model/output/error";

export class StockProcessor {

    constructor(user: ProcessUser) {
        const pingPong = new PingPong(user);

        user.subscribeOnReceiveData((inputFrame: InputFrame | null) => {
            if (inputFrame == null) {
                let frame = new OutputFrame(ResponseType.Error, "Protocol error");;
                user.sendError(new Error(frame, ErrorReason.ProtocolError));
                return;
            }
            switch(inputFrame.command) {
                case Command.Pong: 
                    pingPong.onPong();
                case Command.Ping:
                    pingPong.onPing();
                case Command.SubscribeSymbols: 
                    this.subscribeSymbols(inputFrame.payload as string[]);
                case Command.UnsubscribeSymbols:
                    this.unsubscribeSymbols(inputFrame.payload as string[]);
            }
        })
    }

    private subscribeSymbols(symbols: string[]): void {

    }

    private unsubscribeSymbols(symbols: string[]): void {

    }

    
}

class PingPong {
    private pongTimeout?: NodeJS.Timeout;
    private user: ProcessUser;

    constructor(user: ProcessUser) {
        this.user = user;
        setTimeout(() => {
            user.sendData(new OutputFrame(ResponseType.Ping));
            this.pongTimeout = setTimeout(() => {
                let frame = new OutputFrame(ResponseType.Error, "Pong is not received");
                user.sendError(new Error(frame, ErrorReason.GoingAway));
            });
        }, 30000);
    }

    onPong() {
        console.log('on pong')
        if (this.pongTimeout) {
            clearTimeout(this.pongTimeout)
        } else {
            console.warn(`User with id=${this.user.id} send pong without receiving ping`);
        }
    }

    onPing() {
        this.user.sendData(new OutputFrame(ResponseType.Pong));
    }
}