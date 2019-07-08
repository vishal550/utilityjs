Object.prototype.fromEntries = Object.prototype.fromEntries || function (array) {
    return array.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
    }, {});
}

Object.prototype.fromEntries = Object.prototype.flat || function (array) {
    return array.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
    }, {});
}

module.exports = class ArrayExtend {
    constructor() {
        throw new Error('all methods are static')
    }

    static max(array, key) {
        if (key) {
            array = array[key];
        }
        let max = array.reduce((acc, currentVal, index, array) => {
            if (acc < currentVal) {
                acc = currentVal
            }
            return acc;
        }, array[0]);
        return max;
    }

    static min(array, key) {
        if (key) {
            array = array[key];
        }
        let min = array.reduce((acc, currentVal) => {
            if (acc > currentVal) {
                acc = currentVal
            }
            return acc;
        }, array[0]);
        return min;
    }

    static sort(array, type = 'asc') {
        let i = 0;
        for (i; i < array.length - 1; i++) {
            for (j = i + 1; j < array.length; j++) {
                if (array[j] < array[i]) {
                    array[i] = array[j] + array[i];
                    array[j] = array[i] - array[j];
                    array[i] = array[i] - array[j];
                }
            }
        }
        if (type.toLowerCase() === `asc`)
            return array
        return array.reverse();
    }

    static distinct(array) {
        if (typeof array[0] === 'object') {
            let unique = new Map();
            array.forEach((obj) => {
                if (!unique.get(JSON.stringify(obj))) {
                    unique.set(JSON.stringify(obj), obj)
                }
            });
            return [...unique.values()]
        } else {
            return [...new Set(array)];
        }
    }

    static pluck(array, key) {
        return array.map(obj => obj[key]);
    }

    static chunk(array, no) {
        const ret = [];
        while (array.length) {
            ret.push(array.splice(0, no))
        }
        return ret;
    }

    static getNoOfDuplicates(array) {
        let noOfDuplicates = new Map();
        array.forEach((obj) => {
            let value = noOfDuplicates.get(JSON.stringify(obj))
            if (value) {
                noOfDuplicates.set(JSON.stringify(obj), value + 1)
            } else {
                noOfDuplicates.set(JSON.stringify(obj), 1)
            }
        });
        return Object.fromEntries([...noOfDuplicates]);
    }

    static intersection(array1, array2) {
        if (typeof array1[0] !== 'object')
            return array1.filter(obj => array2.includes(obj));
        else {
            let map = new Map();
            array2.forEach((obj) => { map.set(JSON.stringify(obj), obj) });
            return array1.filter(obj => map.get(JSON.stringify(obj)));
        }
    }

    static difference(array1, array2) {
        if (typeof array1[0] !== 'object')
            return array1.filter(obj => !array2.includes(obj));
        else {
            let map = new Map();
            array2.forEach((obj) => { map.set(JSON.stringify(obj), obj) });
            return array1.filter(obj => !map.get(JSON.stringify(obj)));
        }
    }

    static union(array1, array2) {
        return Array.distinct(array1.concat(array2));
    }

    static unionAll(array1, array2) {
        return array1.concat(array2);
    }

    static groupBy(array, keys) {
        return array.reduce((acc, currentVal) => {
            let key = currentVal[keys];
            if (acc[key]) {
                acc[key].push(currentVal);
            } else {
                acc[key] = [currentVal];
            }
            return acc;
        }, {});
    }

    static where(array, whereObj) {
        let resultObj = [];
        array.forEach((obj) => {
            let status = [];
            for (let [k, v] of Object.entries(whereObj)) {
                if (obj[k] !== v) {
                    status.push(false);
                }
            }
            if (!status.includes(false)) {
                resultObj.push(obj)
            }
        });
        return resultObj;
    }

    static flatten(array) {
        return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(ArrayExtend.flatten(val)) : acc.concat(val), []);
    }

    static jsonToArray(object) {
        
    }

}

//console.log(Array.intersection([1,2,3,4,5],[5]))

//console.log(Array.intersection([{ "abc": 10 }, { "abc": 11 }], [{ "abc": 10 },]))

//console.log(Array.difference([1,2,3,4,5],[1,5]))

//console.log(Array.difference([{ "abc": 10 }, { "abc": 11 },], [{ "abc": 10 },]))

//console.log(Array.groupBy([{ name: "vishl", "id": 30 }, { name: "vishl", "id": 30 }, { name: "pat", "id": 30 }, { name: "patil", "id": 30 }], 'name'))

//console.log(Array.where([{ name: "vishl", "id": 30 }, { name: "vishl", "id": 30 }, { name: "pat", "id": 30 }, { name: "patil", "id": 30 }], { name: "vishl", "id": 30 }))

console.log(ArrayExtend.flatten([1, 2, [3, 4, 5, [6]]]))

