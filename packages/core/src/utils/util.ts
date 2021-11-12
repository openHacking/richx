/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * check element
 * @param element
 * @returns
 */
export function isElement(element: any) {
  return element instanceof Element || element instanceof HTMLDocument;
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 * DOM selector
 * @param {String}  selector css selector
 * @param {String}  context  parent DOM
 */
export function $$(selector: string, context?: HTMLElement | Document) {
  context = context || document;
  let elements = context.querySelectorAll(selector);

  return elements.length == 1
    ? Array.prototype.slice.call(elements)[0]
    : Array.prototype.slice.call(elements);
}

/**
 * add classname
 * @param className
 * @param selector
 * @param context
 */
export function addClass(
  className: string,
  selector: HTMLElement | string,
  context?: HTMLElement | Document
) {
  if (isElement(selector)) {
    selector.classList.add(className);
    return;
  }

  context = context || document;
  let elements = Array.prototype.slice.call(context.querySelectorAll(selector));

  elements.forEach((ele) => {
    ele.classList.add(className);
  });
}
/**
 * remove classname
 * @param className
 * @param selector
 * @param context
 */
export function removeClass(
  className: string,
  selector: HTMLElement | string,
  context?: HTMLElement | Document
) {
  if (isElement(selector)) {
    selector.classList.remove(className);
    return;
  }

  context = context || document;
  let elements = Array.prototype.slice.call(context.querySelectorAll(selector));

  elements.forEach((ele) => {
    ele.classList.remove(className);
  });
}

/**
 * 获取第一级子元素
 * @param obj
 * @returns
 */
export function getFirstChildren(obj: HTMLElement) {
  var objChild = [];
  var objs = obj.getElementsByTagName("*");
  for (var i = 0, j = objs.length; i < j; ++i) {
    if (objs[i].nodeType != 1) {
      // alert(objs[i].nodeType);
      continue;
    }
    var temp = objs[i].parentNode;
    if (temp.nodeType == 1) {
      if (temp == obj) {
        objChild[objChild.length] = objs[i];
      }
    } else if (temp.parentNode == obj) {
      objChild[objChild.length] = objs[i];
    }
  }
  return objChild;
}

/**
 *  generate random id
 */
export function randomId(prefix) {
  prefix = prefix ? prefix + "-" : "";
  return (
    prefix +
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(2, 10)
  );
}

/**
 * deep copy
 * @param obj
 */
export function deepClone(obj) {
  if (obj === null) return null; //null 的情况
  if (obj instanceof RegExp) return new RegExp(obj); //正则表达式的情况
  if (obj instanceof Date) return new Date(obj); //日期对象的情况
  // if (typeof obj == 'Function') return new Function(obj){}; //函数的情况
  if (typeof obj != "object") {
    //非复杂类型,直接返回 也是结束递归的条件
    return obj;
  }
  //[].__proto__.constructor=Array()
  //{}.__proto__.constructor=Object()
  //因此处理数组的情况时,可以取巧用这个办法来new新对象
  var newObj = new obj.__proto__.constructor();
  for (var key in obj) {
    newObj[key] = deepClone(obj[key]);
  }
  return newObj;
}

/* 
createArrayRange(1,4) => [1,2,3,4]
*/
export function createArrayRange(start, end) {
  return new Array(end - start + 1).fill(null).map((v, i) => {
    return start + i;
  });
}

/**
 * mergeArray([1,2,4,5,6,9]) => [[1,2],[4,6],[9,9]]
 * @param array
 * @returns
 */
export function mergeArray(array) {
  let preValue = 0;
  const result = [];
  let preItem = [];
  array.reduce((pre, cur, i) => {
    if (i === 1) {
      preValue = pre;
      preItem[0] = preValue;
    }

    if (pre + 1 === cur) {
      preValue = cur;
    } else {
      preItem[1] = pre;
      result.push(preItem);

      preItem = [];
      preItem[0] = cur;

      preValue = cur;
    }

    if (i === array.length - 1) {
      preItem[1] = cur;
      result.push(preItem);
    }

    return cur;
  });

  return result;
}
