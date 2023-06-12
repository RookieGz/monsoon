import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  user = null;

  // 补水
  hydrate(initState: Store) {
    Object.assign(this, initState);
  }
}

let store: Store;
function initStore(initDate?: Store): Store {
  enableStaticRendering(typeof window === "undefined");

  const _store = store ?? new Store();
  if (initDate) {
    _store.hydrate(initDate);
  }
  // For server side rendering always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export default Store;
export { store, initStore };
