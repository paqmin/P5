
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

//si panier vide
if (Panier == null){
  carteArticle.innerHTML = `<p>>>> Votre panier est vide <<<</p>`;
} else {
//recuperation de ts les éléments nécessaires à l'affichage
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

  // TOTAUX
  let quantite = parseInt(element.quantite);
  let prix = parseInt(infoJson.price * element.quantite);

  totalQuantite.push(quantite);
  totalPrix.push(prix);

  const reducer = (accumulator, curr) => accumulator + curr;
  sumQuantite =totalQuantite.reduce(reducer);
  sumPrix =totalPrix.reduce(reducer);
  affichageTotalQuantite.innerHTML= sumQuantite;
  affichagePrixTotal.innerHTML= sumPrix;
  });
  
});


}

