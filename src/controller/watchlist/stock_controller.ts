import { HistoryRepository } from "../../repostory/public/watchlist/history_repository";
import { HistoryRepositoryImpl } from "../../repostory/internal/watchlist/history_repository_impl";
import { BaseController } from "../base_controller";
import { Response, Request } from "express";

export class StockController implements BaseController {
    public static byName(request: Request, response: Response) {
        response.format({
            'application/json': function() {
                let symbolName = request.params.symbolName

                const historyRepository: HistoryRepository = new HistoryRepositoryImpl()
                historyRepository.getHistory(symbolName).then((stocks) => {
                    response.json(stocks)
                })
            },
            default: function() {
                response.status(406).send('The client should support application/json')
            }
        })
    }
}