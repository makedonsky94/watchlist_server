import { ProcessUser } from "../processor/user/process_user";
import { StockProcessController } from "./stock_process_controller";
import { StockProcessor } from "../processor/stock_processor";
import { ProcessUserImpl } from "../processor/user/process_user_impl";

import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';

export class StockProcessControllerImpl implements StockProcessController {

    onConnect(socket: WebSocket): void {
        const userId = uuidv4();
        const processUser: ProcessUser = new ProcessUserImpl(userId, socket);
        let stockProcessor = new StockProcessor(processUser);
    }
}