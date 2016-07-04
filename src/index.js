require('./index.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const Wrapper = require('./components/SpyableMarkdownTocWrapper.jsx').default;
const Preview = require('./components/SpyableMarkdownPreview.jsx').default;
const Toc = require('./components/SpyableToc.jsx').default;
const SampleText = require('./../debug/SampleText.md');

const App = function App() {
  return (
    <div className="App">
      <Wrapper raw={SampleText} maxDepth={3}>
        <div className="section">
          <Preview />
        </div>
        <div className="section">
          <Toc />
        </div>
      </Wrapper>
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
