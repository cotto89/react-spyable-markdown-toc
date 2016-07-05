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
      <SpyableMarkdownTocWrapper raw={SampleText}>
        <div className="section">
          <SpyableMarkdownPreview />
        </div>
        <div className="section">
          <SpyableToc />
        </div>
      </SpyableMarkdownTocWrapper>
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
