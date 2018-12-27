import React, { Component } from 'react';
import Card from './Card.js'
import Button from './Button.js'
import './blackjack.css'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      dealerHand: [],
      playerHand: []

    }
  }

  deal(){
    console.log('Deal Cards')
    fetch('http://localhost:3000/hands/create')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
  
    // fetch("http://localhost:3000/hands/create",{
    //   mode: "no-cors"
    // })
    //   .then(response =>{
    //     console.log(response)
    //     // response.json
    //   })
    //   .then(data =>{
    //     console.log(data)
    //     // this.setState({
    //     //   dealerHand: data.dealer_show
    //     // })
    //   })
    //   // console.log(this.state.dealerHand)
  }  
  
  hit(){
    console.log('Hit Cards')
  }  

  stand(){
    console.log('Stand Cards')
  }  

    render() {
    
    return (
      <div className='background'>   
        <div className= 'dealerHand'>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div className= 'playerHand'>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div className= 'dashboard'>
          <Button name='Draw' handleClick={this.deal}></Button>
          <Button name='Hit'handleClick={this.hit}></Button>
          <Button name='Stand'handleClick={this.stand}></Button>
        </div>
      </div>
    );
  }
}
    
export default Home;
