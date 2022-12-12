
// recuperation du contenu du panier
let panierActuel= localStorage.getItem("Panier");
let Panier = JSON.parse(panierActuel);
console.table(Panier);
//recupération de la balise CSS pour l'affichage
let carteArticle = document.getElementById("cart__items");
//recuperation de ts les éléments nécessaires à l'affichage
Panier.forEach(element => {
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
  });
  
});

// construction de la page panier
affichagePanier();

function affichagePanier (){
  let carteArticle = document.getElementById("cart__items");

      for(let canape of Panier){
          carteArticle.innerHTML += `<article class="cart__item" data-id="${canape.id}" data-color="${canape.couleur}">
          <div class="cart__item__img">
            <img src="../images/product01.jpg" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>Nom du produit</h2>
              <p>${canape.couleur}</p>
              <p>42,00 €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : ${canape.quantite}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
      }

}