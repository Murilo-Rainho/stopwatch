import React, { Component } from 'react';

import wabalabadubdub from '../songs/wabalabadubdub.mp3';

import Stopwatch from './Stopwatch';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="main">
        <Stopwatch />
        <section>

        </section>
      </div>
    );
  }
}

export default Main;