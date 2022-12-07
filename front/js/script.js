//Récupération des produits dans la page index 
const url = "http://localhost:3000/api/products";

//connection à l'api
let recupJson = function(){
  fetch(url)
  .then(function(res) {
    //vérification de la connexion
    if (res.ok) {
      return res.json();
    }
  })
  // récupération de la liste dans le jSON + affichage des produits
  .then(function(listeProduits) {
    listeArticles(listeProduits);
  })
  .catch(function(err) {
    // Une erreur est survenue
    document.getElementsByClassName("titles").innerHTML = "<h1>Erreur 404</h1>"
    console.log('erreur 404');
  });
}
recupJson();

// construction de chaque carte produit
function listeArticles (tsLesCanapes){
    let carteArticle = document.getElementById("items");
  
  for(let canape of tsLesCanapes){
      carteArticle.innerHTML += `<a href="./product.html?_id=${canape._id}">
      <article>
        <img src="${canape.imageUrl}" alt="${canape.altTxt}">
        <h3 class="productName">${canape.name}</h3>
        <p class="productDescription">${canape.description}</p>
      </article>
    </a>`;
  }
}


