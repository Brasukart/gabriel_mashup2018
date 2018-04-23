  //My Javascript will go here:
// Initiate function or other initializations here
//Using ThreeJS Detector (https://threejs.org/docs/index.html#manual/introduction/WebGL-compatibility-check)


//Create Scene, Camera and Render
//using "Perspective" camera (one of several types of camera)
console.log(THREE);
var scene = new THREE.Scene();

  //camera parameters: field of view in degrees, aspect ratio, near, far clipping planes.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

  //"Where the magic happens".Parameters: setsize,
//For lower resolution: setSize(window.innerWidth/2, window.innerHeight/2, false)
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.getElementById('webgl').appendChild(renderer.domElement);


//   // The Object: Cube (BoxGeometry)

      var geometry = new THREE.BoxGeometry( 1, 1, 1);
        //"to keep it simple we are just using color attribute"
      var material = new THREE.MeshBasicMaterial ( {color: 0x00ff00});
      var cube = new THREE.Mesh( geometry, material);
      scene.add( cube );
      //   //move the camera by 5, so it is in a different position than the cube (BoxGeometry)
      camera.position.z = 5;

      //   //THE RENDER LOOP - usually 60/s
      // //why "requestAnimationFrame" instead of "setInterval": More options; stops when users changes tabs

      function animate(){
        requestAnimationFrame( animate );
        cube.rotation.x = cube.rotation.x +0.05;
        cube.rotation.y += 0.00;
        renderer.render( scene, camera);
      }

      animate();
