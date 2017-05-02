class Tool {
    // Active flag, determining whether the tool is currently in use
    active = false;
    // Last coordinate given to the tool during use
    lastCoord = null;
    // Path drawn by the mouse
    path = null;
    // "Final" context, where the changes are finalized
    finalCtx = null;
    // "Draft" context, used for displaying temporary tool paths
    // i.e. guide lines for a rectangle tool
    draftCtx = null;
    // Tool settings
    settings = null;

    constructor(finalCtx, draftCtx, settings) {
        if (!finalCtx) {
            throw new Error( 'Missing final contexts in tool constructor.' );
        }

        this.finalCtx = finalCtx;
        this.draftCtx = draftCtx;
        this.settings = Object.assign({}, this.getDefaults(), settings);
    }

    getDefaults() {
        return {
            strokeStyle: '#000000',
            fillStyle: '#ffffff',
            lineWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
            globalCompositeOperation: 'source-over',
            primary: true,
            sendUpdates: true
        };
    }

    //
    // Mouse down method, passed from parent component
    //
    mouseDown(coord) {
        this.active = true;
        this.lastCoord = coord;
        this.path = [coord];
    }

    //
    // Mouse up method, passed from parent component
    //
    mouseUp() {
        if (this.active) {
            this.active = false;
            this._clear(this.draftCtx);
            this.draw(this.path);
            return this.path;
        }
        return [];
    }

    //
    // Mouse move method, passed from parent component
    //
    mouseMove(coord) {
        if (this.active) {
            this.path.push(coord);
        }
    }


    //
    // Reset context styling
    //
    _resetCtx(ctx, settings, clear) {
        // Reset context styling
        if (settings.primary) {
            ctx.strokeStyle = settings.strokeStyle;
            ctx.fillStyle = settings.fillStyle;
        } else {
            // Swap colors when using secondary mouse mode (right button)
            ctx.strokeStyle = settings.fillStyle;
            ctx.fillStyle = settings.strokeStyle;
        }
        ctx.lineWidth = settings.lineWidth;
        ctx.lineCap = settings.lineCap;
        ctx.lineJoin = settings.lineJoin;
        ctx.globalCompositeOperation = settings.globalCompositeOperation;

        // Clear context
        if (clear) {
            this._clear(ctx);
        }
    }


    //
    // Clear canvas
    //
    _clear(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }


    //
    // Draw an arbitrary path
    //
    draw(path, settings) {
        // No implementation
    }
}

export default Tool;