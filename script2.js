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

  /*var texte = $("#loginame").text();
  $("#loginame").text(texte + " " + sVar);*/
  //message de bienvenue
  $('.box').append('<p style="color: white;">' + "Bienvenue au bonobo : "  + sVar + '</p>');

  //requete serveur pour recevoirs les tweets
  $.ajax({
    dataType: "json",
    url : 'http://localhost/bonobo-server/tweets.php?action=query', // La ressource ciblée
    success: function(json) { // Je récupère la réponse du fichier PHP
      //alert(json); // J'affiche cette réponse
      for(var i=0; i<json.length; i++){
        $('.effect').append('<p class="tweet">' + "Le " + json[i].date + " à " + json[i].time + " " + json[i].pseudo + " à posté : " + json[i].tweet + "  " + '<i style="color: red" class="fa fa-heart-o"></i>' +  " " + '<i class="fa fa-clone"></i>' + '</p>');
      }
    },
    error : function(resultat, statut, erreur){
      //traite l'erreur
      alert(erreur);
    }
  });

  //boucle events
  function onTick() {
    $('#send').off('click').on("click", function(e) {
    /*if(e.which == 13) {*/
      var val = $("textarea").val();

      //requete serveur pour poster le tweet
      var $this = $("textarea"); // L'objet jQuery de l'input

      $("textarea").val('');
      $.ajax({
        url : 'http://localhost/bonobo-server/postweet.php?action=post', // La ressource ciblée
        type: "POST", // La méthode indiquée dans le formulaire (get ou post)
        data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans l'input)
        success: function(response) { // Je récupère la réponse du fichier PHP
          //alert(response); // J'affiche cette réponse
          //good on peut afficher le tweet
          //  $('.comments').prepend('<div class="pipo">' + '<p class="json">' + sVar + " " + "41" + " " + val + '</p> ' + '<i class="fa fa-times">' + '</div>');
          var dt = new Date();
          var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
          /*$('.effect').prepend('<p class="bonobo">' + "Le " + dt.getDate() + "/"+ (dt.getMonth()+1) + "/" + dt.getFullYear() + " " + "à " + time + " " + sVar + " " + "à posté : "  + val + '</p>');*/
          $('.effect').prepend('<div class="bonobo">' + '<p style="display: inline; margin-bottom: 1vh" class="json">' + "Le " + dt.getDate() + "/"  + dt.getFullYear() + " à " + time + " " + sVar + " " + "à posté : " + val + '</p> ' + '<i style="color: red" class="fa fa-times"></i>' + " " + '<i style="color: red" class="fa fa-heart-o"></i>' +  " " + '<i class="fa fa-clone"></i>' + '<p></p>' + '</div>');
        },
        error : function(resultat, statut, erreur){
            //traite l'erreur
            alert(erreur);
        }
      });
//    }
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
         alert(erreur);
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

    //select son propre tweet
    $('.bonobo').off('click').on("click", function() {
      $(this).addClass('clicked');
    });

    //select un tweet
    $('.tweet').off('click').on("click", function() {
      $(this).addClass('Tclicked');
    });

  //remove
  $('.fa-times').off('click').on("click", function() {
    //alert('pioyf');
    //requete serveur pour supprimer son tweet
    $.ajax({
      url : 'http://localhost/bonobo-server/tweetoff.php?action=delete', // La ressource ciblée
      success: function(response) { // Je récupère la réponse du fichier PHP
        //remove le tweet selectionné
        $(".clicked").remove();
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
