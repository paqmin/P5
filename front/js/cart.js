
// recuperation du contenu du panier
let panierActuel= localStorage.getItem("Panier");
let Panier = JSON.parse(panierActuel);

//recupération de la balise CSS pour l'affichage
let carteArticle = document.getElementById("cart__items");
let affichageTotalQuantite= document.getElementById("totalQuantity");
let affichagePrixTotal= document.getElementById("totalPrice");

// tableaux pour les Totaux
var totalQuantite = new Array();
var totalPrix = new Array();

//PANIER VIDE
if (Panier == null){
  carteArticle.innerHTML = `<h2>>>> Votre panier est vide <<<</h2>`;
} else {
////PANIER NON VIDE - AFFICHAGE ELEMENTS CANAPES SELECTIONNES -
// si elements dans panier - recuperation de ts les éléments nécessaires à l'affichage
function affichagePanier(){
Panier.forEach((element) => {
  const urlCanap = `http://localhost:3000/api/products/${element.id}`;
  fetch(urlCanap)
  .then(response => response.json())
  .then((data) => {
    infoJson = data;
    carteArticle.innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.couleur}">
    <div class="cart__item__img">
    <img src="${infoJson.imageUrl}" alt="${infoJson.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${infoJson.name}</h2>
        <p>${element.couleur}</p>
        <p>${infoJson.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${element.quantite}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

  // TOTAUX + affichage quantité
  let quantite = parseInt(element.quantite);
  let prix = parseInt(infoJson.price * element.quantite); 

  totalQuantite.push(quantite);
  totalPrix.push(prix);

  const reducer = (accumulator, curr) => accumulator + curr; //somme tableau JS
  sumQuantite =totalQuantite.reduce(reducer);//total des quantités
  sumPrix =totalPrix.reduce(reducer);//prix total
  affichageTotalQuantite.innerHTML= sumQuantite; 
  affichagePrixTotal.innerHTML= sumPrix;
  });
  modifQuantite();
});
}
affichagePanier();

// MODIFICATION DES QUANTITES

function modifQuantite(){

  let inputs = document.querySelectorAll('.itemQuantity');

  console.log(inputs);
  inputs.forEach((input) => {
    
    input.addEventListener("change", (e) => {
      console.log(e);
      console.log("test");
      const id = e.target.closest('.cart__item').dataset.id;
      const couleur = e.target.closest('.cart__item').dataset.color;
      console.log(id,couleur);
      const nvlleQte = e.target.valueAsNumber;
      console.log(nvlleQte);
          
    })

  });
}



}

