const THREE = require('../../../libs/three.js');
import {ThreeJSView} from './ThreeJSObject.js';

export class Floor extends ThreeJSView {

    /**
     * @param {Object3D} scene
     * @param {Object3D} camera
     */
    constructor(scene, camera) {
        let planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});

        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.rotation.y = 0;
        plane.rotation.z = 0;

        super(scene, camera, plane);
    }

}
