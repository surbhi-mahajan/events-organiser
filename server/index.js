const express = require('express');
const app = express();
const { server } = require('./app')
const path = require('path')

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8089;

app.use(express.static(path.join(__dirname, 'dist')));

server(app);

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

app.listen(port, () => console.log(`Listening on port ${ port }...`))

