function initTest() {
  var scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  
  var axes = new THREE.AxesHelper(20)
  scene.add(axes)

  var spotLight = new THREE.SpotLight(0xFFFFFF)
  spotLight.position.set(-40, 40, -15)
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(2014, 1024)
  spotLight.shadow.camera.far = 130
  spotLight.shadow.camera.near = 40
  scene.add(spotLight)
  
  var planeGeometry = new THREE.PlaneGeometry(60, 20)
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF
  })
  var plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0)
  plane.receiveShadow = true
  scene.add(plane)

  var cubeGeometry = new THREE.BoxGeometry(4,4,4)
  var cubeMeterial = new THREE.MeshLambertMaterial({
    color: 0xFF0000,
    // wireframe: true
  })
  var cube = new THREE.Mesh(cubeGeometry, cubeMeterial)  
  cube.position.set(-4, 3, 0)
  cube.castShadow = true
  scene.add(cube)

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777FF,
    // wireframe: true
  })
  
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(20, 4, 2)
  sphere.castShadow = true
  scene.add(sphere)

  var ambienLight = new THREE.AmbientLight(0x353535);
  scene.add(ambienLight);

  camera.position.set(-30, 40, 30)
  camera.lookAt(scene.position)

  document.getElementById('container').appendChild(renderer.domElement)
  // renderer.render(scene, camera)

  var stats = initStats()

  renderScene()
  function renderScene() {
    cube.rotation.x += 0.01
    stats.update()
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
  }
}

function initStats(type) {
  var panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0
  var stats = new Stats()
  stats.showPanel(panelType)
  document.body.appendChild(stats.dom); // 0:fps 1:ms 2:mb 3+:custom
  return stats
}



