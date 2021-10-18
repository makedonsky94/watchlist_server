import { setInterval } from "timers";
import { InputFrame } from "../model/input/input_frame";
import { OutputFrame } from "../model/output/output_frame";
import { ProcessUser } from "../model/user/process_user";
import { StockProcessor } from "./stock_processor";

export class StockProcessorImpl implements StockProcessor {

    private outputs: ((frame: OutputFrame) => void)[] = [];
    private users: ProcessUser[] = [];

    constructor() {
        setInterval(() => {
            //TODO: process every tick
        }, 1000)
    }

    addUser(user: ProcessUser) {
        this.users.push(user);
    }

    removeUser(user: ProcessUser) {
        const index = this.users.indexOf(user);
        if (index != -1) {
            this.users.splice(index, 1);
        }
    }

    sendFrame(frame: InputFrame) {
        let command = frame.command
    }

    subscribeOnOutput(output: (frame: OutputFrame) => void) {
        this.outputs.push(output);
    }
}