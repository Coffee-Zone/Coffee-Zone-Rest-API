const sql = require("./db.js")

// Constructor
const User = function (user) {
    this.username = user.username;
    this.firstname = user.firstname;
    this.surname = user.surname;
    this.phoneNumber = user.phoneNumber,
    this.location = user.location;
    this.bio = user.bio;
    this.photoUrl = user.photoUrl;
    this.totalCoffees = user.totalCoffees;
}

// Create a new user
User.create = (newUser, result) => {

    //sql.query("INSERT INTO users SET ?", newUser, (err, res) => {

    sql.query("INSERT INTO users (username, firstname, surname, phoneNumber, location, bio, photoUrl, totalCoffees) values (?, ?, ?, ?, ?, ?, ?, ?)", [newUser.username, newUser.firstname, newUser.surname, newUser.phoneNumber, newUser.location, newUser.bio, newUser.photoUrl, 1], (err, res) => {

        if (err) {
            console.log("error:", err)
            result(err, null)
            return
        }

        console.log(`created user: ${newUser.username}`, { username: res.insertUsername, ...newUser })
        result(null, {id: res.insertUsername, ...newUser })

    })
}

// Find a user by username
User.findByUsername = (username, result) => {

    sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {

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

// Update user
User.updateByUsername = (username, user, result) => {

    sql.query(
        "UPDATE users SET username = ?, firstname = ?, surname = ?, phoneNumber = ?, location = ?, bio = ? WHERE username = ?",
        [user.username, user.firstname, user.surname, user.phoneNumber, user.location, user.bio, username],
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

            console.log("updated user", {username: username, ...user})
            result(null, {username: username, ...user})
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