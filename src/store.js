let _state = {};
let listeners = [];

const subscribe = (listener)=> {
  listeners.push(listener);
  return ()=> listeners = listeners.filter(_listener => _listener !== listener);
};

const publish = (data)=> {
  _state = { ..._state, ...data };
  listeners.forEach( listener => listener(getState()));
};

const getState = ()=> {
  return { ..._state };
}

export { publish, subscribe, getState };
