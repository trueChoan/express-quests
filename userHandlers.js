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

module.exports = {
  getUsers,
  getUsersById
}