const THREE = require('../../../libs/three.js');
import {ThreeJSObject} from './ThreeJSObject.js';

export class Chair extends ThreeJSObject {

    /**
     * @param {Object3D} scene
     * @param {Object3D} camera
     * @param {Floor} floor
     */
    constructor(scene, camera, floor) {
        let mesh = new THREE.Object3D();
        mesh.name = "chair";

        let bottomGeom = new THREE.BoxGeometry(10, 3, 20, 50, 50, 50),
            bottomMat = new THREE.MeshLambertMaterial({color: 0xff0000}),
            bottom = new THREE.Mesh(bottomGeom, bottomMat);

        bottom.position.set(0,-3.5,0);

        let backGeom = new THREE.BoxGeometry(3, 10, 20, 50, 50, 50),
            backMat = new THREE.MeshLambertMaterial({color: 0xff0000}),
            back = new THREE.Mesh(backGeom, backMat);

        back.position.set(5,0,0);

        let leftGeom = new THREE.BoxGeometry(10, 6, 2, 50, 50, 50),
            leftMat = new THREE.MeshLambertMaterial({color: 0xff0000}),
            left = new THREE.Mesh(leftGeom, leftMat);

        left.position.set(0,0,-10);

        let rightGeom = new THREE.BoxGeometry(10, 6, 2, 50, 50, 50),
            rightMat = new THREE.MeshLambertMaterial({color: 0xff0000}),
            right = new THREE.Mesh(rightGeom, rightMat);

        right.position.set(0,0,10);

        mesh.add(bottom);
        mesh.add(back);
        mesh.add(left);
        mesh.add(right);

        super(scene, camera, mesh);

        this.floor = floor;
        this.object = mesh;

    }

}
