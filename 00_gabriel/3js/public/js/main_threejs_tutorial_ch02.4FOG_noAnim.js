//Lynda - Create a "init" function to keep it organized.
function init(){

  //Create Scene, Camera and Render
  //using "Perspective" camera (one of several types of camera)
  var scene = new THREE.Scene();
  //FOG - color and density
  scene.fog = new THREE.FogExp2(0xfffff,0.2);
  //calling the GetBox function
  var box = getBox(1, 1, 1);
  //calling plane
  var plane = getPlane(20);

  //NAME OBJECTS - allows to call specific objects with "get" commands.
  plane.name = 'plane-1';
  box.name = 'box-1'
  //ROTATE PLANE = can't use "plane.rotation.x= 90;" because THREEJS uses Radians instead of degrees. For this will use the "math" object.
  plane.rotation.x = Math.PI/2;
  //BOX POSITION: makes its position half its height, so it keeps on the grid no matter what size.
  box.position.y =box.geometry.parameters.height/2;

  //after calling the function you have to add the object to the scene. PARENTING: (box) will become child of "plane" (or any other object, like "scene" fxp).
  scene.add(box);
  scene.add(plane);
    //camera parameters: field of view in degrees, aspect ratio, near, far clipping planes.
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
//move the camera by 5, so it is in a different position than the cube (BoxGeometry)
camera.position.x = 1;
camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAt(new THREE.Vector3(0,0,0));
    //"Where the magic happens".Parameters: setsize,
  //For lower resolution: setSize(window.innerWidth/2, window.innerHeight/2, false)
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight);
  //improves the FOG color
  renderer.setClearColor('#ffffff');
  document.getElementById('webgl').appendChild(renderer.domElement);
//instead of just "renderer.render( scene, camera);", call the "update" function, adding "renderer" to its paramaters.

update(renderer, scene, camera);

//lets check the parameters on the browser console by typing "scene" on it.
  return scene;

}

function getBox(w, h, d){
  // The Object: Cube (BoxGeometry)

        var geometry = new THREE.BoxGeometry( w, h, d);
          //"to keep it simple we are just using color attribute"
        var material = new THREE.MeshBasicMaterial ( {color: 0x00ff00});
        var mesh = new THREE.Mesh( geometry, material);

//forgot to add "return mesh". I was just stating the var, but not running it. Thought that "add.box" would be enough.
        return mesh;
}

//LOOP RENDER AND ANIMATION
function update(renderer, scene, camera){
 renderer.render(scene, camera);
//"var plane" will find the "plane-1" plane object.
 var box = scene.getObjectByName('box-1');
box.rotation.y += 0.001;
 box.rotation.z += 0.001;

//TRAVERSE - calls a function on a parent and all his children. Here calling "scene" and his chidren "plane" and "box"
scene.traverse(function(child){
  child.scale.x += 0.001;
})

 //call requestAnimationFrame and runs the "update" function itself, making a loop. requestAnimationFrame also optimizes the render for animation 60/s .
  requestAnimationFrame(function(){
  update(renderer,scene, camera );
  })
}
//PLANE GEOMETRY: Copied getBox and changed the parameters
function getPlane(size){
  // The Object: Cube (BoxGeometry)

        var geometry = new THREE.PlaneGeometry(size, size);
          //"to keep it simple we are just using color attribute"
        var material = new THREE.MeshBasicMaterial({
          color: 006800,
           side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh( geometry, material);

        return mesh;
}


//added "var scene" to "init();" so I can see the parameters on the browser inspector
var scene = init();
