var gl = null;
var cone = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.45, 0.35, 0.45, 1.0 );
    cone = new Cone(150);

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

window.onload = init;
