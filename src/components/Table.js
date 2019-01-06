import React, { Component } from 'react';
import Hand from './Hand.js'
import './blackjack.css'

class Table extends Component {

  constructor(props){
    super(props)
  }

    renderDealerHand(){
        if(this.props.game.dealer_hand){
        return(
                <div className='dealer_dashboard'>
                    <div className="pointsCounter">
                        Points: {this.props.game.dealer_hand_value}
                    </div>
                    <div className='dealer_hand'>
                        <Hand cards={this.props.game.dealer_hand} owner='dealer' id={this.props.game.dealer_hand.unique_id}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div className='dealer_dashboard'>
                    <div className="pointsCounter">
                        Points: {this.props.game.dealer_hand_value}
                    </div>
                    <div className='dealer_hand'>
                        <Hand owner='dealer'/>
                    </div>
                </div>
            )
        }
    }
    
    renderPlayerHands(){
        const player_hands = this.props.player_hands
        if (player_hands.length === 0){
            return(
                <React.Fragment>
                    <div className="player_dashboard">
                        <div className="pointsCounter">
                            Points: {this.props.game.dealer_hand_value}
                        </div>
                        <div className='hand'>
                            <Hand owner='player'/>
                        </div>
                    </div>
                </React.Fragment>
            )
        }else{
            return(   
                <div className='player_hands'>
                    {player_hands.map((hand) =>{
                        let playerDashboardClass = 'player_dashboard'
                        // Format active hands
                        if (this.props.active_hand_unique_id == hand.unique_id){
                            playerDashboardClass += ' activeHand'
                        }
                        
                        // Format results
                        // Check results for unfinished games (blackjack or bust)
                        let handClass = 'hand'
                        let gameStatus = ""
                        if(hand.value === 21 && hand.cards.length === 2){
                            handClass += ' blackjack'
                            gameStatus = "BlackJack !"
                        }
                        if(hand.value > 21){
                            handClass += ' lostGame'
                            gameStatus = "Bust"
                        }
                        
                        // Check results for finished games 
                        if(hand.result){
                            switch(hand.result){
                            case 'win':
                                handClass += ' wonGame'
                                gameStatus = "Win"
                                break
                            case 'push':
                                handClass += ' tieGame'
                                gameStatus = "Push"
                                break
                            case 'lose':
                                handClass += ' lostGame'
                                gameStatus = "Lost"
                                break
                            case 'blackjack':
                                handClass += ' blackjack'
                                gameStatus = "BlackJack !"
                                break
                            case 'default':
                                break
                            }
                        }

                        // if(hand.result){
                        //     if(this.props.game.dealer_hand_value > 21){
                        //         if(hand.value < 21){
                        //             handClass += ' wonGame'
                        //             gameStatus = "Win"
                        //         }
                        //         else if(hand.value === 21 && hand.cards.length !=2){
                        //             handClass += ' wonGame'
                        //             gameStatus = "Win"
                        //         }else{
                        //             handClass += ' lostGame'
                        //             gameStatus = "Lost"
                        //         }
                        //     }else if (this.props.game.dealer_hand_value <= 21){
                        //         if(hand.value > 21){
                        //             handClass += ' lostGame'
                        //             gameStatus = "Lost"
                        //         }else{ 
                        //             if(hand.value > this.props.game.dealer_hand_value ){
                        //                 handClass += ' wonGame'
                        //                 gameStatus = "Win"
                        //             }else if(hand.value < this.props.game.dealer_hand_value){
                        //                 handClass += ' lostGame'
                        //                 gameStatus = "Lost"
                        //             }else if( hand.value === this.props.game.dealer_hand_value){
                        //                 handClass += ' tieGame'
                        //                 gameStatus = "Push"
                        //             }
                        //         }
                        //     }
                        // }

                        return(
                            <div className={playerDashboardClass}>
                                <div className='pointsCounter'>
                                    Points: {hand.value}
                                </div>
                                <div className={handClass}>
                                    <Hand cards={hand.cards} owner={hand.owner} id={hand.unique_id}/>
                                    {gameStatus}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    render() {  
    return (
        <div className='table'>
            {this.renderDealerHand()}
            {this.renderPlayerHands()}
        </div>
    );
  }
}
    
export default Table;
