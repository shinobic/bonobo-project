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
})
