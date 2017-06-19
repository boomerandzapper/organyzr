const express = require('express');
const ENV = process.env.ENV || "development";
const body = require('body-parser');
const cookies = require('cookie-parser');
const WebpackDevServer = require('webpack-dev-server');


const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

// const gamesRoutes = require('./routes/games')

const webpack = {
  core: require('webpack'),
  middleware: require('webpack-dev-middleware'),
  hot: require('webpack-hot-middleware'),
  config: require('../client/webpack.config.js')
}

const app = express()
const compiler = webpack.core(webpack.config);

// const PORT = 8080;

//Functions

const add_user_local = require("./functions/add_user_local.js");
const add_user_facebook = require("./functions/add_user_facebook.js");

app.use(body.json());
app.use(cookies());
// app.use('/games', gamesRoutes(knex));

// Listen to POST requests to /users.
app.post('/signup', function(req, res) {
  // Get sent data.
  console.log('req', req)
  let user = req.body;
  // Do a MySQL query.
  console.log(user)
  add_user_local(knex, user, res)


});

app.get('/games/data', function(req, res) {
  // console.log('res', res);
  // knex('games').select("*").then((results) => {
    console.log('server side');
    res.send('hello');
    // gameRoutes(knex, res);
      // knex
      // .select("*")
      // .from("games")
      // .then(function(results){
      //   console.log('in games.js', results);
      //   res.send(results);
      // });
  // })
})

app.use(webpack.middleware(compiler, {
  publicPath: webpack.config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

new WebpackDevServer(webpack.core(webpack.config), {
    publicPath: webpack.config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

