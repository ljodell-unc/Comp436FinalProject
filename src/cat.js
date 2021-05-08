import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


class CatPic extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        fact: null
      }
    }

    async handleCatPic() {
      const result = await axios({
        method: 'GET',
        url: 'https://thatcopy.pw/catapi/rest/'
      });

      this.setState({fact: result.data});
    }

    render() {
      if(this.state.fact) {
        return <div class="box">
                <img src={this.state.fact.url} alt="cat photo" height="300px" width="300px"></img>
                </div>
      } else {
        return <div class="box">
                <br></br>
                <br></br>
                  <button class="button is-warning" onClick={()=>this.handleCatPic()}>I need a cat pic</button>
                <br></br>
                <br></br>
        </div>
      }
      
    }
  }

export default CatPic;