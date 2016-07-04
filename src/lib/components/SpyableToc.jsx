import React, { PropTypes } from 'react';
import classNames from 'classnames';

class TocItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const { value, depth, index, current, onTocItemClick } = this.props;
    const cname = classNames({
      TocItem: true,
      [`TocItemDepth-${depth}`]: true,
      'TocItem--current': current,
    });

    return (
      <div className={cname} onClick={ev => onTocItemClick(index, ev)}>
        {value}
      </div>
    );
  }
}

TocItem.propTypes = {
  value: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  current: PropTypes.bool.isRequired,
  onTocItemClick: PropTypes.func.isRequired,
};


export default function SpyableToc(props, context) {
  const { currentIndex, onTocItemClick } = context;
  return (
    <div className="SpyableToc">
    {context.headingList.map((x, i) => (
      <TocItem
        key={i}
        index={i}
        current={currentIndex === i}
        onTocItemClick={onTocItemClick}
        {...x}
      />
    ))}
    </div>
  );
}

SpyableToc.contextTypes = {
  headingList: PropTypes.array.isRequired,
  onTocItemClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number,
};
