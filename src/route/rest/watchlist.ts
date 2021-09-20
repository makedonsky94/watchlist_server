import { app } from "./../express"
import { WatchlistController } from "./../../controller/watchlist/watchlist_controller"


app.get('/watchlists', (req, res) => {
    //we need to show here swagger or something
    WatchlistController.index(req, res)
})

app.get('/watchlists/:id', (req, res) => {
    WatchlistController.byId(req, res)
})