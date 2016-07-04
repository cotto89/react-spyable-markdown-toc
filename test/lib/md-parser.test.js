const assert = require('assert');
const MDParser = require('./../../src/lib/md-parser.js');

describe('md-parser.js', () => {
  const raw = `# heading1

paragraph

## heading2
### heading3
#### heading4
##### heading5
###### heading6
`;

  const parsedHTML = `<h1 data-spyable-heading="true">heading1</h1>
<p>paragraph</p>
<h2 data-spyable-heading="true">heading2</h2>
<h3 data-spyable-heading="true">heading3</h3>
<h4 data-spyable-heading="true">heading4</h4>
<h5 data-spyable-heading="true">heading5</h5>
<h6 data-spyable-heading="true">heading6</h6>
`;

  const depth3HTML = `<h1 data-spyable-heading="true">heading1</h1>
<p>paragraph</p>
<h2 data-spyable-heading="true">heading2</h2>
<h3 data-spyable-heading="true">heading3</h3>
<h4>heading4</h4>
<h5>heading5</h5>
<h6>heading6</h6>
`;


  describe('#constructor', () => {
    const parser = new MDParser({ raw });

    it('static member', () => {
      assert(!!parser.raw);
      assert(!!parser.parseOption);
      assert(!!parser.headingAttributes);
      assert(!!parser.maxDepth);
    });

    it('default parseOption', () => {
      assert.deepStrictEqual(parser.parseOption, { breaks: true, setext: true });
    });

    it('default maxDepth', () => {
      assert(parser.maxDepth === 6);
    });

    it('default headingAttributes', () => {
      assert.deepStrictEqual(parser.headingAttributes, {});
    });
  });


  describe('#headingList', () => {
    describe('when default maxDepth', () => {
      const parser = new MDParser({ raw });
      const list = parser.headingList;

      it('should return array of object', () => {
        assert(Array.isArray(list));

        for (const l of list) {
          assert(l instanceof Object);
        }
      });

      it('should have depth and value prop in listItem', () => {
        for (const l of list) {
          assert(!!l.depth && !!l.value);
        }
      });
    });


    describe('when maxDepth is 3', () => {
      const headingAttributes = { attributes: { 'data-spyable-heading': true }, max: 3 };
      const parser = new MDParser({ raw, headingAttributes });
      const list = parser.headingList;

      it('should return Array of 3 elements', () => {
        assert(list.length === 3);
      });

      it('each elements depth is lower 3', () => {
        for (const l of list) {
          assert(l.depth <= 3);
        }
      });
    });
  });



  describe('#toHTML', () => {
    describe('when default maxDepth ', () => {
      const headingAttributes = { attributes: { 'data-spyable-heading': true } };
      const parser = new MDParser({ raw, headingAttributes });
      const html = parser.toHTML();

      it('should return HTML as String', () => {
        assert(typeof html === 'string');
      });

      it('should return correct html', () => {
        assert(html === parsedHTML);
      });
    });


    describe('when maxDepth is 3', () => {
      const headingAttributes = { attributes: { 'data-spyable-heading': true }, max: 3 };
      const parser = new MDParser({ raw, headingAttributes });
      const html = parser.toHTML();

      it('should return correct html', () => {
        assert(html === depth3HTML);
      });
    });
  });
});
