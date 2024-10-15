import * as THREE from '../libs/three.module.js';

import { MTLLoader } from '../libs/jsm/loaders/MTLLoader.js';
import { OBJLoader } from '../libs/jsm/loaders/OBJLoader.js';

var container, controls;
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


	scene.add( new THREE.AmbientLight( 0xFFFFFF ) );

	const spotLight = new THREE.SpotLight( 0xffffff, 30 );
	spotLight.angle = Math.PI / 5;
	spotLight.penumbra = 0.2;
	spotLight.position.set( 2, 0.5, 3 );
	spotLight.castShadow = true;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 1000;
	spotLight.shadow.mapSize.width = 2048;
	spotLight.shadow.mapSize.height = 2048;
	spotLight.shadow.bias = 0;
	spotLight.shadow.radius = 2;
	scene.add( spotLight );

	const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.position.set( -3, 1, 0 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.near = 1;
	dirLight.shadow.camera.far = 1000;

	dirLight.shadow.camera.right = 1;
	dirLight.shadow.camera.left = - 1;
	dirLight.shadow.camera.top	= 1;
	dirLight.shadow.camera.bottom = - 1;

	dirLight.shadow.mapSize.width = 1024;
	dirLight.shadow.mapSize.height = 1024;
	scene.add( dirLight );

	var mtlLoader = new MTLLoader();
	mtlLoader.load("models/Apollo_15k_polys.mtl", function(materials)
	{
		materials.preload();
		var objLoader = new OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load("models/Apollo_15k_polys.obj", function(object)
		{
			headObj = object;
			let scale = 0.085;
			headObj.scale.set(scale, scale, scale);
			headObj.position.set(0, -0.8, 0);
			headObj.rotation.y = THREE.MathUtils.degToRad(initialAngle);

			headObj.traverse(function (child) {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			scene.add( headObj );
		});
	});


	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	renderer.shadowMap.enabled = true;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.clientWidth, container.clientHeight );
	renderer.useLegacyLights = false;
	renderer.setClearColor(0x000000, 0);

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