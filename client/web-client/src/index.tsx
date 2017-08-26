import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { KeyProvider } from './KeyProvider';

const keyProvider = new KeyProvider();

document.addEventListener('keydown', (e) => keyProvider.sendKey(e.key));

ReactDOM.render(
  <App keyProvider={keyProvider} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
