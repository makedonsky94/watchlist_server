import { OutputFrame } from "../model/output/output_frame";
import { ProcessUser } from "./user/process_user";
import { ResponseType } from "../model/output/response_type";
import { Error, ErrorReason } from "../model/output/error";

export class PingPong {
    private pongTimeout?: NodeJS.Timeout;
    private user: ProcessUser;

    constructor(user: ProcessUser) {
        this.user = user;
        this.schedulePing();
    }

    private schedulePing() {
        setTimeout(() => {
            this.user.sendData(new OutputFrame(ResponseType.Ping));
            this.pongTimeout = setTimeout(() => {
                let frame = new OutputFrame(ResponseType.Error, "Pong is not received");
                this.user.sendError(new Error(frame, ErrorReason.GoingAway));
            });
        }, 30000);
    }

    onPong() {
        console.log(`${this.user.id} sends pong`);
        if (this.pongTimeout) {
            clearTimeout(this.pongTimeout);
            this.schedulePing();
        } else {
            console.warn(`User with id=${this.user.id} send pong without receiving ping`);
        }
    }

    onPing() {
        console.log(`${this.user.id} sends ping`);
        this.user.sendData(new OutputFrame(ResponseType.Pong));
    }
}