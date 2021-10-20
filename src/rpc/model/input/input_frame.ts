import { Command } from "./comand";

export class InputFrame {
    command: Command;
    payload: any | null;

    constructor(command: Command, payload: any = null) {
        this.command = command;
        this.payload = payload;
    }
}