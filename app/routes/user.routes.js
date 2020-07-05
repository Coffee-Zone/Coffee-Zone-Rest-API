module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.post("/users", users.create)            // Create a new user

    app.get("/users", users.findAll)            // Retrieve all users

    app.get("/users/:userId", users.findOne)    // Retrieve a user by id

    app.put("/users/:userId", users.update)     // Update a user by id

    app.delete("/users", users.deleteAll)       // Delete all users

    app.delete("users/userId", users.delete)    // Delete a single user by id

}