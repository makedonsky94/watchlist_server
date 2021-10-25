import { Tick } from "../model/output/tick";

export interface DataProxy {
    subscribe(subscriber: DataProxySubscriber): void;
    addSymbols(symbol: string[]): void;
    removeSymbols(symbol: string[]): void;
    destroy(): void;
}

export interface DataProxySubscriber {
    onTick(tick: Tick): void;
}