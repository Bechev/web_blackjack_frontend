import React, { Component } from 'react';
import Button from './Button.js'
import './blackjack.css'

class Dashboard extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.setState({
      game_status: this.props.game_status,
      active_hand: this.props.active_hand
    })
  }
  
    render() { 
      let dealIsActive = true
      let hitIsActive = false
      let standIsActive = false
      let doubleIsActive = false
      let splitIsActive = false
      if(this.props.game_status === 'ongoing'){
        // Check if the promise has been fulfilled
        if(this.props.active_hand){
          dealIsActive = false
          hitIsActive = true
          standIsActive = true
          // Check if first turn to allow double
          if(this.props.active_hand.cards.length === 2){
            doubleIsActive = true
            // Check if the hand has 2 cards and if they are the same to allow split
            if(this.props.active_hand.cards[0][0] === this.props.active_hand.cards[1][0]){
              splitIsActive = true
            }
          }
        }

      }
        
    return (
      <div className='dashboard'>
            <Button name='Draw' handleClick={this.props.deal.bind(this)} isActive={dealIsActive}/>
            <Button name='Hit'handleClick={this.props.hit.bind(this)} isActive={hitIsActive}/>
            <Button name='Stand'handleClick={this.props.stand.bind(this)} isActive={standIsActive}/>
            <Button name='Double'handleClick={this.props.double.bind(this)} isActive={doubleIsActive}/>
            <Button name='Split'handleClick={this.props.split.bind(this)} isActive={splitIsActive}/>
      </div>
    );
  }
}
    
export default Dashboard;