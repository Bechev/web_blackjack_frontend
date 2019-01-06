import React, { Component } from 'react';
import Card from './Card.js'
import './blackjack.css'

class PointsCounter extends Component {
  constructor(props){
    super(props)
    this.state = {
        
    }
  }

  renderCounter(){
    const cards = this.props.cards
    return(
      <React.Fragment>
        {cards.map((card)=>{
          return(
            <React.Fragment>
              <Card card={card}/>
            </React.Fragment>
          )
        })}
      </React.Fragment>
      )
  }

    render() { 
    return (
      <div className="pointCounter">
          {this.renderCounter()}
      </div>
    );
  }
}
    
export default PointsCounter;
