import { InputFrame } from "../../model/input/input_frame";
import { Error } from "../../model/output/error";
import { OutputFrame } from "../../model/output/output_frame";

export type Data = string | Buffer | ArrayBuffer | Buffer[];

export interface ProcessUser {
    readonly id: string;

    sendData(output: OutputFrame): void;

    sendError(error: Error): void;

    subscribeOnReceiveData(subscriber: (input: InputFrame) => void): void;

    unsubscribeOnReceiveData(subscriber: (input: InputFrame) => void): void;

    isAlive(): boolean;
}