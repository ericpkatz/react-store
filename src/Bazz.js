import React, { Component } from 'react';
import { subscribe, getState } from './store';

export default class Foo extends Component{
  constructor(){
    super();
    const _state = getState();
    this.state = {
      counter: _state.counter
    };
  }
  componentDidMount(){
    this.unsubscribe = subscribe((state)=> {
      this.setState({ counter: state.counter});
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
