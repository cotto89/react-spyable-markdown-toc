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
      onTocItemClick: PropTypes.func,
      currentIndex: PropTypes.number,
    };
  }

  constructor(props) {
    super(props);
    this.state = { currentIndex: 0 };
    this.parser = new Parser(this.props.raw);
    this.handleTocItemClick = this.handleTocItemClick.bind(this);
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
    window.addEventListener('scroll', this.handleWindowScroll.bind(this));
  }

  handleWindowScroll() {
    const baseTop = window.pageYOffset;
    const targets = [];

    Array.prototype.forEach.call(this.$scrollItems, (elm, i) => {
      if (baseTop > elm.offsetTop) targets.push(i);
    });

    const currentIndex = targets[targets.length - 1] || 0;
    this.setState({ currentIndex });
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
