define([

	'app/tools/tool',
	'simplify'

],
function ( Tool, simplify ) {

	var PencilTool = Tool.extend({

		mouseMove: function ( coord ) {
			this._super( coord );

			if (this.active) {
				this.draftCtx.beginPath();

				this.draftCtx.moveTo( this.lastCoord.x, this.lastCoord.y );
				this.draftCtx.lineTo( coord.x, coord.y );

				this.resetCtx( this.draftCtx, this.settings );
				this.draftCtx.stroke();
				this.draftCtx.closePath();

				this.lastCoord = coord;
			}
		},

		draw: function ( path, settings ) {
			if (path.length === 0) {
				return;
			}

			settings = settings || this.settings;

			this.finalCtx.beginPath();
			this.resetCtx( this.finalCtx, settings );

			if (path.length === 1) {
				// Do something here
			} else {
				path = simplify( path, 0.2, true );

				for (var i = 1, len = path.length; i < len; i++) {
					this.finalCtx.moveTo( path[i - 1].x, path[i - 1].y );
					this.finalCtx.lineTo( path[i].x,     path[i].y );
				}
			}

			this.finalCtx.stroke();
			this.finalCtx.closePath();
		}

	});

	return PencilTool;

});