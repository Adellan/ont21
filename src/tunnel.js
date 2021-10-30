import * as BABYLON from 'babylonjs';
import * as materials from 'babylonjs-materials';

//with examples from https://playground.babylonjs.com/#WW0ALQ#2
//and https://playground.babylonjs.com/#SGVUBC#10

const makeCurve = (range, nbSteps) => {
    const path = [];
    const stepSize = range / nbSteps;
    for (let i = -range / 2; i < range / 2; i += stepSize ) {
        path.push( new BABYLON.Vector3(5 * Math.sin(i * nbSteps / 100), i, 5 * Math.cos(i *nbSteps / 100)) );
    }
    return path;
};

export const tunnel = (scene, canvas) => {
const curve = makeCurve(60, 80);
let v3 = (x, y, z) => new BABYLON.Vector3(x,y,z);
let cpath = BABYLON.Curve3.CreateCubicBezier(v3(curve[0].x, curve[0].y, curve[0].z), v3(curve[1].x, curve[1].y, curve[1].z), v3(curve[2].x, curve[2].y, curve[2].z), v3(curve[3].x, curve[3].y, curve[3].z), 8);
for(let i = 4; i < 77; i++) {
    cpath = cpath.continue(BABYLON.Curve3.CreateCubicBezier(v3(curve[i-1].x, curve[i-1].y, curve[i-1].z), v3(curve[i].x, curve[i].y, curve[i].z), v3(curve[i+1].x, curve[i+1].y, curve[i+1].z), v3(curve[i+2].x, curve[i+2].y, curve[i+2].z)), 8);
}

 // Transform the curves into a proper Path3D object and get its orientation information
 const path3d = new BABYLON.Path3D(cpath.getPoints());
 const tangents = path3d.getTangents();;
 const binormals = path3d.getBinormals();
 const curvePath = path3d.getCurve();

const tube = BABYLON.MeshBuilder.CreateTube("tube", {path: curvePath, radius: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, cap: BABYLON.Mesh.CAP_START}, scene);

const tubeMaterial= new materials.GridMaterial("tubeMaterial", scene)
tubeMaterial.majorUnitFrequency = 8;
tubeMaterial.gridRatio = 0.3;
tubeMaterial.minorUnitVisibility = 0.45;
tubeMaterial.mainColor = new BABYLON.Color3(0, 0, 0);
tubeMaterial.lineColor = new BABYLON.Color3(1, 1, 0);
tube.material = tubeMaterial;

const camera = new BABYLON.ArcRotateCamera("camera", Math.PI/3,  Math.PI/4, 50, BABYLON.Vector3(), scene);
scene.activeCamera = camera;
camera.attachControl(canvas, true);

camera.fov = Math.PI/2;
camera.minZ = 0.01;
camera.maxZ = 25;
camera.updateUpVectorFromRotation = true;
camera.position.y = -1;

// Define the position and orientation animations that will be populated
    // according to the Path3D properties 
    const frameRate = 60;
    const posAnim = new BABYLON.Animation("cameraPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    const posKeys = [];
    const rotAnim = new BABYLON.Animation("cameraRot", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
    const rotKeys = [];
    for (let i = 0; i < 80; i++) {
        const position = curvePath[i];
        const tangent = tangents[i];
        const binormal = binormals[i];
        const rotation = new BABYLON.Quaternion(tangent, binormal);
        posKeys.push({frame: i * frameRate, value: position});
        rotKeys.push({frame: i * frameRate, value: rotation});
    }

    posAnim.setKeys(posKeys);
    rotAnim.setKeys(rotKeys);

    camera.animations.push(posAnim);
    camera.animations.push(rotAnim);
    //animation length at frameRate*60 (less than curve length of 80) cuts animation neatly where view back toward tunnel end
    scene.beginDirectAnimation(camera, camera.animations, 60, frameRate*60, false, 3);

    //todo
    //onAnimationEnd: () => void
    //defines the callback to call when an animation ends (will be called once per node)

}