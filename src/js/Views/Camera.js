const THREE = require('../../libs/three.js');

export class Camera {

    /**
     * @param look
     * @returns {Camera}
     */
    constructor(look) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = -40;
        this.camera.position.y = 50;
        this.camera.position.z = 40;
        this.camera.lookAt(look);

        this.keys = [];

        window.addEventListener('wheel', this.farCamera.bind(this));
        window.addEventListener('keypress', this.flyCamera.bind(this));
        window.addEventListener('keyup', this.clearKeyStack.bind(this));

        return this;
    }

    getObject() {
        return this.camera;
    }

    /**
     * @param event
     */
    flyCamera(event) {

        let codeS = 115,
            codeA = 97,
            codeW = 119,
            codeD = 100;

        let key = event.which;

        if (this.keys.indexOf(key) < 0) {
            this.keys.push(key);
        }

        if (this.keys.length > 1) {

            if (this.keys.indexOf(codeW) >= 0 && this.keys.indexOf(codeD) >= 0) {
                this.camera.position.x += 2;
            } else if (this.keys.indexOf(codeD) >= 0 && this.keys.indexOf(codeS) >= 0) {
                this.camera.position.z += 2;
            } else if (this.keys.indexOf(codeS) >= 0 && this.keys.indexOf(codeA) >= 0) {
                this.camera.position.x -= 2;
            } else if (this.keys.indexOf(codeA) >= 0 && this.keys.indexOf(codeW) >= 0) {
                this.camera.position.z -= 2;
            }

        } else {

            switch (event.key) {

                case 'a':
                    this.camera.position.x -= 2;
                    this.camera.position.z -= 2;
                    break;
                case 'w':
                    this.camera.position.x += 2;
                    this.camera.position.z -= 2;
                    break;
                case 's':
                    this.camera.position.x -= 2;
                    this.camera.position.z += 2;
                    break;
                case 'd':
                    this.camera.position.x += 2;
                    this.camera.position.z += 2;

                    break;
            }
        }
    }

    /**
     * @param event
     */
    farCamera(event) {
        event.preventDefault();
        event.stopPropagation();


        this.camera.position.x -= event.wheelDelta / 300;
        this.camera.position.y += event.wheelDelta / 300;
        this.camera.position.z += event.wheelDelta / 300;
    }

    clearKeyStack() {
        this.keys = [];
    }

}