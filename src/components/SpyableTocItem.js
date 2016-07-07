import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class TocItem extends React.Component {
  static get propTypes() {
    return {
      value: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired,
      current: PropTypes.bool.isRequired,
      onTocItemClick: PropTypes.func.isRequired,
      hidden: PropTypes.bool,
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const { value, depth, index, current, onTocItemClick, hidden } = this.props;
    const display = hidden ? 'none' : 'block';
    const cname = classNames({
      SpyableTocItem: true,
      [`SpyableTocItem__h${depth}`]: true,
      'SpyableTocItem--current': current,
    });

    return (
      <div
        className={cname}
        style={{ display }}
        onClick={ev => onTocItemClick(index, ev) }
      >
        {value}
      </div>
    );
  }
}
