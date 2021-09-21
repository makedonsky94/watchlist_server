import { HistoryRepository } from './../../public/watchlist/history_repository'
import { Stock } from '../../../model/domain/stock'
import { StockEntity } from '../db/entity/stock_entity'

export class HistoryRepositoryImpl implements HistoryRepository {
    getHistory(symbolName: string): Promise<Stock[]> {
        return StockEntity.findAll({
            where: {
                symbol: symbolName
            }
        }).then((stocks) => {
            if (stocks == null) {
                return []
            }
            return stocks.map((stockEntity) => new Stock(
                stockEntity.symbol, 
                stockEntity.open, stockEntity.high, stockEntity.low, stockEntity.close, 
                stockEntity.last, stockEntity.volume, 
                stockEntity.date
            ))
        })
    }
}