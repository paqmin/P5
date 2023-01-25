//Récupération du numéro de commande dans l'URL
let str = window.location.href;
let url = new URL(str);
let idOrderURL = url.searchParams.get("orderId");

if(idOrderURL==null){//si pas de commande 
    let Commande = document.getElementById("confirmation");
    Commande.innerHTML = `<p> Pas de commande en cours</p>`;
}else{
//Affichage du numéro de commande
let orderIdCommande = document.querySelector('#orderId');
orderIdCommande.innerHTML = idOrderURL;

//Suppression du contenu du panier 
localStorage.clear();
}