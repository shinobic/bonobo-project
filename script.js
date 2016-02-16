$(document).ready(function() {
  $("#register").on("submit", function(e) {
    //e.preventDefault();
    alert('piouf');
    //requequette serveur pour l'inscription
    $.ajax({
       url : 'register.php' // La ressource ciblée
    });
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
