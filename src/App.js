import React, { Component } from 'react';
import { HashRouter as Router, Link, Route } from 
'react-router-dom';
import { getState, publish, subscribe } from './store';

const Foo = ()=> {
  return <div>Foo</div>;
};

const Bar = ()=> {
  return <div>Bar</div>;
};
import Bazz from './Bazz'

export default class App extends Component{
  constructor(){
    super();
    const state = getState();
    this.state = {
      counter: state.counter || 0
    };
  }
  componentDidMount(){
    subscribe((state)=> {
      this.setState({ counter: state.counter || 0});
      
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
        <Link to='/foo'>Foo</Link>
        <Link to='/bar'>Bar</Link>
        <Link to='/bazz'>Bazz</Link>
        <h1><button onClick={ reset }>{ counter }</button></h1>
        <Route component={ Foo } path='/foo' />
        <Route component={ Bar } path='/bar' />
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
