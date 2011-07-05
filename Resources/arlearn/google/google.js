
(function() {

	ar.google = {};
	ar.go = ar.google;
	
	ar.google.jsonCallback = function(json) {
		return json;
	}
})();

Ti.include(
	'/arlearn/google/login.js',
	'/arlearn/google/fusion.js'
);
