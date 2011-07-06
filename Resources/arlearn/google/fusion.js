/**
 * ARLearn Platform
 * Copyright (c) 2009-2011 by Open Universiteit. All Rights Reserved.
 * ARLearn2 is licensed under the terms of GNU GENERAL PUBLIC LICENSE (Version 2, June 1991). 
  * Please see the LICENSE included with this distribution for details.
  * Author: Stefaan Ternier
 **/
 
 (function() {
	ar.google.fusion = {};
	ar.google.fu = ar.google.fusion;
	var googleUrl = 'https://www.google.com';

	function invokeService(args, httpMethod, urlPostfix) {
		if (!args.auth) {
			if (ar.db.getAuthToken) {
				args.auth = ar.db.getAuthToken();
			} else {
				args.auth = ar.google.getAuthToken();
			}
			
		}
		var httpclient = Titanium.Network.createHTTPClient();
		httpclient.open(httpMethod, googleUrl+'/fusiontables/api/query?sql='+urlPostfix+'&jsonCallback=ar.google.jsonCallback');
		httpclient.setRequestHeader('Authorization', "GoogleLogin auth="+args.auth);
		httpclient.onload = function() {
			var body = this.responseText;
			
			if (args.success)
				if(this.status===200) {
					args.success({
						body: eval(body)
					});
				}
		};
		httpclient.send();
	}
	
	function setSuccesMethod(args, method) {
		if (args.success) {
			oldSucces = args.success;
			args.success = function (json) {
				if (json.body) oldSucces(method(json.body, args));
			}
		}
	}

	ar.google.fusion.showTables = function(args) {
		// setSuccesMethod(args, ar.model.getTable);
		setSuccesMethod(args, ar.model.parseShowTables);
		invokeService(args, 'GET', 'SHOW TABLES');
	}
	
	ar.google.fusion.query = function(args) {
		setSuccesMethod(args, ar.model.getTable);
		invokeService(args, 'GET', args.sql);
	}
	
	ar.google.fusion.createTable = function(args) {
		setSuccesMethod(args, ar.model.parseNewTableRespons);
		invokeService(args, 'POST', args.sql);
	}
})();