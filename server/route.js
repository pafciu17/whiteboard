/**
 * Created by pawel on 12/20/13.
 */
function Route(app) {

	var paths = {};

	var addPoint = function(pathData) {
		if (!paths.hasOwnProperty(pathData.sourceId)) {
			var path = [];
			path.push(pathData);
			paths[pathData.sourceId] = path;
		} else {
			paths[pathData.sourceId].push(pathData);
		}
	}

	var clearPaths = function() {
		paths = {};
	}

	app.io.route('ready', function(req) {
		req.io.emit('init', paths);
	})

	app.io.route('drawPoint', function(req) {
		req.data.sourceId = req.socket.id;
		addPoint(req.data);
		req.io.broadcast('drawPoint', req.data);
	});

	app.io.route('clear', function(req) {
		clearPaths();
		req.io.broadcast('clear');
	});
}

module.exports = Route;