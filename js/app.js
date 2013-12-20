/**
 * Created by pawel on 12/20/13.
 */
io = io.connect('http://151.236.222.145:38001');

$(function() {
	io.emit('ready')
})

io.on('init', function(data) {
	for (var source in data) {
		if (data.hasOwnProperty(source)) {
			var i;
			for (i = 0; i < data[source].length; i++) {
				whiteboard.drawPoint(data[source][i]);
			}
		}
	}
})

io.on('drawPoint', function(data) {
	whiteboard.drawPoint(data);
})

io.on('clear', function() {
	whiteboard.clear(true);
})

whiteboard.setListener('clear', function() {
	io.emit('clear');
})

whiteboard.setListener('drawPoint', function(point, color, size, newPath) {
	io.emit('drawPoint', {
		point: point,
		size: size,
		color: color,
		newPath: newPath
	})
})