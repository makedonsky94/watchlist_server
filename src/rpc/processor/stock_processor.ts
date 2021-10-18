import { InputFrame } from "../model/input/input_frame";
import { OutputFrame } from "../model/output/output_frame";
import { ProcessUser } from "../model/user/process_user";

export interface StockProcessor {
    addUser(processUser: ProcessUser): void;
    removeUser(processUser: ProcessUser): void;

    sendFrame(frame: InputFrame): void;
    subscribeOnOutput(output: (frame: OutputFrame) => void): void;
}