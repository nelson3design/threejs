import * as THREE from './three.js-master/three.js-master/build/three.module.js';

import {GLTFLoader} from './three.js-master/three.js-master/examples/jsm/loaders/GLTFLoader.js';

import {OrbitControls} from './three.js-master/three.js-master/examples/jsm/controls/OrbitControls.js'
const canvas = document.querySelector('.webgl')

const scene =new THREE.Scene()


const loader = new GLTFLoader()
loader.load('assets/chaise.gltf', function(gltf){

    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(0.01, 0.01, 0.01)

  

    scene.add(root);
}, function(xhr){
    console.log(xhr.loader/xhr.total * 100) + "% loaded"
}, function(error){
    console.log('an error ocurred')
})

// scene.background =new THREE.Color(0xffffff)

const light = new THREE.HemisphereLight(0xffffff,0x000000,2)

// light.position.set(50,10,1)
// light.target.position.set(0,0,0)
scene.add(light)

// const light2 = new THREE.DirectionalLight(0xffffff, 3)

// light2.position.set(2,2,1)
// light2.target.position.set(0,0,0)
// scene.add(light2)


// const light3 = new THREE.DirectionalLight(0xffffff, 3)

// light3.position.set(-50,2,1)
// light3.target.position.set(0,0,0)
// scene.add(light3)






const sizes ={
    with: window.innerWidth,
    height: window.innerHeight
}

const camera= new THREE.PerspectiveCamera(75, sizes.with/sizes.height, 0.1, 100)
camera.position.set(0,1,2)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)



const renderer= new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})


renderer.setSize(sizes.with, sizes.height)

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.shadowMap.enabled = true
renderer.gammaOuput= true


function animate(){
    requestAnimationFrame(animate)
    // root.rotation.y += 0.01
    
    renderer.render(scene, camera)
    controls.update()
    controls.enableDamping= true
}

animate()