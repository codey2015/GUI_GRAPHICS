
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
           0.5, 0.5, 0.5, //vertex0 Right, Up, Forward   //RIGHT FACE
	   0.5, 0.5, -0.5, //vertex1 Right, Up, Back //RIGHT FACE
		   // Right, Down, Back //RIGHT FACE
		//Right, Down, Forward //RIGHT FACE
		
		
		   0.5, -0.5, 0.5, //vertex2 Right, Down, Forward //BOTTOM FACE
		   0.5, -0.5, -0.5, //vertex3 Right, Down, Back //BOTTOM FACE
					//Left, Down, Back //BOTTOM FACE
					//Left, Down, Forward //BOTTOM FACE	
		
		
		   -0.5, -0.5, 0.5, //vertex6 Left, Down, Forward //LEFT FACE
		   -0.5, -0.5, -0.5, //vertex7 Left, Down, Back //LEFT FACE
				     //Left, Up, Back //LEFT FACE
				    //Left, Up, Forward //LEFT FACE
		
		
		//Left, Up, Forward //BACK FACE
		//Left, Down, Forward//BACK FACE
		//Right, Down, Forward//BACK FACE
		//Right, Up, Forward//BACK FACE
		
		//TOP FACE
		//TOP FACE
		//TOP FACE
		//TOP FACE
		
		
				//FRONT FACE
				//FRONT FACE
				//FRONT FACE
				//FRONT FACE

		   -0.5, 0.5, 0.5, //vertex4 Left, Up, Forward
		   -0.5, 0.5, -0.5, //vertex5 Left, Up, Back
		
		

            ]),
        numComponents : 3
    };
        this.colors = {
        values : new Float32Array([
            1.0, 0.0, 0.0, 
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0
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
			5, 1, 0,        
	])
    };
    this.indices.count = this.indices.values.length;

    
    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

	
	
    //var colors = [0,0,1, 1,0,0, 0,1,0, 1,0,1,];

	
    //var colorBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
    
    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents, gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
	    
        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );
        // Draw the cube's base
	gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
    }
};
