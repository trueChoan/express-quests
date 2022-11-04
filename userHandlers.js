const database = require("./database");


const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from database")
    })
}

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id)
  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([user]) => {
      if (user[0]) {
        res.json(user[0])
      } else {
        res.status(404).send(`user not found with id: ${id}`)
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("Error retrieving data from database")
    })
}

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.params;

  database
    .query('INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language])
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error saving the user')
    })
}

module.exports = {
  getUsers,
  getUsersById,
  postUser
}