const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.getAllClients = async(req, res)=> {
    const sql = "SELECT * from client";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}

exports.register = async (req, res)=>{
    //verifier l'email de l'utilisateur 
    const {email, password } = req.body;
    const result = await db.query("SELECT * FROM client WHERE email = ?", [email]);
    if(result.length > 0){
        return res.status(401).json({ error: "Utilisateurs déjà utilisé" });
    }
    // utiliser bcrypt pour hasher le mot de passe
    const hashMDP = await bcrypt.hash(password, 10);
    //envoyer les info email mdp en bdd
    await db.query("INSERT INTO client (email, password) VALUES (?, ?)",
     [email, hashMDP]
     );
    
    //utilisation jwt token pour la signature
    const token = jwt.sign(
        {  email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.json({ token })
}

exports.login = async (req, res)=>{
    //verifier l'email de l'utilisateur  => récupéré le mot de passe
    const {email, password } = req.body;   
    const result = await db.query("SELECT * FROM client WHERE email = ?", [email]);
    if(result.length === 0){
        return res.status(401).json({ error: "Utilisateurs non trouvé" });
    }
    const client = result[0];
    console.log(client);
    // comparaison du mdp avec le mdp hasher en bdd avec bycrypt
    const SamePwd = await bcrypt.compare(password, client.password);
    if(!SamePwd){
        return res.status(401).json({ error: "Mot de passe incorrect" });
    }
    //renvoie jwt token pour la signature
     const token = jwt.sign(
        {  email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
    res.json({ token })
    
    
}