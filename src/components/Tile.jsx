import '../css/Tile.css'
import { useState, useEffect, useRef, useContext } from 'react'
import { AppContext } from '../App';

function Tile({value}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const tileRef = useRef(null)
    const {increaseScore, handleLose, resetCounter} = useContext(AppContext);

    const handleClick = () => {
        //increase coins if first flip
        if(!isFlipped) increaseScore(value)
        if(value === -1) handleLose();
        setIsFlipped(true);
    }

    useEffect(()=>{
        if(isFlipped){
            tileRef.current.classList.add("flip")
        }
    },[isFlipped])

    useEffect(()=>{
        tileRef.current.classList.remove("flip")
        setIsFlipped(false);
    },[resetCounter])
  return (
    <div className="tile" onClick={handleClick} ref={tileRef}>
        {value===-1?<img className="bomb" src="miku.png"></img>:value}
    </div>
  )
}

export default Tile