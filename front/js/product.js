// Récupération de l'identifiant du produit dans l'URL et ses infos
const url = new URL(window.location.href);
const search_params = new URLSearchParams(url.search);
const idCanap = search_params.get('_id');

//Récupération des données du produit correspondant à l'id dans le json + affichage des éléments du canapé
const urlCanap = `http://localhost:3000/api/products/${idCanap}`;

function affichageDonnees() {
  fetch(urlCanap)  //connection à l'api
    .then((response) => response.json()) //test connexion json
    .then(function (idCanap) {
      affichagePageCanape(idCanap); // affichage données Canap
    })
    .catch(function (err) {
      alert("Veuillez sélectionner un produit");
    });
}
affichageDonnees();

// construction la fiche du canape
const affichagePageCanape = (idProduit) => {
  //image produit
  let img = document.querySelector(".item__img");
  img.innerHTML = `<img src="${idProduit.imageUrl}" alt="${idProduit.altTxt}"></img>`;
  //Nom du produit
  let titre = document.getElementById("title");
  titre.innerHTML = `${idProduit.name}`;
  //Prix
  let prix = document.getElementById("price");
  prix.innerHTML = `${idProduit.price}`;
  //Description
  let description = document.getElementById("description");
  description.innerHTML = `${idProduit.description}`;
  // Couleurs
  let couleur = document.getElementById("colors");
  for (let i of idProduit.colors) {
    couleur.innerHTML += `<option value="${i}">${i}</option>`;
  }
}
//ajout canape au panier
let boutonAjoutPanier = document.getElementById("addToCart");

boutonAjoutPanier.addEventListener('click', function (event) {//fonction qui se lance au clic
  ///recuperation quantité
  const quantite = document.getElementById("quantity").value;
  ////recuperation couleur   
  const couleurChoisie = document.getElementById("colors").value;
  ////recuperation idproduit   
  const idProduit = idCanap;
  let select = document.getElementById("selectElement");
  //Création de l'objet Canapé choisi
  let canapChoisi = {
    id: idCanap,
    quantite: quantite,
    couleur: couleurChoisie
  };
  //si pas de couleur ou de quantite choisie
  if (couleurChoisie == "" || quantite <= 0 || quantite > 100) {
    //demander à l'utilisateur de faire une sélection
    select.innerHTML = `<p>>>> Veuillez choisir une couleur et une quantité <<<</p>`;

  } else { //si l'utilisateur a fait son choix
    // recuperation du contenu du panier
    let panierActuel = localStorage.getItem("Panier");
    // si panier vide
    if (panierActuel === null) {
      //ajout du produit sélectionné
      panierActuel = [];
      panierActuel.push(canapChoisi);
      //Stockage du canapé dans le localstorage
      let panierLocalStorage = JSON.stringify(panierActuel);
      localStorage.setItem("Panier", panierLocalStorage); //panier stocké 
    } else { //si panier contient déjà un canap
      const Panier = JSON.parse(panierActuel);
      idem = false;
      //on parcourt le panier
      Panier.forEach((canap) => {
        if (canap.id === idCanap && canap.couleur === couleurChoisie) { //si canap présente même ID + même couleur
          canap.quantite = parseInt(quantite) + parseInt(canap.quantite);//nouvelle quantité du même produit
          idem = true;
        }
      })
      if (idem === false) {
        Panier.push(canapChoisi);
      }
      //Stockage de Panier dans le localstorage
      let panierLocalStorage = JSON.stringify(Panier);
      localStorage.setItem("Panier", panierLocalStorage); //panier stocké 
    }
  }


});







