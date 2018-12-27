import React, { Component } from 'react';
import Card from './Card.js'
import Button from './Button.js'
import './blackjack.css'
import './card.css'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      gameStatus: 'over',
      dealerHand: [],
      dealerPoints: 0,
      playerHand: [],
      playerPoints: 0
    }
  }

  deal(){
    if (this.state.gameStatus === 'over'){
      console.log('Deal Cards')
      fetch('http://localhost:3000/hands/create')
      .then(response => {
        return response.json();
      })
      .then(function(data) {
        if(parseInt(data.player_hand_value) >= 21){
          this.setState({
            gameStatus: 'over'
          })
        }else{
          this.setState({
            gameStatus: 'ongoing'
          })
        }
        this.setState({
          dealerHand: [data.dealer_show],
          dealerPoints: data.dealer_hand_value,
          playerHand: data.player_hand,
          playerPoints: data.player_hand_value
        })
      }.bind(this))
    }
  }  
  
  hit(){
    if (this.state.gameStatus === 'ongoing'){
      console.log('Hit Cards')
    fetch('http://localhost:3000/hands/hit')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
      if(parseInt(data.player_hand_value) >= 21){
        this.setState({
          gameStatus: 'over'
        })
      }
      this.setState({
        playerHand: data.player_hand,
        playerPoints: data.player_hand_value
      })
    }.bind(this));
    }
  }  

  stand(){
    if(this.state.gameStatus === 'ongoing'){
      console.log('Stand Cards')
      fetch('http://localhost:3000/hands/stand')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        this.setState({
          dealerHand: data.dealer_hand,
          dealerPoints: data.dealer_hand_value,
          playerHand: data.player_hand,
          playerPoints: data.player_hand_value,
          gameStatus: 'over'
        })
      }.bind(this));
    }
  }  

// TO BE REMOVED //////////////
  log_state(){
    console.log(this.state)
  }
///////////////////////////////  

  renderHand(hand){
    return(
      hand.map(card => {
        console.log(card)
        return(
          <div className='hand'>
            <Card card={card} flipped={true}/>
          </div>
        )
      })
    )
  }
  
  renderPoints(player){
    if (player == 'dealer'){
      return(
        <div className='dealerPoints'>
          {this.state.dealerPoints}
        </div>
      )
    }else if(player == 'player'){
      return(
        <div className='playerPoints'>
          {this.state.playerPoints}
        </div>
      )
    }
  }

    render() {
    
    return (
      <div className='background'>   
        <div className= 'dealerHand'>
          {this.renderHand(this.state.dealerHand)}
          {this.renderPoints('dealer')}
        </div>
        <div className= 'playerHand'>
          {this.renderHand(this.state.playerHand)}
          {this.renderPoints('player')}
        </div>
        <div className= 'dashboard'>
          <Button name='Draw' handleClick={this.deal.bind(this)}></Button>
          <Button name='Hit'handleClick={this.hit.bind(this)}></Button>
          <Button name='Stand'handleClick={this.stand.bind(this)}></Button>
          <Button name='Log state'handleClick={this.log_state.bind(this)}></Button>
        </div>
      </div>
    );
  }
}
    
export default Home;
