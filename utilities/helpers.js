const toCamel = (string) => {
    return string.replace(/(_\w)/g, function(m){
        return m[1].toUpperCase();
    });
};

const toSnake = (string) => {
    return string.replace(/[\w]([A-Z])/g, (m) => {
        return m[0] + "_" + m[1];
    }).toLowerCase();
}

const isArray = function (arr) {
    return Array.isArray(arr);
};

const isObject = (obj) => {
    return obj === Object(obj) && !isArray(obj) && typeof obj !== 'function';
};

export const keysToCamelCase = (obj) => {
    if (isObject(obj)) {
        const newObj = {};
        Object.keys(obj).forEach((key) => {    
            newObj[toCamel(key)] = keysToCamelCase(obj[key]);
        });
        return newObj;
    } else if (isArray(obj)) {
        return obj.map((i) => keysToCamelCase(i));
    }
    return obj;
};

export const keysToSnakeCase = (obj) => {
    if (isObject(obj)) {
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            newObj[toSnake(key)] = keysToSnakeCase(obj[key]);
        });
        return newObj;
    } else if (isArray(obj)) {
        return obj.map((i) => keysToSnakeCase(i));
    }
    return obj;
};