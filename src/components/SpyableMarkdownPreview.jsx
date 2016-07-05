const React = require('react');
const { PropTypes } = React;

function SpyableMarkdownPreview(props, context) {
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

module.exports = SpyableMarkdownPreview;
