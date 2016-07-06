require('./index.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import {
  SpyableMarkdownPreview,
  SpyableMarkdownTocWrapper,
  SpyableToc,
} from './../src/index.js';

const SampleText = require('./sample.md');

const App = function App() {
  return (
    <div className="App">
      <SpyableMarkdownTocWrapper raw={SampleText} maxDepth={1}>
        <div className="SpyableMarkdowWrapper section">
          <SpyableMarkdownPreview />
        </div>
        <div className="SpyableTocWrapper section">
          <SpyableToc />
        </div>
      </SpyableMarkdownTocWrapper>
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
