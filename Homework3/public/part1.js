//Daniel Ermer

$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  $.ajax({
    type: 'POST',
    url: '/api/people',
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {
      console.log( "Request succeeded!" );
    }
  });
});
