const express = require('express');
const knex = require('knex');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

const sequelize = require('./database/sequelize');

const Track = require('./models/track');

const { Op } = Sequelize;

let knex_db_filepath = "database/chinhook.db";

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

app.use(bodyParser.json());

app.patch('/api/tracks/:id', function(req, res){
  let { id } = req.params;

  Track.findByPk(id).then((track) => {
    if (track){
      track.update(req.body).then((track) => {
        res.status(200).json(track);
      }, (validation) => {

        res.status(422).json({
          errors: validation.errors.map((error) => {
            return {
              attribute: error.path,
              message: error.message
            };
          })
        });

      });
    } else {
      res.status(404).send();
    }
  });
});

app.get('/api/genres', function(request, response){

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: knex_db_filepath
    }
  });

  connection.select().from('genres').then((genres) => {
    response.json(genres);
  });

});

app.get('/api/genres/:id', function(request, response){
  let id = request.params.id;

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: knex_db_filepath
    }
  });

  connection.select().from('genres').where('GenreId', '=', id).then((genres) => {
    response.json(genres);
  });

});

app.get('/api/artists', function(request, response){
  let filter = request.query['filter'];

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });

  function convert(x){
  	let val = {"id": x.ArtistId.toString(), "name": x.Name};
    return val;
  }

  if(filter){
    connection('artists').where('Name','like','%'+filter+'%').then((artists) => {
      response.json(artists.map(convert));
    });
  }else{
    connection.select().from('artists').then((artists) => {
      response.json(artists.map(convert));
    });
  }
});

app.listen(port, () => console.log(`listening on port ${port}!`));
