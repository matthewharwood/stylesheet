'use strict';

angular.module('stylesheetApp')
  .controller('MainCtrl', function ($scope) {
  	//models for main.html page to set button attr
  	$scope.button = {primary: '', secondary: '', tertiary: ''};
    $scope.typography = {primary: 'Primary Type', secondary: 'Secondary Type', tertiary: 'Tertiary Type'};
    $scope.account = {name: 'Account Name2'};
    //sets stylesheet rules to variable
    var styles = document.styleSheets[6].rules;
    $scope.styles = document.styleSheets[6].rules;
    $scope.styleVal = [];
    $scope.styleValSplit = [];
    $scope.menu_on = false;
    //console.log($scope.menu_on);
    $scope.toggleMenu = function() {
        $scope.menu_on = !$scope.menu_on;
        console.log($scope.menu_on);
    }

    //loops through the style rules and pushes them to an array
    for(var x=0;x < $scope.styles.length; x++) {
      $scope.styleKey = $scope.styles[x].cssText;
      $scope.styleVal.push($scope.styleKey);
      	//console.log($scope.styleKey);
      	
		var tempClassString = $scope.styleKey.split(" ")[0].split(".");
		$scope.styleValSplit.push(tempClassString[1])
		//console.log($scope.styleValSplit);
		//console.log(tempClassString + " ---- " + tempClassVal);
	}

	//console.log($scope.styleValSplit);
	//gets total number of rules
	  $scope.totalRules = $scope.styleVal.length;
   
   
 	//console.log($scope.styleVal);

    //evaluates the classes of click event
    $scope.evalClasses = function ($event){
    	$scope.currentEl = $event.target;
    	$scope.classNameArr = $scope.currentEl.className.split(' ');
    	
    	$scope.matchStylesheet($scope.classNameArr,$scope.styleValSplit);
    };

    $scope.matchStylesheet = function (elClassNamesArr, splitStyleSheetArr){
    	// Matched array
    	//console.log(splitStyleSheetArr);
    	$scope.matchedClassesArr = [];
    	$scope.finalPositions = [];
    	for (var $i=0;$i<elClassNamesArr.length;$i++){
    		$scope.pos = splitStyleSheetArr.indexOf(elClassNamesArr[$i]);
    		//console.log(elClassNamesArr[$i]);
    		if ($scope.pos>=0) {
    			$scope.finalPositions.push($scope.pos);
    		}
    		
    		// if ($scope.pos>=0) {
    		// 	$scope.matchedClassesArr.push(elClassNamesArr[$i]);
    		// }
    	}
    	console.log($scope.finalPositions);
    	//console.log($scope.matchedClassesArr);
    	//$scope.parseStylesheet($scope.matchedClassesArr, $scope.styleVal);
    };

	// $scope.parseStylesheet = function (elMatchedClasses, styleSheetArr){

	// 	//return positions of stylesheet
	// 	console.log(styleSheetArr);
	// 	var tempClassVal = $scope.styleKey.split('{')[1].split('}')[0].split(';');
	// }
  })
  .directive('styler', function() {
    return {
        scope: {
            styles: '='
        },
        restrict: 'EA',
        template: '<div ng-repeat="type in types"><input ng-change="Change(type)" ng-model="temp_styles[type]" class="form-control"/></div>',
        link: function(scope, elt, attrs) {      
            // get the actual styles
            var keys = scope.styles.cssText;
            var types = scope.styles.cssText.replace(/ /g, '').split('{')[1].split('}')[0].split(';');

            scope.types = [];
            scope.temp_styles = {};
            // get rid of "" element at the end
            types.pop();
            for (var i in types) {
                var split = types[i].split(':');
                scope.types.push(split[0]);
                scope.temp_styles[split[0]] = split[1];
            }
            scope.Change = function(type) {
                scope.styles.style[type] = scope.temp_styles[type];
            };
        }
    };
});

