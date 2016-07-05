import React, { PropTypes } from 'react';
import SpyableTocItem from './SpyableTocItem.js';

export default function SpyableToc(props, context) {
  const { currentIndex, onTocItemClick } = context;
  return (
    <div className="SpyableToc">
    {context.headingList.map((x, i) => (
      <SpyableTocItem
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
