var fs = require('fs')
,querystring = require('querystring')
,uuid = require('uuid')
,config = require('./config/config')
,getClientIp = require('./config/getIp')
,dataSerialization = require('./config/dataSerialization')
,httpInterface = require('./config/httpInterface');

var optAddPvNum = config.addPvNum.searchServer;
var optAddPvBackNum = config.addPvBackNum.searchServer;
var optSearchStr = config.searchStr.searchServer;
var optForsetiApi = config.forsetiApi.searchServer;

exports.indexs = function(req, res, next) {
	httpInterface(optAddPvNum.hostname,optAddPvNum.port,optAddPvNum.path,optAddPvNum.method,null,0,function(err,optAddPvNumData){
		if(err){
			optAddPvNumData = '[]'
		}
		httpInterface(optAddPvBackNum.hostname,optAddPvBackNum.port,optAddPvBackNum.path,optAddPvBackNum.method,null,0,function(err,optAddPvBackNumData){
			if(err){
				optAddPvBackNumData = '{"code":1,"result":"8484"}';
			}
			var dataResult = JSON.parse(optAddPvBackNumData);
			var backPvNum = dataResult.result;
			var init = "$(document).ready(function() { app.initialize(); });";
			var tokenIdStr = uuid.v1();
			req.session.name = null;
			req.session.name = tokenIdStr;
	   	    res.render('index',{backPvNum:backPvNum,init:init,tokenIdStr:tokenIdStr});
		});
    });
}
exports.wuzei = function(req, res, next) {
	httpInterface(optAddPvNum.hostname,optAddPvNum.port,optAddPvNum.path,optAddPvNum.method,null,0,function(err,optAddPvNumData){
		if(err){
			optAddPvNumData = '[]'
		}
	});
	res.render('wuzei');
}
exports.more = function(req, res, next) {
	httpInterface(optAddPvNum.hostname,optAddPvNum.port,optAddPvNum.path,optAddPvNum.method,null,0,function(err,optAddPvNumData){
		if(err){
			optAddPvNumData = '[]'
		}
	});
	res.render('more');
}
exports.about = function(req, res, next) {
	httpInterface(optAddPvNum.hostname,optAddPvNum.port,optAddPvNum.path,optAddPvNum.method,null,0,function(err,optAddPvNumData){
		if(err){
			optAddPvNumData = '[]'
		}
	});
	res.render('about');
}
exports.searchInfo = function(req, res) {
	var searchInfo = req.body.searchInfo;
	var judgeDevice = parseInt(req.body.judgeDevice);
	var tokenIdStr = req.session.name;
	var ip_addressStr = getClientIp(req);
	var searchInfoData = querystring.stringify({
		'keyWord':searchInfo
	});
	var forsetiApiData = querystring.stringify({
		partner_code : "notheft",
		secret_key : "775fa42b17e84ec9a1c2725f4ce6b8ed",
		event_id : "search_web",
		account_login : searchInfo,
		ip_address:ip_addressStr,
		token_id:tokenIdStr
	});
	httpInterface(optForsetiApi.hostname,optForsetiApi.port,optForsetiApi.path,optForsetiApi.method,forsetiApiData,1,function(err,optForsetiApiData){
		if(err){
			optForsetiApiData = '[]'
		}
		httpInterface(optSearchStr.hostname,optSearchStr.port,optSearchStr.path,optSearchStr.method,searchInfoData,0,function(err,optSearchStrData){
			if(err){
				optSearchStrData = '[]'
			}
			dataSerialization.searchInfoSerialization(optSearchStrData,function(err,dataSerializationData){
				if(judgeDevice == 0){
					res.write(dataSerializationData);
					res.write("");
					res.end();
				}else if(judgeDevice == 1){
					var dataJsonObj = JSON.parse(dataSerializationData);
					tokenIdStr = req.session.name;
					if(dataSerializationData.length <=2){
						res.render('webSafe',{upInputInfo:searchInfo,tokenIdStr:tokenIdStr});
					}else{
						res.render('searchInfo',{JsonList:dataJsonObj,tokenIdStr:tokenIdStr});
					};
				};
			});
		});
	});
}
exports.isweb = function(req, res, next) {
	httpInterface(optAddPvNum.hostname,optAddPvNum.port,optAddPvNum.path,optAddPvNum.method,null,0,function(err,optAddPvNumData){
		if(err){
			optAddPvNumData = '[]'
		}
		httpInterface(optAddPvBackNum.hostname,optAddPvBackNum.port,optAddPvBackNum.path,optAddPvBackNum.method,null,0,function(err,optAddPvBackNumData){
			if(err){
				optAddPvBackNumData = '{"code":1,"result":"8484"}';
			}
			var dataResult = JSON.parse(optAddPvBackNumData);
			var backPvNum = dataResult.result;
			var tokenIdStr = uuid.v1();
			req.session.name = null;
			req.session.name = tokenIdStr;
			res.render('app',{backPvNum:backPvNum,tokenIdStr:tokenIdStr});
		});
	});
}
exports.backWebApp = function(req, res, next) {
	httpInterface(optAddPvNum.hostname,optAddPvNum.port,optAddPvNum.path,optAddPvNum.method,null,0,function(err,optAddPvNumData){
		if(err){
			optAddPvNumData = '[]'
		}
		httpInterface(optAddPvBackNum.hostname,optAddPvBackNum.port,optAddPvBackNum.path,optAddPvBackNum.method,null,0,function(err,optAddPvBackNumData){
			if(err){
				optAddPvBackNumData = '{"code":1,"result":"8484"}';
			}
			var dataResult = JSON.parse(optAddPvBackNumData);
			var backPvNum = dataResult.result;
			tokenIdStr = req.session.name;
			res.render('app',{backPvNum:backPvNum,tokenIdStr:tokenIdStr});
		});
	});
}
