import { Symbol } from './symbol'

export class Watchlist {
    name: string
    symbols: string[]

    constructor(name: string, symbols: string[]) {
        this.name = name;
        this.symbols = symbols;
    }
}