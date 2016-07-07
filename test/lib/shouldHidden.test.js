const assert = require('assert');
import shouldHidden, {
  rootDepth,
  isRoot,
  isCurrent,
  findRootByCurrentIndex,
  findGroupIndexByCurrentIndex,
  includeGroup,
} from './../../src/lib/shouldHidden.js';

describe('shouldHidden.js', () => {
  const headingList = [
    { depth: 1, value: 'heading 1-1' },
    { depth: 2, value: 'heading 2-1' },
    { depth: 3, value: 'heading 3-1' },
    { depth: 4, value: 'heading 4-1' },
    { depth: 5, value: 'heading 5-1' },
    { depth: 6, value: 'heading 6-1' },
    { depth: 1, value: 'heading 1-2' },
    { depth: 2, value: 'heading 2-2' },
    { depth: 3, value: 'heading 3-2' },
  ];


  describe('#rootDepth', () => {
    it('shuold return 1', () => {
      assert(rootDepth(headingList) === 1);
    });

    it('should return 2', () => {
      const list = [
        { depth: 2, value: 'heading 2-1' },
        { depth: 3, value: 'heading 3-1' },
        { depth: 4, value: 'heading 4-1' },
      ];

      assert(rootDepth(list) === 2);
    });
  });


  describe('#isRoot', () => {
    it('should return true when target is root', () => {
      const args = { target: headingList[0], list: headingList };
      assert(isRoot(args) === true);
    });

    it('should return false when target is not root', () => {
      const args = { target: headingList[1], list: headingList };
      assert(isRoot(args) === false);
    });
  });


  describe('#isCurrent', () => {
    it('should return true when target is current', () => {
      const args = { targetIndex: 1, currentIndex: 1 };
      assert(isCurrent(args) === true);
    });

    it('should return false when target is not current', () => {
      const args = { targetIndex: 2, currentIndex: 1 };
      assert(isCurrent(args) === false);
    });
  });


  describe('#findRootByCurrenIndex', () => {
    it('should return root index of group', () => {
      const args = { currentIndex: 1, list: headingList };
      assert.deepStrictEqual(findRootByCurrentIndex(args), 0);
    });

    it('should return 6 when currentIndex is 8', () => {
      const args = { currentIndex: 8, list: headingList };
      assert.deepStrictEqual(findRootByCurrentIndex(args), 6);
    });
  });


  describe('#findGroupIndexByCurrentIndex', () => {
    it('should return array of group index', () => {
      const args = { currentIndex: 1, list: headingList };
      const ret = [0, 1, 2, 3, 4, 5];
      assert.deepStrictEqual(findGroupIndexByCurrentIndex(args), ret);
    });

    it('should return [6, 7, 8] when currentIndex is 8', () => {
      const args = { currentIndex: 8, list: headingList };
      const ret = [6, 7, 8];
      assert.deepStrictEqual(findGroupIndexByCurrentIndex(args), ret);
    });
  });


  describe('#includeGroup', () => {
    it('should return true when targetIndex incluede currentIndex group', () => {
      const args = { targetIndex: 1, currentIndex: 3, list: headingList };
      assert(includeGroup(args) === true);
    });

    it('should return false when targetIndex dont incluede currentIndex group', () => {
      const args = { targetIndex: 1, currentIndex: 8, list: headingList };
      assert(includeGroup(args) === false);
    });
  });


  describe('#shuoldHidden', () => {
    it('should return false when target is root of group', () => {
      const target = headingList[6];
      assert(shouldHidden(target, 6, 1, headingList) === false);
    });

    it('should return false when target is current', () => {
      const target = headingList[2];
      assert(shouldHidden(target, 2, 2, headingList) === false);
    });

    it('should return false when target incluede currentIndex of group', () => {
      const target = headingList[2];
      assert(shouldHidden(target, 2, 4, headingList) === false);
    });

    it('should return true when target dont correspond to above case', () => {
      const target = headingList[7];
      assert(shouldHidden(target, 7, 2, headingList) === true);
    });
  });
});
