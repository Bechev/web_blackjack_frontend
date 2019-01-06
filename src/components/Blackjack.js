import React, { Component } from 'react';
import Table from './Table.js'
import Dashboard from './Dashboard.js'
import './blackjack.css'

class Blackjack extends Component {
  constructor(props){
    super(props)
    this.state ={
      test: [],
      game: "",
      player_hands: [],
      game_status: "not started",
      active_game: "",
      active_hand: "",
      active_hand_iterator: 0,
      active_hand_unique_id: ""
    }
  }

  deal(){
    fetch('http://localhost:3000/games/create')
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      this.setState({
        game: data,
        game_status: 'ongoing',
      })
      this.sort_hands_by_player()
    }.bind(this))
  }

  sort_hands_by_player = () => {
    let player_hands = []
    this.state.game.player_hands.map((player_hand)=>{
      player_hands.push(player_hand)
    })
    player_hands = player_hands.sort(function(a,b){
      let ownerA = a.owner.toLowerCase()
      let ownerB = b.owner.toLowerCase()  
      if (ownerA < ownerB) {
        return -1;
      }
      if (ownerA > ownerB) {
        return 1;
      }
      if (ownerA === ownerB)
      {
        return a.id - b.id
      }
    })
    this.setState({
      player_hands: player_hands
    },() => this.parseGameData())
  }

  parseGameData = () => {
    // Check if we iterated over each players hands and reset state if so
    if(this.state.active_hand_iterator <= this.state.player_hands.length - 1){
      console.log("setState executed")
      this.setState({
        active_game: this.state.game,
        active_game_unique_id: this.state.game.game_unique_id,
        active_hand: this.state.player_hands[this.state.active_hand_iterator],
        active_hand_unique_id: this.state.player_hands[this.state.active_hand_iterator].unique_id
      }, () => this.manageHandValue())
    } else {
      console.log("setState not executed")
      this.resetState()
    }
  }

  resetState(){
    this.setState({
      active_game: "",
      active_hand_unique_id: "",
      active_hand_iterator: 0,
      active_hand: ""
    })
  }

  manageHandValue(){
    if(this.state.active_hand.value >= 21){
      this.stand()
    }
  }

  hit(){
    fetch('http://localhost:3000/games/hit', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        active_hand_unique_id: this.state.active_hand_unique_id, 
        active_game_unique_id: this.state.active_game_unique_id})
    })
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      this.setState({
        game: data,
      })
      this.sort_hands_by_player()
    }.bind(this))
  }

  double(){
    fetch('http://localhost:3000/games/double', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        active_hand_unique_id: this.state.active_hand_unique_id, 
        active_game_unique_id: this.state.active_game_unique_id})
    })
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      this.setState({
        game: data,
      })
      this.sort_hands_by_player()
    }.bind(this))
  }

  double(){
    this.hit()
    this.stand()
  }

  split(){
    fetch('http://localhost:3000/games/split', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        active_hand_unique_id: this.state.active_hand_unique_id, 
        active_game_unique_id: this.state.active_game_unique_id})
    })
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      this.setState({
        game: data,
      })
      this.sort_hands_by_player()
    }.bind(this))
  }

  stand(){
    if(this.state.active_hand_iterator <= this.state.player_hands.length - 1){
      if(this.state.active_hand_iterator === this.state.player_hands.length - 1){
        this.setState({
          active_hand_iterator: this.state.active_hand_iterator + 1,
        },() => this.stand())
      }else{
        this.setState({
        active_hand_iterator: this.state.active_hand_iterator + 1,
        active_hand: this.state.player_hands[this.state.active_hand_iterator + 1],
        active_hand_unique_id: this.state.player_hands[this.state.active_hand_iterator + 1].unique_id
        }, () => {
          // Check if the hand that we iterate to is a blackjack and skips if needed
          if(this.state.active_hand.value >= 21){
            this.stand()
          }
        })
      }
    }else{
      this.end()
    }
  }

  end(){
    fetch('http://localhost:3000/games/end', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        active_hand_unique_id: this.state.active_hand_unique_id, 
        active_game_unique_id: this.state.active_game_unique_id})
    })
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      this.setState({
        game: data,
        game_status: 'not started',
      })
      this.sort_hands_by_player()
      this.resetState()
    }.bind(this))
  }

  render() {
    return (
      <div className = 'main'>
        <div className='background'>
          <Table game={this.state.game} player_hands= {this.state.player_hands} game_status={this.state.game_status} active_hand_unique_id={this.state.active_hand_unique_id}/>
          <div className= 'dashboard'>
            <Dashboard deal={this.deal.bind(this)} 
                      hit={this.hit.bind(this)}
                      stand={this.stand.bind(this)}
                      double={this.double.bind(this)}
                      split={this.split.bind(this)}
                      game_status={this.state.game_status}
                      game={this.state.game}
                      active_hand={this.state.active_hand}/>
          </div>
        </div>
      </div>
    );
  }
}
    
export default Blackjack;
