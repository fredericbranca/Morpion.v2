//Le code gère le tour des joueurs, les combinaisons gagnante et le match nul
  
//----------FONCTIONS----------//

//Fonction pour activer une barre (combinaison gagnante)
function activeBar(bar) {
  bar.classList.add('active');
}


//Vérifie si la partie est gagnante ou match nul
function statutPartie(currentPlayer, grille) {

  // Tableau contenant toutes les combinaisons gagnantes possibles
  const combinaisonsGagnantes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

 //Boucle sur les combinaisons gagnantes pour vérifier si l'une d'entre elles fonctionne
  for (let i = 0; i < combinaisonsGagnantes.length; i++) {
    let combinaison = combinaisonsGagnantes[i];
    let victoire = true;

    for(let j = 0; j < combinaison.length; j++){
      if(grille[combinaison[j]].innerHTML !== currentPlayer){
        victoire = false;
        break;
      } 
    }

    //Si une combinaison gagnante est trouvée, active la barre correspondante et retourne true
    if (victoire) {
      if (i === 0) activeBar(barHTop);
      else if (i === 1) activeBar(barHMid);
      else if (i === 2) activeBar(barHBot);
      else if (i === 3) activeBar(barVLeft);
      else if (i === 4) activeBar(barVMid);
      else if (i === 5) activeBar(barVRight);
      else if (i === 6) activeBar(barDiagD);
      else if (i === 7) activeBar(barDiagL);

      return true;
    }
  }

    // Vérifie si toutes les cases sont occupées (match nul)
    const casesOccupees = Array.from(grille).every(box => box.innerHTML === "X" || box.innerHTML === "O");

    if (casesOccupees) {
      return "matchNul";
    }
    
    return null;
}

// Fonction pour recommencer le jeu
function recommencer() {

  // Efface le contenu de toutes les cases
  grille.forEach(carre => {
    carre.innerHTML = '';
  });

  // Désactive toutes les barres
  barHTop.classList.remove('active');
  barHMid.classList.remove('active');
  barHBot.classList.remove('active');
  barVLeft.classList.remove('active');
  barVMid.classList.remove('active');
  barVRight.classList.remove('active');
  barDiagD.classList.remove('active');
  barDiagL.classList.remove('active');

  // Relance le jeu
  return main();
}

// Fonction principale qui gère le déroulement du jeu
function main() {

  //Variables pour la partie
  var fini = false;

  // Change de joueur à chaque partie
  currentPlayer = currentPlayer === player1 ? player2 : player1;

  // Création des éléments HTML pour afficher le statut de la partie
  h1.innerHTML = "Le jeu du Morpion";
  p.innerHTML = "Joueur " + currentPlayer + " peut commencer à jouer";
  statut.appendChild(h1);
  statut.appendChild(p);


  //Boucle qui gère les clicks pour chaques cases du morpion
  for (let i = 0; i < 9; i++) {

      grille[i].addEventListener("click", function () {

        // Vérifie si la partie est finie
        if (fini == false) {
          
          //vérifie si la case a déjà été clické 
          if (grille[i].innerHTML == player1 || grille[i].innerHTML == player2) {
            p.innerHTML = "Case occupée, c'est à vous joueur " + currentPlayer + " !";
          }
          else {
            grille[i].innerHTML = currentPlayer; // Remplit la case avec le symbole du joueur actuel
      
            // Vérifie le statut de la partie après chaque coup
            const resultat = statutPartie(currentPlayer, grille)
            if (resultat != null) {
              if (resultat === "matchNul") {
                fini = true; 
                h1.innerHTML = "Match nul !"; 
                p.innerHTML = '<a href="#" onclick="recommencer()">Rejouer</a>';
              }
              else {
              fini = true; 
              h1.innerHTML = "Joueur " + currentPlayer + " a gagné la partie !"; 
              p.innerHTML = '<a href="#" onclick="recommencer()">Rejouer</a>';
              }
            }
            else{
              // Change de joueur entre chaque click qui ne mène pas à la victoire
              currentPlayer = currentPlayer === player1 ? player2 : player1;
              p.innerHTML = "Au joueur " + currentPlayer + " de jouer";
            }
            
            
          }
        }
      })
    }
  
}

//Variables pour la partie
const h1 = document.createElement("h1");
const p = document.createElement("p");
const player1 = "X";
const player2 = "O";
let currentPlayer = player2;

// Création du morpion (visuel)
const box = document.getElementById("box");
let grille = [];

for (let i = 0; i < 9; i++) {
    const carre = document.createElement("div");
    carre.classList.add("carre");
    box.appendChild(carre);
    grille.push(carre);
}


// Lance le jeu
main();