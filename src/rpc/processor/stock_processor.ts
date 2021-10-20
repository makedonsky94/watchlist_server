import { InputFrame } from "../model/input/input_frame";
import { OutputFrame } from "../model/output/output_frame";
import { ProcessUser } from "./user/process_user";
import { ResponseType } from "../model/output/response_type";
import { Command } from "../model/input/comand";
import { Error, ErrorReason } from "../model/output/error";
import { PingPong } from "./ping_pong";

export class StockProcessor {
    private user: ProcessUser;
    private pingPong: PingPong;

    constructor(user: ProcessUser) {
        this.user = user;
        this.pingPong = new PingPong(user);
        this.subscribeOnReceiveData();
    }

    private subscribeOnReceiveData() {
        this.user.subscribeOnReceiveData((inputFrame: InputFrame | null) => {
            if (inputFrame == null) {
                let frame = new OutputFrame(ResponseType.Error, "Protocol error");
                this.user.sendError(new Error(frame, ErrorReason.ProtocolError));
                return;
            }
            this.obtainCommand(inputFrame);
        });
    }

    private obtainCommand(inputFrame: InputFrame) {
        switch(inputFrame.command) {
            case Command.Pong: {
                this.pingPong.onPong();
                break;
            }
            case Command.Ping: {
                this.pingPong.onPing();
                break;
            }
            case Command.SubscribeSymbols: {
                this.subscribeSymbols(inputFrame.payload as string[]);
                break;
            }
            case Command.UnsubscribeSymbols: {
                this.unsubscribeSymbols(inputFrame.payload as string[]);
                break;
            }
        }
    }

    private subscribeSymbols(symbols: string[]): void {
        console.log('subscribeSymbols ' + symbols);
    }

    private unsubscribeSymbols(symbols: string[]): void {
        console.log('unsubscribeSymbols ' + symbols);
    }
}
