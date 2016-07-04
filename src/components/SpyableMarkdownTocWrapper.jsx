import React, { Component, PropTypes } from 'react';
import Parser from './../lib/md-parser.js';

class SpyableMarkdownTocWrapper extends Component {
  static get propTypes() {
    return {
      raw: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      parseOption: PropTypes.object,
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
    const { raw, parseOption } = this.props;
    this.state = { currentIndex: 0 };
    this.parser = new Parser(raw, parseOption, { 'data-spyable-heading': true });
    this.handleTocItemClick = this.handleTocItemClick.bind(this);
    this.handleWindowScroll = this.handleWindowScroll.bind(this);
  }

  getChildContext() {
    return {
      html: this.parser.toHTML(),
      headingList: this.parser.headingList,
      currentIndex: this.state.currentIndex,
      onTocItemClick: this.handleTocItemClick,
    };
  }

  componentDidMount() {
    this.$scrollItems = document.querySelectorAll('[data-spyable-heading=true]');
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillReceiveProps({ raw, parseOption, headingAttrs }) {
    this.parser = new Parser(raw, parseOption, headingAttrs);
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
