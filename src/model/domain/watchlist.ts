import {Document} from 'bson'
import {Symbol} from './symbol'

export class Watchlist implements Document {
    name: string
    symbols: Array<Symbol>

    constructor(name: string, symbols: Array<Symbol>) {
        this.name = name;
        this.symbols = symbols;
    }
}