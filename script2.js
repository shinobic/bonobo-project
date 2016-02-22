$(document).ready(function() {
  var sVar = "pseudo";
  sVar = window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
  //pas d'acces direct si no parameters
  if(sVar === ''){
    var href = 'index.html';
    $(location).attr('href', 'index.html');
  }
  //requete de connexion pour être sûr que le user existe
  $.ajax({
/*    url: 'http://localhost/bonobo-server/login.php', // Le nom du fichier indiqué dans le formulaire
    type: "POST", // La méthode indiquée dans le formulaire (get ou post)
    data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
    success: function(response) { // Je récupère la réponse du fichier PHP
      alert(response); // J'affiche cette réponse

      var href = 'tweets.html';
      $(location).attr('href','tweets.html?pseudo=' + pseudo);
    },
    error : function(resultat, statut, erreur){
      //traite l'erreur

    }*/
  });

  var texte = $("#loginame").text();
  $("#loginame").text(texte + " " + sVar);
  //requete serveur pour recevoirs les tweets
  $.ajax({
    dataType: "json",
    url : 'http://localhost/bonobo-server/tweets.php?action=query', // La ressource ciblée
    success: function(json) { // Je récupère la réponse du fichier PHP
      //alert(json); // J'affiche cette réponse
      for(var i=0;i<json.length;i++){
            $('.thetweets').append('<p>' + json[i].pseudo + " " + json[i].age + " " + json[i].tweet + '</p>');
      }
    },
    error : function(resultat, statut, erreur){
      //traite l'erreur
      alert(erreur);
    }
  });

  //boucle events
  function onTick() {
  $('#postweet').off('keypress').on("keypress", function(e) {
    if(e.which == 13) {
      var val = $(this).val();
      //requete serveur pour poster le tweet
      var $this = $(this); // L'objet jQuery de l'input
      this.value = '';
      $.ajax({
      url : 'http://localhost/bonobo-server/postweet.php', // La ressource ciblée
      type: "POST", // La méthode indiquée dans le formulaire (get ou post)
      data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans l'input)
      success: function(response) { // Je récupère la réponse du fichier PHP
        //alert(response); // J'affiche cette réponse
          //good on peut afficher le tweet
          $('.thetweets').prepend('<div class="pipo">' + '<p class="json">' + sVar + " " + "41" + " " + val + '</p> ' + '<i class="fa fa-times">' + '</div>');
        },
        error : function(resultat, statut, erreur){
          //traite l'erreur
          alert(erreur);
        }
      });
    }
  });

  $(".logoff").on("click", function(e) {
    //requete serveur pour le délog
    $.ajax({
      url : 'http://localhost/bonobo-server/logoff.php?action=logoff', // La ressource ciblée
      success: function(response) { // Je récupère la réponse du fichier PHP
        alert(response); // J'affiche cette réponse
        var href = 'index.html';
        $(location).attr('href', 'index.html');
      },
      error : function(resultat, statut, erreur){
         //traite l'erreur
      //   alert(erreur);
      }
    });
  });

  $(".unregister").on("click", function(e) {
    //requete serveur pour la désinscription
    $.ajax({
      url : 'http://localhost/bonobo-server/unregister.php?action=unregister', // La ressource ciblée
      success: function(response) { // Je récupère la réponse du fichier PHP
        alert(response); // J'affiche cette réponse
        var href = 'index.html';
        $(location).attr('href', 'index.html');
      },
      error : function(resultat, statut, erreur){
        //traite l'erreur
        alert(erreur);
      }
    });
  });

  //remove
  $('.fa-times').off('click').on("click", function() {
    alert('pioyf');
    //requete serveur pour supprimer son tweet
    $.ajax({
      url : 'http://localhost/bonobo-server/tweetoff.php?action=delete', // La ressource ciblée
      success: function(response) { // Je récupère la réponse du fichier PHP
        alert(response); // J'affiche cette réponse
      },
        error : function(resultat, statut, erreur){
        //traite l'erreur
        //alert(erreur);
      }
    });
  });

  /*$("#tweetoff").on("submit", function(e) {
    //e.preventDefault();
    //requete serveur pour supprimer son tweet
    $.ajax({
       url : 'tweetoff.php' // La ressource ciblée
    });
  });*/
  $("#like").on("submit", function(e) {
    //e.preventDefault();
    //requete serveur pour le like
    $.ajax({
       url : 'like.php' // La ressource ciblée
    });
  });
  $("#retweet").on("submit", function(e) {
    //e.preventDefault();
    //requete serveur pour le délog
    $.ajax({
       url : 'retweet.php' // La ressource ciblée
    });
  });
}
  setInterval(onTick, 500);
})
