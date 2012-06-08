jQuery.when(
  jQuery.getJSON(RA.dataDir+'cafes.json'), 
  jQuery.getJSON(RA.dataDir+'lots.json')
).done( function(d0, d1) {
  var jqXHR = d1[2]; /* arguments are [ "success", statusText, jqXHR ] */
  if ( /Whip It/.test(jqXHR.responseText) ) {
    alert("First page has 'Whip It' somewhere.");
  } else { alert("Whip It not involved."); }
});