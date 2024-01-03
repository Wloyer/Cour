const express = require('express')
const app = express()
const cors = require('cors')

//recupération routes:
const celebriteRoute = require('./routes/celebriteRoute')
const clientRoute = require('./routes/clientRoute')

//middleware
app.use(express.json())
app.use(cors())


// appelle des routes: http://localhost:8000/celebrite/
app.use('/celebrite', celebriteRoute)
app.use('/client', clientRoute)


app.listen(8000, function(){
    console.log("serveur ouvert sur le port 8000");
})