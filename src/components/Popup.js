import React from "react";
import './Popup.css'

export default function Popup(props) {
  return (
    <section 
      className="popup--section"      
    >
        <i className="fa-solid fa-xmark" onClick={props.isPopupOn}></i>
        <h1 className="popup--title">
          Congragulations!
        </h1>
        <p className="popup--description">
          {`You finished the game in ${parseInt(props.elapsedTime)}s rolling dice ${props.numberRolls} times`}
        </p>
        <form className="popup--form" onSubmit={props.handleSubmit}>
          <fieldset className="popup--fieldset">
            <label htmlFor="player-name" className="popup--input-label">
              Name:            
            </label>
            <input 
              className="popup--input" 
              type="text" 
              name="playerName"
              value={props.playerName}             
              onChange={props.handleData} 
              placeholder="Type your Name"             
            /> 
          </fieldset>          
          <button className="popup--button">
            Save my records
          </button>
        </form>
    </section>
  )
}