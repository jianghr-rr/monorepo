const CubeList = [
  {
    cubeId: '1',
    position: [0, 0, 0],
    size: [1, 1, 1],
    vertices: [
      // Front face
      -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
      // Back face
      -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
    ],
    edges: [
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      0, // front face
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      4, // back face
      0,
      4,
      1,
      5,
      2,
      6,
      3,
      7, // connecting edges
    ],
  },

  {
    cubeId: '2',
    position: [2, 2, 2],
    size: [1, 1, 1],
    vertices: [
      // Front face
      -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
      // Back face
      -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
    ],
    edges: [
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      0, // front face
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      4, // back face
      0,
      4,
      1,
      5,
      2,
      6,
      3,
      7, // connecting edges
    ],
  },
];

export default CubeList;
export { CubeList };
