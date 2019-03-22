import React, { Component } from 'react';
import { subscribe, getState } from './store';

export default class Foo extends Component{
  constructor(){
    super();
    const _state = getState();
    this.state = {
      counter: _state.counter || 0
    };
  }
  componentDidMount(){
    this.unsubscribe = subscribe((state)=> {
      console.log(state);
      this.setState({ counter: state.counter || 0});
    });
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  render(){
    const { counter } = this.state;
    return (
      <div>{ counter }</div>
    );
  }
}
