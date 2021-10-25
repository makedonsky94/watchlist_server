import { InputFrame } from "../model/input/input_frame";
import { OutputFrame } from "../model/output/output_frame";
import { ProcessUser } from "./user/process_user";
import { ResponseType } from "../model/output/response_type";
import { Command } from "../model/input/comand";
import { Error, ErrorReason } from "../model/output/error";
import { PingPong, PingPongEvent } from "./ping_pong";
import { DataProxy, DataProxySubscriber } from "../data/data_proxy";
import { DataProxyEmulator } from "../data/data_proxy_emulator";
import { Tick } from "../model/output/tick";

export class StockProcessor implements DataProxySubscriber {
    private user: ProcessUser;
    private pingPong: PingPong;
    private dataProxy: DataProxy;

    constructor(user: ProcessUser) {
        this.user = user;
        this.pingPong = new PingPong((event) => {
            this.subscribeOnPingPongEvent(event);
        });
        this.dataProxy = new DataProxyEmulator();
        this.dataProxy.subscribe(this);

        this.subscribeOnReceiveData();
    }

    onTick(tick: Tick) {
        this.user.sendData(new OutputFrame(ResponseType.StockTick, tick));
    }

    private subscribeOnReceiveData() {
        this.user.subscribeOnReceiveData((inputFrame: InputFrame | null) => {
            if (inputFrame == null) {
                let frame = new OutputFrame(ResponseType.Error, "Protocol error");
                this.user.sendError(new Error(frame, ErrorReason.ProtocolError));
                this.dataProxy.destroy();
                return;
            }
            this.obtainCommand(inputFrame);
        });
    }

    private subscribeOnPingPongEvent(event: PingPongEvent) {
        switch(event) {
            case PingPongEvent.Error:
                const frame = new OutputFrame(ResponseType.Error, "Pong is not received");
                this.user.sendError(new Error(frame, ErrorReason.GoingAway));
                break;
            case PingPongEvent.Ping:
                this.user.sendData(new OutputFrame(ResponseType.Ping));
                break;
            case PingPongEvent.Pong:
                this.user.sendData(new OutputFrame(ResponseType.Pong));
                break;
        }
    }

    private obtainCommand(inputFrame: InputFrame) {
        switch(inputFrame.command) {
            case Command.Pong: {
                console.log(`${this.user.id} sends pong`);
                this.pingPong.onPong();
                break;
            }
            case Command.Ping: {
                console.log(`${this.user.id} sends ping`);
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
        this.dataProxy.addSymbols(symbols);
    }

    private unsubscribeSymbols(symbols: string[]): void {
        console.log('unsubscribeSymbols ' + symbols);
        this.dataProxy.removeSymbols(symbols);
    }
}
