import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';



class DogPic extends React.Component {

    constructor (props) {
      super(props);
      this.state={
        pic: null
      }
    }

    async handleDogPic() {
      const result = await axios({
        method: 'GET',
        url: 'https://dog.ceo/api/breeds/image/random'
      });

      this.setState({pic: result.data});
    }

    render() {
      if (this.state.pic){
        return <div class="box">
          <img src={this.state.pic.message} alt="dog pic" height="300px" width="400px"></img>
        </div>
      } else {
        return <div class="box">
          <br></br>
          <br></br>
          <button class="button is-warning" onClick={()=>this.handleDogPic()}>Maybe a dog pic will do the trick</button>
          <br></br>
          <br></br>
        </div>
      }
    }
  }

export default DogPic;