import { ButtonHTMLAttributes } from "react";
import { IRichTextRange } from "../components/data";
import { IRange } from "../data/range";
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any) {
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
export function mergeDeep(target: any, ...sources: any): any {
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
 * ????????????????????????
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
  if (obj === null) return null; //null ?????????
  if (obj instanceof RegExp) return new RegExp(obj); //????????????????????????
  if (obj instanceof Date) return new Date(obj); //?????????????????????
  // if (typeof obj == 'Function') return new Function(obj){}; //???????????????
  if (typeof obj != "object") {
    //???????????????,???????????? ???????????????????????????
    return obj;
  }
  //[].__proto__.constructor=Array()
  //{}.__proto__.constructor=Object()
  //??????????????????????????????,??????????????????????????????new?????????
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

/**
 * Get the currently selected range within the specified element
 *
 * reference: https://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html/13950376#13950376
 * @param containerEl
 * @returns
 */
export function saveRange(containerEl: HTMLElement): IRange {
  var range = window.getSelection().getRangeAt(0);
  var preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(containerEl);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  var start = preSelectionRange.toString().length;

  return {
    start: start,
    end: start + range.toString().length - 1,
  };
}

/**
 * According to the range and specified elements, restore the highlight of the selected area
 *
 * @param containerEl
 * @param savedSel
 */
export function restoreRange(containerEl: HTMLElement, savedSel: IRange) {
  var charIndex = 0,
    range = document.createRange();
  range.setStart(containerEl, 0);
  range.collapse(true);
  var nodeStack = [containerEl],
    node,
    foundStart = false,
    stop = false;

  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType == 3) {
      var nextCharIndex = charIndex + node.length;
      if (
        !foundStart &&
        savedSel.start >= charIndex &&
        savedSel.start <= nextCharIndex
      ) {
        range.setStart(node, savedSel.start - charIndex);
        foundStart = true;
      }
      if (
        foundStart &&
        savedSel.end + 1 >= charIndex &&
        savedSel.end + 1 <= nextCharIndex
      ) {
        range.setEnd(node, savedSel.end + 1 - charIndex);
        stop = true;
      }
      charIndex = nextCharIndex;
    } else {
      var i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }

  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
