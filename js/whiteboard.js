/**
 * Created by pawel on 12/20/13.
 */

whiteboard = (function() {
	var canvas;
	var context;
	var lineColor = 'red';
	var lineSize = 5;
	var listeners = {};
	var clearCanvas;
	var remotePaths = {};
	var clearCanvas = false;

	var preparePathDrawer = function() {
		var path;
		var tool = new Tool();

		tool.onMouseDown = function(event) {
			path = new Path();
			path.strokeColor = lineColor;
			path.strokeWidth = lineSize;
			path.add(event.point);
			fireDrawPointListner(event.point, true);
		}

		tool.onMouseDrag = function(event) {
			path.add(event.point);
			fireDrawPointListner(event.point);
		}

	}

	var fireDrawPointListner = function(point, newPath) {
		newPath = newPath || false;
		if (typeof listeners['drawPoint'] === 'function') {
			listeners['drawPoint'](point, lineColor, lineSize, newPath);
		}
	}

	function createNewPath(data) {
		var path = new Path();
		path.strokeColor = data.color;
		path.strokeWidth = data.size;
		remotePaths[data.sourceId] = path;
		return path;
	}

	function getPath(sourceId) {
		return remotePaths[sourceId];
	}

	return {

		setLineColor: function(newColor) {
			lineColor = newColor;
		},

		setLineSize: function(newSize) {
			lineSize = newSize;
		},

		getLineSize: function() {
			return lineSize;
			var context = canvas.getContext("2d");
		},

		getLineColor : function() {
			return lineColor;
		},

		setListener: function(event, handler) {
			listeners[event] = handler;
		},

		clear: function(silent) {
			silent = silent || false;
			//project.activeLayer.removeChildren();
			clearCanvas = true;
			if (!silent && typeof listeners['clear'] === 'function') {
				listeners['clear']();
			}
		},

		drawPoint: function(data) {
			var path;
			if (data.newPath) {
				path = createNewPath(data);
			} else {
			 	path = getPath(data.sourceId);
			}
			path.add(new Point(data.point[1], data.point[2]));
		},

		init: function() {
			canvas = document.getElementById('board');
			paper.setup(canvas);
			preparePathDrawer();
			context = canvas.getContext("2d");

			paper.view.onFrame = function() {
				if(clearCanvas && project.activeLayer.hasChildren()){
					project.activeLayer.removeChildren();
					clearCanvas = false;
				};
			}
			paper.view.draw();
		}

	}
}())

paper.install(window);
window.onload = function() {
	whiteboard.init();
};
