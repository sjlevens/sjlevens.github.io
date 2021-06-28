import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import samImg from './sam.jpg'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.setZ(8)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.TorusKnotGeometry(10, 1, 150, 16)
const material = new THREE.MeshToonMaterial({ color: 0x49ef4 })
const torusKnot = new THREE.Mesh(geometry, material)
torusKnot.position.set(0, 0, 0)
scene.add(torusKnot)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0x0)

scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(position) {
  const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloatSpread(0.3))

  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = position
    ? position
    : Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100))

  console.log([x, y, z])
  star.position.set(x, y, z)
  scene.add(star)
}

Array(600).fill().forEach(addStar)

const samTexture = new THREE.TextureLoader().load(samImg)

const sam = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3, 4),
  new THREE.MeshToonMaterial({ map: samTexture }),
)

scene.add(sam)

sam.position.setX(1)
sam.position.setY(1)
torusKnot.position.setX(4)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top

  sam.position.z = t * -0.008
  sam.position.x += 0.01
  sam.rotation.y += 0.01
  sam.rotation.z += 0.01
  sam.rotation.x += 0.01
  camera.position.z = 8 + t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
}

function animate() {
  requestAnimationFrame(animate)

  torusKnot.rotation.x += 0.0006
  torusKnot.rotation.z += 0.00006
  torusKnot.rotateY(0.0006)

  controls.update()
  renderer.render(scene, camera)
}

document.body.onscroll = moveCamera

animate()

console.log('Welcome, traveller! Thanks for checking out my profile :D')
