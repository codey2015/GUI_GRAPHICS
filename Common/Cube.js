
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           0.5, 0.5, 0.5, //vertex0
		   0.5, 0.5, -0.5, //vertex1
		   0.5, -0.5, 0.5, //vertex2
		   0.5, -0.5, -0.5, //vertex3
		   -0.5, 0.5, 0.5, //vertex4
		   -0.5, 0.5, -0.5, //vertex5
		   -0.5, -0.5, 0.5, //vertex6
		   -0.5, -0.5, -0.5, //vertex7
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            0, 1, 2,
			1, 3, 2, 
			2, 3, 7,
			2, 7, 6,
			0, 2, 6,
			4, 0, 6,
			3, 1, 7,
			7, 1, 5,
			6, 7, 4,
			4, 7, 5,
			4, 5, 0,
			5, 1, 0,        ])
    };
    this.indices.count = this.indices.values.length;

    /*
    const faceColors = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
  ];
    
     var colors = [];
    
    for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];
    colors = colors.concat(c, c, c, c);
    }
    */
    
ubeVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    colors = [
      [1.0, 0.0, 0.0, 1.0],     // Front face
      [1.0, 1.0, 0.0, 1.0],     // Back face
      [0.0, 1.0, 0.0, 1.0],     // Top face
      [1.0, 0.5, 0.5, 1.0],     // Bottom face
      [1.0, 0.0, 1.0, 1.0],     // Right face
      [0.0, 0.0, 1.0, 1.0],     // Left face
    ];
    var unpackedColors = [];
    for (var i in colors) {
      var color = colors[i];
      for (var j=0; j < 4; j++) {
        unpackedColors = unpackedColors.concat(color);
      }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
    cubeVertexColorBuffer.itemSize = 4;
    cubeVertexColorBuffer.numItems = 24;
    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    //const colorBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
    
    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
