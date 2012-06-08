function loadJS(jsFile, callback) {
	var jqscript = document.createElement("script");
	jqscript.setAttribute("type", "text/javascript");
	jqscript.setAttribute("src", jsFile);
	document.getElementsByTagName("head")[0].appendChild(jqscript);
	if (callback != "undefined") {
		callback();
	}
}
