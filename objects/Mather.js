import {Graphics, Sprite, Text, TextStyle} from "pixi.js";
import {SuperContainer} from "./SuperContainer.js";
import {DisplayObjectPropertiesSetter} from "./DisplayObjectPropertiesSetter";

export class Mather {
    constructor(parent, textures, styles, screenSize = {width: 0, height: 0}) {
        this.parent = parent;
        this.textures = textures;
        this.styles = styles;

        this.properties = new DisplayObjectPropertiesSetter(this.parent, screenSize);
    }

    sprite({texture, ...properties}) {
        const displayObject = new Sprite(this.textures.get(texture));

        return this.addAndSetProperties(displayObject, properties);
    }

    getTexture(texture) {
        return this.textures.get(texture);
    }

    text({text = '', style = '', ...properties} = {}) {
        const displayObject = new Text(text, new TextStyle(this.styles.get(style)));

        displayObject.resolution = 2;

        return this.addAndSetProperties(displayObject, properties);
    }

    graphics(properties = {}) {
        const displayObject = new Graphics();

        return this.addAndSetProperties(displayObject, properties);
    }

    container(properties) {
        const displayObject = new SuperContainer();

        return this.addAndSetProperties(displayObject, properties);
    }

    displayObject(displayObjectConstructor, properties) {
        const displayObject = new displayObjectConstructor(properties);

        return this.addAndSetProperties(displayObject, properties);
    }

    addAndSetProperties(displayObject, properties) {
        this.addDisplayObject(displayObject, properties);

        this.properties.set(displayObject, properties);

        return displayObject;
    }

    addDisplayObject(displayObject, properties) {
        this.parent.addChild(displayObject);
    }
}
