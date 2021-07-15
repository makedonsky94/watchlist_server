import TimePoint = TradingView.TimePoint;

interface HistoryRepository {
    getHistory(symbol: Symbol): Array<TimePoint>
    getTimePoint(date: number, symbol: Symbol): TimePoint
}