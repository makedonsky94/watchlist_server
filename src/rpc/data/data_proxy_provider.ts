import { DataProxy } from "./data_proxy";
import { DataProxyEmulator } from "./data_proxy_emulator";

export class DataProxyProvider {
    private static proxySingleton?: DataProxy;

    static provideDataProxy(): DataProxy {
        if (!DataProxyProvider.proxySingleton) {
            DataProxyProvider.proxySingleton = new DataProxyEmulator();
        }
        return DataProxyProvider.proxySingleton;
    }
}