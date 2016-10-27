const THREE = require('../../libs/three.js');

/**
 * @property {Number} width - Ширина экрана
 * @property {Number} height - Высота экрана
 * @property {Number} clearColor - цвет экрана
 */
export class Scene {

    /**
     * @returns {Scene}
     */
    constructor() {

        this.scene = new THREE.Scene();

        let spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(-60, 40, 60);
        this.scene.add(spotLight);

        return this;
    }

    /**
     * @param {ThreeJSView} object
     */
    add(object) {
        this.scene.add(object.getObject());
    }

    /**
     * @returns {Vector3}
     */
    getPosition() {
        return this.scene.position;
    }

    /**
     * @returns {THREE.Scene}
     */
    getObject() {
        return this.scene;
    }

}