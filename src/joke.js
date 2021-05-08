import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


class JokeButton extends React.Component {

    constructor(props) {
      super(props);
      this.state= {
        paragraph: null,
        fullJokeIsVisible: false
      };
    };

    async handlerJokeSetup() {
      const result = await axios({
        method: 'get',
        url: 'https://official-joke-api.appspot.com/random_joke',
      });
      this.setState({paragraph: result.data, fullJokeIsVisible:false});
    }

    handlerShowPunchline() {
      this.setState({fullJokeIsVisible: true})
      
    };


    render() {
      if (this.state.paragraph) {
        
        if (this.state.fullJokeIsVisible){
          
          return <div class="columns">
                    <div class="column">
                      <div class="box">
                        <p>{this.state.paragraph.setup}</p>
                        <br></br>
                        <p class="is-primary">{this.state.paragraph.punchline}</p>
                        <button class="button is-warning" onClick={() => this.handlerJokeSetup()}>I need another joke <strong><em>&nbsp;now.</em></strong></button>
                        
                      </div>
                    </div>
                  </div>

        } else {
          
          return <div class="columns">
                  <div class="column">
                    <div class="box">
                      <p>{this.state.paragraph.setup}</p>
                      <br></br>
                      <br></br>
                      <button class="button is-warning" onClick={() => this.handlerShowPunchline()}>I'm intrigued...&nbsp;say more&nbsp;</button>
                      
                    </div>
                  </div>
                </div>
        }
      
      } else {
        return <div class="columns">
                  <div class="column">
                    <div class="box">
                      <br></br>
                      <br></br>
                      <button class="button is-warning" onClick={() => this.handlerJokeSetup()}>I'd like to hear a joke</button>
                      
                    </div>
                  </div>
                </div>
      }
    }

  }

export default JokeButton;