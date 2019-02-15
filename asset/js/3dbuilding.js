{
    var container = document.getElementById("canvas");

    var scene = new THREE.Scene();
    var windowWidth = container.clientWidth;
    var windowHeight = container.clientHeight;
    var scaler = (windowWidth>windowHeight)?windowWidth / 2 : windowHeight / 2;
    var camera = new THREE.OrthographicCamera(-windowWidth/scaler, windowWidth/scaler, windowHeight/scaler, -windowHeight/scaler, 1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    function animate() {
        cube.rotation.y += 0.02;
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();
}