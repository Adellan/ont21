import * as BABYLON from 'babylonjs';
import { degToRad } from './assets/degToRad'

export const log = (scene, ground) => {

    const logForm = [
        new BABYLON.Vector3(0, 0, 2),
        new BABYLON.Vector3(20, 15, 1),
        new BABYLON.Vector3(-10, -2, 1.2)
];
    const logOptions = {
        path: logForm,
        radius: 4,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        cap: BABYLON.Mesh.CAP_ALL,
        //invertUV: true
    }

    const log = BABYLON.MeshBuilder.CreateTube("log", logOptions, scene);
    const brown = new BABYLON.Color3(0.65, 0.35, 0.05);
    const logMaterial = new BABYLON.StandardMaterial("logMaterial", scene);
    logMaterial.diffuseColor = brown;
    logMaterial.diffuseTexture = new BABYLON.Texture("textures/bark.jpg", scene);
    log.material = logMaterial;
    log.rotation.x = degToRad(95)
    log.rotation.z = degToRad(120)
    log.rotation.y = degToRad(10)
    log.position.x = -6;
    log.position.z = 18;
    log.position.y = ground.getHeightAtCoordinates(log.position.x, log.position.z) + 3;
}