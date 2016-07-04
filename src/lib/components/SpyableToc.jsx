import React, { PropTypes } from 'react';

const TocItem = function TocItem(props) {
  const { value, depth } = props;
  return (
    <div className={`TocItem TocItemDepth${depth}`}>
      {value}
    </div>
  );
};

TocItem.propTypes = {
  value: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
};

// TODO: classのtoggle
// TOOD: click event handler
export default function SpyableToc(props, context) {
  return (
    <div className="SpyableToc">
      {
        context.headingList.map((x, i) => (
          <TocItem key={i} {...x} />
        ))
      }
    </div>
  );
}

SpyableToc.contextTypes = {
  headingList: PropTypes.array,
};
