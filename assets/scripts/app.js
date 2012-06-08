if (document.documentElement) document.documentElement.className = 'js';

var RA = {
  scriptDir: 'assets/scripts/',
  imgDir:    'assets/images/',
  dataDir:   'data/'
};

// need jQ to be ready for Ember
loadJS(RA.scriptDir+"jquery-1.7.2.min.js", function() {

  loadJS(RA.scriptDir+"ember-latest.min.js", function() {
  
    jQuery.when(
      jQuery.getJSON(RA.dataDir+'cafes.json'), 
      jQuery.getJSON(RA.dataDir+'lots.json')
    ).done( function(d0, d1) {
      var jqXHR = d1[2]; /* arguments are [ "success", statusText, jqXHR ] */
      if ( /Whip It/.test(jqXHR.responseText) ) {
        alert("First page has 'Whip It' somewhere.");
      } else { alert("Whip It not involved."); }
    });
    
  });

});


// fn to add js files to the page
function loadJS(jsFile, callback) {
	var jsScript = document.createElement("script");
	jsScript.setAttribute("type", "text/javascript");
	jsScript.setAttribute("src", jsFile);
	document.getElementsByTagName("head")[0].appendChild(jsScript);
	if (callback != "undefined") {
		callback();
	}
}
