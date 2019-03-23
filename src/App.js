import React, { Component } from 'react';
import { HashRouter as Router, Link, Route } from 
'react-router-dom';
import { getState, publish, subscribe, init } from './store';

init({ counter: 0 });

const Foo = ()=> {
  return <div>Foo</div>;
};

import Bazz from './Bazz'

export default class App extends Component{
  constructor(){
    super();
    const state = getState();
    this.state = {
      counter: state.counter
    };
  }
  componentDidMount(){
    subscribe((state)=> {
      this.setState({ counter: state.counter});
      
    });
  }
  reset(){
    publish({ counter: 0 });
  }
  render(){
    const { counter } = this.state;
    const { reset } = this;
    return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/foo'>Foo</Link>
          </li>
          <li>
            <Link to='/bazz'>Bazz</Link>
          </li>
        </ul>
        <h1><button onClick={ reset }>{ counter }</button></h1>
        <Route component={ Foo } path='/foo' />
        <Route component={ Bazz } path='/bazz' />
      </div>
    </Router>
    );
  };
}

setInterval(()=> {
  const state = getState();
  state.counter = state.counter || 0;
  state.counter++;
  publish(state);
}, 1000);
