var dateFormat = require('./dateFormat');

var dataSerialization;
dataSerialization = {
	searchInfoSerialization:function(data,searchInfoFn){
		var dataResult = JSON.parse(data);
		if(dataResult.code=='000'){
			var obj2 = JSON.parse(dataResult.result);
			var JosnList=[];
			obj2.sort(function(a,b){
				if(a.leakTime<b.leakTime){
					return -1;
				}else if(a.leakTime>b.leakTime){
					return 1;
				};
				return 0;
			});
			for(var index =0, len = obj2.length;  index<len; index++) {
				JosnList[index] = {"counts":obj2[index].counts,"des":obj2[index].desPub,"leakTime":new Date(obj2[index].leakTime).format("yyyy.MM")};
			};
			var JosnList2 = JSON.stringify(JosnList);
			searchInfoFn(undefined,JosnList2);
		}else{
			var JosnList2 = '[]'
			searchInfoFn(undefined,JosnList2);
		};
	}
};
module.exports=dataSerialization;//导出该方法