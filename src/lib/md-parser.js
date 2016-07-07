const remark = require('remark');
const remark2HTML = require('remark-html');
const hljs = require('remark-highlight.js');
const toString = require('mdast-util-to-string');
const attrs = require('./remark-heading-attributes.js');

class MDParser {
  /**
   * Creates an instance of MDParser.
   *
   * @param {string} args.raw - markdown
   * @param {?Object} args.parseOption - remark parse option
   * @param {?Object} args.headingAttributes - for remark-html
   */
  constructor(args) {
    const { raw, parseOption, headingAttributes } = args;
    this.raw = raw;
    this.parseOption = parseOption || { breaks: true, setext: true };
    this.maxDepth = headingAttributes && headingAttributes.max || 6;
    this.headingAttributes = headingAttributes || {};
  }

  /**
   * heading listを返すgetter
   *
   * @readonly
   * @return {Array} headingList
   *
   *  [
        { depth: 1, value: foo },
        { depth: 2, value: bar },
      ]
   */
  get headingList() {
    const headers = [];
    const ast = remark().parse(this.raw, this.parseOption);

    for (const node of ast.children) {
      if (node.type === 'heading' && node.depth <= this.maxDepth) {
        headers.push({
          depth: node.depth,
          value: toString(node),
        });
      }
    }

    return headers;
  }

  /**
   * markdown to HTML with heading attrs
   *
   * @returns {string} html
   */
  toHTML() {
    const html = remark()
      .use(attrs, this.headingAttributes)
      .use([remark2HTML, hljs])
      .process(this.raw, this.parseOption);

    return html.toString();
  }
}

module.exports = MDParser;
