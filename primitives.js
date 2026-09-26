// cube
const positions = new Float32Array([
  -1, -1, -1,  // 0
   1, -1, -1,  // 1
   1,  1, -1,  // 2
  -1,  1, -1,  // 3
  -1, -1,  1,  // 4
   1, -1,  1,  // 5
   1,  1,  1,  // 6
  -1,  1,  1   // 7
]);

const colors = new Float32Array([
  1,0,0,
  0,1,0,
  0,0,1,
  1,1,0,
  1,0,1,
  0,1,1,
  1,1,0,
  1,0,1
]);

const indices = new Uint16Array([
  // Front
  4, 5, 6,   4, 6, 7,
  // Back
  1, 0, 3,   1, 3, 2,
  // Top
  3, 7, 6,   3, 6, 2,
  // Bottom
  0, 1, 5,   0, 5, 4,
  // Right
  1, 2, 6,   1, 6, 5,
  // Left
  0, 4, 7,   0, 7, 3,
]);

const pyramidPositions = new Float32Array([
   0.0,  1.0,  0.0,  //Top point
  -1.0, -1.0,  1.0,  //Front-left
   1.0, -1.0,  1.0,  //Front-right
   1.0, -1.0, -1.0,  //Back-right
  -1.0, -1.0, -1.0   //Back-left
]);

const pyramidColors = new Float32Array([
  1.0, 1.0, 0.0, 
  1.0, 0.0, 0.0, 
  0.0, 1.0, 0.0,  
  0.0, 0.0, 1.0,  
  1.0, 0.0, 1.0   
]);

const pyramidIndices = new Uint16Array([
  0, 1, 2,  // Front 
  0, 2, 3,  // Right 
  0, 3, 4,  // Back 
  0, 4, 1,  // Left 
  // Square base split into 2 triangles
  1, 3, 2,  // Base triangles
  1, 4, 3   // 
]);


const prismPositions = new Float32Array([
  // Front triangular face
   0.0,  1.0,  1.0,  //Front top
  -1.0, -1.0,  1.0,  //Front bottom-left
   1.0, -1.0,  1.0,  //Front bottom-right

  // Back triangular face
   0.0,  1.0, -1.0,  //Back top
  -1.0, -1.0, -1.0,  //Back bottom-left
   1.0, -1.0, -1.0   //Back bottom-right
]);

const prismColors = new Float32Array([
  1.0, 0.2, 0.2,
  0.2, 1.0, 0.2,
  0.2, 0.2, 1.0,
  1.0, 1.0, 0.2,
  0.2, 1.0, 1.0,  
  1.0, 0.2, 1.0
]);

const prismIndices = new Uint16Array([
  // Front triangle
  0, 1, 2,

  // Back triangle
  3, 5, 4,

  // Bottom 
  1, 4, 5,
  1, 5, 2,

  // Left 
  0, 3, 4,
  0, 4, 1,

  // Right 
  0, 2, 5,
  0, 5, 3
]);

function createTorus(R = 0.9, r = 0.35, segR = 24, segr = 16) {
  let positions = [];
  let colors = [];
  let indices = [];

  for (let i = 0; i < segR; i++) {
    let u = (i / segR) * 2 * Math.PI;
    for (let j = 0; j < segr; j++) {
      let v = (j / segr) * 2 * Math.PI;

      let x = (R + r * Math.cos(v)) * Math.cos(u);
      let y = r * Math.sin(v);
      let z = (R + r * Math.cos(v)) * Math.sin(u);

      positions.push(x, y, z);

      colors.push(
        0.5 + 0.5 * Math.cos(u),
        0.5 + 0.5 * Math.sin(v),
        0.5 + 0.5 * Math.sin(u + v)
      );
    }
  }

  for (let i = 0; i < segR; i++) {
    let nextI = (i + 1) % segR;
    for (let j = 0; j < segr; j++) {
      let nextJ = (j + 1) % segr;

      let p0 = i * segr + j;
      let p1 = nextI * segr + j;
      let p2 = nextI * segr + nextJ;
      let p3 = i * segr + nextJ;

      indices.push(p0, p1, p2);
      indices.push(p0, p2, p3);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
}