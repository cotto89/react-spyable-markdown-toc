"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootDepth = rootDepth;
exports.isRoot = isRoot;
exports.isCurrent = isCurrent;
exports.findRootByCurrentIndex = findRootByCurrentIndex;
exports.findGroupIndexByCurrentIndex = findGroupIndexByCurrentIndex;
exports.includeGroup = includeGroup;
/**
 * headingListからrootDepthを判断
 *
 * @param {Array} headingList
 * @returns {number} rootDepth
 */
function rootDepth(headingList) {
  return Math.min.apply(null, headingList.map(function (x) {
    return x.depth;
  }));
}

/**
 * targetがrootか判断
 *
 * @param {Object} { target, list }
 * @returns {bool}
 */
function isRoot(_ref) {
  var target = _ref.target;
  var list = _ref.list;

  return target.depth === rootDepth(list);
}

/**
 * targetIndexがcurrentIndexか判断
 *
 * @param {Object} { targetIndex, currentIndex }
 * @returns {bool}
 */
function isCurrent(_ref2) {
  var targetIndex = _ref2.targetIndex;
  var currentIndex = _ref2.currentIndex;

  return targetIndex === currentIndex;
}

/**
 * currentIndexの要素が属するgroupのrootを取得する
 *
 * @param {Object} { currentIndex, list }
 * @returns {number} root index
 */
function findRootByCurrentIndex(_ref3) {
  var currentIndex = _ref3.currentIndex;
  var list = _ref3.list;

  if (isRoot({ target: list[currentIndex], list: list })) return currentIndex;

  var root = null;
  for (var i = currentIndex; i >= 0; i--) {
    if (isRoot({ target: list[i], list: list })) {
      root = i;
      break;
    }
  }

  return root;
}

/**
 * h1 ~ h6でgroupを作りそのindexを返す
 *
 * @param {Object} { currentIndex, list }
 * @returns {Array}
 */
function findGroupIndexByCurrentIndex(_ref4) {
  var currentIndex = _ref4.currentIndex;
  var list = _ref4.list;

  var group = [];
  var rootIndex = findRootByCurrentIndex({ currentIndex: currentIndex, list: list });

  group.push(rootIndex);

  var len = list.slice(rootIndex + 1).length;
  var i = rootIndex + 1;

  while (len) {
    if (isRoot({ target: list[i], list: list })) break;
    group.push(i);
    ++i;
    --len;
  }

  return group;
}

/**
 * groupの中にtargetが含まれるか判断
 *
 * @param {Object} { targetIndex, currentIndex, list }
 * @returns {boolean}
 */
function includeGroup(_ref5) {
  var targetIndex = _ref5.targetIndex;
  var currentIndex = _ref5.currentIndex;
  var list = _ref5.list;

  var group = findGroupIndexByCurrentIndex({ currentIndex: currentIndex, list: list });
  return group.includes(targetIndex);
}

/*
 *  hiddenの状態判断
 * @params {Object} target
 * @params {number} targetIndex
 * @params {number} currentIndex
 * @params {Array} list
 *
 * @returns {boolean}
 */
function shouldHidden(target, targetIndex, currentIndex, list) {
  var params = { target: target, targetIndex: targetIndex, currentIndex: currentIndex, list: list };
  if (isRoot(params)) return false;
  if (isCurrent(params)) return false;
  if (includeGroup(params)) return false;
  return true;
}

exports.default = shouldHidden;