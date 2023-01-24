//Récupération du numéro de commande dans l'URL
let str = window.location.href;
let url = new URL(str);
let idOrderURL = url.searchParams.get("orderId");
console.log (idOrderURL);
if(idOrderURL==null){
    console.log ("testé");
    let Commande = document.querySelector("confirmation");
    console.log (Commande);
    Commande.innerHTML = `<p> Pas de commande en cours</p>`;
}else{
//Affichage du numéro de commande
let orderIdCommande = document.querySelector('#orderId');
orderIdCommande.innerHTML = idOrderURL;

//Suppression du contenu du panier 
localStorage.clear();
}