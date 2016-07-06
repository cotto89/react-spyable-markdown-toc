import React, { Component, PropTypes } from 'react';
import Parser from './../lib/md-parser.js';

class SpyableMarkdownTocWrapper extends Component {
  static get propTypes() {
    return {
      raw: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      parseOption: PropTypes.object,
      maxDepth: PropTypes.number,
    };
  }

  static get childContextTypes() {
    return {
      html: PropTypes.string,
      headingList: PropTypes.array,
      onTocItemClick: PropTypes.func,
      currentIndex: PropTypes.number,
    };
  }

  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };

    /* parser */
    const { raw, parseOption, maxDepth } = this.props;
    this.initParser({ raw, parseOption, maxDepth });

    /* handler */
    this.handleTocItemClick = this.handleTocItemClick.bind(this);
    this.handleWindowScroll = this.handleWindowScroll.bind(this);
  }

  /* context
  ----------------------------------- */
  getChildContext() {
    return {
      html: this.parsedHtml,
      headingList: this.headingList,
      currentIndex: this.state.currentIndex,
      onTocItemClick: this.handleTocItemClick,
    };
  }

  /* Lifecycle
  ------------------------------------ */
  componentDidMount() {
    this.$scrollItems = document.querySelectorAll('[data-spyable-heading=true]');
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillReceiveProps({ raw, parseOption, maxDepth }) {
    this.initParser({ raw, parseOption, maxDepth });
    this.setState({ currentIndex: 0 });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.raw !== this.props.raw) {
      this.$scrollItems = document.querySelectorAll('[data-spyable-heading=true]');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  /* methods
  --------------------------------------*/
  initParser({ raw, parseOption, maxDepth }) {
    const headingAttributes = { attributes: { 'data-spyable-heading': true }, max: maxDepth };
    this.parser = new Parser({ raw, parseOption, headingAttributes });
    this.parsedHtml = this.parser.toHTML();
    this.headingList = this.parser.headingList;
  }

  /* handler
  ------------------------------------------*/
  handleWindowScroll() {
    const baseTop = window.pageYOffset + 30;
    const targets = [];

    Array.prototype.forEach.call(this.$scrollItems, (elm, i) => {
      if (baseTop > elm.offsetTop) targets.push(i);
    });

    const currentIndex = targets[targets.length - 1] || 0;
    this.setState({ currentIndex });
  }

  handleTocItemClick(index) {
    const $target = this.$scrollItems[index];
    $target.scrollIntoView();
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
