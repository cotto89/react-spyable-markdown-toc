require('./index.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import {
  SpyableMarkdownPreview,
  SpyableMarkdownTocWrapper,
  SpyableToc,
} from '../dist/index.js';

const SampleText = require('./sample.md');

const App = function App() {
  return (
    <div className="App">
      <SpyableMarkdownTocWrapper raw={SampleText} maxDepth={2}>
        <div className="SpyableMarkdowWrapper section">
          <SpyableMarkdownPreview />
        </div>
        <div className="SpyableTocWrapper section">
          <SpyableToc collapse />
        </div>
      </SpyableMarkdownTocWrapper>
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
