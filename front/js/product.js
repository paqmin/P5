// Récupération de l'identifiant du produit dans l'URL et ses infos
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search); 
    if(search_params.has('_id')) {
        var idCanap = search_params.get('_id');
    }

//Récupération des données du produit correspondant à l'id dans le json
    const urlCanap = `http://localhost:3000/api/products/${idCanap}`;

//connection à l'api
let affichageDonnees = function(){
  fetch(urlCanap)
    .then(function(res) {
    //vérification de la connexion
    if (res.ok) {
      return res.json();
    }
  })
  // affichage du produit
    .then(function(idCanap) {
        pageCanape(idCanap);
        console.log(idCanap._id);
        stockagePanier (idCanap);
     })
    .catch(function(err) {
      // Une erreur est survenue
      document.getElementsByClassName("titles").innerHTML = "<h1>Erreur 404</h1>"
      console.log('erreur 404');
    });
}
affichageDonnees();

// construction la fiche canape
function pageCanape (id){
  //image produit
  let img = document.querySelector(".item__img");
  img.innerHTML = `<img src="${id.imageUrl}" alt="${id.altTxt}"></img>`;
  //Nom du produit
  let titre = document.getElementById("title");
  titre.innerHTML =`${id.name}`;
  //Prix
  let prix = document.getElementById("price");
  prix.innerHTML =`${id.price}`;
  //Description
  let description = document.getElementById("description");
  description.innerHTML =`${id.description}`;
   // Couleurs
   let couleur = document.getElementById("colors");
   console.log(id.colors)
    for (let i of id.colors) {
      couleur.innerHTML += `<option value="${i}">${i}</option>`;
    }
}
//stockage données utilisateurs dans un tableau

function stockagePanier (id){
  /////recuperation quantité
  let quantite = document.getElementById("quantity").value; 
  ////recuperation couleur   
  let couleurChoisie = document.getElementById("colors").value; 
   ////recuperation idproduit   
  let idProduit = id._id;
  ////écoute du bouton 
  let bouton = document.getElementById("addToCart");
  //// Creation tableau Panier
  let Panier = [];

  console.log(bouton);
  console.log(couleurChoisie);
  console.log(quantite);
  console.log(idProduit);
  bouton.addEventListener('click', function (event) {         
    
    if (couleurChoisie =="" || quantite <= 0 || quantite > 100){
      alert("Sélectionnez tous les éléments");
    }else{

      // recuperation du contenu du panier
      let panierActuel = localStorage.getItem("Panier");
      // si panier vide 
      if(panierActuel ==null){
          let Panier ={
            id : "",
            quantite : 0,
            couleur : ""
          };
          console.table(Panier)
        }else{ //si panier non vide
          let Panier = JSON.parse(panierActuel);
          console.table(Panier)
        }

      console.log(couleurChoisie);
      console.log(quantite);
      console.log(idProduit);
     ////creation tableau produit panier
      let Panier = {
              id : idProduit,
              quantite : quantite,
              couleur : couleurChoisie
            }
      
      let objLinea = JSON.stringify(panierJson);
      localStorage.setItem("obj",objLinea);
      
      
    
    }
});


}





