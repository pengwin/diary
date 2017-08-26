import * as React from 'react';
import './App.css';

import { KeyProvider } from './KeyProvider';

interface Key {
  value: string;
}

class KeyHandler {
  private keys: Array<Key> = [];

  get data() {
    return this.keys.map(x => x.value).join('');
  }

  receiveKey(keyVal: string) {
    if (keyVal.length > 1) {
      this.handleSpecialKey(keyVal);
      return; 
    }

    const key = {
      value: keyVal,
    };
    this.keys.push(key);
    // tslint:disable-next-line:no-console
    console.log(key);
  }

  private handleSpecialKey(specialKey: string) {
    if (specialKey === 'Backspace') {
      this.deleteLastKey();
      return;
    }
  }

  private deleteLastKey() {
    this.keys.pop();
  }
}

interface AppState {
  readonly showPlaceholder: boolean;
  readonly focused: boolean;
  readonly data: string;
}

interface AppProps {
  readonly keyProvider: KeyProvider;
}

class App extends React.Component<AppProps, AppState> {

  private keyHandler: KeyHandler = new KeyHandler();

  constructor(props?: AppProps | undefined) {
    super();
    this.state = {
      showPlaceholder: true,
      focused: false,
      data: '',
    };

    if (props && props.keyProvider) {
      props.keyProvider.subscribe((k) => this.onKeyReceived(k));
    }
  }

  render() {
    return (
      <div>
        <div className={'input'} onClick={() => this.onClick()}>
          <span className={this.state.showPlaceholder ? 'placeholder' : 'hidden'}>Placeholder</span>
          <span className={!this.state.showPlaceholder ? 'data' : 'hidden'}>{this.state.data}</span>
          <span className={this.state.focused ? 'cursor' : 'hidden'}>|</span>
        </div>
      </div>
    );
  }

  onClick() {
    this.setState(Object.assign({}, this.state, { focused: true, showPlaceholder: false }));
  }

  onKeyReceived(keyValue: string) {
    this.keyHandler.receiveKey(keyValue);
    this.setState(Object.assign({}, this.state, { data: this.keyHandler.data }));
  }
}

export default App;
