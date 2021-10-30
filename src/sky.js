import * as BABYLON from 'babylonjs';
import * as materials from 'babylonjs-materials';

export const sky = (scene) => {

    //https://doc.babylonjs.com/toolsAndResources/assetLibraries/materialsLibrary/skyMat

    const skyMaterial = new materials.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;

    const skybox = BABYLON.Mesh.CreateBox("skyBox", 600, scene);
    skybox.material = skyMaterial;
    skyMaterial.turbidity = 2;
    skyMaterial.luminance = 0.9;
    skyMaterial.inclination = 0.6;
    skyMaterial.azimuth = 0.57;
    skyMaterial.cameraOffset.y = scene.activeCamera.globalPosition.y;
}