const THREE = require('../../../libs/three.js');
import {ThreeJSView} from './ThreeJSObject.js';
import {BOTTLES_COLORS} from '../../enum.js';

export class Hairdresser extends ThreeJSView {

    /**
     * @param {Object3D} scene
     * @param {Object3D} camera
     * @param {Floor} floor
     */
    constructor(scene, camera, floor) {
        let mesh = new THREE.Object3D();
        mesh.name = "manicure";

        //stool
        let material = new THREE.MeshLambertMaterial({color: 0xFFD800}),
            geometryLeg1 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50),
            geometryLeg2 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50),
            geometryLeg3 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50),
            geometryLeg4 = new THREE.BoxGeometry(1, 5, 1, 50, 50, 50);

        let leg1 = new THREE.Mesh(geometryLeg1, material);
        leg1.position.set(0, 0, 0);
        let leg2 = new THREE.Mesh(geometryLeg2, material);
        leg2.position.set(4, 0, 0);
        let leg3 = new THREE.Mesh(geometryLeg3, material);
        leg3.position.set(4, 0, 4);
        let leg4 = new THREE.Mesh(geometryLeg4, material);
        leg4.position.set(0, 0, 4);

        let geometryBottom = new THREE.BoxGeometry(5, 1, 5, 50, 50, 50);
        let bottom = new THREE.Mesh(geometryBottom, material);
        bottom.position.set(2, 2.5, 2);

        let geometryBack = new THREE.BoxGeometry(1, 5, 5, 50, 50, 50);
        let back = new THREE.Mesh(geometryBack, material);
        back.position.set(4, 5, 2);

        mesh.add(leg1);
        mesh.add(leg2);
        mesh.add(leg3);
        mesh.add(leg4);
        mesh.add(bottom);
        mesh.add(back);

        //procedure
        let geometryTable = new THREE.BoxGeometry(5, 6, 7, 50, 50, 50);
        let table = new THREE.Mesh(geometryTable, material);
        table.position.set(-7, 3, 2.5);

        let geometryMirror = new THREE.BoxGeometry(1, 6, 7, 50, 50, 50);
        let mirror = new THREE.Mesh(geometryMirror, material);
        mirror.position.set(-9, 9, 2.5);

        for (let i = 0; i < 10; i++) {
            let height = Math.random() + 2 * 0.5,
                materialBottle = new THREE.MeshLambertMaterial({color: BOTTLES_COLORS[i]}),
                geometryBottle = new THREE.BoxGeometry(Math.random() * 0.5 + 0.5, height, Math.random() * 0.5 + 0.5, 50, 50, 50),
                bottle = new THREE.Mesh(geometryBottle, materialBottle);

            bottle.position.set(Math.random() * (-4) - 5, 6 + height / 2, Math.random() * 5.5 - 0.5);

            mesh.add(bottle);
        }
        mesh.add(table);
        mesh.add(mirror);

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
