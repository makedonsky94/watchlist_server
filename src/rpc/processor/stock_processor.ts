import { setInterval } from "timers";
import { InputFrame } from "../model/input/input_frame";
import { OutputFrame } from "../model/output/output_frame";
import { ProcessUser } from "./user/process_user";
import { ResponseType } from "../model/output/response_type";
import { Tick } from "../../model/output/tick";
import { Command } from "../model/input/comand";

export class StockProcessor {

    constructor(user: ProcessUser) {
        setInterval(() => {
            //TODO: get next data
            user.sendData(new OutputFrame(ResponseType.StockTick, Tick.symbolWithPrice("AAPL", 30)))
        }, 1000)

        user.subscribeOnReceiveData((inputFrame: InputFrame) => {
            switch(inputFrame.command) {
                case Command.SubscribeSymbols: 
                    this.subscribeSymbols(inputFrame.payload as string[]);
            }
        })
    }

    private subscribeSymbols(symbols: string[]): void {

    }
}