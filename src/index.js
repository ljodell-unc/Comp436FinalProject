import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

import CardGame from './blackjack.js';
import ActivityButton from './activity.js';
import JokeButton from './joke.js';
import DogPic from './dog.js';
import CatPic from './cat.js';
import Game from './game.js';


  ReactDOM.render(
    <div>
      
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"></link>
      
      <div class="hero is-full has-background">
        <img class="hero-background" src="https://static.vecteezy.com/system/resources/previews/001/984/910/original/abstract-template-blue-stripes-line-pattern-with-red-effect-futuristic-digital-technologyr-background-free-vector.jpg" alt="webkinz banner"></img>
        <div class="box hero-body is-transparent">
          <div id="pageHeader" class="title"> 
            Welcome to the Serotonin Booster
          </div>
          <div id="pageSubtitle" class="subtitle">
            Scroll down to enjoy.
          </div>  
        </div>
        <div class="box is-transparent welcome">
            <div class="subtitle">
              Stay as long as you need fam.
            </div>
          </div>
      </div>
      <div id="background3">
      <div class="box has-background-black-bis">
        <br></br>
        <div class="title has-text-centered has-text-white-bis"><p>Our Library</p></div> 
        <br></br>
        <p class="title has-text-white-bis has-text-centered">&#8681;&nbsp; &#8681;&nbsp; &#8681;&nbsp; &#8681;&nbsp; &#8681;&nbsp; &#8681;&nbsp; &#8681;&nbsp; &#8681;&nbsp; &#8681;</p>
      </div>
          <br></br>
          <br></br>
      
          <div class="columns is-centered is-desktop">
            
            <div class="columns is-multiline m-4 is-desktop">
              <div class="column is-full">
                <CatPic />
              </div>
              <div class="column is-full">
                  <DogPic />
              </div>

            </div>
            
            
            <div class="column box is-half " id="gameBackground">
              <p class="title">Connect Four</p>
              <p class="subtitle">Try to get four in a row to win!</p>
              <Game />
              <br></br>
              
            </div>
            <div class="columns m-4 is-desktop">
              <div class="column is-full">
                <JokeButton />
              </div>
              
            </div>
          </div>
          <div class="columns is-desktop">
            <div class="column">
              <div class="box m-6">
                <p class="title">Blackjack</p>
                <p class="subtitle">Think you can beat the dealer? Get as close as you can to 21 without going over!</p>
                <CardGame />
              </div>
            </div>
          </div>
         <div>
           <ActivityButton />
         </div>
        <br></br>
          
      </div>
    </div>,
    
    document.getElementById('root')
  );
  

  