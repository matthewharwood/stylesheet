var app = angular.module('stylesheetApp');

app.directive('ngEnter', function() {
    return function(scope, elm, attrs) {
      elm.bind('keypress', function(e) {
        if (e.charCode === 13) {
          scope.$apply(attrs.ngEnter);
        }
      }),
        elm.bind('blur', function() {
          scope.$apply(attrs.ngEnter);
        });
    };
  });

app.directive('inlineEdit', function() {
    return {
        restrict: 'E',
        // can be in-lined or async loaded by xhr
        // or inlined as JS string (using template property)
        templateUrl: 'componentTpl.html',
        scope: {
            model: '=',
            version: '@',
            subcaption: '@'
          }
        };
  });