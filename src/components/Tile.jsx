import '../css/Tile.css'
import { useState, useEffect, useRef, useContext } from 'react'
import { AppContext } from '../App';

function Tile({value, id}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const tileRef = useRef(null)
    const {currentActiveCell, increaseScore, handleLose, gameState} = useContext(AppContext);

    const handleClick = () => {
        //increase coins if first flip
        if(gameState != "playing") return //only click if game is runnign
        if(!isFlipped) increaseScore(value)
        if(value === -1) handleLose();
        setIsFlipped(true);
    }

    useEffect(()=>{
        if(isFlipped){
            tileRef.current.classList.add("flip")
        } else{
            tileRef.current.classList.remove("flip")
        }
    },[isFlipped])

    useEffect(()=>{
        if(gameState==="revealAll"){
            setIsFlipped(true);
        }
        if(gameState==="playing"){
            setIsFlipped(false);
        }
    },[gameState])
  return (
    <div className={`tile ${currentActiveCell === id ? 'active-tile' : ''}`} onClick={handleClick} ref={tileRef}>
        {value===-1?<img className="bomb" src="miku.png"></img>:value}
    </div>
  )
}

export default Tile