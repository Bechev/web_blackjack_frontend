import React, { Component } from 'react';
import './blackjack.css'
import hearts from '../assets/cards_hearts.png'
import diamonds from '../assets/cards_diamonds.png'
import spades from '../assets/cards_spades.png'
import clubs from '../assets/cards_clubs.png'
import bolt from '../assets/bolt.png'

class Card extends Component {

    renderCard(){
        if(this.props.card){

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
                <React.Fragment>
                {this.props.card.slice(0,-1)}
                <React.Fragment>
                    <img className="card-symbol-minature" src={card_symbol} alt='card' height="25" width="25"></img>
                    <img className="card-symbol" src={card_symbol} alt='card' height="25" width="25"></img>
                </React.Fragment>
            </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                        <img className="card_background" src={bolt} alt='card_background' height="75" width="75" ></img>
                </React.Fragment>
            )
        }
    }
   
    render() { 
        let cardClass = 'card'
        if (this.props.faceDown === true){
            cardClass += ' faceDownCard'
        }else{
            cardClass += ' faceUpCard'
        }

    return (
        <div className={cardClass}>
            {this.renderCard()}
        </div>
    );
  }
}
    
export default Card;
