import React, { PropTypes } from 'react';

export default function SpyableMarkdownPreview(props, context) {
  return (
    <div
      className="SpyableMarkdownPreview"
      dangerouslySetInnerHTML={{ __html: context.SMT_html }}
    />
  );
}

SpyableMarkdownPreview.contextTypes = {
  SMT_html: PropTypes.string,
};
