import { HistoryRepository } from './../../public/watchlist/history_repository'
import { Stock } from '../../../model/domain/stock'
import { StockEntity } from '../db/entity/stock_entity'

export class HistoryRepositoryImpl implements HistoryRepository {
    getHistory(symbolName: string, limit: number = 100, offset: number = 0): Promise<{ stocks: Stock[], historyCount: number } | null> {
        return StockEntity.findAndCountAll({
            where: {
                symbol: symbolName
            },
            limit: limit,
            offset: offset
        }).then((values) => {
            let stocks = values.rows
            let count = values.count

            if (count == 0) {
                return null
            } else if (stocks == null) {
                return {
                    stocks: [],
                    historyCount: 0
                }
            } else {
                return {
                    stocks: stocks.map((stockEntity) => new Stock(
                        stockEntity.symbol, 
                        stockEntity.open, stockEntity.high, stockEntity.low, stockEntity.close, 
                        stockEntity.last, stockEntity.volume, 
                        stockEntity.date
                    )),
                    historyCount: count
                }
            }
        })
    }
}