const THREE = require('../../../libs/three.js');
import {ThreeJSView} from './ThreeJSObject.js';

export class RoundWoman extends ThreeJSView {

    /**
     * @param {Object3D} scene
     * @param {Object3D} camera
     * @param {Floor} floor
     */
    constructor(scene, camera, floor) {
        let mesh = new THREE.Mesh();

        super(scene, camera, mesh);

        this.floor = floor;
    }

    /**
     * @param {String} path
     *
     * @returns {Promise}
     */
    setTexture(path) {
        return new Promise((resolve, reject) => {
            let loader = new THREE.JSONLoader();

            loader.load(path, (geometry, material) => {
                this.object = new THREE.Mesh(geometry, material);
                this.object.scale.set(2, 2, 2);
                resolve(this);
            });
        });
    }

    turnOnDrag() {
        this.on('mousedown', this.onMouseDown.bind(this));
    }

    turnOffDrag() {
        this.off('mousedown', this.onMouseDown.bind(this));
    }

    onMouseDown() {
        this.floor.onAll('mousemove', this.moveAt.bind(this));
        this.floor.onAll('mouseup', removeEvents.bind(this));

        function removeEvents() {
            this.floor.off('mousemove', this.moveAt);
            this.floor.off('mouseup', removeEvents);
        }

    }

    /**
     * @param {{}} event
     */
    moveAt(event) {
        this.object.position.x = event.point.x;
        this.object.position.z = event.point.z;
    }

    bored() {
        return new Promise((resolve, reject) => {
            if (this.isRejoice) {
                clearInterval(this.isRejoice);
            }

            this.isBored = setInterval(() => {
                let colorR = this.getObject().material.color.r,
                    colorG = this.getObject().material.color.g,
                    colorB = this.getObject().material.color.b;

                if (colorR < 1) {
                    this.setColor({r: colorR + 1 / 255, g: colorG, b: colorB});
                } else if (colorG > 0) {
                    this.setColor({r: colorR, g: colorG - 1 / 255, b: colorB});
                } else {
                    clearInterval(this.isBored);
                    resolve();
                }

            }, 25);
        })

    }

    rejoice() {
        return new Promise((resolve, reject) => {
            if (this.isBored) {
                clearInterval(this.isBored);
            }

            this.isRejoice = setInterval(() => {
                let colorR = this.getObject().material.color.r,
                    colorG = this.getObject().material.color.g,
                    colorB = this.getObject().material.color.b;

                if (colorG < 1) {
                    this.setColor({r: colorR, g: colorG + 1 / 255, b: colorB});
                } else if (colorR > 0) {
                    this.setColor({r: colorR - 1 / 255, g: colorG, b: colorB});
                } else {
                    this.setColor({r: 7 / 255, g: 240 / 255, b: 255 / 255});
                    clearInterval(this.isRejoice);
                    resolve();
                }

            }, 30);
        });
    }

    /**
     * @param {number} stepX
     * @param {number} stepY
     *
     * @returns {Promise}
     */
    walk(stepX, stepY) {
        return new Promise((resolve, reject) => {
            let key = setInterval(() => {
                let posX = this.getObject().position.x;
                let posY = this.getObject().position.z;

                if (posX == stepX && posY == stepY) {
                    clearInterval(key);
                    resolve();
                }

                posX = stepX == posX ? stepX :
                    stepX < posX ? posX - 1 : posX + 1;

                posY = stepY == posY ? stepY :
                    stepY < posY ? posY - 1 : posY + 1;

                this.getObject().position.x = Math.ceil(posX);
                this.getObject().position.z = Math.ceil(posY);
            }, 60);
        })
    }

}
