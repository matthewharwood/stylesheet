'use strict';

angular.module('stylesheetApp')
  .controller('MainCtrl', function ($scope) {
    var styles = document.styleSheets[1].rules;
    $scope.styles = document.styleSheets[1].rules;

    $scope.styleVal = [];

    for(var x=0;x < $scope.styles.length; x++) {
      $scope.styleKey = $scope.styles[x].cssText;
      $scope.styleVal.push($scope.styleKey);
      console.log($scope.styleVal[x]);
	};

    $scope.button = {name: '', color: '', textColor: ''};
    $scope.typography = {style: '', color: '', textColor: ''};
  })
  .directive('styler', function() {
    return {
        scope: {
            styles: '='
        },
        restrict: 'EA',
        template: '<div ng-repeat="(key, type) in types">{{key}}-{{type}} <input ng-change="Change(type)" ng-model="temp_styles[type]"/></div>',
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

