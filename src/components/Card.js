import React, { Component } from 'react';
import './card.css';

class Card extends Component {

  constructor(props){
    super(props)
    this.state = {
        flipped: this.props.flipped
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
                <div className="card flippedCard">{this.props.card.slice(0,-1)}</div>
            )
        }else if (this.state.flipped === false){
            return(
            <div className="card unflippedCard"></div>
            )
        }
    }
   
    render() { 
    return (
      <div onClick={this.handleClick}>
            {this.renderCard()}
      </div>
    );
  }
}
    
export default Card;
