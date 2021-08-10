import React, { Component } from 'react';

import wabalabadubdub from '../songs/wabalabadubdub.mp3';

import Stopwatch from './Stopwatch';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      counter: 0,
      keyCodeSecDisplay: "flex",
      rickAppear: "none",
    }

  }
  
  keyPressUp = (event) => {
    const { target: { style }, keyCode } = event;
    if (keyCode === 38) {
      style.background = 'gray';
      this.setState(({ counter }) => ({ counter : counter + 1}));
    } else {
      this.setState(() => ({ counter : 0 }));
      style.background = 'red';
    }
  }

  keyPressDown = (event) => {
    const { target: { style }, keyCode } = event;
    if (keyCode === 40) {
      style.background = 'gray';
      this.setState(({ counter }) => ({ counter : counter + 1}));
    } else {
      this.setState(() => ({ counter : 0 }));
      style.background = 'red';
    }
  }

  keyPressLeft = (event) => {
    const { target: { style }, keyCode } = event;
    if (keyCode === 37) {
      style.background = 'gray';
      this.setState(({ counter }) => ({ counter : counter + 1}));
    } else {
      this.setState(() => ({ counter : 0 }));
      style.background = 'red';
    }
  }

  keyPressRight = (event) => {
    const { target: { style }, keyCode } = event;
    if (keyCode === 39) {
      style.background = 'gray';
      this.setState(({ counter }) => ({ counter : counter + 1}));
    } else {
      this.setState(() => ({ counter : 0 }));
      style.background = 'red';
    }
  }

  keyPressB = (event) => {
    const { target: { style }, keyCode } = event;
    if (keyCode === 66) {
      style.background = 'gray';
      this.setState(({ counter }) => ({ counter : counter + 1}));
    } else {
      this.setState(() => ({ counter : 0 }));
      style.background = 'red';
    }
  }

  keyPressA = (event) => {
    const { target: { style }, keyCode } = event;
    if (keyCode === 65) {
      style.background = 'green';
      this.setState(({ counter }) => ({
        counter : counter + 1,
        keyCodeSecDisplay: 'none',
      }));
    } else {
      this.setState(() => ({ counter : 0 }));
      style.background = 'red';
    }
  }

  konamiCode = (event) => {
    const { counter } = this.state;

    if (counter === 0) {
      this.keyPressUp(event);
    }
    if (counter === 1) {
      this.keyPressUp(event);
    }
    if (counter === 2) {
      this.keyPressDown(event);
    }
    if (counter === 3) {
      this.keyPressDown(event);
    }
    if (counter === 4) {
      this.keyPressLeft(event);
    }
    if (counter === 5) {
      this.keyPressRight(event);
    }
    if (counter === 6) {
      this.keyPressLeft(event);
    }
    if (counter === 7) {
      this.keyPressRight(event);
    }
    if (counter === 8) {
      this.keyPressB(event);
    }
    if (counter === 9) {
      this.keyPressA(event);
    }

  }

  render() {
    const { keyCodeSecDisplay } =  this.state;
    return (
      <div className="main">
        <section style={{ display: keyCodeSecDisplay }} >
          <h3>Konami Code</h3>
          <input onKeyDown={ this.konamiCode } type="text" name="konamiCode" id="konamiCode" />
        </section>
        <Stopwatch />
      </div>
    );
  }
}

export default Main;