import { Tick } from "../model/output/tick";

export interface DataProxy {
    subscribe(subscriber: DataProxySubscriber): void;
}

export interface DataProxySubscriber {
    onTick(tick: Tick): void;
}