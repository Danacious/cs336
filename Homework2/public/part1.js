//Daniel Ermer
//Lab7.js, a js file for learning about jQuery$( document ).ready(function() {

$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  $.ajax({
    type: 'POST',
    url: '/people/:id',
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {
      console.log( "Request succeeded!" );
    }
  });
});
