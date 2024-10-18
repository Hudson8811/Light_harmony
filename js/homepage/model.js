import * as THREE from '../libs/three.module.js';

import { FBXLoader } from '../libs/jsm/loaders/FBXLoader.js';

var container;
var camera, scene, renderer;
var raycaster, mouse;
var fps = 60;
var interval = 1000 / fps;
var lastTime = 0;
let animationFrameId;
let headObj;

let initialAngle = -22;


const $animationToggle = $("#animation");
let animationOption = getCookie('option-animate');

if (animationOption && animationOption === '0') {
	$animationToggle.prop('checked', false);
	$('.intro__anim img').show();
} else {
	$animationToggle.prop('checked', true);
	$('.intro__anim img').hide();
	initAnimation();
}

$animationToggle.on("change", function () {
	if ($animationToggle.is(":checked")) {
		$('.intro__anim img').hide();
		initAnimation();
		uncheckAndTriggerChange('#orangeTheme');
		setCookie('option-animate','1',90);
	} else {
		disposeAnimation();
		$('.intro__anim img').show();
		setCookie('option-animate','0',90);
		$('.js-reset-options').addClass('active');
	}
});

function initAnimation() {
	container = document.querySelector(".head_3d");

	camera = new THREE.PerspectiveCamera( 52, container.clientWidth / container.clientHeight, 0.1, 1000 );
	camera.position.set( -0.2, -0.2, 2.3 );
	camera.lookAt(-0.2, 0, 0);

	scene = new THREE.Scene();

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2()

	const spotLight1 = new THREE.SpotLight(0xffffff, 3.02, 0, 0.594, 0, 2.96);
	spotLight1.position.set(0.169, 0.207, 2.465);
	spotLight1.castShadow = true;
	spotLight1.shadow.camera.fov = 68.0673860615418;
	spotLight1.shadow.camera.near = 0.5;
	spotLight1.shadow.camera.far = 500;
	scene.add(spotLight1);

	const spotLightTarget1 = new THREE.Object3D();
	spotLightTarget1.position.set(0, 0, 0); // Установите положение цели по вашему усмотрению
	scene.add(spotLightTarget1);
	spotLight1.target = spotLightTarget1;


	const spotLight2 = new THREE.SpotLight(0xffffff, 3.74, 0, 0.654, 0, 1.2);
	spotLight2.position.set(-1.449, -0.642, 0.485);
	spotLight2.castShadow = true;
	spotLight2.shadow.camera.fov = 74.94287960311168;
	spotLight2.shadow.camera.near = 0.5;
	spotLight2.shadow.camera.far = 500;
	scene.add(spotLight2);

	const spotLightTarget2 = new THREE.Object3D();
	spotLightTarget2.position.set(0, 0, 0); // Установите положение цели по вашему усмотрению
	scene.add(spotLightTarget2);
	spotLight2.target = spotLightTarget2;


	const ambientLight = new THREE.AmbientLight(0xffffff, 0.58);
	scene.add(ambientLight);




	const statueMaterial = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		emissive: 0x000000,
		specular: 0x111111,
		shininess: 19.9,
		reflectivity: 0,
		refractionRatio: 0.98
	});

	const fbxLoader = new FBXLoader();
	fbxLoader.load('models/Apollo_15k_polys.fbx', function(object) {
		headObj = object;
		headObj.traverse(function(child) {
			if (child.isMesh) {
				child.material = statueMaterial;
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});

		let scale = 0.9;
		headObj.scale.set(scale, scale, scale);
		headObj.position.set(0, -0.8, 0);
		headObj.rotation.y = THREE.MathUtils.degToRad(30);

		scene.add(headObj);
	});


	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.clientWidth, container.clientHeight );
	renderer.useLegacyLights = false;
	renderer.setClearColor(0x000000, 0);

	renderer.outputEncoding = THREE.sRGBEncoding;


	container.appendChild(renderer.domElement);

	var pmremGenerator = new THREE.PMREMGenerator(renderer);
	pmremGenerator.compileEquirectangularShader();

	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener("mousemove", onWindowMouseMove, false);

	animate();
}


function onWindowResize() {
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(container.clientWidth, container.clientHeight);
}

function onWindowMouseMove(event) {
	const windowWidth = window.innerWidth;
	const mouseX = event.clientX - windowWidth / 2;
	const normalizedMouseX = mouseX / (windowWidth / 2);
	if (headObj) {
		const rotationSpeed = 0.5;
		headObj.rotation.y = THREE.MathUtils.degToRad(initialAngle) + normalizedMouseX * rotationSpeed;
		headObj.position.x = -normalizedMouseX * 0.1;
	}
}

function animate(now) {
	animationFrameId = requestAnimationFrame(animate);
	if (now - lastTime >= interval) {
		renderer.render(scene, camera);
		lastTime = now;
	}
}



function disposeAnimation() {
	window.removeEventListener('resize', onWindowResize);
	window.removeEventListener("mousemove", onWindowMouseMove);

	if (renderer) {
		renderer.dispose();
		renderer.forceContextLoss();
		renderer.domElement = null;
		renderer = null;
	}

	if (scene) {
		scene.traverse(function (child) {
			if (child.isMesh) {
				child.geometry.dispose();
				if (child.material.isMaterial) {
					cleanMaterial(child.material);
				} else {
					for (const material of child.material) cleanMaterial(material);
				}
			}
		});

		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}
		scene = null;
	}

	if (camera) {
		camera = null;
	}

	if (headObj) {
		headObj = null;
	}

	cancelAnimationFrame(animationFrameId);
	if (container) {
		container.innerHTML = '';
	}
}

function cleanMaterial(material) {
	material.dispose();

	// Dispose textures
	for (const key of Object.keys(material)) {
		const value = material[key];
		if (value && typeof value === 'object' && 'minFilter' in value) {
			value.dispose();
		}
	}
}