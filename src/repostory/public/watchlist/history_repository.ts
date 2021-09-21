import { Stock } from '../../../model/domain/stock'

export interface HistoryRepository {
    getHistory(symbolName: string): Promise<Stock[]>
}