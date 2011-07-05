
(function() {

	var auth = '';
	
	var config = {
		accountType: 'HOSTED_OR_GOOGLE',
		Email : '',
		Passwd : '',
		'Content-Type': "application/x-www-form-urlencoded",
		service        : 'fusiontables'
	}
	
  	var googleUrl = 'https://www.google.com';
	
	var httpclient = Titanium.Network.createHTTPClient();
	
	function parseError(body) {
		var result = {}
		var matches = body.split('\n');
		if (matches) {
			for (var i =0; i < matches.length; i++) {
				var matches1 = matches[i].split('=');
				if (matches1[0] != '' ) result[matches1[0]]	= matches1[1]
			}
		}
		return result;
	}
	
	function init(args) {
		if (args.accountType) config.accountType = args.accountType;
		if (args.service) config.service = args.service;
		if (args.accountType) config.accountType = args.accountType;
		if (args.Email) config.Email = args.Email;
		if (args.Passwd) config.Passwd = args.Passwd;
	}

	ar.google.login = function login(args) {
		init (args)
		httpclient.open('POST', googleUrl+'/accounts/ClientLogin');
		httpclient.onload = function() {
			var body = this.responseText;
			var matches = body.match(/Auth=(.*)/);
			if (!matches) {
				if (args.error) {
					var errors = parseError(body)
					errors.body = body;
					args.error(errors);
				}
						
			} else {
				var results = matches[0].split('Auth=');
				auth = results[1];
				
					if (args.success)
				if(this.status===200) {
					if (ar.db.storeAuthToken) ar.db.storeAuthToken(auth, args.Email);
					if (ar.db.afterAuthenticationTasks) ar.db.afterAuthenticationTasks();
						args.success({auth: auth});
						
				}
			}
		};
		httpclient.send(config);
	}
	
	ar.google.getAuthToken = function getAuthToken() {
		return auth;
	}
	
})();

