const compression = require('compression');
const express = require('express');

const app = express();

app.use(compression());

app.use(express.static(__dirname + '/build'));

app.get('*', function(req, res) {
  res.sendFile('./build/index.html', { root: __dirname });
});
app.listen(process.env.PORT || 5002);
