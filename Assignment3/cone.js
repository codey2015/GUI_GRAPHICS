var gl = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    cone = new Cone(gl);

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.5, 1.0, 1.0, 1.0 );
    
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

window.onload = init;
