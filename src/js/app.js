require('../sass/style.scss');
import {serviceFunc} from "./services/data.js";
import {mainController} from "./controllers/mainController.js";
import {itemController} from "./controllers/itemController.js";

angular.module("moviesApp",['ngRoute'])
	.service('dataService', serviceFunc)
	.controller('mainController', mainController)
	.controller('itemController', itemController)
	.config(function($routeProvider){
		$routeProvider
			.when('/item',{
				templateUrl: 'item.html',
				// controller: "mainController"
			})
			.when('/',{
				templateUrl: 'search.html',
				// controller: "mainController"
			})
	});