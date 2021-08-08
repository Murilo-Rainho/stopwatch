import React, { Component } from 'react';

import mr_meeseeks from '../songs/mr_meeseeks.mp3';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sec: 0,
      min: 0,
      hr: 0,
      disappear: 'flex',
      buttonDisable: false,
      musicSituation: false,
      soundSituation: true,
      volume: 0.5,
      volumeText: '50%',
    }

    this.mr_meeseeks = new Audio(mr_meeseeks);
  }

  playPause = () => {
    const { musicSituation } = this.state;
    if (musicSituation) {
      this.mr_meeseeks.pause();
      this.setState(() => ({ musicSituation: false }));
    } else {
      this.mr_meeseeks.play();
      this.setState(() => ({ musicSituation: true }));
    }
  }

  muteOnOff = () => {
    const { soundSituation } = this.state;
    if (soundSituation) {
      this.setState(() => ({ soundSituation: false }));
    } else {
      this.setState(() => ({ soundSituation: true }));
    }
    this.mr_meeseeks.muted = soundSituation;
  }

  volMaxMin = ({ target: { name } }) => {
    if (name === 'Max' && this.state.volume <= 0.9) {
      this.setState(({ volume }) => ({ volume: volume + 1/10 }));
    } else if (name === 'Min' && this.state.volume >= 0.1) {
      this.setState(({ volume }) => ({ volume: volume - 1/10 }));
    }
    const { volume } = this.state;
    this.mr_meeseeks.volume = volume;
    this.setState(({ volume }) => ({ volumeText: `${Math.ceil(volume * 100)}%` }));
  }

  turnOn = () => {
    const { volume } = this.state;
    this.playPause();
    this.mr_meeseeks.volume = volume;
    this.setState(() => ({ disappear: 'none',  }));
    const ONE_SECOND = 100;
    let timerSet = setInterval(() => {
      const { sec, min, hr } = this.state;
      if (sec === 0 && min === 0 && hr === 0) {
        this.stopTimerSet();
      } else {
        this.setState(({ sec }) => ({ sec: sec - 1 }));
        if (sec === 0 && min >= 0) {
          this.setState(({ min }) => ({
            min: min - 1,
            sec: 59,
          }));
        }
        if (min === 0 && hr >= 0 && sec === 0) {
          this.setState(({ hr }) => ({
            hr: hr - 1,
            min: 59,
          }));
        }
      }

    }, ONE_SECOND);
    this.setState(() => ({ timerSet: timerSet }))
  }

  stopTimerSet = () => {
    this.setState(() => ({ disappear: 'flex' }))
    let { timerSet } = this.state;
    this.setState(() => ({ sec: 0 }))
    clearInterval(timerSet);
  }

  handleChange = ({ target }) => {
    const { sec, min, hr } = this.state;
    const { name, value } = target;
    if (!value) {
      this.setState(() => ({ [name]: 0 }));
    } else {
      if (name === 'hr' && value > 23) {
        this.setState(() => ({ [name]: 23 }));
        target.value = 23;
      } else if (value > 59) {
        this.setState(() => ({ [name]: 59 }));
        target.value = 59;
      } else {
        this.setState(() => ({ [name]: parseInt(value) }));
      }
    }
    // if (sec === 0 && min === 0 && hr === 0) {
    //   this.setState(() => ({ buttonDisable: true }));
    //   console.log('oi');
    // } else {
    //   console.log('ola');
    //   this.setState(() => ({ buttonDisable: false }));
    // }
  }

  inputsNumbers = () => {
    const { disappear } = this.state;
    return (
      <section style={{ display: `${ disappear }` }} className="timer-inputs">
        <input
          onChange={ this.handleChange }
          max="59"
          placeholder="HR"
          className="input-number"
          type="number"
          name="hr" 
          id="hr"
        />
        <p className="two-points">:</p>
        <input
          onChange={ this.handleChange }
          max="59"
          placeholder="MIN"
          className="input-number"
          type="number"
          name="min"
          id="min"
        />
        <p className="two-points">:</p>
        <input
          onChange={ this.handleChange }
          max="59"
          placeholder="SEC"
          className="input-number"
          type="number"
          name="sec"
          id="sec"
        />
      </section>
    );
  }

  musicButtons = () => {
    const { volumeText, musicSituation, soundSituation } = this.state;
    return (
      <section className="music-buttons">
        <button onClick={ this.playPause } className="button">
          {musicSituation ? 'Pause' : 'Play'}
        </button>
        <button onClick={ this.muteOnOff } className="button">
          {soundSituation ? 'Mute' : 'Unmute'}
        </button>
        <button name="Max" onClick={ this.volMaxMin } className="button">
          Vol. +
        </button>
        <button disabled className="button">{volumeText}</button>
        <button name="Min" onClick={ this.volMaxMin } className="button">
          Vol. -
        </button>
      </section>
    );
  }
  
  render() {
    const { sec, min, hr, buttonDisable } = this.state;
    return (
      <section className="stopwatch">
        <section className="timer">
          <h1>{ hr } : { min } : { sec }</h1>
        </section>
        <section className="timer-buttons_container">
          { this.inputsNumbers() }
          <section className="timer-buttons">
            <button disabled={ buttonDisable } className="button" onClick={ this.turnOn }>Start</button>
          </section>
          { this.musicButtons() }
        </section>
      </section>
    );
  }
}

export default Stopwatch;