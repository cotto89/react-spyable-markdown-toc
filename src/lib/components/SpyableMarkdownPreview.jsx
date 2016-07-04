import React, { PropTypes } from 'react';
import Parser from './../md-parser.js';

// TODO: contextからparseOptinoやheadingAttributesを渡せるように修正する
export default function SpyableMarkdownPreview(props, context) {
  const parser = new Parser(context.raw);

  return (
    <div
      className="SpyableMarkdownPreview"
      dangerouslySetInnerHTML={{ __html: parser.toHTML() }}
    />
  );
}

SpyableMarkdownPreview.contextTypes = {
  raw: PropTypes.string,
};
