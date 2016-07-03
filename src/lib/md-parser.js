const remark = require('remark');
const remark2HTML = require('remark-html');
const hljs = require('remark-highlight.js');
const toString = require('mdast-util-to-string');
const attrs = require('./remark-heading-attributes.js');

class MDParser {
  /**
   * Creates an instance of MDParser.
   *
   * @param {string} raw - markdown
   * @param {?Object} parseOption - remark parse option
   * @param {?Object} headingAttributes - for remark-html
   */
  constructor(raw, parseOption, headingAttributes) {
    this.raw = raw;
    this.parseOption = parseOption || { breaks: true, setext: true };
    this.headingAttributes = headingAttributes || { attrs: { 'data-spyable-heading': true } };
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
      if (node.type === 'heading') {
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
