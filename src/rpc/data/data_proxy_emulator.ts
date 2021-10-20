import { setInterval } from "timers";
import { DataProxy, DataProxySubscriber } from "./data_proxy";

export class DataProxyEmulator implements DataProxy {

    constructor() {
        setInterval(() => {

        }, 1000);
    }

    subscribe(subscriber: DataProxySubscriber) {

    }
}