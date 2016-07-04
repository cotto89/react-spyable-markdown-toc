require('./index.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const Wrapper = require('./lib/components/SpyableMarkdownTocWrapper.jsx').default;
const Preview = require('./lib/components/SpyableMarkdownPreview.jsx').default;
const Toc = require('./lib/components/SpyableToc.jsx').default;

const App = function App() {
  return (
    <div className="App">
      <Wrapper raw={`# hello world\n\n## hello world!!!`}>
        <Preview />
        <Toc />
      </Wrapper>
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
