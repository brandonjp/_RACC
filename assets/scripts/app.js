jQuery.when(
  jQuery.getJSON('data/cafes.json'), 
  jQuery.getJSON('data/lots.json')
).done( 
  function(d0, d1) {
    alert(d0);
    var jqXHR = d0[2]; /* arguments are [ "success", statusText, jqXHR ] */
    if ( /Coffee/.test(jqXHR.responseText) ) {
      alert("First page has 'Whip It' somewhere.");
    } else { 
      alert("Whip It not involved."); 
    }
  }
);