//Daniel Ermer
//part2.js, a js file for searching through people data

$( document ).ready(function() {
   $( 'form' ).submit(function( event ) {

      event.preventDefault();

      $.ajax({
      type: 'POST',
      url: '/search',
      data:{name: $("#id").val()}
      })
      .done(function( json ) {
         $("body").append("<p>" + json.content + "</p>");
      })
      .fail(function( xhr, status, errorThrown ) {
          alert( "This person doesn't exist in the universe!" );
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
      })
   });
});
