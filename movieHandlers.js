const { response } = require("express");
const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM movies where id = ?", [id])
    .then(([movie]) => {
      if (movie[0]) {
        res.json(movie[0])
      }
      else {
        res.status(404).send(`movie not found with id: ${id}`)
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    })
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query('INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
      [title, director, year, color, duration])
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error saving the movie')
    })

};

module.exports = {
  getMovies,
  getMovieById,
  postMovie
};
