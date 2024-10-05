import {container} from "pixi.js";
import {mather} from "./mather.js";

export class supercontainer extends container {
    static resourcesgetter = (name) => {};
    static stylesgetter = (name) => {};

    constructor() {
        super();

        this.create = new mather(this, {get: supercontainer.resourcesgetter}, {get: supercontainer.stylesgetter});
    }
}
