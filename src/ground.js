import * as BABYLON from 'babylonjs';

// Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
export const terrain = (scene) => {
    const ground = BABYLON.Mesh.CreateGround('ground', 24, 24, 8, scene, false);
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.dds", scene);
    groundMat.diffuseTexture.hasAlpha = true;
    ground.material = groundMat;
    

    //large ground
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/ground.jpg");

    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "https://assets.babylonjs.com/environments/villageheightmap.png", 
    {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 4});
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;

    //ground.rotation.y = degToRad(30);
    //box.rotation.y = 1;
    //box.scaling.setAll(0.75);
}