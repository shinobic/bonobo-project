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
      }
    },
    error : function(resultat, statut, erreur){
      //traite l'erreur
      alert(erreur);
    }
  });

  //Set local storage variables
  var i = Number(localStorage.getItem('tweet-counter')) + 1,
        $itemList = $('.effect'),
        order = [],
        orderList;

  // Load tweet list
  orderList = localStorage.getItem('tweet-orders');

  orderList = orderList ? orderList.split(',') : [];

  //loop tweet list from local storage if any
  if(orderList.length > 0) {
    for(var j = orderList.length; j > 0; j--) {
        $itemList.append(
          '<div class="bonobo">' + '<p style="display: inline">' + localStorage.getItem("tweet-" + (j) )  + '</p> ' +
           '<i style="color: red" class="fa fa-times"></i>' + '<span> </span>' + '<i class="fa fa-clone"></i>' + '<p></p>' + '</div>');
    }
  }

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

          var dt = new Date();
          var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
          // Take the value of the input field and save it to localStorage
          var tweet = "Le " + dt.getDate() + "/"  + dt.getFullYear()
           + " à " + time + " " + sVar + " " + "à posté : " + val;

          localStorage.setItem( "tweet-" + i, tweet );

          // Set the to-do max counter so on page refresh it keeps going up instead of reset
          localStorage.setItem('tweet-counter', i);

          //good on peut afficher le tweet
        /*  var dt = new Date();
          var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();*/
          $('.effect').prepend('<div class="bonobo">' + '<p style="display: inline">' + "Le " + dt.getDate() + "/"  + dt.getFullYear()
           + " à " + time + " " + sVar + " " + "à posté : " + val + '</p> ' + '<i style="color: red" class="fa fa-times"></i>' + '<span> </span>' +
          '<i class="fa fa-clone"></i>' + '<p></p>' + '</div>');


          var $newTweetList = $('.effect div');
          // Empty the order array
          order.length = 0;

          // Go through the list item, grab the class then push into the array
          $newTweetList.each(function() {
            var $this = $(this).attr('class');
            if( $(this).hasClass('bonobo') )
              order.push($this);
          });

          // Convert the array into string and save to localStorage
          localStorage.setItem( 'tweet-orders', order.join(',') );

          i++;
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

    //like
    $('.fa-heart-o').off('click').on("click", function() {
      var mydiv = $(this).parent(".tweet");
      var lastp = $(this).parent(".tweet").children().last("p");
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
          $('<span> </span>' + '<span style="color: red" class="fa fa-heart"></span>').insertBefore(lastp);
        },
        error : function(resultat, statut, erreur){
          //traite l'erreur
          alert(resultat.status);
        }
      });
    });

    //retweet
    $(".fa-clone").off('click').on("click", function() {
      var mydiv = $(this).parent(".tweet");
      var val = mydiv.find("p").text();

      //requete serveur pour retweeter
      $.ajax({
         url : 'http://localhost/bonobo-server/retweet.php', // La ressource ciblée
         success: function(response) { // Je récupère la réponse du fichier PHP
           //retweet
           var dt = new Date();
           var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
           $('.effect').prepend('<div class="bonobo">' + '<p style="display: inline">' + "Le " + dt.getDate() + "/"  + dt.getFullYear()
            + " à " + time + " " + sVar + " " + "à posté : " + val + '</p> ' + '<i style="color: red" class="fa fa-times"></i>' + '<span> </span>' +
            '<i style="color: red" class="fa fa-heart-o"></i>' + '<span> </span>' + '<i class="fa fa-clone"></i>' + '<p></p>' + '</div>');
         },
         error : function(resultat, statut, erreur){
           //traite l'erreur
           alert(statut);
         }
      });
    });
  }
//  localStorage.clear();
  setInterval(onTick, 500);
})
