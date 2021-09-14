import { Watchlist } from "../../../model/domain/watchlist";

export interface WatchlistRepository {
    getWatchlist(): Promise<Watchlist>
}