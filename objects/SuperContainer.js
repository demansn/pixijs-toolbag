import {Container} from "pixi.js";
import {Mather} from "./Mather.js";

export class SuperContainer extends Container {
    static resourceGetter = (name) => {};
    static stylesGetter = (name) => {};
    static screenSize = {width: 0, height: 0};

    constructor() {
        super();

        this.create = new Mather(this, {get: SuperContainer.resourceGetter}, {get: SuperContainer.stylesGetter}, SuperContainer.screenSize);
    }
}
