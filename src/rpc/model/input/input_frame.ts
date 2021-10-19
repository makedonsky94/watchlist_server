import { Command } from "./comand";

export class InputFrame {
    command: Command;
    payload?: any;

    constructor(command: Command, payload?: any) {
        this.command = command;
        this.payload = payload;
    }
}