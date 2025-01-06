import '../css/Tile.css'
import { useState, useEffect, useRef, useContext } from 'react'
import { AppContext } from '../App';

function Tile({value, id}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const tileRef = useRef(null)
    const {setCurrentActiveCell, currentActiveCell, increaseScore, handleLose, gameState} = useContext(AppContext);

    const handleClick = () => {
        //increase coins if first flip
        setCurrentActiveCell(id)
        if(gameState != "playing") return //only click if game is runnign
        if(!isFlipped) increaseScore(value)
        if(value === -1) handleLose();
        setIsFlipped(true);
    }

    useEffect(()=>{
        const onSpace = (e) => {
            if(e.key === ' ' && currentActiveCell === id){
                setIsFlipped(true);
            }
        }

        window.addEventListener('keydown', onSpace);
        return () => window.removeEventListener('keydown', onSpace);

    },[currentActiveCell])

    useEffect(()=>{
        if(gameState==="revealAll"){
            setIsFlipped(true);
        }
        if(gameState==="playing"){
            setIsFlipped(false);
        }
    },[gameState])
  return (
    <div className={`tile ${isFlipped ? 'flip' : ''} ${currentActiveCell === id ? 'active-tile' : ''}`} onClick={handleClick} ref={tileRef}>
        {value===-1?<img className="bomb" src="miku.png"></img>:value}
    </div>
  )
}

export default Tile