import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { KeyProvider } from './KeyProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  var kp = new KeyProvider();
  ReactDOM.render(<App keyProvider={kp} />, div);
});
