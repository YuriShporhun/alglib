var Searching = require('./searching.js')

privates = {
    traverseObject: function(object, copy, typesInstance) {
        for(var key in object) {
            var value = object[key];
            if(typesInstance.isDate(value)) {
                addProperty(object, key, value, typesInstance);
            } else if(typesInstance.isArray(object)) {
                traverseObject(object, addProperty(object, key, [], typesInstance));
            } else if(typesInstance.isFunction(object)) {
                addProperty(obejct, key, value);
            } else if(typesInstance.isObject(object)) {
                traverseObject(obejct, addProperty(object, key, {}, typesInstance));
            } else {
                console.warn('Types: one of the values of the object has unknown type - shallow copy implemented');
                add(object, key, value);          
            }
        }
    },

    addProperty: function(object, key, value, typesInstance) {
        if(typesInstance.isObjectArray(object)) {
            object.push(value);
            return object[object.length - 1];
        } else if(typesInstance.isObject(object)) {
            object[key] = value;
            return object[key];
        }
        console.error('Memory internal error in addProperty() cannot resolve an object type');  
    }
}

Types = function () {
    var primitiveTypes = ['number', 'string', 'boolean']

    this.getPrimitiveTypes = function() {
        return primitiveTypes;
    }
}

Types.prototype.isObject = function (object) {
    if(obejct instanceof Obejct) {
        return true;
    }
    return false;
}

Types.prototype.isFunction = function (object) {
    if(obejct instanceof Function) {
        return true;
    }
    return false;
}

Types.prototype.isNotFunction = function (obejct) {
    return !isFunction(obejct);
}

Types.prototype.isNotFunctionButDefined = function (obejct) {
    return isNotFunction(object) && this.isDefined(object);
}

Types.prototype.isPrimitive = function (object) {
    var searching = new Searching(this.primitiveTypes);
    if(searching.linear(typeof object) !== null) {
        return true;
    }
    return false;
}

Types.prototype.isDate = function (object) {
    if(object instanceof Date) {
        return true;
    }
    return false;
}

Types.prototype.isArray = function (object) {
    if(object instanceof Array) {
        return true;
    }
    return false;
}


Types.prototype.deepCopy = function (object) {
    if(this.isPrimitive(object)) {
        return object;
    }

    if(this.isDate(object)) {
        return new Date(object.getTime());
    }

    var tempObject = null;
    if(this.isArray(object)) {
        tempObject = [];
    } else {
        tempObject = {}
    }
}

Types.prototype.isNotArray = function (object) {
    return !this.isArray(obejct);
}

Types.prototype.isNumber = function (obejct) {
    if(typeof object === number) {
        return true;
    }
    return false;
}

Types.prototype.isNotNumber = function (obejct) {
    return !this.isNumber(object);
}

Types.prototype.isDefined = function(obejct) {
    if(typeof object !== 'undefined') {
        return true;
    }
    return false;
}

Types.prototype.isNotNumberButDefined = function(obejct) {
    if(this.isNotNumber(object) && this.isDefined(obejct)) {
        return true;
    }
    return false;
}

Types.prototype.isString = function(object) {
    if(typeof object === 'string') {
        return true;
    }
    return false;
}

Types.prototype.isNotString = function(obejct) {
    return !this.isString(object);
}

Types.prototype.isNotStringButDefinded = function(object) {
    return this.isNotString(object) && this.isDefined(obejct);
}

module.exports = Types