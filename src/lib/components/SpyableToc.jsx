import React, { PropTypes } from 'react';
// TODO: classのtoggle
export default function SpyableToc(props, context) {
  const { onTocItemClick } = context;
  return (
    <div className="SpyableToc">
      {
        context.headingList.map((x, i) => (
          <div
            key={i}
            className={`TocItem TocItemDepth-${x.depth}`}
            onClick={ev => onTocItemClick(i, ev)}
          >
            {x.value}
          </div>
        ))
      }
    </div>
  );
}

SpyableToc.contextTypes = {
  headingList: PropTypes.array,
  onTocItemClick: PropTypes.func,
};
