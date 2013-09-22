define([

	'app/app',
	'flight/component',
	'app/mixins/logging',
	'app/ui/canvas',
	'app/ui/usercanvas'

],
function ( App, Component, Logging, Canvas, UserCanvas ) {

	function Canvases() {
		this.after('initialize', function () {
			var layers = this.$node.find( '.layer' );

			this.on(document, 'login.success', function () {
				// Initialize Layers
				layers.each(function () {
					Canvas.attachTo(this, {
						canvasGroup: this.node
					});
				});

				this.$node.show();
			});

			// Fire off mouse events to 
			this.on('mousedown', function (e) {
				this.trigger( document, 'canvas.mouse.down', {
					x: e.offsetX,
					y: e.offsetY
				});
			});
			this.on('mouseup', function (e) {
				this.trigger( document, 'canvas.mouse.up' );
			});
			this.on('mousemove', function (e) {
				this.trigger( document, 'canvas.mouse.move', {
					x: e.offsetX,
					y: e.offsetY
				});
			});


			//
			// IO Events
			//
			this.on( document, 'io.draw', function ( e, data ) {
				var self = this;

				layers.each(function () {
					self.trigger( this, 'canvas.draw', data );
				});
			});
		});
	}

	return Component(Canvases, Logging);

});