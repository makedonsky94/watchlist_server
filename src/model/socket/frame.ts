namespace TradingView {
    export class Frame {
        symbol: string
        price: Price

        constructor(symbol: string, price: TradingView.Price) {
            this.symbol = symbol;
            this.price = price;
        }
    }
}