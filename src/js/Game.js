const THREE = require('../libs/three.js');
import {Scene} from './Views/Scene.js';
import {Camera} from './Views/Camera.js';
import {Floor} from './Views/Objects/Floor.js';
import {Wall} from './Views/Objects/Wall';
import {Hairdresser} from './Views/Objects/Hairdresser.js';
import {Massage} from './Views/Objects/Massage.js';
import {Chair} from './Views/Objects/Chair.js';
import {Visitor} from './Views/Objects/Visitor.js'
import {DEFAULT_CLEAR_COLOR} from './enum.js';

export class Game {

    constructor({width, height, clearColor}) {
        width = width || window.innerWidth; //TODO: document.body.clientWidth (так вроде точнее)
        height = height || window.innerHeight;
        clearColor = clearColor || DEFAULT_CLEAR_COLOR;

        this.scene = new Scene();

        this.a = true;

        let position = this.scene.getPosition();
        this.camera = new Camera(position);

        this.floor = new Floor(this.scene, this.camera);
        this.floor.castShadow = true;
        this.scene.add(this.floor);

        //Procedures
        this.makeUp = new Hairdresser(this.scene, this.camera, this.floor);
        this.makeUp.setPosition({x: -35, y: 2, z: -30});

        //Procedures
        this.makeUp2 = new Hairdresser(this.scene, this.camera, this.floor);
        this.makeUp2.setPosition({x: -35, y: 2, z: 30});


        this.massage = new Massage(this.scene, this.camera, this.floor);
        this.massage.setPosition({x: -40, y: 2, z: 0});

        //chair
        this.chair = new Chair(this.scene, this.camera, this.floor);
        this.chair.setPosition({x: 30, y: 5, z: -30});

        //wall
        let wall = new Wall(this.scene, this.camera, this.floor);

        this.scene.add(wall);
        this.scene.add(this.makeUp);
        this.scene.add(this.makeUp2);
        this.scene.add(this.massage);
        this.scene.add(this.chair);

        setInterval(() => {
            let woman = new Visitor(this.scene, this.camera, this.floor);
            woman.setTexture('../json/Models/Woman.json').then(() => {
                woman.setPosition({
                    x: Math.ceil(Math.random() * 10 + 40),
                    y: -5,
                    z: Math.ceil(Math.random() * 10 + 20)
                });
                woman.setColor({r: 0, g: 1, b: 0});
                this.scene.add(woman);

                woman.walk(0, 0)
                    .then(() => {
                        return woman.walk(Math.ceil(Math.random() * 15 + 25), Math.ceil(Math.random() * 20 - 25));
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            woman.bored()
                                .then(() => {
                                    return woman.walk(49, 14);
                                })
                                .then(() => {
                                    woman.remove();
                                    $('.block.poor').html(+($('.block.poor').html()) + 1);
                                });

                            woman.turnOnDrag();

                            let clear = setInterval(() => {
                                let massagePos = this.massage.getObject().position,
                                    makeUp1Pos = this.makeUp.getObject().position,
                                    makeUp2Pos = this.makeUp2.getObject().position,
                                    womanPos = woman.getObject().position;

                                if ((Math.abs(womanPos.x - makeUp1Pos.x) < 10 &&
                                    Math.abs(womanPos.z - makeUp1Pos.z) < 10) ||

                                    (Math.abs(womanPos.x - massagePos.x) < 10 &&
                                    Math.abs(womanPos.z - massagePos.z) < 10) ||

                                    (Math.abs(womanPos.x - makeUp2Pos.x) < 10 &&
                                    Math.abs(womanPos.z - makeUp2Pos.z) < 10)) {

                                    woman.turnOffDrag();
                                    clearInterval(clear);
                                    resolve(woman.rejoice());
                                }
                            }, 7);
                        })
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            resolve(woman.walk(46, 14));
                        })
                    })
                    .then(() => {
                        woman.remove();
                        $('.block.happy').html(+($('.block.happy').html()) + 1);
                    })
            });
        }, 3000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(clearColor, 1.0);
        this.renderer.setSize(width, height);
        this.renderer.shadowMapEnabled = true;

        //append
        $("#game").append(this.renderer.domElement);

        this.animate();
    }

    animate() {
        let scene = this.scene.getObject(),
            camera = this.camera.getObject();

        requestAnimationFrame(this.animate.bind(this));

        this.renderer.render(scene, camera);
    }
}
