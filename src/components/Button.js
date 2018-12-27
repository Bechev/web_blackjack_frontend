import React from 'react'
import './blackjack.css'

const Button = props => <button className='button' onClick={props.handleClick}>{props.name}</button>;

export default Button;