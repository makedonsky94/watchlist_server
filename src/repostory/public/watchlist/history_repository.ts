import { TimePoint } from '../../../model/domain/time_point'

interface HistoryRepository {
    getHistory(symbol: Symbol): Array<TimePoint>
    getTimePoint(date: number, symbol: Symbol): TimePoint
}