import React, { Component } from 'react';
import './blackjack.css'
import hearts from '../assets/cards_hearts.jpg'
import diamonds from '../assets/cards_diamonds.jpg'
import spades from '../assets/cards_spades.jpg'
import clubs from '../assets/cards_clubs.jpg'
import './card.css';

class Card extends Component {

    renderCard(){
        if (this.props.flipped === true){
            let card_symbol = null
            switch(this.props.card[this.props.card.length -1]){
                case 'h':
                    card_symbol = hearts
                    break
                case 's':
                    card_symbol = spades
                    break
                case 'c':
                    card_symbol = clubs
                    break
                case 'd':
                    card_symbol = diamonds
                    break
            }
            return (
                <div className="card flippedCard">
                    {this.props.card.slice(0,-1)}
                    <span>
                        <img className="card-symbol" src={card_symbol} alt='card' height="25" width="25"></img>
                    </span>
                </div>
            )
        }else if (this.props.flipped === false){
            return (
                <div className="card unflippedCard"></div>
            )
        }
    }
   
    render() { 
    return (
      <span className='card-container' onClick={this.handleClick}>
            {this.renderCard()}
      </span>
    );
  }
}
    
export default Card;
