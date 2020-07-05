/** The user.controller Functions
 * create
 * findAll
 * findOne
 * update
 * delete
 * deleteAll
 */

const User = require("../models/user.model.js")

// Create and Save a new User
exports.create = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    // Create an User
    const user = new User ({
        username: req.body.username,
        firstname: req.body.firstname,
        surname: req.body.surname,
        bio: req.body.bio
    })

    // Save User in the database
    User.create(user, (err, data) => {

            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occured while creating the User"
                })
            } else {
                res.send(data)
            }
    })

}

// Retrieve all users from the database
exports.findAll = (req, res) => {

    User.getAll((err, data) => {
        
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Users"
            })
        } else {
            res.send(data)
        }

    })
}

// Retrieve a user by id
exports.findOne = (req, res) => {
 
    User.findById(req.params.userId, (err, data) => {
        
        if (err) {

            if(err.kind === "not_found"){
                
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                })

            } else {
                res.status(500).send({
                    message: `Error retrieving user with id ${req.params.userId}.`
                })
            }
        } else {
            res.send(data)
        }
    })
    
}

// Update a user by id
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
    }

    User.updateById(req.params.userId, new User(req.body), (err, data) => {
        
        if (err) {

            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}`
                })
            } else {
                res.status(500).send({
                    message: `Error updating userer with id ${req.params.userId}`
                })
            }           
        } else {
            res.send(data)
        }
    })

}

// Delete a user by id
exports.delete = (req, res) => {

    User.remove(req.params.userId, (err, data) => {

        if (err) {
            
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}`
                })

            } else {
                res.status(500).send({
                    message: `Could not delete User with id ${req.params.userId}`
                })
            }

        } else {
            res.send({
                message: `User was deleted successfully!`
            })
        }
    })
}

// Delete all users
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {

        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while removing all users."
            })
        } else {
            res.send({
                message: "All users were deleted successfully!"
            })
        }
    })
}
