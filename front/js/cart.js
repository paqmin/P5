
// recuperation du contenu du panier
let panierActuel = localStorage.getItem("Panier");
let Panier = JSON.parse(panierActuel);

//recupération de la balise CSS pour l'affichage
let carteArticle = document.getElementById("cart__items");
let titre = document.querySelector("h1");
let affichageTotalQuantite= document.getElementById("totalQuantity");
let affichagePrixTotal= document.getElementById("totalPrice");


// initialisation pour les Totaux
let sumQuantite = 0;
let sumPrix = 0;

//PANIER VIDE
if (Panier == null) {

  titre.innerHTML = `Votre panier est vide`;

} else {

  ////PANIER NON VIDE - AFFICHAGE ELEMENTS CANAPES SELECTIONNES -
  Panier.forEach((element) => {
    const urlCanap = `http://localhost:3000/api/products/${element.id}`;
    fetch(urlCanap)
      .then(response => response.json())
      .then((data) => {
        infoJson = data;
        console.log(infoJson.price, element.quantite);
        affichagePanier(element, infoJson);
        //CALCUL QUANTITE & TOTAL
        sumPrix += infoJson.price * element.quantite ;
        sumQuantite += parseInt(element.quantite);
        console.log(sumQuantite , sumPrix);
        affichageTotalQuantite.innerHTML= sumQuantite; 
        affichagePrixTotal.innerHTML= sumPrix;
      });
     
  
  })
}

function affichagePanier(article, infoJsonArticle) {

  // insertion des articles
  let createArticle = document.createElement('article');
  createArticle.className = 'cart__item';
  createArticle.setAttribute('data-id', article.id);
  createArticle.setAttribute('data-color', article.couleur);
  carteArticle.appendChild(createArticle);

  // insertion des IMG
  let createIMG = document.createElement('div');
  createIMG.className = 'cart__item__img';
  createArticle.appendChild(createIMG);
  let createAttributImg = document.createElement('img');
  createAttributImg.setAttribute('src', infoJson.imageUrl);
  createAttributImg.setAttribute('alt', infoJson.altTxt);
  createIMG.appendChild(createAttributImg);

  // insertion item content
  let createItemContent = document.createElement('div');
  createItemContent.className = 'cart__item__content';
  createArticle.appendChild(createItemContent);

  // insertion div description
  let createDivDes = document.createElement('div');
  createDivDes.className = 'cart__item__content__description';
  createItemContent.appendChild(createDivDes);

  // insertion H2
  let createH2 = document.createElement('h2');
  createH2.textContent = infoJsonArticle.name;
  createDivDes.appendChild(createH2);

  // insertion P couleur
  let createCouleur = document.createElement('p');
  createCouleur.textContent = article.couleur;
  createDivDes.appendChild(createCouleur);

  // insertion P prix
  let createPrix = document.createElement('p');
  createPrix.textContent = infoJson.price + "€";
  createDivDes.appendChild(createPrix);

  // insertion des options.
  let divOptions = document.createElement("div");
  divOptions.classList.add("cart__item__content__settings");
  createItemContent.appendChild(divOptions);
  // Insertions options quantité.
  let divQuantite = document.createElement("div");
  divQuantite.classList.add("cart__item__content__settings__quantity");
  divOptions.appendChild(divQuantite);
  let canapQte = document.createElement("p");
  canapQte.textContent = "Qté : " + article.quantite;
  divQuantite.appendChild(canapQte);

  // Creation de l'input quantité.
  let inputQuantite = document.createElement("input");
  inputQuantite.classList.add("itemQuantity");
  inputQuantite.type = "number";
  inputQuantite.name = "itemQuantity";
  inputQuantite.setAttribute("min", "1");
  inputQuantite.setAttribute("max", "100");
  inputQuantite.setAttribute("value", article.quantite);

  // Insertion des elements dans les options de quantité.
  divQuantite.append(canapQte, inputQuantite);

  // Creation du contenu des options de suppression.
  let optionSupr = document.createElement("div");
  optionSupr.classList.add("cart__item__content__settings__delete");
  divQuantite.appendChild(optionSupr);

  // Creation du paragraphe de suppression.
  let pSupr = document.createElement("p");
  pSupr.classList.add("deleteItem");
  pSupr.textContent = "Supprimer";
  optionSupr.appendChild(pSupr);

}
