/**
 * headingListからrootDepthを判断
 *
 * @param {Array} headingList
 * @returns {number} rootDepth
 */
export function rootDepth(headingList) {
  return Math.min.apply(null, headingList.map(x => x.depth));
}

/**
 * targetがrootか判断
 *
 * @param {Object} { target, list }
 * @returns {bool}
 */
export function isRoot({ target, list }) {
  return target.depth === rootDepth(list);
}

/**
 * targetIndexがcurrentIndexか判断
 *
 * @param {Object} { targetIndex, currentIndex }
 * @returns {bool}
 */
export function isCurrent({ targetIndex, currentIndex }) {
  return targetIndex === currentIndex;
}

/**
 * currentIndexの要素が属するgroupのrootを取得する
 *
 * @param {Object} { currentIndex, list }
 * @returns {number} root index
 */
export function findRootByCurrentIndex({ currentIndex, list }) {
  if (isRoot({ target: list[currentIndex], list })) return currentIndex;

  let root = null;
  for (let i = currentIndex; i >= 0; i--) {
    if (isRoot({ target: list[i], list })) {
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
export function findGroupIndexByCurrentIndex({ currentIndex, list }) {
  const group = [];
  const rootIndex = findRootByCurrentIndex({ currentIndex, list });

  group.push(rootIndex);

  let len = list.slice(rootIndex + 1).length;
  let i = rootIndex + 1;

  while (len) {
    if (isRoot({ target: list[i], list })) break;
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
export function includeGroup({ targetIndex, currentIndex, list }) {
  const group = findGroupIndexByCurrentIndex({ currentIndex, list });
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
  const params = { target, targetIndex, currentIndex, list };
  if (isRoot(params)) return false;
  if (isCurrent(params)) return false;
  if (includeGroup(params)) return false;
  return true;
}

export default shouldHidden;
