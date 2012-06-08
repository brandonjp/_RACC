if (document.documentElement) document.documentElement.className = 'js';

var RA = {
  scriptDir: '/assets/scripts/',
  imgDir:    '/assets/styles/images/'
};

loadJS(scriptDir+"jquery-1.7.2.min.js", function() {

});

loadJS(scriptDir+"ember-latest.min.js", function() {

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
