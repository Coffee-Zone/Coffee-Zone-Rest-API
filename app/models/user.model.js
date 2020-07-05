const sql = require("./db.js")

// Constructor
const User = function (user) {
    this.username = user.username;
    this.firstname = user.firstname;
    this.surname = user.surname;
    this.bio = user.bio;
}

// Create a new user
User.create = (newUser, result) => {

    sql.query("INSERT INTO users (username, firstname, surname, bio) values (?, ?, ?, ?)", [newUser.username, newUser.firstname, newUser.surname, newUser.bio], (err, res) => { // sql.query("INSERT INTO users SET ?", newUser, (err, res) => {

        if (err) {
            console.log("error:", err)
            result(err, null)
            return
        }

        console.log("created user: ", { id: res.insertId, ...newUser })
        result(null, {id: res.insertId, ...newUser })

    })
}

// Find a user by Id
User.findById = (userId, result) => {

    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {

        // Error
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        // found
        if (res.length) {
            console.log("found user: ", res[0])
            result(null, res[0])
            return
        }
        
        // not found
        result({kind: "not_found"}, null)

    })
}

// Get all users
User.getAll = result => {

    sql.query("SELECT * FROM users", (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }

        console.log("users: ", res)
        result(null, res)
    })

}

User.updateById = (id, user, result) => {

    sql.query(
        "UPDATE users SET username = ?, firstname = ?, surname = ?, bio = ? WHERE id = ?",
        [user.username, user.firstname, user.surname, user.bio, id],
        (err, res) => {

            if(err){
                console.log("error: ", err)
                result(null, err)
                return
            }

            // Not found costumer with ID
            if(res.affectedRows == 0) {
                result({kind: "not_found"}, null)
                return
            }

            console.log("updated user", {id: id, ...user})
            result(null, {id: id, ...user})
    })

}

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null)
        }

        console.log(`removed user with id ${id}`)
        result(null, res)

    })
}

User.removeAll = result => {

    sql.query("DELETE FROM users", (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }

        console.log(`${res.affectedRows} users were delected`)
        result(null, res)

    })   

}

module.exports = User