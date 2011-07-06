/**
 * ARLearn Platform
 * Copyright (c) 2009-2011 by Open Universiteit. All Rights Reserved.
 * ARLearn2 is licensed under the terms of GNU GENERAL PUBLIC LICENSE (Version 2, June 1991). 
  * Please see the LICENSE included with this distribution for details.
  * Author: Stefaan Ternier
 **/

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
