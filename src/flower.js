import * as BABYLON from 'babylonjs';
import { degToRad } from './assets/degToRad'

const flower = (color, scene) => {
    //base for flower, used as parent and positioning in world
    const stemOptions = {
        height: 3,
        diameter: 0.15,
    }

    const stem = BABYLON.MeshBuilder.CreateCylinder("stem", stemOptions, scene);
    const stemColor = new BABYLON.Color3(0.05, 0.5, 0.3);
    const stemMaterial = new BABYLON.StandardMaterial("stemMaterial", scene);
    stemMaterial.diffuseColor = stemColor;
    stem.material = stemMaterial;
    stem.position.x = 0;
    stem.position.y = 0;
    stem.position.z = 0;

    //flower center
    const fcenter = BABYLON.MeshBuilder.CreateSphere("fcenter", {diameter: 0.35, slice: 0.4});
    const fcenterColor = new BABYLON.Color3(1,1,0);
    const fcenterMaterial = new BABYLON.StandardMaterial("fcenterMaterial", scene);
    fcenterMaterial.diffuseColor = fcenterColor;
    fcenter.material = fcenterMaterial;
    fcenter.position.x = stem.position.x;
    fcenter.position.y = stem.position.y + stemOptions.height/2 - 0.05;
    fcenter.position.z = stem.position.z;

    stem.addChild(fcenter);

    //petals
    const petalOptions = {
        diameterX: 1,
        diameterY: 0.1,
        diameterZ: 0.4,
    }
        const petal0 = BABYLON.MeshBuilder.CreateSphere("petal", petalOptions, scene);
        const petalMaterial = new BABYLON.StandardMaterial("petalMaterial", scene);
        petalMaterial.diffuseColor = color;
        petal0.material = petalMaterial;
        //petal x is in the middle of ellipsoid
        petal0.position.x = stem.position.x - 0.55;
        //stem y is in the middle of cylinder
        petal0.position.y = stem.position.y + stemOptions.height/2;
        petal0.position.z = stem.position.z - 0.1;
        petal0.rotation.y = degToRad(-10);
        

        const petal1 = petal0.clone("petal1");
        petal1.position.x = stem.position.x - 0.25;
        petal1.position.z = stem.position.z + 0.45;
        petal1.rotation.y = degToRad(55);

        const petal2 = petal0.clone("petal2");
        petal2.position.x = stem.position.x + 0.3;
        petal2.position.z = stem.position.z + 0.4;
        petal2.rotation.y = degToRad(125);

        const petal3 = petal0.clone("petal3");
        petal3.position.x = stem.position.x + 0.5;
        petal3.position.z = stem.position.z - 0.15;
        petal3.rotation.y = degToRad(195);

        const petal4 = petal0.clone("petal4");
        petal4.position.x = stem.position.x;
        petal4.position.z = stem.position.z - 0.52;
        petal4.rotation.y = degToRad(-90);

        stem.addChild(petal0);
        stem.addChild(petal1);
        stem.addChild(petal2);
        stem.addChild(petal3);
        stem.addChild(petal4);


        //leaves
        const leafOptions = {
            diameterX: 0.1,
            diameterY: 1.4,
            diameterZ: 0.7,
        }
        const leafBase = BABYLON.MeshBuilder.CreateCylinder("leafBase", {height: 0.2, diameter: 0.05}, scene);
        const leaf = BABYLON.MeshBuilder.CreateSphere("leaf", leafOptions, scene);
        leafBase.material = stemMaterial;
        leaf.material = stemMaterial;
        leaf.position.x = leafBase.position.x;
        leaf.position.y = leafBase.position.y + 0.8;
        leaf.position.z = leafBase.position.z;
        leafBase.addChild(leaf);
        
        leafBase.position.x = stem.position.x - leafOptions.diameterX;
        leafBase.position.y = stem.position.y;
        leafBase.position.z = stem.position.z;
        leafBase.rotation.z = degToRad(40);

        const leafBase2 = leafBase.clone("leafBase2");
        leafBase2.position.x = stem.position.x + leafOptions.diameterX;
        leafBase2.position.y = stem.position.y - 0.5;
        leafBase2.position.z = stem.position.z;
        leafBase2.rotation.z = degToRad(-50);


        stem.addChild(leafBase);
        stem.addChild(leafBase2);

        return stem;
}

//TODO: find terrain height, plant flowers accordingly
export const flowers = (color, scene) => {
    for(let i = 0; i < 20; i++) {
        const planted = new flower(color, scene);
        planted.position.x = Math.random(1) * (12);
        planted.position.z = Math.random(1) * 24 - 12;
        //take into accord stem height and y is in the middle
        planted.position.y = 1.25;
    }

}