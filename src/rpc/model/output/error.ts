import { OutputFrame } from "./output_frame";

export enum ErrorReason {
    GoingAway = 1001,
    ProtocolError = 1002,
    UnsupportedData = 1003,
}

export class Error {
    frame: OutputFrame;
    reason: ErrorReason;

    constructor(frame: OutputFrame, reason: ErrorReason) {
        this.frame = frame;
        this.reason = reason;
    }
}