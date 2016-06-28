var module = angular.module('app', []);
module.controller('ContactController', function ($scope,$http) {
var uid=1;
$scope.get=function(){
	
 $scope.curPage = 0;    //pagination
 $scope.pageSize = 2;   //pagination
	
$http.get('/api/contacts')
        .success(function(data) {
           // console.log(data);
            $scope.contacts = data;
          //console.log(JSON.stringify(data.contacts));  
         $scope.numberOfPages = function() {            //pagination
	         return Math.ceil(data.length / $scope.pageSize);
			};
	})
        .error(function(data) {
            console.log('Error: ' + data);
        });
 }       
        
	$scope.saveContact=function(){
		//alert($scope.id);return false;
		if($scope.id!=undefined && $scope.id!=''){
			 $scope.updatecontact={'id':$scope.id,'name':$scope.name,'email':$scope.email,'phone':$scope.phone}
			$http.put('/api/contacts', $scope.updatecontact)
		   .success(function(data){
			  $scope.get();
			 })
			}else{
			$scope.newcontact={'name':$scope.name,'email':$scope.email,'phone':$scope.phone}
			$http.post('/api/contacts',$scope.newcontact)
		   .success(function(data){
			  $scope.get();
			 })
		  }
			$scope.id=$scope.name=$scope.email=$scope.phone=''; 
		};

		$scope.delete=function(id){
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
		$http.delete('/api/contacts', {params:{id: Base64.encode(id)}})
		   .success(function(data){ 
			  $scope.get();
			 })
		};

	$scope.edit=function(id){
		$http.get('/api/contactById', {params: {id:id}})
	   .success(function(data){
			$scope.id=data._id;
			$scope.name=data.name;
			$scope.email=data.email;
			$scope.phone=data.phone; 
		})
	}
});
/*******************pagination filter start***********************/
angular.module('app').filter('pagination', function () {
    return function(input, start) {
        if (!angular.isArray(input)) {
            return [];
        }
        start = +start; 
        return input.slice(start);
    };
});
/*******************pagination filter ends***********************/
