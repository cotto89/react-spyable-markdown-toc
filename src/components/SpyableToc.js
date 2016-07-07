/* eslint-disable camelcase*/
import React, { PropTypes } from 'react';
import SpyableTocItem from './SpyableTocItem.js';
import shouldHidden from './../lib/shouldHidden.js';

export default function SpyableToc(props, context) {
  const { SMT_headingList, SMT_currentIndex, SMT_onTocItemClick } = context;
  const { collapse } = props;
  return (
    <div className="SpyableToc">
    {SMT_headingList.map((x, i) => (
      <SpyableTocItem
        key={i}
        index={i}
        current={SMT_currentIndex === i}
        onTocItemClick={SMT_onTocItemClick}
        hidden={collapse && shouldHidden(x, i, SMT_currentIndex, SMT_headingList)}
        {...x}
      />
    ))}
    </div>
  );
}

SpyableToc.propTypes = {
  collapse: PropTypes.bool,
};

SpyableToc.contextTypes = {
  SMT_headingList: PropTypes.array.isRequired,
  SMT_onTocItemClick: PropTypes.func.isRequired,
  SMT_currentIndex: PropTypes.number,
};
