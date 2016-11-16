//Daniel Ermer
//Lab7.js, a js file for learning about jQuery

//All code taken from the jquery and ajax tutorials and sample code
$( document ).ready(function() {
   $( function() {
     $( ".widget input[type=submit], .widget a, .widget button" ).button();
      $( "button, input, a" ).click( function( event ) {
         //$("body").append("<p> no data yet... </p>");
         // Using the core $.ajax() method
         $.ajax({
 
         // The URL for the request
         url: "/fetch",
         })
         // Code to run if the request succeeds (is done);
         // The response is passed to the function
        .done(function( json ) {
           $("body").append("<p>" + json.content + "</p>");
        })
        // Code to run if the request fails; the raw request and
       // status codes are passed to the function
       .fail(function( xhr, status, errorThrown ) {
          alert( "Sorry, there was a problem!" );
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        })
        // Code to run regardless of success or failure;
       .always(function( xhr, status ) {
       alert( "The request is complete!" );
       });
      });
    });
});


