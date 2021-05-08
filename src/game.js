import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

function imageSelector(props) {
    if (props.value === 'X') {
      return "button is-warning m-1";         
    } else if (props.value === 'O') {
      return "button is-danger m-1"
      
      
    } else {
      return "button m-2"
    
    }
  }
  
  function Square(props) {
    if (props.value=== 'X' || props.value === 'O') {
      return(<button class={imageSelector(props)} onClick={props.onClick} disabled>
        {props.value}
      </button>)
    }
     
    return(<button class={imageSelector(props)} onClick={props.onClick}>
            {props.value}
  
          </button>)
      
  };
    
    class Board extends React.Component {
  
      constructor (props) {
          super(props);
          this.state = {
              squares: Array(9).fill(null),
              goldIsNext: true,
          };
      }
  
      handleClick(i) {
          const squares =
              this.state.squares.slice();
          
          if (calculateWinner(squares) || squares[i]) {
              return;
          } else {
              let emptyTileBelow = [false, null];
              for (let emptySpaceUnderneath = i; emptySpaceUnderneath <=41; emptySpaceUnderneath = emptySpaceUnderneath +7) {
                  if (squares[emptySpaceUnderneath]) {
                      break;
                  } else {
                      emptyTileBelow = [true, emptySpaceUnderneath];
                  }
  
              }
              if (emptyTileBelow[0]) {
                  squares[emptyTileBelow[1]] = this.state.goldIsNext ? `X` : 'O';
                  this.setState({squares: squares,
                                  goldIsNext: !this.state.goldIsNext,});
              
              } else {
                  squares[i] = this.state.goldIsNext ? `X` : 'O';
                  this.setState({squares: squares,
                                  goldIsNext: !this.state.goldIsNext,});
              }
  
  
              // letting the computer choose a random move
              if (calculateWinner(squares)) {
                  return;
              } else {
                  setTimeout(()=> {
                      let setTile = false;
                      while(!setTile) {
                          let randomTileColumn = Math.floor(Math.random()*(7));
                              if (!squares[randomTileColumn]){
                                  let emptyTileBelow = [false, null];
                                  for (let emptySpaceUnderneath = randomTileColumn; emptySpaceUnderneath <=41; emptySpaceUnderneath = emptySpaceUnderneath +7) {
                                      if (squares[emptySpaceUnderneath]) {
                                          break;
                                      } else {
                                          emptyTileBelow = [true, emptySpaceUnderneath];
                                      }
  
                                  }
                                  if (emptyTileBelow[0]) {
                                      squares[emptyTileBelow[1]] = this.state.goldIsNext ? `X` : 'O';
                                      this.setState({squares: squares,
                                                      goldIsNext: !this.state.goldIsNext,});
                                  
                                  } else {
                                      squares[i] = this.state.goldIsNext ? `X` : 'O';
                                      this.setState({squares: squares,
                                                      goldIsNext: !this.state.goldIsNext,});
                                  }
                                  setTile = true;
                              }
                              
                          
                      }
                  
                  }, 1000);
              }
              
              
          
          };
      };
  
      onResetClick(props) {
        this.setState({squares: Array(9).fill(null), goldIsNext: true});
      }
  
      renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
      }
    
      render() {
          const winner = calculateWinner(this.state.squares);
          let status;
          if (winner) {
              if (winner === "tie!") {
                  status = "It's a draw!";
              } else {
                  status = 'Winner: ' + winner;
              }
              
          } else {
              status = (this.state.goldIsNext ? 'Your turn! (X)' : 'Waiting for the other player... (O)');
          }
  
          // went right under background div --> <div className="status">{status}</div>
  
        return (
          <div>
            
            <div class="subtitle">
              <p>{status}</p>
            </div>
            <div class="columns is-centered">
              <div class="column" >
                <div class="box has-background-link" id="connectBoard">
                  
                    <div class="columns"/*className="board-row"*/ >
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(0)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(1)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(2)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(3)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(4)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(5)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(6)}
                      </div>
                    </div>
                    <div class="columns"/*className="board-row"*/>
                        <div class="column is-auto py-0 my-0">
                          {this.renderSquare(7)}
                        </div>
                        <div class="column is-auto py-0 my-0">
                          {this.renderSquare(8)}
                        </div>
                        <div class="column is-auto py-0 my-0">
                          {this.renderSquare(9)}
                        </div>
                        <div class="column is-auto py-0 my-0">
                          {this.renderSquare(10)}
                        </div>
                        <div class="column is-auto py-0 my-0">
                          {this.renderSquare(11)}
                        </div>
                        <div class="column is-auto py-0 my-0">
                          {this.renderSquare(12)}
                        </div>
                        <div class="column is-auto py-0 my-0">
                          {this.renderSquare(13)}
                        </div>
                    </div>
                    <div class="columns"/*className="board-row"*/>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(14)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(15)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(16)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(17)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(18)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(19)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(20)}
                      </div>
                    </div>
                    <div class="columns"/*className="board-row"*/>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(21)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(22)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(23)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(24)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(25)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(26)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(27)}
                      </div>
                    </div>
                    <div class="columns"/*className="board-row"*/>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(28)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(29)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(30)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(31)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(32)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(33)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(34)}
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(35)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(36)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(37)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(38)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(39)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(40)}
                      </div>
                      <div class="column is-auto py-0 my-0">
                        {this.renderSquare(41)}
                      </div>
                    
          
                    </div>
                </div>
              </div>
            
              
            </div>
            <br></br>
           
            <button class="button is-link" onClick={() => this.onResetClick()}>Reset</button>
          </div>
          
        );
      }
    }
    
    class Game extends React.Component {
      render() {
        return (
          <div className="game">
            <div className="game-board">
              <Board />
            </div>
            
          </div>
        );
      }
    }
  
  
    function calculateWinner(squares) {
      // checking if they won
      const lines =[
          // down and right diagonals
          [14, 22, 30, 38],
  
          [7, 15, 23, 31],
          [15, 23, 31, 39],
  
          [0, 8, 16, 24],
          [8, 16, 24, 32],
          [16, 24, 32, 40],
  
          [1, 9, 17, 25],
          [9, 17, 25, 33],
          [17, 25, 33, 41],
  
          [2, 10, 18, 26],
          [10, 18, 26, 34],
  
          [3, 11, 19, 27],
  
          // up and right diagonal
          [21,15,9,3],
  
          [28, 22, 16, 10],
          [22, 16, 10, 4],
  
          [35, 29, 23, 17],
          [29, 23, 17, 11],
          [23, 17, 11, 5],
          
          [36, 30, 24, 18],
          [30, 24, 18, 12],
          [24, 18, 12, 6],
  
          [37, 31, 25, 19],
          [31, 25, 19, 13],
          
          [38, 32, 26, 20],
  
          // checking horizontally
  
          [0, 1, 2, 3],
          [1, 2, 3, 4],
          [2, 3, 4, 5],
          [3, 4, 5, 6],
          
          [7, 8, 9, 10],
          [8, 9, 10, 11],
          [9, 10, 11, 12],
          [10, 11, 12, 13],
  
          [14, 15, 16 ,17],
          [15, 16, 17, 18],
          [16, 17, 18, 19],
          [17, 18, 19, 20],
  
          [21, 22, 23, 24],
          [22, 23, 24, 25],
          [23, 24, 25, 26],
          [24, 25, 26, 27],
  
          [28, 29, 30, 31],
          [29, 30, 31, 32],
          [30, 31, 32, 33],
          [31, 32, 33, 34],
  
          [35, 36, 37, 38],
          [36, 37, 38, 39],
          [37, 38, 39, 40],
          [38, 39, 40, 41],
  
          // checking vertically
  
          [0, 7, 14, 21],
          [7, 14, 21, 28],
          [14, 21, 28, 35],
  
          [1, 8, 15, 22],
          [8, 15, 22, 29],
          [15, 22, 29, 36],
          
          [2, 9, 16, 23],
          [9, 16, 23, 30],
          [16, 23, 30, 37],
  
          [3, 10, 17, 24],
          [10, 17, 24, 31],
          [17, 24, 31, 38],
  
          [4, 11, 18, 25],
          [11, 18, 25, 32],
          [18, 25, 32, 39],
  
          [5, 12, 19, 26],
          [12, 19, 26, 33],
          [19, 26, 33, 40],
  
          [6, 13, 20, 27],
          [13, 20, 27, 34],
          [20, 27, 34, 41]
  
      ];
  
      for (let i = 0; i < lines.length; i++) {
          const [a, b, c, d] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
              return squares[a];
          }
      }
  
      // checking if there aren't any moves left -- if so, then it's a tie!
      let filledTiles = 0;
      for (let i = 0; i < squares.length; i++) {
          if (squares[i]) {
              filledTiles = filledTiles + 1;
              if (filledTiles === squares.length) {
                  return "tie!";
              }
          }
  
      }
  
  
      // else return null and keep playing the game
      return null;
    }

export default Game;