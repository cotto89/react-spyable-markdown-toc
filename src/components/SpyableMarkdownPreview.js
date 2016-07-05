import React, { PropTypes } from 'react';

export default function SpyableMarkdownPreview(props, context) {
  return (
    <div
      className="SpyableMarkdownPreview"
      dangerouslySetInnerHTML={{ __html: context.html }}
    />
  );
}

SpyableMarkdownPreview.contextTypes = {
  html: PropTypes.string,
};
