'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/*
 * unique: Designed to loop over an array, remove all duplicates from array, and
 * return a new array with all unique elements.
 *
 * @param {Array} array: The array to grab unique elements from.
 *
 * @return {Array}: an array containing all unique elements.
 */
function unique(array) {
    var arr1 = [];
    for(var i = 0; i < array.length; i++) {
        if (arr1.indexOf(array[i]) === -1) {
            arr1.push(array[i]);
        }
    }
    return arr1;
}
module.exports.unique = unique;


/*
 * filter: Designed to loop over an array and applies the function given to each
 * element in the array to filter certain elements and add them to a new array
 * which is returned. The parameter function given must return a boolean value,
 * and if true is returned on any element that element is added to the output
 * array.
 *
 * @param {Array} array: The array to filter.
 * @param {Function} func: The function to be applied to each element in the array.
 * this function should return a boolean value.
 *
 * @return {Array}: An array containing all elements from input array that returned
 * true after being applied to the parameter function.
 */
function filter(array, func) {
      var arr = [];
      for (var i = 0; i < array.length; i++) {
          if (func(array[i], i, array) === true) {
              arr.push(array[i]);
          } 
      }
      return arr;
}
module.exports.filter = filter;


/*
 * reject: Designed to loop over an array and applies the function given to each
 * element in the array to return all elements that return false in another array.
 * The function given must result in a boolean value.
 *
 * @param {Array} array: The array to test and get rejected elements from.
 * @param {Function} func: The function to be applied to each element in the
 * parameter array. This function must result in a boolean value.
 *
 * @return {Array}: An array containing all elements from the input array that
 * returned false after being applied to the parameter function.
 */
function reject(array, func) {
      var arr = [];
      for (var i = 0; i < array.length; i++) {
          if (func(array[i], i, array) === false) {
              arr.push(array[i]);
          } 
      }
      return arr;
}
module.exports.reject = reject;


/*
 * partition: Designed to loop over a given array and apply each element to a given
 * function that returns a boolean value. It then splits all elements that return
 * true and false into sub-arrays respectively inside the same new array which is
 * returned.
 *
 * @param {Array} array: The array to grab elements from to be split by the function into
 * sub-arrays.
 * @param {Function} func: The function to be applied to each element in the
 * parameter array. This function must result in a boolean value.
 *
 * @return {Array}: An array containing two sub-arrays, the first sub-array being the
 * elements that returned true when tested in the parameter function, and the
 * second sub-array being the elements that returned false.
 */
function partition(array, func) {
    var arr = [[], []];
      for (var i = 0; i < array.length; i++) {
          if (func(array[i], i, array) === true) {
              arr[0].push(array[i]);
          }
          else if (func(array[i], i, array) === false) {
              arr[1].push(array[i]);
          }
      }
      return arr;
}
module.exports.partition = partition;


/*
 * map: Uses the previous each function to loop over a collection(Array or Object)
 * and applies the parameter Function to each element in the collection. Map then takes
 * the results and push them into a new array and returns that new array.
 *
 * @param {Array, Object} collection: Array or Object to change the elements of.
 * @param {Function} func: The function to be applied to each element in the
 * parameter array.
 *
 * @return {Array}: An array containing the resulted elements from the parameter
 * function.
 */
function map(collection, func) {
    var arr = [];
    each(collection, function(val, i, col) {
        var result = func(val, i, col);
        arr.push(result);
    });
    return arr;
}
module.exports.map = map;


/*
 * pluck: Uses the previous map function which also uses the previous each function to
 * loop through the parameter array of objects and return a new array with the values of
 * each object in the parameter array.
 *
 * @param {Array of Objects} array: An array of objects to grab the values from.
 * @param {Property} property: Specific key to grab values of.
 *
 * @return {Array}: An array containing the values of the parameter property from the
 * parameter array of objects given.
 */
function pluck(array, property) {
    var arr = [];
    map(array, function(obj, i, col) {
        arr.push(obj[property]);
    });
    return arr;
}
module.exports.pluck = pluck;


/*
 * every: Designed to take an array or object and use a given function that results
 * in a boolean value to test against every element in the given array or object
 * to return true only if all elements tested return true and then false if one
 * or more elements return false.
 *
 * @param {Array, Object} collection: An array or object to grab elements from to
 * test in the parameter function.
 * @param {Function} func: A function that returns a boolean value to test the elements
 * from the given parameter array or object. Not needed only if you want to test if
 * every element in the array or object are all collectively truthy values.
 *
 * @return {Boolean}: True is returned if every single element tested result in true
 * and false is returned if one one more elements tested result in false.
 */
function every(collection, func) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (func !== undefined) {
                if (!func(collection[i], i, collection)) {
                    return false;
                }
            }
            else if (!collection[i]) {
                return false;
            }
        }    
        return true;
    }
    else if (typeof collection === "object") {
        for (var key in collection) {
            if (func !== undefined) {    
                if (!func(collection[key], key, collection)) {
                    return false;
                }
                else if (!collection[key]) {
                    return false;
                }
            }        
        }
        return true;
    }
}
module.exports.every = every;


/*
 * some: Designed to take an array or object and use a given function that results
 * in a boolean value to test against every element in the given array or object
 * to return true if at least one element tested returns true and then false only if
 * all elements return false.
 *
 * @param {Array, Object} collection: An array or object to grab elements from to
 * test in the parameter function.
 * @param {Function} func: A function that returns a boolean value to test the elements
 * from the given parameter array or object. Not needed only if you want to test if
 * every element in the array or object are all collectively falsey values.
 *
 * @return {Boolean}: True is returned if at least one element tested results in true
 * and false is returned if all elements tested result in false.
 */
 function some(collection, func) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (func !== undefined) {
                if (func(collection[i], i, collection)) {
                    return true;
                }
            }
            else if (collection[i]) {
                return true;
            }
        }    
        return false;
    }
    else if (typeof collection === "object") {
        for (var key in collection) {
            if (func !== undefined) {    
                if (func(collection[key], key, collection)) {
                    return true;
                }
                else if (collection[key]) {
                    return true;
                }
            }        
        }
        return false;
    }
}
module.exports.some = some;


/*
 * reduce: Designed to add all values of an array together using the seed ass a base
 * starting point and adding to the seed add upon itself from there on untill the
 * array has been fully looped through. Returns the final sum of the seed added to
 * by the values of the parameter array.
 *
 * @param {Array} array: An array given to have it values added together.
 * @param {Function} func: A function to use the looped through parameter array in
 * to add values together upon each other starting with the parameter seed.
 * @param {Seed} seed: The starting value to add upon.
 *
 * @return {Sum} seed: returns the seed after the parameter array values have been added upon it
 */
function reduce(array, func, seed) {
    if (seed !== undefined) {
        for (var i = 0; i < array.length; i++) {
            seed = func(seed, array[i], i, array);
        }
        return seed;
    }
    else {
        seed = array[0];
        for (var i = 1; i < array.length; i++) {
            seed = func(seed, array[i], i, array);
        }
        return seed;
    }
}
module.exports.reduce = reduce;


/*
 * extend: Designed to add key/value pairs to a designated object and returns designated
 * object with all key/value pair add to it.
 *
 * @param {Object} object1: Object to have key/value pairs added to.
 * @param {Object} object2: Object to take key/value pairs and add to object1.
 * @param {Object} ...: A continuation to make as many parameters of objects needed to add
 * their key/value pairs to object1.
 *
 * @return {Object} object1: Returns object put in to parameter object1 with all other
 * parameter object key/value pairs added to it.
 */
function extend(object1, ...object2) {
    Object.assign(object1, ...object2);
    return object1;
}
module.exports.extend = extend;