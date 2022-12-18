
// recuperation du contenu du panier
let panierActuel = localStorage.getItem("Panier");
let Panier = JSON.parse(panierActuel);

//recupération de la balise CSS pour l'affichage
let carteArticle = document.getElementById("cart__items");
let titre = document.querySelector("h1");
let affichageTotalQuantite = document.getElementById("totalQuantity");
let affichagePrixTotal = document.getElementById("totalPrice");


// initialisation pour les Totaux
let sumQuantite = 0;
let sumPrix = 0;

//PANIER VIDE
if (Panier == null) {

  titre.innerHTML = `Votre panier est vide`;

} else {  ////PANIER NON VIDE - AFFICHAGE ELEMENTS CANAPES SELECTIONNES -

  Panier.forEach((element) => {
    const urlCanap = `http://localhost:3000/api/products/${element.id}`;
    fetch(urlCanap)
      .then(response => response.json())
      .then((data) => {
        infoJson = data;
        affichageElement(element, infoJson);

        //CALCUL QUANTITE & TOTAL
        sumPrix += infoJson.price * element.quantite;
        sumQuantite += parseInt(element.quantite);

        //AFFICHAGE TOTAUX APRES FIN DES PROMISES (incrémentation à chaque passage)
        affichageTotalQuantite.innerHTML = sumQuantite;
        affichagePrixTotal.innerHTML = sumPrix;
      });

  })

}

function affichageElement(article, infoJsonArticle) {

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

  modifQte(inputQuantite, article);
  supprCanap(pSupr, article);
}

function modifQte(input, article) {
  input.onchange = (e) => {
    let nvlleQte = e.target.value;
    console.log(nvlleQte, article);
    article.quantite = nvlleQte;
    e.target.previousElementSibling.textContent = 'Qté : ' + article.quantite;
    console.log(Panier);
    let panierLocalStorage = JSON.stringify(Panier);
    localStorage.setItem("Panier", panierLocalStorage); //panier stocké 
    window.location.reload();
  }
}

function supprCanap(button, article) {

  button.onclick = (e) => {
    //filtre les éléments qui n'ont pas l'identifiant de l'article sélectionné
    Panier = Panier.filter(element => element.id != article.id)
    //stockage du Panier à nouveau
    let panierLocalStorage = JSON.stringify(Panier);
    localStorage.setItem("Panier", panierLocalStorage); //panier stocké 
    alert('Votre article a bien été supprimé.');
    window.location.reload();

  }
}

//PASSER LA COMMANDE - VALIDATION FORMULAIRE

///REGEX
let RegexAdress = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
let RegexNom = new RegExp (/^[a-z A-Z]{3,25}$/);
let RegexMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

///CHAMPS FORMULAIRE
let email = document.getElementById("email");
let emailErrorMsg = document.querySelector('#emailErrorMsg');
let prenom = document.getElementById("firstName");
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let nom = document.getElementById("lastName");
let lastnameErrorMsg = document.querySelector('#lastnameErrorMsg');
let ville = document.getElementById("city");
let cityErrorMsg = document.querySelector('#cityErrorMsg');
let address = document.getElementById("address");
let addressErrorMsg = document.querySelector('#addressErrorMsg');
let commandErrorMsg = document.querySelector('#commandErrorMsg');
let validPrenom = RegexNom.test(prenom.value);
let validNom = RegexNom.test(nom.value);
let validAdress = RegexAdress.test(address.value);
let validVille = RegexNom.test(ville.value);
let validEmail = RegexMail.test(email.value);

////Messages pour informer l'utilisateur de la validité des champs
console.log(RegexNom.test(prenom.value));
//PRENOM
prenom.onchange= (e) => {
  if (validPrenom==true){
    firstNameErrorMsg.innerHTML = 'Valide';  
  } else {
    firstNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre prenom.';
    
  }
};

//NOM
nom.onchange= (e) => {
  if (validNom==true){
    lastNameErrorMsg.innerHTML = 'Valide';
  } else {
    lastNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
  }
};

//ADRESSE
address.onchange= (e) => {
  if (validAdress==true){
    addressErrorMsg.innerHTML = 'Valide';
  } else {
    addressErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse.';
  }
};

//VILLE
ville.onchange= (e) => {
  if (validVille ==true){
    cityErrorMsg.innerHTML = 'Valide';
  } else {
    cityErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier la ville entrée.';
  }
};

//EMAIL
email.onchange= (e) => {
    if (validEmail == true){
      emailErrorMsg.innerHTML = 'Valide';
    } else {
      emailErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse email.';
    }
};

//ENVOI COMMANDE
let buttonCommande = document.querySelector('#order');
console.log(validPrenom)
buttonCommande.onclick= (e) =>{
  e.preventDefault();
  if (validPrenom == true || validNom == true || validVille == true || validAdress == true || validEmail == true){
    console.log(validPrenom)
  } else{
    commandErrorMsg.innerHTML = 'Veuillez vérifier vos données';
  }

}