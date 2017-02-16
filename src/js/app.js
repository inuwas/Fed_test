//require('./src/css/custom-css.css');
//require('bootstrap');
// require('jquery.min.js');
// require('bootstrap.min.js');
//require('jquery');
//require('bootstrap');
//var angular = require('angular');
require('font-awesome-webpack');

//var jquery = require('jquery');
angular.module('MyApp',[])
.filter('datefilter', function ($filter){
	return function (element,dateFormat){
        return $filter('date')(new Date(element),dateFormat);
    }
})
.factory('clientDataFactory',function ($http){
	var clientDataObject;
	var clientDetailsAddress = "src/json/client.json";

	return {
		getData: function (clientObject){
			return $http.get(clientDetailsAddress).then(function(response) { 
            	clientDataObject = response.data;
            	return clientDataObject;
          	},function (error){
				console.log("An error occurred"+ JSON.stringify(error.data));
			});
		},
		setClientData: function (dataObject){
			clientDataObject = dataObject;
		},
		getClientData: function (){
			return clientDataObject;
		}
	};
}).factory('notesFactory',function ($http){
		var notesDataArray;
		var notesDetailsAddress = "../src/json/notes.json";
	return {
		getNotes: function(){
			return $http.get(notesDetailsAddress).then(function (response){
				notesDataArray = response.data;
				return  notesDataArray;
			}, function(error){
				console.log("An error occured: "+ JSON.stringify(error.data));
			});
		},
		setNotesData: function (dataArray){
			notesDataArray = dataArray;
		},
		getNotesData: function(){ 
			return notesDataArray;
		}
	};
}).factory('tradeFactory',function ($http){
	var tradeDataObject;
	var tradeDetailsAddress = "../src/json/trade.json";
	return {
		getTrade: function(){
			return $http.get(tradeDetailsAddress).then(function (response){
				tradeDataObject = response.data;
				return tradeDataObject;
			}, function(error){
				console.log("An error occured: "+error.data);
			});
		},
		setTradeData: function (dataObject){
			tradeDataObject = dataObject;
		},
		getTradeData: function(){ 
			return tradeDataObject;
		}
	};
}).controller("myController", function ($scope, $http, clientDataFactory, notesFactory, tradeFactory){
	var clientStuff;
	var notesArray;
	//get Client Data
	clientDataFactory.getData().then(function (response){
		clientStuff = response;
		$scope.clientStuff = clientStuff;
		$scope.main_contact = clientStuff.main_contact;
	});
	//get Notes Data
	notesFactory.getNotes().then(function (response){
		notesArray = response;
		$scope.notesArr = notesArray;
	});
	//get Trade Data
	tradeFactory.getTrade().then(function(response){
		var tradeStuff;
		tradeStuff = response;
		$scope.tradeObj = tradeStuff;
	});
});
