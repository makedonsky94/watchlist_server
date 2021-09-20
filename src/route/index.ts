import { app } from './express'
import http from 'http';
import './../socket';

import './rest/watchlist'


app.set('views', __dirname + '/../../view');
app.set('view engine', 'twig');

app.get('/', (req, res) => {
  res.render('index', {
      buttonText : "Send"
  });
});

const server = http.createServer(app);

server.listen(80, () => {
  console.log('listening on *:80');
});