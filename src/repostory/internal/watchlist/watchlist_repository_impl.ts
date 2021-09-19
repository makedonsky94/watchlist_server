import { WatchlistRepository } from "../../public/watchlist/watchlist_repository";
import { Watchlist } from "../../../model/domain/watchlist";
import { WatchlistEntity } from "../db/entity/watchlist_entity";

export class WatchlistRepositoryImpl implements WatchlistRepository {
    getWatchlist(): Promise<Watchlist | null> {
        return WatchlistEntity.findOne().then((watchlistEntity) => {
            if (watchlistEntity == null) {
                return null
            }
            return new Watchlist(
                watchlistEntity.name,
                JSON.parse(watchlistEntity.symbolsArray)
            )
        })
    }
}
