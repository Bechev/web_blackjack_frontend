import React, { Component } from 'react';
import Card from './Card.js'
import './blackjack.css'

class Hand extends Component {
  constructor(props){
    super(props)
  }

  renderHand(){
    const cards = this.props.cards
    if(cards === undefined){
      return(
        <React.Fragment>
          <Card faceDown={true}/>
          <Card faceDown={true}/>
        </React.Fragment>
      )
    }else{
      if(cards.length === 1 ){
        return(
          <React.Fragment>
              <Card faceDown={true}/>
              <Card card={cards[0]}/>
          </React.Fragment>
          )
      }else{
        return(
          <React.Fragment>
            {this.props.cards.map((card)=>{
              return(
                <React.Fragment>
                  <Card card={card}/>
                </React.Fragment>
              )
            })}
        </React.Fragment>
        )
      }
    }
  }

    render() { 

    return (
      <div>
          {this.renderHand()}
      </div>
    );
  }
}
    
export default Hand;
