import { Stock } from '../../../model/domain/stock'

export interface HistoryRepository {
    getHistory(symbolName: string, limit: number, offset: number): Promise<{ stocks: Stock[], historyCount: number } | null> 
}