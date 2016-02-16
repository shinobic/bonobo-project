$(document).ready(function() {
  $("#register").on("submit", function(e) {
    e.preventDefault();

    //requequette serveur pour l'inscription
    var $this = $(this); // L'objet jQuery du formulaire
    // Je récupère les valeurs
    var pseudo = $('#prenom').val();
    var mail = $('#emailRegisterConfirme').val();

    // Je vérifie une première fois pour ne pas lancer la requête HTTP
    // si je sais que mon PHP renverra une erreur
    if(pseudo === '' || mail === '') {
      alert('Les champs doivent êtres remplis');
    } else {
    // Envoi de la requête HTTP en mode asynchrone
      $.ajax({
        url: 'http://localhost/bonobo-server/register.php', // Le nom du fichier indiqué dans le formulaire
        type: "POST", // La méthode indiquée dans le formulaire (get ou post)
        data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
        success: function(response) { // Je récupère la réponse du fichier PHP
          alert(response); // J'affiche cette réponse
        }
      });
    }
  });
  $("#login").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour le log
    $.ajax({
       url : 'login.php' // La ressource ciblée
    });
  });
  $("#logoff").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour le délog
    $.ajax({
       url : 'logoff.php' // La ressource ciblée
    });
  });
  $("#unregister").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour la désinscription
    $.ajax({
       url : 'unregister.php' // La ressource ciblée
    });
  });
  $("#tweet").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour le tweet
    $.ajax({
       url : 'tweet.php' // La ressource ciblée
    });
  });
  $("#tweetoff").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour le délog
    $.ajax({
       url : 'tweetoff.php' // La ressource ciblée
    });
  });
  $("#like").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour le like
    $.ajax({
       url : 'like.php' // La ressource ciblée
    });
  });
  $("#retweet").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour le délog
    $.ajax({
       url : 'retweet.php' // La ressource ciblée
    });
  });
})
