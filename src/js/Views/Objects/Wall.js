const THREE = require('../../../libs/three.js');
import {ThreeJSView} from './ThreeJSObject.js';

export class Wall extends ThreeJSView {

    /**
     * @param {Object3D} scene
     * @param {Object3D} camera
     * @param {Floor} floor
     */
    constructor(scene, camera, floor) {
        let mesh = new THREE.Object3D();
        mesh.name = "wall";

        let bottomGeom = new THREE.BoxGeometry(100, 2, 2, 50, 50, 50),
            bottomMat = new THREE.MeshLambertMaterial({color: 0xCDB7B5}),
            bottom = new THREE.Mesh(bottomGeom, bottomMat);

        bottom.position.set(0, 1, 49);

        let topGeom = new THREE.BoxGeometry(2, 2, 100, 50, 50, 50),
            topMat = new THREE.MeshLambertMaterial({color: 0xCDB7B5}),
            top = new THREE.Mesh(topGeom, topMat);

        top.position.set(-49, 1, 0);

        let leftGeom = new THREE.BoxGeometry(100, 15, 2, 50, 50, 50),
            leftMat = new THREE.MeshLambertMaterial({color: 0xCDB7B5}),
            left = new THREE.Mesh(leftGeom, leftMat);

        left.position.set(0, 7.5, -49);

        let right1Geom = new THREE.BoxGeometry(2, 15, 60, 50, 50, 50),
            right1Mat = new THREE.MeshLambertMaterial({color: 0xCDB7B5}),
            right1 = new THREE.Mesh(right1Geom, right1Mat);

        right1.position.set(49, 7.5, -20);

        let right2Geom = new THREE.BoxGeometry(2, 15, 30, 50, 50, 50),
            right2Mat = new THREE.MeshLambertMaterial({color: 0xCDB7B5}),
            right2 = new THREE.Mesh(right2Geom, right2Mat);

        right2.position.set(49, 7.5, 35);

        let plankaGeom = new THREE.BoxGeometry(2, 2, 100, 50, 50, 50),
            plankaMat = new THREE.MeshLambertMaterial({color: 0xCDB7B5}),
            planka = new THREE.Mesh(plankaGeom, plankaMat);

        planka.position.set(49, 14, 0);

        let window1Geom = new THREE.BoxGeometry(12, 9, 2, 50, 50, 50),
            window1Mat = new THREE.MeshLambertMaterial({color: 0xC4E6FC}),
            window1 = new THREE.Mesh(window1Geom, window1Mat);

        window1.position.set(0, 8, -48.5);

        let window2Geom = new THREE.BoxGeometry(12, 9, 2, 50, 50, 50),
            window2Mat = new THREE.MeshLambertMaterial({color: 0xC4E6FC}),
            window2 = new THREE.Mesh(window2Geom, window2Mat);

        window2.position.set(-30, 8, -48.5);

        let window3Geom = new THREE.BoxGeometry(2, 9, 12, 50, 50, 50),
            window3Mat = new THREE.MeshLambertMaterial({color: 0xC4E6FC}),
            window3 = new THREE.Mesh(window3Geom, window3Mat);

        window3.position.set(48.5, 8, -20);


        mesh.add(bottom);
        mesh.add(top);
        mesh.add(left);
        mesh.add(right1);
        mesh.add(right2);
        mesh.add(planka);
        mesh.add(window1);
        mesh.add(window2);
        mesh.add(window3);
        super(scene, camera, mesh);

        this.floor = floor;
        this.object = mesh;

    }

}