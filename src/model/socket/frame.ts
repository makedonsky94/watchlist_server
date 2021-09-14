import { Price } from '../domain/price'
 
export class Frame {
    symbol: string
    price: Price

    constructor(symbol: string, price: Price) {
        this.symbol = symbol;
        this.price = price;
    }
}