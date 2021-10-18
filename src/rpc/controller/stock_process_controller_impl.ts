import { ProcessUser } from "../model/user/process_user";
import { v4 as uuidv4 } from 'uuid';
import { StockProcessController } from "./stock_process_controller";
import { StockProcessor } from "../processor/stock_processor";
import { StockProcessorImpl } from "../processor/stock_processor_impl";

export class StockProcessControllerImpl implements StockProcessController {

    private map: Map<WebSocket, ProcessUser> = new Map<WebSocket, ProcessUser>();

    private stockProcessor: StockProcessor;

    constructor() {
        this.stockProcessor = new StockProcessorImpl();
    }

    onConnect(socket: WebSocket): void {
        const userId = uuidv4();
        const processUser = new ProcessUser(userId);
        this.map.set(socket, processUser);
        this.stockProcessor.addUser(processUser);

        socket.onmessage = (event) => {
            const data = event.data
            //TODO: convert to frame
            this.stockProcessor.sendFrame(data)
        }

        socket.onclose = () => {
            this.map.delete(socket);
            this.stockProcessor.removeUser(processUser);
        }
    }
}