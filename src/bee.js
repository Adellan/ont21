import * as BABYLON from 'babylonjs';
import * as materials from 'babylonjs-materials';
import { degToRad } from './assets/degToRad'

export const bee = (scene) => {

    //bee's middle part
    const body = BABYLON.MeshBuilder.CreateSphere("body", {diameter: 1});
    body.position.x = 0;
    body.position.y = 2;
    
    //const stripes = new BABYLON.StandardMaterial("stripes", scene);
    //stripes.diffuseTexture = new BABYLON.Texture("textures/stripe_ho.png", scene);
    //stripes.diffuseTexture.hasAlpha = true;
    //body.material = stripes;
    //rear.material = stripes;

    //Fur Material
	const furMaterial = new materials.FurMaterial("fur", scene);
	furMaterial.furLength = 0.1;
    furMaterial.furAngle = 1;
    furMaterial.furColor = new BABYLON.Color3(1, 1, 1);
    furMaterial.diffuseTexture = new BABYLON.Texture("textures/stripe_ho2.png", scene);
    furMaterial.furTexture = materials.FurMaterial.GenerateTexture("furTexture", scene);
    furMaterial.furSpacing = 0.5;

	body.material = furMaterial;
    body.rotation.x = degToRad(50);
    body.rotation.y = degToRad(50);
	
	const quality = 60;
	const shells = materials.FurMaterial.FurifyMesh(body, quality);

    //bee's butt
    const rear = BABYLON.MeshBuilder.CreateSphere("rear", {diameterX: 1, diameterY: 2, diameterZ: 1});
    rear.material = furMaterial;
    const shells2 = materials.FurMaterial.FurifyMesh(rear, quality);
    rear.rotation.x = degToRad(80);
    rear.rotation.y = degToRad(90);
    rear.position.x = body.position.x - 1.3;
    rear.position.y = body.position.y - 0.1;


    //bee's head
    const head = BABYLON.MeshBuilder.CreateSphere("head", {diameter: 1});
    const blackMat = new BABYLON.StandardMaterial("blackMat", scene);
    blackMat.diffuseColor = new BABYLON.Color3.Black();
    head.material = blackMat;
    head.position.x = body.position.x + 0.9;
    head.position.y = body.position.y - 0.2;


    //antennas
    const antennaVector = [
        new BABYLON.Vector3(0.5, 0, 0),
        new BABYLON.Vector3(0, 0.1, 0),
        new BABYLON.Vector3(-0.3, -0.2, 0)
];
    const antenna = BABYLON.MeshBuilder.CreateTube("tube", {path: antennaVector, radius: 0.05}, scene);
    antenna.material = blackMat;
    antenna.position.x = head.position.x + 0.5;
    antenna.position.y = head.position.y + 0.5;
    
    const antenna2 = antenna.clone("antenna2");
    antenna.rotation.y = degToRad(30);
    antenna2.rotation.y = degToRad(-30);
    antenna.position.z = head.position.z - 0.2;
    antenna2.position.z = head.position.z + 0.2;

    head.addChild(antenna);
    head.addChild(antenna2);
    

    //legs
    const legVector = [
        new BABYLON.Vector3(0.5, -0.6, 0),
        new BABYLON.Vector3(0, 0.1, 0),
        new BABYLON.Vector3(-0.6, 0, 0)
    ];
    const rearlegVector = [
        new BABYLON.Vector3(0.8, -0.8, -0.2),
        new BABYLON.Vector3(0.6, -0.6, 0),
        new BABYLON.Vector3(0, 0.1, 0),
        new BABYLON.Vector3(-0.8, 0, 0)
        
    ];
    const rearlegVector2 = [
        new BABYLON.Vector3(0.8, -0.8, 0.2),
        new BABYLON.Vector3(0.6, -0.6, 0),
        new BABYLON.Vector3(0, 0.1, 0),
        new BABYLON.Vector3(-0.8, 0, 0)
        
    ];
    const leg1 = BABYLON.MeshBuilder.CreateTube("tube", {path: legVector, radius: 0.1}, scene);
    const rearleg1 = BABYLON.MeshBuilder.CreateTube("tube", {path: rearlegVector, radius: 0.1}, scene);
    const rearleg2 = BABYLON.MeshBuilder.CreateTube("tube", {path: rearlegVector2, radius: 0.1}, scene);
    leg1.material = blackMat;
    rearleg1.material = blackMat;
    rearleg2.material = blackMat;
    const leg2 = leg1.clone("leg2");
    const leg3 = leg1.clone("leg3");
    const leg4 = leg1.clone("leg4");
    

    //front front
    leg1.rotation.y = degToRad(40);
    leg1.position.x = body.position.x + 0.8;
    leg1.position.y = body.position.y - 0.3;
    leg1.position.z = body.position.z - 0.7;

    //front back
    leg2.rotation.y = degToRad(-40);
    leg2.position.x = body.position.x + 0.8;
    leg2.position.y = body.position.y - 0.3;
    leg2.position.z = body.position.z + 0.7;

    //middle front
    leg3.rotation.y = degToRad(90);
    leg3.position.x = body.position.x + 0.1;
    leg3.position.y = body.position.y - 0.3;
    leg3.position.z = body.position.z - 1;

    //middle back
    leg4.rotation.y = degToRad(-90);
    leg4.position.x = body.position.x + 0.1;
    leg4.position.y = body.position.y - 0.3;
    leg4.position.z = body.position.z + 1;

    //rear front
    rearleg1.rotation.y = degToRad(120);
    rearleg1.position.x = body.position.x - 0.6;
    rearleg1.position.y = body.position.y - 0.3;
    rearleg1.position.z = body.position.z - 1.2;

    //rear back
    rearleg2.rotation.y = degToRad(-120);
    rearleg2.position.x = body.position.x - 0.6;
    rearleg2.position.y = body.position.y - 0.3;
    rearleg2.position.z = body.position.z + 1.2;

    //wings
    const wing = BABYLON.Mesh.CreateIcoSphere("icosphere", {radius:1, subdivisions: 16, radiusX: 0.4, radiusY: 1, radiusZ: 0.01});
    const wingcolor = new BABYLON.Color3(0, 2, 10);
    const wingMat = new BABYLON.StandardMaterial("wingMat", scene);
    wingMat.alpha = 0.5;
    wingMat.diffuseColor = wingcolor;
    wing.material = wingMat;
    const wing2 = wing.clone("wing2");
    wing.position.y = body.position.y + 1.3;
    wing.rotation.x = degToRad(45);
    wing.position.z = body.position.z + 1;

    wing2.position.y = body.position.y + 1.3;
    wing2.rotation.x = degToRad(-45);
    wing2.position.z = body.position.z - 1;



    //weird cloning happens if children are not added last
    body.addChild(rear);
    body.addChild(head);
    body.addChild(leg1);
    body.addChild(leg2);
    body.addChild(leg3);
    body.addChild(leg4);
    body.addChild(rearleg1);
    body.addChild(rearleg2);
    body.addChild(wing);
    body.addChild(wing2);

    scene.registerAfterRender(() => {
        body.rotate(BABYLON.Axis.Y, Math.PI/256, BABYLON.Space.WORLD);
    });

}