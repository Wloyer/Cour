const db = require('../database/database')

exports.getAllCelebrites = async(req, res)=> {
    const sql = "SELECT * from celebrite";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}

exports.addCelebrite = async (req, res)=>{
    const { nom, prenom, age } = req.body;
    const sql = "INSERT INTO celebrite (nom, prenom, age) VALUES (?, ?, ?)";
    await db.query(sql, [nom, prenom, age]);
    res.status(200).json({ message: 'Utilisateur créé' });
}