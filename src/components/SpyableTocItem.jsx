const React = require('react');
const { PropTypes } = React;
const classNames = require('classnames');

module.exports = class TocItem extends React.Component {
  static get propTypes() {
    return {
      value: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired,
      current: PropTypes.bool.isRequired,
      onTocItemClick: PropTypes.func.isRequired,
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const { value, depth, index, current, onTocItemClick } = this.props;
    const cname = classNames({
      SpyableTocItem: true,
      [`SpyableTocItem__depth-${depth}`]: true,
      'SpyableTocItem--current': current,
    });

    return (
      <div className={cname} onClick={ev => onTocItemClick(index, ev)}>
        {value}
      </div>
    );
  }
}
