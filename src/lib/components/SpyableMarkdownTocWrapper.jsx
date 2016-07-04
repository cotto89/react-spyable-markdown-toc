import React, { Component, PropTypes } from 'react';
import Parser from './../md-parser.js';

class SpyableMarkdownTocWrapper extends Component {
  static get propTypes() {
    return {
      raw: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
    };
  }

  static get childContextTypes() {
    return {
      html: PropTypes.string,
      headingList: PropTypes.array,
    };
  }

  constructor(props) {
    super(props);
    this.parser = new Parser(this.props.raw);
  }

  getChildContext() {
    return {
      html: this.parser.toHTML(),
      headingList: this.parser.headingList,
    };
  }

  componentDidMount() {
    const $headings = document.querySelectorAll('[data-spyable-heading=true]');
  }


  render() {
    return (
      <div className="SpyableMarkdownTocWrapper">
        { this.props.children }
      </div>
    );
  }
}

export default SpyableMarkdownTocWrapper;
