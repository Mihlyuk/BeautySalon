const THREE = require('../../../libs/three.js');

export class ThreeJSView {

    /**
     * @param {Scene} scene
     * @param {Camera} camera
     * @param {THREE.Mesh} object
     */
    constructor(scene, camera, object) {
        this.scene = scene;
        this.camera = camera;
        this.object = object;
    }

    /**
     * @returns {THREE.Mesh}
     */
    getObject() {
        return this.object;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    setPosition({x, y, z}) {
        this.object.position.x = x;
        this.object.position.y = y;
        this.object.position.z = z;

    }

    /**
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     */
    setColor({r, g, b}) {
        this.object.material.color.setRGB(r, g, b);
    }

    /**
     * @param {String} event
     * @param {Function} callback
     */
    on(event, callback) {
        if (!this.eventStack) {
            this.eventStack = [];
        }

        this.off(event, callback);

        let func = this.eventFunction.bind(this, {isAll: true, callback: callback});

        this.eventStack.push({func, event, callback: callback});

        window.addEventListener(event, func);
    }

    /**
     * @param {String} event
     * @param {Function} callback
     */
    onAll(event, callback) {
        if (!this.eventStack) {
            this.eventStack = [];
        }

        this.off(event, callback);

        let func = this.eventFunction.bind(this, {isAll: true, callback: callback});

        this.eventStack.push({func, event, callback: callback});

        window.addEventListener(event, func);
    }

    /**
     * @param {Event} event
     *
     * @returns {{}}
     */
    findIntersects(event) {
        let mouse = new THREE.Vector2(),
            camera = this.camera.getObject(),
            scene = this.scene.getObject(),
            raycaster = new THREE.Raycaster();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        return raycaster.intersectObjects(scene.children, true);
    }

    /**
     * @param {Event} event
     * @param {boolean} isAll
     * @param {Function} callback
     */
    eventFunction({isAll, callback}, event) {
        event.stopPropagation();
        event.preventDefault();

        let intersects = this.findIntersects(event);

        intersects = isAll ? intersects : [intersects[0]];

        intersects.forEach((intersect) => {
            if (intersect.object.id === this.object.id) {
                event.point = intersect.point;
                event.object = intersect.object;
                callback(event);
            }
        });
    }

    /**
     * @param {String} event
     * @param {Function} callback
     */
    off(event, callback) {

        if (this.eventStack) {
            this.eventStack.forEach((item) => {
                if (event === item.event && ('bound ' + callback.name === item.callback.name || callback.name === item.callback.name)) {
                    window.removeEventListener(event, item.func);
                }
            });
        }
    }

    remove() {
        let scene = this.scene.getObject();

        scene.remove(this.object);
        delete this;
    }
}