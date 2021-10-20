import { setInterval } from "timers";
import { HistoryRepositoryImpl } from "../../repostory/internal/watchlist/history_repository_impl";
import { HistoryRepository } from "../../repostory/public/watchlist/history_repository";
import { DataProxy, DataProxySubscriber } from "./data_proxy";

export class DataProxyEmulator implements DataProxy {

    private historyRepository: HistoryRepository = new HistoryRepositoryImpl();

    constructor() {
        //TODO: get list of symbols
        setInterval(() => {
            //TODO: get emulated data for item
        }, 1000);
    }

    subscribe(subscriber: DataProxySubscriber) {

    }
}