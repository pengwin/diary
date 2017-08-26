type KeyListener = (key: string) => void;

export class KeyProvider {

  private listeners: Array<KeyListener> = [];

  subscribe(listener: KeyListener) {
    this.listeners.push(listener);
  }

  sendKey(key: string) {
    this.listeners.forEach(l => l(key));
  }
}