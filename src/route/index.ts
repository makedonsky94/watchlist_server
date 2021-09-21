import { app } from './express'
import './../socket'

import './rest/watchlist'
import './rest/stock'


app.set('views', __dirname + '/../view');
app.set('view engine', 'twig');

app.get('/', (req, res) => {
  res.render('index', {
      buttonText : "Send"
  })
})