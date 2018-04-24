//Lynda - Create a "init" function to keep it organized.
//GOAL: Show the NYC water consumption using 3D olympic swimming pools https://data.cityofnewyork.us/resource/waf7-5gvc.json
//exp: olympic swimming pool = 660.000 galons
var app = {
var amount = 10;
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


  // //calling the GetBox function
  // var box = getBox(1, 1, 1);

  //calling plane

  var plane = getPlane(100);
  var sphere = getSphere(0.05);
  var pointLight = getPointLight(1);
  var boxGrid =  getBoxGrid(3);






  //NAME OBJECTS - allows to call specific objects with "get" commands.
  plane.name = 'plane-1';
  boxGrid.name = 'boxGrid-1';

  //ROTATE PLANE = can't use "plane.rotation.x= 90;" because THREEJS uses Radians instead of degrees. For this will use the "math" object.
  plane.rotation.x = Math.PI/2;
  //BOX POSITION: makes its position half its height, so it keeps on the grid no matter what size.
  // box.position.y =box.geometry.parameters.height/2;

//LIGHT POSITION: move away from initial position.
  pointLight.position.y = 4;
  //pointLight.position.z = 4;
  pointLight.intensity = 2;



//GUI interfaces = parameter, start, finish)
gui.add(pointLight, 'intensity', 0, 10);
gui.add(pointLight.position, 'y', 0, 5);
gui.add(pointLight.position, 'x', -20, 20);
gui.add(pointLight.position, 'z', -20, 20);
//gui.add(boxGrid, 'amount', 1, 10);
//gui.add(boxGrid, 'separationMultiplier', -1,3);
//gui.add(plane, 'size', -40,40);




  //after calling the function you have to add the object to the scene. PARENTING: (box) will become child of "plane" (or any other object, like "scene" fxp).
  // scene.add(box);

  scene.add(plane);
  scene.add(pointLight);
  //sphere is child of pointlight to make light source visible
  pointLight.add(sphere);
 scene.add(boxGrid);




    //camera parameters: field of view in degrees, aspect ratio, near, far clipping planes.
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
//move the camera by 5, so it is in a different position than the cube (BoxGeometry)
camera.name = 'camera-1';
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
        var material = new THREE.MeshPhongMaterial ( {color: "#47f5ff"});
        var mesh = new THREE.Mesh( geometry, material);
        //SHADOW = cast SHADOW
        mesh.castShadow = true;
//forgot to add "return mesh". I was just stating the var, but not running it. Thought that "add.box" would be enough.
        return mesh;
}
//SPHERES - they are going to be used to make lights visible(parent child)
function getSphere(size){

        //sphere parameters: size, number of height segmets, number of width segments
        var geometry = new THREE.SphereGeometry(size, 24 , 24);

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

function getBoxGrid(amount, separationMultiplier) {
  //GROUP = objects container
  var group = new THREE.Group();

this.amount = amount;

  for (var  i=0; i<amount;i++){
    var obj = getBox(2,0.2,1);
    obj.position.x = i * separationMultiplier;
    obj.position.y = obj.geometry.parameters.height/2;
    group.add(obj);
    for (var j=1; j<amount; j++) {
//?? why I need to create the "var object" again?
      var obj = getBox(2,0.5,1);
      obj.position.x = i * separationMultiplier;
      obj.position.y = obj.geometry.parameters.height/2;
      obj.position.z = j * separationMultiplier;
      group.add(obj);
    }

  }

group.position.x = -(separationMultiplier * (amount-1))/2;
group.position.z = -(separationMultiplier *(amount-1))/2;

//DONT FORGET TO RETURN!!
return group;


}


//LOOP RENDER AND ANIMATION + OrbitControl Library "controls". Don't forget to update on requestAnimationFrame.
function update(renderer, scene, camera, controls){
 renderer.render(scene, camera,);

 //Creates new Boxes = called by button on HTML

   var boxGrid = scene.getObjectByName('boxGrid-1')
   boxGrid.position.y +=0.001;
   //boxGrid.rotation.y +=Math.sin(1)



//  var box = scene.getObjectByName('box-1');
//  box.rotation.y += 0.01;
//   box.rotation.z += 0.01;
// var pointLight = scene.getObjectByName('light-1');
//
//   pointLight.position.x +=0.01;
//   pointLight.position.z +=0.01;



 //orbit controls
 controls.update();
//"var plane" will find the "plane-1" plane object.





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
// API API API -----------------------------
//AJAX initiation

//  function updateProfile(){
//     // Create a variable to refer to our request object:
//     var xmlhttp;
//
//     if (window.XMLHttpRequest){
//         // code for IE7+, Firefox, Chrome, Opera, Safari
//         xmlhttp=new XMLHttpRequest();
//     }else{
//         // code for IE6, IE5
//         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//
// }



// initialize: function(){
//   init.getWaterData();
// },
//
// getWaterData: function(){
//   console.log("Getting NYC Water Data");
//     var nycWaterURL = "https://data.cityofnewyork.us/resource/waf7-5gvc.json";
//     var nycAPIKey = "QXp9nz0h9bc88qBwOCK2NADet";
//      $.ajax({
//        url: "nycWaterURL",
//        type: "GET",
//        error: function(err){
//          console.log(err);
//        },
//        data: {
//          "$limit" : 5000,
//        }
//        success: function(data){
//          console.log("Got the NYC Water data");
//          console.log(data);
//          var waterData = data.response.docs;
//          console.log(waterData);
//        }
//
//
//
//      })
//
// }

// NYC DATA API
function getData(data){
   var ajaxData = $.ajax({
    url: "https://data.cityofnewyork.us/resource/waf7-5gvc.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "QXp9nz0h9bc88qBwOCK2NADet"
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});

return data;
}


var getWater = function(data) {

	for (var i = 0; i < data.length; i++) {
		if (data[i] === '2016') {
			console.log(data[i]);
		}

	}
};


//added "var scene" to "init();" so I can see the parameters on the browser inspector
var scene = init();


}
