import * as BABYLON from 'babylonjs';
import { addVector } from './assets/addVector';

export const uniCam = (scene) => {
    const cam = new BABYLON.ArcRotateCamera("Camera", Math.PI/2,  Math.PI/2, 30, BABYLON.Vector3(0, 50, 0), scene);
    //cam.fov = Math.PI/2;
    //cam.minZ = 0.01;
    //cam.maxZ = 25;
    //cam.updateUpVectorFromRotation = true;

    cam.position.y = 30;
	cam.position.x = -2;
    cam.position.z = -3;

    let pathGroup = new BABYLON.Mesh("pathGroup");
    //start, control1, control2, end, points on curve
    //x, y, z -> here -x = right and -z = toward cam/"down"
    let curve = BABYLON.Curve3.CreateCubicBezier(addVector(-5,26,10), addVector(-28,25,22), addVector(-45,26,33), addVector(-60,30,45), 8);
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-60,30,45), addVector(-70,40,40), addVector(-86,36,50), addVector(-135,40,55), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(160,40,60), addVector(120,45,20), addVector(117,40,0), addVector(200,45,-20), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-125,32,90), addVector(-100,50,70), addVector(-80,40,-40), addVector(-25,35,-10), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-25,15,-10), addVector(-16,20,-20), addVector(80,15,-40), addVector(10,10,60), 8));
    curve = curve.continue(BABYLON.Curve3.CreateCubicBezier(addVector(-10,50,-20), addVector(-20,40,-10), addVector(-30,40,50), addVector(-51,28,44), 8));

    // Transform the curves into a proper Path3D object and get its orientation information
    var path3d = new BABYLON.Path3D(curve.getPoints());
    var tangents = path3d.getTangents();
    var normals = path3d.getNormals();
    var binormals = path3d.getBinormals();
    var curvePath = path3d.getCurve();


    // visualisation
    for(var p = 0; p < curvePath.length; p++) {
        var tg = BABYLON.Mesh.CreateLines('tg', [ curvePath[p], curvePath[p].add(tangents[p]) ], scene);
        tg.color = BABYLON.Color3.Red();
        tg.parent = pathGroup;
        var no = BABYLON.Mesh.CreateLines('no', [ curvePath[p], curvePath[p].add(normals[p]) ], scene);
        no.color = BABYLON.Color3.Blue();
        no.parent = pathGroup;
        var bi = BABYLON.Mesh.CreateLines('bi', [ curvePath[p], curvePath[p].add(binormals[p]) ], scene);
        bi.color = BABYLON.Color3.Green();
        bi.parent = pathGroup;
    }


    // Define the position and orientation animations that will be populated
    // according to the Path3D properties 
    const frameRate = 60;
    const posAnim = new BABYLON.Animation("cameraPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    const posKeys = [];
    const rotAnim = new BABYLON.Animation("cameraRot", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
    const rotKeys = [];

    for (let i = 0; i < curvePath.length; i++) {
        const position = curvePath[i];
        const tangent = tangents[i];
        const binormal = binormals[i];

        const rotation = BABYLON.Quaternion(tangent, binormal);

        posKeys.push({frame: i * frameRate, value: position});
        rotKeys.push({frame: i * frameRate, value: rotation});
        
    }

    posAnim.setKeys(posKeys);
    rotAnim.setKeys(rotKeys);

    cam.animations.push(posAnim);
    cam.animations.push(rotAnim);

    scene.beginDirectAnimation(cam, 0, frameRate*curvePath.length, true);

    return cam;

}