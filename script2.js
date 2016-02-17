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
  //requequette serveur pour recevoirs les tweets
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

    }
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
  $("#posttweet").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour poster le tweet
    $.ajax({
       url : 'tweet.php' // La ressource ciblée
    });
  });
  $("#tweetoff").on("submit", function(e) {
    //e.preventDefault();
    //requequette serveur pour supprimer son tweet
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
