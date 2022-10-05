import { nanoid } from "nanoid"
import React from "react"
import './Die.css'

export default function Die(props) {
  return (
    <div 
      className={props.fixed? `die value-${props.dieValue} clicked` : `die value-${props.dieValue}`}
      onClick={ () => props.fixDie(props.dieKey) }
    >
      {[...Array(props.dieValue)].map( () => 
        <React.Fragment key={nanoid()}>
          <span className="dot"></span>   
        </React.Fragment>
      )}  
    </div>
  )   
}