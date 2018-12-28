import React, { Component } from 'react';
import Card from './Card.js'
import Button from './Button.js'
import './blackjack.css'

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
    console.log(hand)
    if (hand.length === 0){
      return(
        <span className='card-container'>
          <Card card={"  "} flipped={false}/>
          <Card card={"  "} flipped={false}/>
        </span>
      )
    } 
   else {
      return(
        hand.map(card => {
          console.log(card)
          return(
            <span>
              <Card card={card} flipped={true}/>
            </span>
          )
        })
      )
    }
  }
  
  renderPoints(player){
    if (player === 'dealer'){
      return(
        <div className='pointsCounter'>
          Dealer's hand: {this.state.dealerPoints}
        </div>
      )
    }else if(player === 'player'){
      return(
        <div className='pointsCounter'>
          Player's hand: {this.state.playerPoints}
        </div>
      )
    }
  }

    render() {
      let drawIsActive = true
      let hitIsActive = false
      let standIsActive = false

      if(this.state.gameStatus == 'over'){
        
      } else if(this.state.gameStatus == 'ongoing') { 
        drawIsActive = false
        hitIsActive = true
        standIsActive = true
      }

      // let results=""
      // if (this.state.gameStatus == 'over'){
      //   results += "result"
      // }
    
    return (
      <div className='background'>   
        <div className= 'dealerHand'>
          {this.renderPoints('dealer')}
          {this.renderHand(this.state.dealerHand)}
        </div>
        <div className='playerHand'>
          {this.renderPoints('player')}
          <div className={results}>
            {this.renderHand(this.state.playerHand)}
          </div>
        </div>
        <div className= 'dashboard'>
          <Button name='Draw' handleClick={this.deal.bind(this)} isActive={drawIsActive}></Button>
          <Button name='Hit' handleClick={this.hit.bind(this)} isActive={hitIsActive}></Button>
          <Button name='Stand' handleClick={this.stand.bind(this)} isActive={standIsActive}></Button>
          <Button name='Log state' handleClick={this.log_state.bind(this)} isActive={true}></Button>
        </div>
      </div>
    );
  }
}
    
export default Home;
