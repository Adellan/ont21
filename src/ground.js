import * as BABYLON from 'babylonjs';
import * as materials from 'babylonjs-materials';
import { flowers } from './flower';

export const terrain = (scene) => {
    // Procedural materials kept here as backup
    //import * as procedural from 'babylonjs-procedural-textures';
    //const grassMaterial = new BABYLON.StandardMaterial("bawl", scene);
    //const grassTexture = new procedural.GrassProceduralTexture("textbawl", 256, scene);
    //grassMaterial.ambientTexture = grassTexture;
    //largeGround.material = grassMaterial;
    const largeGround = BABYLON.Mesh.CreateGroundFromHeightMap("largeGround", "textures/heightmap.png", 
    512,512,60,0,128, scene, false, function() {
        //ground coordinate functions don't function outside of this function?
        flowers(scene, largeGround)
    });
    largeGround.position.x = 0;
    largeGround.position.y = -30;
    largeGround.position.z = 0;

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

    return largeGround;
}

/*export const getHeightAtOctreeGroundCoordinates = (scene, x, z) => {
    let height;
    let origin = new BABYLON.Vector3(x, 10, z);
    let down = new BABYLON.Vector3(x, -10, z);

    let ray = new BABYLON.Ray(origin, down);
    let hit = scene.pickWithRay(ray);

    if (hit.pickedPoint) {
        height = hit.pickedPoint.y;
    }
    return height;
}*/
