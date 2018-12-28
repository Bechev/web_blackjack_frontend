import React, { Component }  from 'react'
import './blackjack.css'

class Button extends Component {

    // constructor(props){
    //     super(props)
    //   }
  
    
    render() {
        let buttonClass = 'button';
        if (this.props.isActive) {
            buttonClass += ' active';
        }
        
    return (
        <button className={buttonClass}  onClick={this.props.handleClick}>{this.props.name}</button>
    );
  }
}
    
export default Button;