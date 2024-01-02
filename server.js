const express = require('express'); // import express
const app = express(); // initialize express
const celebritees = require('./celebrites.json');
const db = require('./database');

//middleware
app.use(express.json());


app.get('/celebrites',function (req, res) {
  res.status(200).json(celebritees);
});

app.get('/celebrites/:nom', (req, res) => {
    let nom = req.params.id; 
    laCelebritee = celebritees.find(celebritee => celebritee.nom === nom);
    res.status(200).json(laCelebritee); 
});

app.post('/celebrites', async (req, res) => {
    console.log(req.body);
    await db.query(`INSERT INTO celebrites (nom, prenom, age) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.age}'`),
    res.status(200).json(celebritees);
});





app.listen(8000, () => {
  console.log('Server is running at port 8000');
}); // make the server listen to requests on port 3000
