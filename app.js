let express = require('express');
let knex = require('knex');

let app = express();

let port = process.env.PORT || 8000;

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

app.get('/api/genres', function(request, response){

  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
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
      filename: 'chinook.db'
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
