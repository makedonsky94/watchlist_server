import { app } from "./../express"
import { StockController } from "./../../controller/watchlist/stock_controller"

app.get('/stocks/:symbolName', (req, res) => {
    StockController.byName(req, res)
})