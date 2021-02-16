import { useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';


const PLUGIN_MESSAGE_API = {
  initialized: 'initialized'
};

function App() {
  
  useEffect(() => {
    window.postMessage({ eventName: PLUGIN_MESSAGE_API.initialized }, '*');
  }, []);

  const handleMessage = useCallback(
    (event) => {
      console.log('Inside iframe message!: ', event);
    },
    []
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
