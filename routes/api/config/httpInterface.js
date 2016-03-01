(function() {

	function httpInterface(hostnameStr,portStr,pathStr,methodStr,dataStr,http_s,fn){
		if(dataStr==null){
			dataStr='plass callback';
		}
		if(http_s==0){
			var httpOrHttps = require('http');
		}else{
			var httpOrHttps = require('https');
		}
		var options = {
			hostname: hostnameStr,
			port: portStr,
			path: pathStr,
			method: methodStr,
			agent:false,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'content-Length': dataStr.length
			}
		};
		var body = "";
		var request = httpOrHttps.request(options,function(response){
			response.setEncoding('utf8');
			response.on('data',function(chunk){
				body += chunk;
			}).on('end',function(){
				fn(undefined,body);
			});
		});
		request.on('socket', function (e) {
    			e.setTimeout(5000);
    			e.on('timeout', function() {
    				request.abort();
    				var errorMessage = "request timeout" + e.message;
    				fn(e,errorMessage);
  			 });
		});
		request.on('error',function(e){
			var errorMessage = "Got error: " + e.message;
			fn(e,errorMessage);
		});
		request.write(dataStr+"\n")
		request.end();
	}
	module.exports = httpInterface;
}).call(this);