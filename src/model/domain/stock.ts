export class Stock {
    symbol: string
    open: number
    high: number
    low: number
    close: number | null
    last: number | null
    volume: number | null
    date: Date

    constructor(
        symbol: string, 
        open: number, 
        high: number, 
        low: number, 
        close: number, 
        last: number, 
        volume: number, 
        date: Date
    ) {
        this.symbol = symbol
        this.open = open
        this.high = high
        this.low = low
        this.close = close
        this.last = last
        this.volume = volume
        this.date = date
    }
}