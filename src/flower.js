import * as BABYLON from 'babylonjs';
import { degToRad } from './assets/degToRad'

const flower = (scene) => {
    //base for flower, used as parent and positioning in world
    const stemOptions = {
        height: 5,
        diameter: 0.4,
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
    const fcenter = BABYLON.MeshBuilder.CreateSphere("fcenter", {diameter: 0.6, slice: 0.4});
    const fcenterColor = new BABYLON.Color3(1,1,0);
    const fcenterMaterial = new BABYLON.StandardMaterial("fcenterMaterial", scene);
    fcenterMaterial.diffuseColor = fcenterColor;
    fcenter.material = fcenterMaterial;
    fcenter.position.x = stem.position.x;
    fcenter.position.y = stem.position.y + stemOptions.height/2 - 0.05;
    fcenter.position.z = stem.position.z;

    stem.addChild(fcenter);

    //petals
    const color = colorList[Math.floor(Math.random(1) * colorList.length)];
    const petalOptions = {
        diameterX: 2,
        diameterY: 0.4,
        diameterZ: 0.8,
    }
        const petal0 = BABYLON.MeshBuilder.CreateSphere("petal", petalOptions, scene);
        const petalMaterial = new BABYLON.StandardMaterial("petalMaterial", scene);
        petalMaterial.diffuseColor = color;
        petal0.material = petalMaterial;
        //petal x is in the middle of ellipsoid
        petal0.position.x = stem.position.x - 0.8;
        //stem y is in the middle of cylinder
        petal0.position.y = stem.position.y + stemOptions.height/2;
        petal0.position.z = stem.position.z - 0.3;
        petal0.rotation.y = degToRad(-15);
        

        const petal1 = petal0.clone("petal1");
        petal1.position.x = stem.position.x - 0.5;
        petal1.position.z = stem.position.z + 0.5;
        petal1.rotation.y = degToRad(55);

        const petal2 = petal0.clone("petal2");
        petal2.position.x = stem.position.x + 0.4;
        petal2.position.z = stem.position.z + 0.4;
        petal2.rotation.y = degToRad(125);

        const petal3 = petal0.clone("petal3");
        petal3.position.x = stem.position.x + 0.5;
        petal3.position.z = stem.position.z - 0.15;
        petal3.rotation.y = degToRad(190);

        const petal4 = petal0.clone("petal4");
        petal4.position.x = stem.position.x;
        petal4.position.z = stem.position.z - 0.52;
        petal4.rotation.y = degToRad(-95);

        stem.addChild(petal0);
        stem.addChild(petal1);
        stem.addChild(petal2);
        stem.addChild(petal3);
        stem.addChild(petal4);


        //leaves
        const leafOptions = {
            diameterX: 0.2,
            diameterY: 2.4,
            diameterZ: 1.3,
        }
        const leafBase = BABYLON.MeshBuilder.CreateCylinder("leafBase", {height: 0.5, diameter: 0.1}, scene);
        const leaf = BABYLON.MeshBuilder.CreateSphere("leaf", leafOptions, scene);
        leafBase.material = stemMaterial;
        leaf.material = stemMaterial;
        leaf.position.x = leafBase.position.x;
        leaf.position.y = leafBase.position.y + 1;
        leaf.position.z = leafBase.position.z;
        leafBase.addChild(leaf);
        
        leafBase.position.x = stem.position.x - 0.3;
        leafBase.position.y = stem.position.y;
        leafBase.position.z = stem.position.z;
        leafBase.rotation.z = degToRad(40);

        const leafBase2 = leafBase.clone("leafBase2");
        leafBase2.position.x = stem.position.x + 0.3;
        leafBase2.position.y = stem.position.y - 1;
        leafBase2.position.z = stem.position.z;
        leafBase2.rotation.z = degToRad(-50);


        stem.addChild(leafBase);
        stem.addChild(leafBase2);

        return stem;
}

const colorList = [
    new BABYLON.Color3.Red(),
    new BABYLON.Color3.Teal(),
    new BABYLON.Color3.Yellow(),
    new BABYLON.Color3.Purple(),
];

//todo: populate the ground
export const flowers = (scene, ground) => {
    for(let i = 0; i < 200; i++) {
        
        const planted = new flower(scene);
        planted.position.x = 1 - Math.random(1) * 254;
        planted.position.z = 36 + Math.random(1) * 210;
        //take into accord stem height and y is in the middle
        const gy = 2.5 + ground.getHeightAtCoordinates(planted.position.x, planted.position.z);
        planted.position.y = gy;
        planted.rotation.y = degToRad(24*i);
    }
    for(let i = 0; i < 200; i++) {
        const planted = new flower(scene);
        planted.position.x = -40 - Math.random(1) * 230;
        planted.position.z = -20 - Math.random(1) * 230;
        //take into accord stem height and y is in the middle
        const gy = 2.5 + ground.getHeightAtCoordinates(planted.position.x, planted.position.z);
        planted.position.y = gy;
        planted.rotation.y = degToRad(24*i);
    }

    for(let i = 0; i < 50; i++) {
        const planted = new flower(scene);
        planted.position.x = Math.random(1) * 230;
        planted.position.z = -20 - Math.random(1) * 130;
        //take into accord stem height and y is in the middle
        const gy = 2.5 + ground.getHeightAtCoordinates(planted.position.x, planted.position.z);
        planted.position.y = gy;
        planted.rotation.y = degToRad(24*i);
    }

}