/* eslint-disable camelcase*/
import React, { PropTypes } from 'react';
import SpyableTocItem from './SpyableTocItem.js';

export default function SpyableToc(props, context) {
  const { SMT_currentIndex, SMT_onTocItemClick } = context;
  return (
    <div className="SpyableToc">
    {context.SMT_headingList.map((x, i) => (
      <SpyableTocItem
        key={i}
        index={i}
        current={SMT_currentIndex === i}
        onTocItemClick={SMT_onTocItemClick}
        {...x}
      />
    ))}
    </div>
  );
}

SpyableToc.contextTypes = {
  SMT_headingList: PropTypes.array.isRequired,
  SMT_onTocItemClick: PropTypes.func.isRequired,
  SMT_currentIndex: PropTypes.number,
};
