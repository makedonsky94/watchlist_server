import { setInterval } from "timers";
import { HistoryRepositoryImpl } from "../../repostory/internal/watchlist/history_repository_impl";
import { HistoryRepository } from "../../repostory/public/watchlist/history_repository";
import { Tick } from "../model/output/tick";
import { DataProxy, DataProxySubscriber } from "./data_proxy";

export class DataProxyEmulator implements DataProxy {

    private historyRepository: HistoryRepository = new HistoryRepositoryImpl();

    private subscriber?: DataProxySubscriber;

    private symbols: string[] = [];

    private timer?: NodeJS.Timer;

    constructor() {
        
    }

    subscribe(subscriber: DataProxySubscriber) {
        this.subscriber = subscriber;
        if (!this.timer) {
            var offset = 0;
            this.timer = setInterval(() => {
                this.doTick(offset);
                offset++;
            }, 1000);
        }
    }

    addSymbols(symbols: string[]) {
        symbols.forEach((symbol) => {
            this.addSymbol(symbol);
        });
    }

    removeSymbols(symbols: string[]) {
        symbols.forEach((symbol) => {
            this.removeSymbol(symbol);
        });
    }

    destroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    private addSymbol(symbol: string) {
        console.log(this);
        if (this.symbols.indexOf(symbol) == -1) {
            this.symbols.push(symbol);
            this.doTickWithMetadata(symbol);
        }
    }

    private removeSymbol(symbol: string) {
        const index = this.symbols.indexOf(symbol);
        if (index != -1) {
            this.symbols.splice(index, 1);
        }
    }

    private doTick(offset: number) {
        this.symbols.forEach((symbol) => {
            this.doTickWithStock(symbol, offset);
        })
        
    }

    private doTickWithMetadata(symbol: string) {
        const tick = Tick.symbolWithMetaData(symbol, "Test description", "test_icon");
        this.notifySubscriber(tick);
    }

    private doTickWithStock(symbol: string, offset: number) {
        this.historyRepository.getHistory(symbol, 1, offset).then((value) => {
            const stocks = value?.stocks;
            if (stocks && stocks.length != 0) {
                const stock = stocks[0];
                let price;
                if (stock.last) {
                    price = stock.last;
                } else if (stock.close) {
                    price = stock.close;
                } else if (stock.open) {
                    price = stock.open;
                } else {
                    console.error("Data from history has no valid price");
                    price = -1;
                }
                
                const tick = Tick.symbolWithPrice(symbol, price);
                this.notifySubscriber(tick);
            }
        })
    }

    private notifySubscriber(tick: Tick) {
        this.subscriber?.onTick(tick);
    }
}