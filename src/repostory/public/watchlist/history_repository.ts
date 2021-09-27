import { Stock } from '../../../model/domain/stock'

export interface HistoryRepository {
    getHistory(symbolName: string): Promise<{ stocks: Stock[], historyCount: number } | null> 
}