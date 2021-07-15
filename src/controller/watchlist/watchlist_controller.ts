import {WatchlistRepository} from "../../repostory/public/watchlist/watchlist_repository";
import {WatchlistRepositoryImpl} from "../../repostory/internal/watchlist/watchlist_repository_impl";
import {Response} from "express";
import {BaseController} from "../base_controller";

export class WatchlistController implements BaseController {
    public static index(response: Response) {
        const watchlistRepository: WatchlistRepository = new WatchlistRepositoryImpl()
        watchlistRepository.getWatchlist().then((watchlist) => {
            response.json(watchlist)
        })
    }
}