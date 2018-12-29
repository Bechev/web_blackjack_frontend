import React, { Component } from 'react';
import Card from './Card.js'
import Button from './Button.js'
import './blackjack.css'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      gameStatus: 'not started',
      dealerHand: [],
      dealerPoints: 0,
      playerHand: [],
      playerPoints: 0
    }
  }


// ASYNC FUNCTIONS ///////////////////////////////////////////////////////////////////////
  deal(){
    if (this.state.gameStatus === 'not started' || this.state.gameStatus === 'push' || this.state.gameStatus === 'lost' || 
        this.state.gameStatus === 'busted' || this.state.gameStatus === 'won' || this.state.gameStatus === 'blackjack'){
      fetch('http://localhost:3000/hands/create')
      .then(response => {
        return response.json();
      })
      .then(function(data) {
        if(parseInt(data.player_hand_value) === 21){
          this.setState({
            gameStatus: 'blackjack'
          })
        }else {
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
    fetch('http://localhost:3000/hands/hit')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      this.setState({
        playerHand: data.player_hand,
        playerPoints: data.player_hand_value
      })
      if(parseInt(data.player_hand_value)>=21){
        this.stand()
      }
    }.bind(this));
    }
  }

  stand(){
    if(this.state.gameStatus === 'ongoing'){
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
        })
        if(parseInt(data.player_hand_value) > 21){
          this.setState({
            gameStatus: 'busted'
          })
        }else if(parseInt(data.dealer_hand_value) > 21){
          this.setState({
            gameStatus: 'won'
          })
        } else {
          if(parseInt(data.dealer_hand_value) > parseInt(data.player_hand_value)){
            this.setState({
              gameStatus: 'lost'
            })
          }else if (parseInt(data.dealer_hand_value) === parseInt(data.player_hand_value)){
            this.setState({
              gameStatus: 'push'
            })
          }else{
            this.setState({
              gameStatus: 'won'
            })
          }
        }
      }.bind(this));
    }
  }  
// END OF ASYNC FUNCTIONS //////////////////////////////////////////////////////////


// TO BE REMOVED //////////////
  log_state(){
    console.log(this.state)
  }
///////////////////////////////  

// RENDER FUNCTIONS ///////////////////////////////////////////////////////////////////
  renderHand(hand){
    if (hand.length === 0){
      return(
        <span className='card-container'>
          <Card flipped={false}/>
          <Card flipped={false}/>
        </span>
      )
    } 
   else {
      return(
        hand.map(card => {
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

  renderResult(){
    let results
    if( this.state.gameStatus === 'lost' || this.state.gameStatus === 'busted'){
      results = 'lostGame'
    }else if(this.state.gameStatus === 'won' || this.state.gameStatus === 'blackjack'){
      results = 'wonGame'
    } else if(this.state.gameStatus === 'push'){
      results = 'tieGame'
    }
    return results
  }

  // renderGameStatus(){
  //   if (this.state.gameStatus === 'lost' ||
  //       this.state.gameStatus === 'busted' ||
  //       this.state.gameStatus === 'won'||
  //       this.state.gameStatus === 'blackjack'){

  //         return(
  //           <div>
  //             {this.state.gameStatus}
  //           </div>
  //         )
  //       }
  // }
// END OF RENDER FUNCTIONS ///////////////////////////////////////////////////////////////////
    render() {
      let drawIsActive = true
      let hitIsActive = false
      let standIsActive = false

      if(this.state.gameStatus === 'lost'){
        
      } else if(this.state.gameStatus === 'ongoing') { 
        drawIsActive = false
        hitIsActive = true
        standIsActive = true
      }


    
    return (
      <div className='background'>   
        <span>

          <div className= 'dealerHand'>
            {this.renderPoints('dealer')}
            {this.renderHand(this.state.dealerHand)}
          </div>

          <div className='playerHand'>
            {this.renderPoints('player')}

            {/* {this.renderGameStatus()} */}
            <div className={this.renderResult()}>
              {this.renderHand(this.state.playerHand)}
            </div>
          </div>

        </span>
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
