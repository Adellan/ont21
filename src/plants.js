import * as BABYLON from 'babylonjs';

//probably unused file

export const trees = (scene) => {
    const spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "https://www.babylonjs-playground.com/textures/palm.png", 2000, {width: 512, height: 1024}, scene);
    for (let i = 0; i < 20; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random(1) * (-12);
        tree.position.z = Math.random(1) * 24 - 12;
        tree.position.y = 0.5;
    }
    for (let i = 0; i < 40; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random(1) * (12);
        tree.position.z = Math.random(1) * 24 - 12;
        tree.position.y = 0.5;
    }
}