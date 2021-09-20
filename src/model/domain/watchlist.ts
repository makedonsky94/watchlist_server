import { Symbol } from './symbol'

export class Watchlist {
    id: number
    name: string
    symbols: string[]

    constructor(id: number, name: string, symbols: string[]) {
        this.id = id
        this.name = name;
        this.symbols = symbols;
    }
}