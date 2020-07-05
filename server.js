
const express = require("express")

const bodyParser = require("body-parser")



const app = express()

app.use(bodyParser.json()) // Parse requests of content-type: application/json

app.use(bodyParser.urlencoded({ extended : true })) // Parse requests of content-type: application/x-www-form-urlencoded

// Simple route
app.get( "/", (req, res) => {
 
    res.json({message: "Welcome to Coffee Zone app!"})

})

// Custom route
app.get("/developer", (req, res) => {
    res.json({name: "Calleb J. Miquissene"})
})


require("./app/routes/user.routes.js")(app);

// Set port and listen to requests
app.listen(3000, () => {

    console.log("The application is running on port 3000")

});