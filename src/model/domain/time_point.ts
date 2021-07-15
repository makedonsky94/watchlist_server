namespace TradingView {
    export class TimePoint {
        date: number;
        price: Price;

        constructor(date: number, price: Price) {
            this.date = date;
            this.price = price;
        }
    }
}