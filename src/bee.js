import * as BABYLON from 'babylonjs';
import * as foo from 'babylonjs-materials';
import { degToRad } from './assets/degToRad'

export const bee = (scene) => {
    //tutustu translationiin, tää ei käsin tuu menemään
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {slice: 0.8, diameter: 1});
    sphere.rotation.x = degToRad(90);
    sphere.rotation.y = degToRad(90);
    sphere.position.x = 0;
    sphere.position.y = 2;

    const perse = BABYLON.MeshBuilder.CreateSphere("perse", {slice: 0.8, diameterX: 1, diameterY: 2, diameterZ: 1});
    perse.rotation.x = degToRad(-90);
    perse.rotation.y = degToRad(90);
    perse.position.x = sphere.position.x - 1;
    perse.position.y = sphere.position.y;
    //perse.position.z = sphere.position.z-1;
    //perse.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
    sphere.addChild(perse);

    //fur
    const furMaterial_T = new foo.FurMaterial("furT", scene);
	furMaterial_T.highLevelFur = false;
	furMaterial_T.furLength = 0.1; // Represents the maximum length of the fur, which is then adjusted randomly. Default value is 1.
	furMaterial_T.furAngle = 0; 
    // Represents the angle the fur lies on the mesh from 0 to Math.PI/2. The default angle of 0 gives fur sticking straight up and PI/2 lies along the mesh.
	furMaterial_T.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/8/8a/Leopard_fur.JPG", scene);

	sphere.material = furMaterial_T;
    
    scene.registerAfterRender(() => {
        sphere.rotate(BABYLON.Axis.Y, Math.PI/256, BABYLON.Space.WORLD);
    });

}