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
        console.error('Types internal error in addProperty() cannot resolve an object type');  
    }
}

Types = function () {
    var primitiveTypes = ['number', 'string', 'boolean']

    this.getPrimitiveTypes = function() {
        return primitiveTypes;
    }
}

/**
 * @description Determines if a value has type object
 * @param {*} value Any value
 * @returns true if a value is instance of 'object' and false otherwise
 */
Types.prototype.isObject = function (value) {
    if(value instanceof Object) {
        return true;
    }
    return false;
}

/**
 * @description Determines if a value is a function
 * @param {object} value Any value
 * @returns true if a value is a function and false otherwise
 */
Types.prototype.isFunction = function (object) {
    if(object instanceof Function) {
        return true;
    }
    return false;
}

/**
 * @description Determines if a value if not a function
 * @param {*} value Any value 
 * @returns true if a value is not a function and false otherwise
 */
Types.prototype.isNotFunction = function (value) {
    return !this.isFunction(value);
}

/**
 * @description Determines if a value is not a function and not undefined
 * @param {*} value Any value
 * @returns true if a value is not a function but it is defined and false otherwise
 */
Types.prototype.isNotFunctionButDefined = function (object) {
    return this.isNotFunction(object) && this.isDefined(object);
}

/**
 * 
 * @param {*} object 
 */
Types.prototype.isPrimitive = function (object) {
    if(this.primitiveTypes.indexOf(object) !== 1) {
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
    return !this.isArray(object);
}

Types.prototype.isNotArrayButDefined = function(object) {
    return this.isNotArray(object) && this.isDefined(object);
}

/**
 * @description Determines if the value is a number
 */
Types.prototype.isNumber = function (value) {
    if((typeof value === 'number' && Number.isFinite(value)) || value instanceof Number) {
        return true;
    }
    return false;
}

Types.prototype.isNotNumber = function (object) {
    return !this.isNumber(object);
}

Types.prototype.isDefined = function(object) {
    if(typeof object !== 'undefined') {
        return true;
    }
    return false;
}

Types.prototype.isNotNumberButDefined = function(object) {
    if(this.isNotNumber(object) && this.isDefined(object)) {
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

Types.prototype.isNotString = function(object) {
    return !this.isString(object);
}

Types.prototype.isNotStringButDefined = function(object) {
    return this.isNotString(object) && this.isDefined(object);
}

module.exports = Types