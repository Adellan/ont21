import * as BABYLON from 'babylonjs';
import * as procedural from 'babylonjs-procedural-textures';
import * as materials from 'babylonjs-materials';

export const terrain = (scene) => {
    
    // Procedural materials kept here as backup
    //const grassMaterial = new BABYLON.StandardMaterial("bawl", scene);
    //const grassTexture = new procedural.GrassProceduralTexture("textbawl", 256, scene);
    //grassMaterial.ambientTexture = grassTexture;

    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "textures/heightmap.png", 
    {width:512, height:512, subdivisions: 20, minHeight:0, maxHeight: 128});
    //largeGround.material = grassMaterial;
    largeGround.position.y = -25;

    // Create terrain material
	const terrainMaterial = new materials.TerrainMaterial("terrainMaterial", scene);
    terrainMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    terrainMaterial.specularPower = 64;
	
	// Set the mix texture (represents the RGB values)
    terrainMaterial.mixTexture = new BABYLON.Texture("textures/mixMap1.jpg", scene);
	
	// Diffuse textures following the RGB values of the mix map
	// diffuseTexture1: Red
	// diffuseTexture2: Green
    // diffuseTexture3: Blue
    // note: blue is not used, but required by the method.

    terrainMaterial.diffuseTexture1 = new BABYLON.Texture("textures/ground.jpg", scene);
    terrainMaterial.diffuseTexture2 = new BABYLON.Texture("textures/grass.jpg", scene);
    terrainMaterial.diffuseTexture3 = new BABYLON.Texture("textures/grass.jpg", scene);
   
    // Rescale textures according to the terrain
    terrainMaterial.diffuseTexture1.uScale = terrainMaterial.diffuseTexture1.vScale = 10;
    terrainMaterial.diffuseTexture2.uScale = terrainMaterial.diffuseTexture2.vScale = 10;
    terrainMaterial.diffuseTexture3.uScale = terrainMaterial.diffuseTexture3.vScale = 10;

    largeGround.material = terrainMaterial;
}