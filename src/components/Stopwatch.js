import React, { Component } from 'react';

import mr_meeseeks from '../songs/mr_meeseeks.mp3';
import evil_morty from '../songs/evil_morty.mp3';
import get_schwifty from '../songs/get_schwifty.mp3';
import i_am_alive from '../songs/i_am_alive.mp3';
import do_you_feel_it from '../songs/do_you_feel_it.mp3';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    
    this.mr_meeseeks = new Audio(mr_meeseeks);
    this.evil_morty = new Audio(evil_morty);
    this.get_schwifty = new Audio(get_schwifty);
    this.i_am_alive = new Audio(i_am_alive);
    this.do_you_feel_it = new Audio(do_you_feel_it);
    
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
      allMusics: [this.get_schwifty, this.evil_morty, this.mr_meeseeks,
        this.i_am_alive, this.do_you_feel_it],
      previousMusic: this.get_schwifty,
      currentMusic: this.evil_morty,
      nextMusic: this.mr_meeseeks,
      counterMusic: 2,
      blockNextMusic: false,
      blockPreviousMusic: true,
    }
  }

  playPause = () => {
    const { musicSituation, currentMusic } = this.state;
    if (musicSituation) {
      currentMusic.pause();
      this.setState(() => ({ musicSituation: false }));
    } else {
      currentMusic.play();
      this.setState(() => ({ musicSituation: true }));
    }
  }

  muteOnOff = () => {
    const { soundSituation, currentMusic } = this.state;
    if (soundSituation) {
      this.setState(() => ({ soundSituation: false }));
    } else {
      this.setState(() => ({ soundSituation: true }));
    }
    currentMusic.muted = soundSituation;
  }

  volMaxMin = async ({ target: { name } }) => {
    if (name === 'Max' && this.state.volume <= 0.9) {
      this.setState(({ volume }) => ({
        volume: parseFloat((volume + 0.1).toPrecision(1))
      }), () => {
        const { volume, currentMusic } = this.state;
        currentMusic.volume = volume;
      });
    } else if (name === 'Min' && this.state.volume >= 0.1) {
      this.setState(({ volume }) => ({
        volume: parseFloat((volume - 0.1).toPrecision(1))
      }), () => {
        const { volume, currentMusic } = this.state;
        currentMusic.volume = volume;
      });
    }
    this.setState(({ volume }) => ({ volumeText: `${Math.ceil(volume * 100)}%` }));
  }

  musicChange = ({ target: { name } }) => {
    const { currentMusic, nextMusic, previousMusic, counterMusic,
      allMusics, volume } = this.state;
    if (name === 'next') {
      currentMusic.pause();
      currentMusic.currentTime = 0;
      nextMusic.play();
      nextMusic.volume = volume;
      this.setState((prevState) => ({
        previousMusic: prevState.currentMusic,
        currentMusic: prevState.nextMusic,
        counterMusic: prevState.counterMusic + 1,
        blockPreviousMusic: false,
      }), () => {
        if (counterMusic === 4) {
          this.setState(() => ({ blockNextMusic: true }));
        }
        this.setState(({ counterMusic }) => ({ nextMusic: allMusics[counterMusic] }));
      });
    } else {
      currentMusic.pause();
      currentMusic.currentTime = 0;
      previousMusic.play();
      previousMusic.volume = volume;
      this.setState((prevState) => ({
        nextMusic: prevState.currentMusic,
        currentMusic: prevState.previousMusic,
        counterMusic: prevState.counterMusic - 1,
        blockNextMusic: false,
      }), () => {
        if (counterMusic === 2) {
          this.setState(() => ({ blockPreviousMusic: true }));
        }
        this.setState(({ counterMusic }) => ({ previousMusic: allMusics[counterMusic - 2] }));
      });
    }
  }

  turnOn = () => {
    const { volume, currentMusic } = this.state;
    this.playPause();
    currentMusic.volume = volume;
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
    if (sec === 0 && min === 0 && hr === 0) {
      this.setState(() => ({ buttonDisable: true }));
    } else {
      this.setState(() => ({ buttonDisable: false }));
    }
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
    const { volumeText, musicSituation, blockNextMusic,
      soundSituation, blockPreviousMusic } = this.state;
    return (
      <section className="music-buttons">
        <h2>Music Player</h2>
        <div className="volume-buttons">
          <button name="Max" onClick={ this.volMaxMin } className="button">
            Vol. +
          </button>
          <button disabled className="button">{volumeText}</button>
          <button name="Min" onClick={ this.volMaxMin } className="button">
            Vol. -
          </button>
        </div>
        <button onClick={ this.playPause } className="button">
          {musicSituation ? 'Pause' : 'Play'}
        </button>
        <button onClick={ this.muteOnOff } className="button">
          {soundSituation ? 'Mute' : 'Unmute'}
        </button>
        <button disabled={ blockNextMusic } onClick={ this.musicChange } name="next" className="button">
          Next
        </button>
        <button disabled={ blockPreviousMusic } onClick={ this.musicChange } name="previous" className="button">
          Previous
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
            <h2>Stopwatch Player</h2>
            <button disabled={ buttonDisable } className="button" onClick={ this.turnOn }>Start</button>
          </section>
          { this.musicButtons() }
        </section>
      </section>
    );
  }
}

export default Stopwatch;