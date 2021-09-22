import { WatchlistRepository } from "../../repostory/public/watchlist/watchlist_repository";
import { WatchlistRepositoryImpl } from "../../repostory/internal/watchlist/watchlist_repository_impl";
import { Response, Request } from "express";
import { BaseController } from "../base_controller";
import { Error } from "../../model/output/error";

export class WatchlistController implements BaseController {
    /**
     * /watchlists
     */ 
    public static index(request: Request, response: Response) {
        response.format({
            'application/json': function() {
                const watchlistRepository: WatchlistRepository = new WatchlistRepositoryImpl()
                watchlistRepository.getAll().then((watchlists) => {
                    response.json(watchlists)
                })
            },
            default: function() {
                response.status(406).send('The client should support application/json')
            }
        })
    }

    /**
     * /watchlists/:id
     */
    public static byId(request: Request, response: Response) {
        response.format({
            'application/json': function() {
                let watchlistId = request.params.id
                if (!/^[0-9]+$/.test(watchlistId)) {
                    response.status(400).json(new Error("Id of watchlist has incorrect format"))
                    return
                }

                let watchlistIdNumeric = Number.parseInt(watchlistId)
                
                const watchlistRepository: WatchlistRepository = new WatchlistRepositoryImpl()
                watchlistRepository.getById(watchlistIdNumeric).then((watchlist) => {
                    if (watchlist == null) {
                        response.status(404).json(new Error(`Watchlist with id ${watchlistIdNumeric} is not found`))
                        return
                    }

                    response.json(watchlist)
                })
            },
            default: function() {
                response.status(406).send('The client should support application/json')
            }
        })
    }
}