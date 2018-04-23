//Lynda - Create a "init" function to keep it organized.
function init(){

  //Create Scene, Camera and Render
  //using "Perspective" camera (one of several types of camera)
  var scene = new THREE.Scene();
  //DAT.GUI LIBRARY = adds user interfaces for controling variables.
  var gui = new dat.GUI();
  //set condition to turn Fog on/off
  var enableFog =false;
      if (enableFog){
  //FOG - color and density
  scene.fog = new THREE.FogExp2(0xfffff,0.2);
}


  //calling the GetBox function
  var box = getBox(1, 1, 1);
  //calling plane
  var plane = getPlane(20);
  var sphere = getSphere(0.05);
  var pointLight = getPointLight(1);
  //NAME OBJECTS - allows to call specific objects with "get" commands.
  plane.name = 'plane-1';
  box.name = 'box-1'
  //ROTATE PLANE = can't use "plane.rotation.x= 90;" because THREEJS uses Radians instead of degrees. For this will use the "math" object.
  plane.rotation.x = Math.PI/2;
  //BOX POSITION: makes its position half its height, so it keeps on the grid no matter what size.
  box.position.y =box.geometry.parameters.height/2;

//LIGHT POSITION: move away from initial position.
  pointLight.position.y = 2;
  //pointLight.position.z = 4;
  pointLight.intensity = 2;

//GUI interfaces = parameter, start, finish)
gui.add(pointLight, 'intensity', 0, 10);
gui.add(pointLight.position, 'y', 0, 5);
gui.add(pointLight.position, 'x', -5, 5);
gui.add(pointLight.position, 'z', -5, 5);
  //after calling the function you have to add the object to the scene. PARENTING: (box) will become child of "plane" (or any other object, like "scene" fxp).
  scene.add(box);
  scene.add(plane);
  scene.add(pointLight);
  //sphere is child of pointlight to make light source visible
  pointLight.add(sphere);

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
//SHADOW = must be added at (renderer, objects, animation, light)
  renderer.shadowMap.enabled =true;
  renderer.setSize( window.innerWidth, window.innerHeight);
  //improves the FOG color
  renderer.setClearColor('rgb(120,120,120)');
  document.getElementById('webgl').appendChild(renderer.domElement);
//instead of just "renderer.render( scene, camera);", call the "update" function, adding "renderer" to its paramaters.

//ORBIT CONTROLS LIBRARY (call on the "update function" too)
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//add "controls"
update(renderer, scene, camera, controls);

//lets check the parameters on the browser console by typing "scene" on it.
  return scene;

}

function getBox(w, h, d){
  // The Object: Cube (BoxGeometry)

        var geometry = new THREE.BoxGeometry( w, h, d);

          //MATERIAL = setting to Phong - reflects light. "to keep it simple we are just using color attribute"
        var material = new THREE.MeshPhongMaterial ( {color: 0x00ff00});
        var mesh = new THREE.Mesh( geometry, material);
        //SHADOW = cast SHADOW
        mesh.castShadow = true;
//forgot to add "return mesh". I was just stating the var, but not running it. Thought that "add.box" would be enough.
        return mesh;
}
//SPHERES - they are going to be used to make lights visible(parent child)
function getSphere(size){

        //sphere parameters: size, number of height segmets, number of width segments
        var geometry = new THREE.SphereGeometry(size, 24,24);

        var material = new THREE.MeshBasicMaterial ( {color: 'rgb(255,255,255)'
      });
        var mesh = new THREE.Mesh( geometry, material);

//forgot to add "return mesh". I was just stating the var, but not running it. Thought that "add.box" would be enough.
        return mesh;
}

//PLANE GEOMETRY: Copied getBox and changed the parameters
function getPlane(size){
  // The Object: Plane (PlaneGeometry)

        var geometry = new THREE.PlaneGeometry(size, size);
          //"to keep it simple we are just using color attribute. Plane double sided"
        var material = new THREE.MeshPhongMaterial({
          color: 006800,
           side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh( geometry, material);
        mesh.receiveShadow = true;
        return mesh;
}


//LOOP RENDER AND ANIMATION + OrbitControl Library "controls". Don't forget to update on requestAnimationFrame.
function update(renderer, scene, camera, controls){
 renderer.render(scene, camera,);

 //orbit controls
 controls.update();
//"var plane" will find the "plane-1" plane object.
 var box = scene.getObjectByName('box-1');
// box.rotation.y += 0.01;
//  box.rotation.z += 0.01;

//TRAVERSE - calls a function on a parent and all his children. Here calling "scene" and his chidren "plane" and "box"
// scene.traverse(function(child){
//   child.scale.x += 0.001;
// })


 //ANIMATE = call requestAnimationFrame and runs the "update" function itself, making a loop. requestAnimationFrame also optimizes the render for animation 60/s .
  requestAnimationFrame(function(){
  update(renderer,scene, camera, controls );
  })
}




//light - arguments: color and intensity
function getPointLight(intensity){
  var light = new THREE.PointLight('#FFFFFF', intensity);
  //SHADOW - Cast SHADOW
  light.castShadow = true;
  //DONT FORGET TO RETURN!
  return light;
}



//added "var scene" to "init();" so I can see the parameters on the browser inspector
var scene = init();
