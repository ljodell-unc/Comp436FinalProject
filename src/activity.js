import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


class ActivityButton extends React.Component {

    constructor (props) {
      super(props);
      this.state = {
          paragraph: null,
      };
    }

    async handlerActivity () {
      const result = await axios({
        method: 'get',
        url: '//www.boredapi.com/api/activity/',
      });
      this.setState({paragraph: result.data.activity});
    };

    render () {
      if (this.state.paragraph) {
        return <div class="columns is-centered">
                  <div class="column is-half">
                    <div class="box">
                      <p class="is-full">Maybe try to... {this.state.paragraph}</p>
                      <br></br>
                      <button class="button is-warning" onClick={() => this.handlerActivity()}>Help, I'm Still Bored</button>
                      
                    </div>
                  </div>
                </div>
                    
      } else {
        return <div class="columns is-centered">
                  <div class="column is-half">
                    <div class="box">
                      <br></br>
                      <button class="button is-warning" onClick={() => this.handlerActivity()}>Help, I'm Still Bored</button>
                      
                    </div>
                  </div>
                </div>
                      
      }
    }
  }

  export default ActivityButton;