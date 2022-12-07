// Récupération de l'identifiant du produit dans l'URL et ses infos
    var url = new URL(window.location.href);
    var search_params = new URLSearchParams(url.search); 
    const idCanap = search_params.get('_id');
    console.log(idCanap);
    

//Récupération des données du produit correspondant à l'id dans le json + affichage des éléments du canapé
  const urlCanap = `http://localhost:3000/api/products/${idCanap}`;

  async function affichageDonnees (){
       await fetch(urlCanap)  //connection à l'api
        .then((response) => response.json()) //test connexion json
        .then(function(idCanap) {
          affichagePageCanape(idCanap); // affichage données Canap
              console.log(idCanap._id);
     })   
  }
affichageDonnees();

// construction la fiche du canape
const affichagePageCanape  = (id) => {
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
      for (let i of id.colors) {
        couleur.innerHTML += `<option value="${i}">${i}</option>`;
      }
}
//ajout canape au panier
let boutonAjoutPanier = document.getElementById("addToCart");

boutonAjoutPanier.addEventListener('click', function(event){//fonction qui se lance au clic
  ///recuperation quantité
    const quantite = document.getElementById("quantity").value; 
  ////recuperation couleur   
    const couleurChoisie = document.getElementById("colors").value; 
  ////recuperation idproduit   
    const idProduit = idCanap;
    let select = document.getElementById("selectElement");
    let Panier = [];

    //si pas de couleur ou de quantite choisie
    if (couleurChoisie =="" || quantite <= 0 || quantite > 100){
       //demander à l'utilisateur de faire une sélection
       
        select.innerHTML = `<p>>>> Veuillez choisir une couleur et une quantité <<<</p>`;

    }else{ //si l'utilisateur a fait son choix
      console.log(couleurChoisie);
      console.log(quantite);
      // recuperation du contenu du panier
      let panierActuel = localStorage.getItem("Panier");
      console.log(panierActuel);

          // si panier vide
          if (panierActuel == null){
            //ajout du produit sélectionné
            let Panier ={
              id : idCanap,
              quantite : quantite,
              couleur : couleurChoisie
               };
            
            let panierActuel = [];
            panierActuel.push(Panier);
              console.table(Panier);
              console.table(panierActuel);
              let panierLocalStorage = JSON.stringify(panierActuel);
              localStorage.setItem("panierActuel",panierLocalStorage);
            

          }else{ //si panier contient déjà un canap
                //si canap présent même ID + même couleur
                let Panier = JSON.parse(panierActuel);
                console.log(Panier.quantite)

          }
      
      
    }


});






// function ajoutPanier () {
//   /////recuperation quantité
//   const quantite = document.getElementById("quantity").value; 
//   ////recuperation couleur   
//   const couleurChoisie = document.getElementById("colors").value; 
//    ////recuperation idproduit   
//   const idProduit = idCanap;

  
//   console.log(couleurChoisie);
//   console.log(quantite);
//   console.log(idProduit);


//   // //si pas de couleur ou de quantite choisie
//   // if (couleurChoisie =="" || quantite <= 0 || quantite > 100){
//   //      //demander à l'utilisateur de faire une sélection
//   //       let select = document.getElementById("selectElement");
//   //       select.innerHTML = `<p>>>> Veuillez choisir une couleur et une quantité <<<</p>`;

//   // }else{
//  console.log(couleurChoisie);
//       console.log(quantite);
//       // recuperation du contenu du panier
//       let panierActuel = localStorage.getItem("Panier");
//       // si panier vide 
//       if(panierActuel ==null){
//           let Panier ={
//             id : "",
//             quantite : 0,
//             couleur : ""
//           };
//           console.table(Panier)
//         }else{ //si panier non vide
//           let Panier = JSON.parse(panierActuel);
//           console.table(Panier)
//         }

//       console.log(couleurChoisie);
//       console.log(quantite);
//       console.log(idProduit);
//      ////creation tableau produit panier
//       let Panier = {
//               id : idProduit,
//               quantite : quantite,
//               couleur : couleurChoisie
//             }
      
//       let panierLocalStorage = JSON.stringify(panierJson);
//       localStorage.setItem("panierActuel",panierLocalStorage);
      
      
    
//     }
// };








