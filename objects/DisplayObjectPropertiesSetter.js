export class DisplayObjectPropertiesSetter {
    constructor(parent, screenSize = {width: 0, height: 0}) {
        this.parent = parent;
        this.screenSize = screenSize;
    }

    set(displayObject, properties = {}) {
        const {x, y, position, anchor, scale, ...other} = properties;

        if (anchor && displayObject.anchor !== undefined) {
            this.setPointValue(displayObject.anchor, anchor);
        }

        if (scale) {
            this.setPointValue(displayObject.scale, scale);
        }

        if (position) {
            this.setPointValue(displayObject.position, position);
        } else {
            if (x !== undefined) {
                if (typeof x === 'string') {
                    displayObject.x = this.calculateValueExpression(x, displayObject.width, this.parent.width, this.screenSize.width);
                } else {
                    displayObject.x = x;
                }
            }

            if (y !== undefined) {
                if (typeof y === 'string') {
                    displayObject.y = this.calculateValueExpression(y, displayObject.height, this.parent.height, this.screenSize.height);
                } else {
                    displayObject.y = y;
                }
            }
        }

        other && Object.keys(other).forEach(key => {
            if (displayObject[key] !== undefined && other[key] !== undefined) {
                displayObject[key] = other[key];
            }
        });
    }

    calculateValueExpression(expression, displayObjectSize, parentSize, screenSize) {
        const [_, sign, relatively, value, percent] = /([-+]?)([sp]?)(\d+)(%?)/.exec(expression);
        let newValue = 0;
        let size = displayObjectSize;

        if (relatively) {
            size = relatively === 's' ? screenSize : parentSize;
        }

        const offset = size * parseFloat(value) / 100 ;

        newValue = sign === '-' ? -offset : offset;

        return newValue;
    }

    setPointValue(to, from) {
        if (from) {
            if (typeof from === 'number') {
                to.set(from);
            } else if (from instanceof Array && from.length === 2) {
                to.set(...from);
            } else {
                if (from.x !== undefined) {
                    to.x = from.x;
                }

                if (from.y !== undefined) {
                    to.y = from.y;
                }
            }
        }
    }
}
