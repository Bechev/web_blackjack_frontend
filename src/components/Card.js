import React, { Component } from 'react';
import './card.css';

class Card extends Component {

  constructor(props){
    super(props)
    this.state = {
        flipped: false
    }
  }

  handleClick =(event) => {
      event.preventDefault()
      this.setState({
          flipped: !this.state.flipped
        })
        console.log(this.state.flipped)
  }


    renderCard(){
        if (this.state.flipped === true){
            return (
                <div className="card flippedCard"></div>
            )
        }else if (this.state.flipped === false){
            return(
            <div className="card unflippedCard"></div>
            )
        }
    }
   
    render() { 
    return (
      <div className="hand" onClick={this.handleClick}>
            {this.renderCard()}
      </div>
    );
  }
}
    
export default Card;
