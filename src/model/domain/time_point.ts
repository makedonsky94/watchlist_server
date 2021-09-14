import { Price } from './price'

export class TimePoint {
    date: number;
    price: Price;

    constructor(date: number, price: Price) {
        this.date = date;
        this.price = price;
    }
}