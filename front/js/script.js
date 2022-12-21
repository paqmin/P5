//Récupération des produits dans la page d'accueil
const url = "http://localhost:3000/api/products";

// fonction permmettant de se connecter à l'api et d'afficher les éléments
let recupJson = function () {
  fetch(url)
    .then(function (res) {
      //vérification de la connexion à l'API
      if (res.ok) {
        return res.json();
      }
    })
    // récupération de la liste de canapés et de leurs caractéristiques dans le jSON + affichage des produits
    .then(function (listeProduits) {
      listeArticles(listeProduits);
    })
    .catch(function (err) {
      // Une erreur est survenue
      alert('erreur 404');
    });
}
recupJson();

// construction de chaque carte produit qui envoie vers la page du produit au clic
function listeArticles(tsLesCanapes) {
  let carteArticle = document.getElementById("items");

  for (let canape of tsLesCanapes) { // pour chaque canapé de la base de donnée
    carteArticle.innerHTML += `<a href="./product.html?_id=${canape._id}">
      <article>
        <img src="${canape.imageUrl}" alt="${canape.altTxt}">
        <h3 class="productName">${canape.name}</h3>
        <p class="productDescription">${canape.description}</p>
      </article>
    </a>`;
  }
}


