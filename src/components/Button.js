import React, { Component }  from 'react'
import './blackjack.css'

class Button extends Component {

    constructor(props){
        super(props)
      }
  
    handleClick = () => {
        if (this.props.isActive){
            this.props.handleClick()
        }
    }
    
    render() {
        let buttonClass = 'button';
        if (this.props.isActive) {
            buttonClass += ' active_button';
        }
        
    return (
        <button className={buttonClass}  onClick={this.handleClick}>{this.props.name}</button>
    );
  }
}
    
export default Button;