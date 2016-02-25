$(document).ready(function() {
  var sVar = "pseudo";
  var tids = [];
  sVar = window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1");
  //pas d'acces direct si no parameters ou mauvais user
  if(sVar !== "Sdz") {
    //page 404 !
    var href = 'index.html';
    $(location).attr('href', 'index.html');
  }

  //message de bienvenue
  $('.box').append('<p style="color: white;">' + "Bienvenue au bonobo : "  + sVar + '</p>');

  //requete serveur pour recevoirs les tweets
  $.ajax({
    dataType: "json",
    url : 'http://localhost/bonobo-server/tweets.php?action=query', // La ressource ciblée
    success: function(json) { // Je récupère la réponse du fichier PHP
      //alert(json); // J'affiche cette réponse
      for(var i=0; i<json.length; i++){
        $('.effect').append('<div class="tweet">' + '<p style="display: inline">' + "Le " + json[i].date + " à " + json[i].time + " " + json[i].pseudo + " à posté : " + json[i].tweet + '</p>' +
         " " + '<i style="color: red" class="fa fa-heart-o"></i>' + '<span> </span>' + '<i class="fa fa-clone"></i>' + '<p></p>' + '</div>');
         //tids[i].push(json[i].tid);
      }
    },
    error : function(resultat, statut, erreur){
      //traite l'erreur
      alert(erreur);
    }
  });

  //boucle events
  function onTick() {
    //Poste un tweet
    $('#send').off('click').on("click", function() {
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
          var dt = new Date();
          var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
          $('.effect').prepend('<div class="bonobo">' + '<p style="display: inline; margin-bottom: 1vh" class="json">' + "Le " + dt.getDate() + "/"  + dt.getFullYear()
           + " à " + time + " " + sVar + " " + "à posté : " + val + '</p> ' + '<i style="color: red" class="fa fa-times"></i>' + '<span> </span>' +
           '<i style="color: red" class="fa fa-heart-o"></i>' + '<span> </span>' + '<i class="fa fa-clone"></i>' + '<p></p>' + '</div>');
        },
        error : function(resultat, statut, erreur){
          //traite l'erreur
          alert(erreur);
        }
      });
    });

    //
    $("#logoff").off('click').on("click", function() {
      //requete serveur pour le délog
      $.ajax({
        url : 'http://localhost/bonobo-server/logoff.php?action=logoff', // La ressource ciblée
        success: function(response) { // Je récupère la réponse du fichier PHP
          //alert(response); // J'affiche cette réponse
          var href = 'index.html';
          $(location).attr('href', 'index.html');
        },
        error : function(resultat, statut, erreur){
         //traite l'erreur
         alert(erreur);
        }
      });
    });

    $("#unsubscribe").off('click').on("click", function() {
      //requete serveur pour la désinscription
      $.ajax({
        url : 'http://localhost/bonobo-server/unsubscribe.php?action=unsubscribe', // La ressource ciblée
        success: function(response) { // Je récupère la réponse du fichier PHP
          //alert(response); // J'affiche cette réponse
          var href = 'index.html';
          $(location).attr('href', 'index.html');
        },
        error : function(resultat, statut, erreur){
          //traite l'erreur
          alert(erreur);
        }
      });
    });

    //select un tweet
/*    $('.tweet').off('click').on("click", function() {
      $(this).addClass('Tclicked');
    });*/

    //remove
    $('.fa-times').off('click').on("click", function() {
      var mydiv = $(this).parent(".bonobo");
      //requete serveur pour supprimer son tweet
      $.ajax({
        url : 'http://localhost/bonobo-server/tweetoff.php?action=delete', // La ressource ciblée
        success: function(response) { // Je récupère la réponse du fichier PHP
          //remove le tweet selectionné
          mydiv.remove();
        },
        error : function(resultat, statut, erreur){
          //traite l'erreur
          alert(erreur);
        }
      });
    });

    $('.fa-heart-o').off('click').on("click", function() {
      var mydiv = $(this).parent(".tweet");
      //requete serveur pour liker un tweet
      $.ajax({
        //on indique au serveur qu'on a liké avec envois de l'id
        url : 'http://localhost/bonobo-server/tweetlike.php', // La ressource ciblée
        type: "POST", // La méthode indiquée dans le formulaire (get ou post)
        /*data: $this.serialize(),*/ // Je sérialise les données (j'envoie toutes les valeurs présentes dans l'input)
        success: function(response) { // Je récupère la réponse du fichier PHP
          //alert(response);
          //mark as liked
          mydiv.addClass('liked');
        },
        error : function(resultat, statut, erreur){
          //traite l'erreur
          alert(resultat.status);
        }
      });
    });

    $(".fa-clone").off('click').on("click", function() {
      var val = $(".Tclicked p:first").text();
      alert(val);
      //requete serveur pour retweeter
      $.ajax({
         url : 'http://localhost/bonobo-server/retweet.php', // La ressource ciblée
         success: function(response) { // Je récupère la réponse du fichier PHP
           //mark as retweeted
           //alert(response)
          // $(".Tclicked").addClass('retweeted').removeClass("Tclicked");
         },
         error : function(resultat, statut, erreur){
           //traite l'erreur
           alert(statut);
         }
      });
    });
  }
  setInterval(onTick, 500);
})
