const db = require('../database/database')

exports.getAllClients = async(req, res)=> {
    const sql = "SELECT * from client";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}
