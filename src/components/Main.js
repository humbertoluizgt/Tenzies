import React, {useState, useEffect} from "react";
import { nanoid } from 'nanoid'
import { useElapsedTime } from "use-elapsed-time";
import './Main.css'
import Die from "./Die"
import Confetti from 'react-confetti'
import Popup from './Popup'
import Rank from './Rank'

export default function Main() {

  const [dice, setDice] = useState( () => {    
    const diceArr = []
    for (let i = 0; i < 10; i++) {
      diceArr.push(
        {
          key: nanoid(),
          value: Math.floor(Math.random() * 6 + 1),                   
          fixed: false
        }
      )      
    }
    return diceArr
  })

  const [gameOver, setGameOver] = useState(false)

  const [isPopupOn, setIsPopupOn] = useState(true)

  const { elapsedTime, reset } = useElapsedTime( { isPlaying: !gameOver } ) 

  const [numberRolls, setNumberRolls] = useState(0)

  const [formData, setFormData] = useState({
    playerName: ""
  })  

  function holdDie(key) {
    setDice(olddice => olddice.map(die => (
      die.key === key
      ? {...die, fixed: !die.fixed}
      : {...die}
    )))
  }

  function displayDie() {
        return dice.map(die => 
          <React.Fragment key={die.key}>
            <Die 
              dieValue={die.value} 
              dieKey={die.key}
              fixed={die.fixed}
              fixDie={holdDie}
            />
          </React.Fragment>
        )  
  }

  function rollDice() {
    setDice( olddice => olddice.map(dice => (      
        dice.fixed === true
        ? {...dice}
        : {...dice, value: Math.floor(Math.random() * 6 + 1)} 
    )))
    dice.every(die => die.fixed) ? 
    setNumberRolls(prevValue => prevValue) 
    : setNumberRolls(prevValue => prevValue + 1)    
  }

  function resetGame() {
    //roll dice
    setDice( olddice => olddice.map(dice => (      
      {...dice, value: Math.floor(Math.random() * 6 + 1), fixed: false} 
  )))
    //Reset the time
    reset(newStartAt => 0)
    //Reset popup visibility
    setIsPopupOn( true )
    //Reset Rolls atempts
    setNumberRolls(0)
  }

  function handleData(event) {
    const {name, value} = event.target      
    setFormData(prevData => {
      return (
        {
          ...prevData,
          [name]: value
        }
      ) 
    })    
  }

  function handleSubmit(event) {
    event.preventDefault()
    const prevRank = localStorage.getItem("ranking")? 
      JSON.parse(localStorage.getItem("ranking"))
      : []    

    prevRank.push({
      "player": formData.playerName, 
      "time": parseInt(elapsedTime),
      "rolls": numberRolls,
      "score": 100 - parseInt(elapsedTime) - numberRolls
    }) 
    
    localStorage.setItem("ranking", 
      JSON.stringify(prevRank)
    )

    //console.log(JSON.parse(localStorage.getItem("ranking")));
    setIsPopupOn(false)
  }

  //useEffect hook will check if all dice are the same every time they change. 
  //If so, Reset button.
  useEffect( () => { 
    setIsPopupOn(true)
    const dieValue = dice[0].value    
    return (      
      dice.every(alldice => alldice.value === dieValue) && 
      dice.every(alldice => alldice.fixed === true)
      ? setGameOver(true)
      : setGameOver(false) 
    )    
  }, [dice])  


  return (
    <main>    
      <div className="main--outer-container">
        {gameOver && 
        <Confetti
          position={"absolute"}
          width={"540px"}
          height={"570px"}
        />}             
        <div className="main--inner-container">
          <h3 className="main--title">Tenzies</h3>
          <p className="main--description">
            Roll until all dice are the same. 
            Click each dice to freeze it at its 
            current value between rolls.
          </p>
          <div className="main--dice-container">
            {displayDie()} 
          </div>
          <div className="main--stats">            
            <h3>Time Elapsed: {parseInt(elapsedTime)}s</h3>
            <h3>No of Rolls: {parseInt(numberRolls)}</h3>
          </div>                            
          <button             
            className="main--roll-button"
            onClick={gameOver? resetGame : rollDice}
          >              
              {gameOver? "Reset" : "Roll"}            
          </button> 
          <button 
            className="main--restart-button"
            onClick={resetGame}
          >
            Restart Game
          </button>                        
        </div>
        { gameOver && 
          isPopupOn && 
          <Popup
            elapsedTime={elapsedTime} 
            numberRolls={numberRolls}
            isPopupOn={ () => setIsPopupOn(false) }
            playerName={formData.playerName}
            handleData={ (event) => handleData(event) }
            handleSubmit={ (event) => handleSubmit(event) }  
          />
        }
      </div>
      {
        localStorage.getItem("ranking") && 
        <Rank />
      }      
    </main>
  )
}