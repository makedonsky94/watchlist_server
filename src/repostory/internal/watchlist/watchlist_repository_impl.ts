import { WatchlistRepository } from "../../public/watchlist/watchlist_repository";
import { Watchlist } from "../../../model/domain/watchlist";
import { WatchlistEntity } from "../db/entity/watchlist_entity";

export class WatchlistRepositoryImpl implements WatchlistRepository {
    getAll(): Promise<Watchlist[]> {
        return WatchlistEntity.findAll().then((list) => {
            if (list == null) {
                return []
            }
            return list.map((watchlistEntity) => new Watchlist(
                watchlistEntity.id,
                watchlistEntity.name,
                JSON.parse(watchlistEntity.symbolsArray)
            ))
        })
    }

    getById(id: number): Promise<Watchlist | null> {
        return WatchlistEntity.findByPk(id).then((watchlistEntity) => {
            if (watchlistEntity == null) {
                return null
            }
            return new Watchlist(
                watchlistEntity.id,
                watchlistEntity.name,
                JSON.parse(watchlistEntity.symbolsArray)
            )
        })
    }
}
