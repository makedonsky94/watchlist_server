import { HistoryRepository } from "../../repostory/public/watchlist/history_repository";
import { HistoryRepositoryImpl } from "../../repostory/internal/watchlist/history_repository_impl";
import { BaseController } from "../base_controller";
import { Response, Request } from "express";
import { Page } from "../../model/output/page";
import { PageData } from "../../model/output/page_data";
import { Error } from "../../model/output/error";

export class StockController implements BaseController {

    /**
     * /stocks/intraday/:symbolName
     */
    public static intradayByName(request: Request, response: Response) {
        response.format({
            'application/json': function() {
                let symbolName = request.params.symbolName

                let offset = request.query.offset?.toString()
                var offsetNumber: number

                if (offset == null) {
                    offsetNumber = 0
                } else if (!/^[0-9]+$/.test(offset)) {
                    response.status(400).json(new Error("offset has incorrect format"))
                    return
                } else {
                    offsetNumber = Number.parseInt(offset)
                }

                const historyRepository: HistoryRepository = new HistoryRepositoryImpl()
                historyRepository.getHistory(symbolName).then((history) => {
                    if (history == null) {
                        response.status(404).send(new Error("Not found any data"))
                        return
                    }

                    let stocks = history.stocks
                    let totalCount = history.historyCount
                    let count = stocks.length
                    let page = new Page(count, totalCount, offsetNumber)
                    response.json(new PageData(stocks, page))
                })
            },
            default: function() {
                response.status(406).send('The client should support application/json')
            }
        })
    }
}