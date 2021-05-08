import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


class CardGame extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            cardDeck: null,
            gameStarted: false,
            currentCards: [{image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"}, 
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
                        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"}],
            hasHold: false,
            hasBust: false,
            cardTotal: 0,
        };
    };

    async handleStartGame() {
        const result = await axios({
            method: 'GET',
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
        })
        let target = "https://deckofcardsapi.com/api/deck/" + result.data.deck_id +"/draw/?count=2";

        const twoCards = await axios({
            method: 'GET',
            url: target
        });

        let updated = [twoCards.data.cards[0], 
        twoCards.data.cards[1],
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"},
        {image: 'https://cdn.shopify.com/s/files/1/0405/8713/products/light_grey_-_prisma_2048x.jpg?v=1419994106', value: "0"}];

        this.setState({cardDeck: result.data, currentCards: updated, gameStarted: true, hasHold: false});
       
    
    };

    cardRendering() {
        let targetDisplay=``;
        for (let i =0; i < this.state.currentCards.length; i++) {
            targetDisplay = targetDisplay + <div class="column">
                                                <img src={this.state.currentCards[i].image} alt="card"></img>
                                            </div>;
        }
        return targetDisplay;
    }

    cardCounter() {
        let total =0;
        for (let i=0; i < this.state.currentCards.length; i++) {
            if (this.state.currentCards[i].value === "KING" || this.state.currentCards[i].value === "QUEEN" || this.state.currentCards[i].value === "JACK") {
                total = total + 10;
            } else if (this.state.currentCards[i].value === "ACE") {
                if (total + 11 <= 21) {
                    total = total + 11;
                } else {
                    total = total + 1;
                }
            } else {
                total = total + parseInt(this.state.currentCards[i].value);
            }
            
        }
       
        return total;
    }

    async handlerHit() {
        if (this.state.hasBust) {
            return;
        }
        let target = "https://deckofcardsapi.com/api/deck/" + this.state.cardDeck.deck_id +"/draw/?count=1";
        const result = await axios({
            method: 'GET',
            url: target
        })

        
        let updatedCards = Array(10).fill(null);
        for (let i = 0; i< this.state.currentCards.length; i++) {
            updatedCards[i] = this.state.currentCards[i];
        }
        

        let drawncard=0;
        for (let x = 0; x < updatedCards.length; x++) {
            if (updatedCards[x].value === "0" && drawncard === 0) {
                updatedCards[x] = result.data.cards[0];
                drawncard =1;
            } 
        }

        this.setState({currentCards: updatedCards});
    }

    getStatus() {
        if (this.state.hasBust) {
            return;
        }
        let dealersHand = 0;
        // getting random number between 1-10 (inclusive)
        let randomChance = Math.floor(Math.random()*(Math.floor(10) - Math.ceil(1)+1)+1);
        if (randomChance === 1) {
            dealersHand = 25;
        } else {
            dealersHand = Math.floor(Math.random()*(Math.floor(21)-Math.ceil(17)+1)+17);
        }

        if (this.cardCounter() <= dealersHand && dealersHand <=21) {
            return "Sorry, Charlie! You Lost. The Dealer had a total of " + dealersHand + ". Better luck next time.";
        } else {
            return "We got ourselves a winner! The Dealer had a total of " + dealersHand + ". Congrats!"
        }
    }


    checkForBust() {
        let currentTotal = this.cardCounter();
        if (currentTotal >21) {
            
            return "You have " + currentTotal + "...what a bust, sorry man. Better luck next time.";
        } else {
            return "Current Total: " + currentTotal;
        }
    }

    handlerHold() {
        this.setState({hasHold: true});
    }

    render() {
        let bust = false;
        if (this.cardCounter() >21) {
            bust =true;
        }
        if (this.state.gameStarted) {
            if (this.state.hasHold) {
                return <div class="box has-background-primary-dark">
                                <div class="box has-background-primary m-1">
                                    <div class="columns">
                                        <div class="column">
                                                <img src={this.state.currentCards[0].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[1].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[2].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[3].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[4].image} alt="card"></img>
                                        </div>
                                    </div>
                                    
                                    <p class="subtitle">{this.getStatus()}</p>
                                    
                                    <button class="button is-warning" onClick={()=> this.handleStartGame()}>Deal Me In</button>
                                </div>
                            </div>
            } else if (bust){
                return <div class="box has-background-primary-dark">
                            <div class="box has-background-primary m-1">
                                <div class="columns">
                                    <div class="column">
                                            <img src={this.state.currentCards[0].image} alt="card"></img>
                                    </div>
                                    <div class="column">
                                            <img src={this.state.currentCards[1].image} alt="card"></img>
                                    </div>
                                    <div class="column">
                                            <img src={this.state.currentCards[2].image} alt="card"></img>
                                    </div>
                                    <div class="column">
                                            <img src={this.state.currentCards[3].image} alt="card"></img>
                                    </div>
                                    <div class="column">
                                            <img src={this.state.currentCards[4].image} alt="card"></img>
                                    </div>
                                </div>
                                
                                <p class="subtitle">{this.checkForBust()}</p>
                                
                                <button class="button is-warning" onClick={()=> this.handleStartGame()}>Deal Me In</button>
                            </div>
                        </div>
            } else {
                    return <div class="box has-background-primary-dark">
                                <div class="box has-background-primary m-1">
                                    <div class="columns">
                                        <div class="column">
                                                <img src={this.state.currentCards[0].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[1].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[2].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[3].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[4].image} alt="card"></img>
                                        </div>
                                    </div>
                                    
                                    <p class="subtitle">{this.checkForBust()}</p>
                                    
                                    <button class="button is-warning" onClick={()=> this.handlerHit()}>Hit</button>
                                    &nbsp;
                                    <button class="button is-warning" onClick={()=> this.handlerHold()}>Hold</button>
                                </div>
                            </div>
                }
            } else { 

                return <div class="box has-background-primary-dark">
                                <div class="box has-background-primary m-1">
                                    <div class="columns">
                                        <div class="column">
                                                <img src={this.state.currentCards[0].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[1].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[2].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[3].image} alt="card"></img>
                                        </div>
                                        <div class="column">
                                                <img src={this.state.currentCards[4].image} alt="card"></img>
                                        </div>
                                    </div>
                                    <br></br>
                                    <button class="button is-warning" onClick={()=> this.handleStartGame()}>Deal Me In</button>
                                </div>
                            </div>

                
            }
    }


}

export default CardGame;
