$(document).ready(function() {
  $("#register").on("submit", function(e) {
    e.preventDefault();

    //requequette serveur pour l'inscription
    var $this = $(this); // L'objet jQuery du formulaire
    // Je récupère les valeurs
    var pseudo = $('#prenom').val();
    var mail = $('#emailRegister').val();
    var cmail = $('#emailRegisterConfirme').val();
    var password = $('#password').val();

    // Je vérifie une première fois pour ne pas lancer la requête HTTP
    // si je sais que mon PHP renverra une erreur
    if(pseudo === '' || mail === '' || cmail === '' || password === '') {
      alert("Les champs doivent êtres remplis");
    } else if(mail !== cmail) {
      alert("Vérifier les adresses mail !");
      alert(mail + cmail);
    }
    else {
      // Envoi de la requête HTTP en mode asynchrone
      $.ajax({
        url: 'http://localhost/bonobo-server/subscribe.php', // Le nom du fichier indiqué dans le formulaire
        type: "POST", // La méthode indiquée dans le formulaire (get ou post)
        data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
        success: function(response) { // Je récupère la réponse du fichier PHP
          //alert(response); // J'affiche cette réponse
          //redirection vers la page des tweets
          var href = 'tweets.html';
          $(location).attr('href','tweets.html?pseudo=' + pseudo);
        },
        error : function(resultat, statut, erreur){
          //traite l'erreur
          alert(statut + " " + erreur);
        }
      });
    }
  });

  $("#login").on("submit", function(e) {
    e.preventDefault();
    //requequette serveur pour le log
    var $this = $(this); // L'objet jQuery du formulaire
    var pseudo = 'Sdz';
    $.ajax({
      url : 'http://localhost/bonobo-server/connect.php', // La ressource ciblée
      type: "POST", // La méthode indiquée dans le formulaire (get ou post)
      data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
      success: function(response) { // Je récupère la réponse du fichier PHP
        //alert(response); // J'affiche cette réponse

        var href = 'tweets.html';
        $(location).attr('href','tweets.html?pseudo=' + pseudo);
      },
      error : function(resultat, statut, erreur){
        //traite l'erreur
        alert(statut + " " + erreur);
      }
    });
  });
})
