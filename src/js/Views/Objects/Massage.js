const THREE = require('../../../libs/three.js');
import {ThreeJSObject} from './ThreeJSObject.js';

export class Massage extends ThreeJSObject {

    /**
     * @param {Object3D} scene
     * @param {Object3D} camera
     * @param {Floor} floor
     */
    constructor(scene, camera, floor) {
        let mesh = new THREE.Object3D();
        mesh.name = "massage";

        //stool
        let material = new THREE.MeshLambertMaterial({color: 0xB87688}),
            geometryLeg1 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50),
            geometryLeg2 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50),
            geometryLeg3 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50),
            geometryLeg4 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50);

        let leg1 = new THREE.Mesh(geometryLeg1, material);
        leg1.position.set(0, 0, 0);
        let leg2 = new THREE.Mesh(geometryLeg2, material);
        leg2.position.set(5, 0, 0);
        let leg3 = new THREE.Mesh(geometryLeg3, material);
        leg3.position.set(5, 0, 12);
        let leg4 = new THREE.Mesh(geometryLeg4, material);
        leg4.position.set(0, 0, 12);

        let geometryBottom = new THREE.BoxGeometry(6, 1, 13, 50, 50, 50);
        let bottom = new THREE.Mesh(geometryBottom, material);
        bottom.position.set(2.5, 2.5, 6);

        let materialPillow = new THREE.MeshLambertMaterial({color: 0xd093a3});
        let geometryPillow = new THREE.BoxGeometry(4, 1, 4, 50, 50, 50);
        let back = new THREE.Mesh(geometryPillow, materialPillow);
        back.position.set(2.5, 3, 9);

        mesh.add(leg1);
        mesh.add(leg2);
        mesh.add(leg3);
        mesh.add(leg4);
        mesh.add(bottom);
        mesh.add(back);

        super(scene, camera, mesh);

        this.floor = floor;
        this.object = mesh;

    }

    /**
     * @param {THREE.Color} color
     */
    setColor(color) {
        this.object.material.color = color;
    }
}