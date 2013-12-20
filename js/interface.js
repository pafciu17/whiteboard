/**
 * Created by pawel on 12/20/13.
 */

angular.module('WhiteboardApp', ['colorpicker.module']).
	controller('Toolbox', function($scope) {
		$scope.lineSizes = getPossibleLineSizes(1, 40, 5);
		$scope.setSize = function(sizeName, size) {
			$scope.lineSize = sizeName;
			whiteboard.setLineSize(size);
		};
		$scope.clearWhiteboard = function() {
			whiteboard.clear();
		}
		$scope.setEraser = function() {
			$scope.eraserBtnCls = 'active';
			$scope.color = '#FFFFFF';
			$scope.size = 5;
		}
		$scope.$watch('color', function(color) {
			$scope.eraserBtnCls = (color == '#FFFFFF' ? 'active' : '');
			whiteboard.setLineColor(color);
		});

		$scope.setSize(5, $scope.lineSizes[5]);
		$scope.color = '#0000FF';
	});


//helper functions
function getPossibleLineSizes(from, to, step) {
	var result = {};
	var sizeName = 1;
	var i;
	for (i = from; i <= to; i = i + step) {
		result[sizeName] = i;
		sizeName++;
	}
	return result;
}