import { Watchlist } from "../../../model/domain/watchlist";

export interface WatchlistRepository {
    getAll(): Promise<Watchlist[]>
    getById(id: number): Promise<Watchlist | null>
}