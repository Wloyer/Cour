const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour lire le fichier JSON
function lireFichier() {
  const data = fs.readFileSync('celebrites.json', 'utf8');
  return JSON.parse(data);
}

// Fonction pour afficher la liste des personnes célèbres
function afficherListe() {
  const celebrities = lireFichier();
  console.log('Liste des personnes célèbres :');
  celebrities.forEach(personne => {
    console.log(`${personne.nom} ${personne.prenom}, ${personne.age} ans`);
  });
  rl.close(); // Ferme l'interface readline une fois l'opération terminée
}

// Fonction pour ajouter une nouvelle personne célèbre
function ajouterPersonne(nom, prenom, age) {
  const celebrities = lireFichier();
  celebrities.push({ nom, prenom, age });
  fs.writeFileSync('celebrites.json', JSON.stringify(celebrities, null, 2), 'utf8');
  console.log('Personne ajoutée avec succès !');
  rl.close(); 
}

// Fonction principale (main)
function main() {
  console.log('Bienvenue dans le gestionnaire de célébrités !');
  console.log('1. Ajouter une personne célèbre');
  console.log('2. Afficher la liste des personnes célèbres');
  rl.question('Veuillez choisir une option (1, 2, ou 3) : ', (choix) => {
    choix = parseInt(choix);

    switch (choix) {
      case 1:
        rl.question('Nom de la personne célèbre : ', (nom) => {
          rl.question('Prénom de la personne célèbre : ', (prenom) => {
            rl.question('Âge de la personne célèbre : ', (age) => {
              ajouterPersonne(nom, prenom, parseInt(age));
            });
          });
        });
        break;
      case 2:
        afficherListe();
        break;
      default:
        console.log('Option invalide. Veuillez choisir une option valide.');
        rl.close();
    }
  });
}

main()