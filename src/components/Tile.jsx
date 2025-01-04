import '../css/Tile.css'
import { useState, useEffect, useRef } from 'react'

function Tile({value}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const tileRef = useRef(null)
    const clicked = () => setIsFlipped(true);
    useEffect(()=>{
        if(isFlipped){
            tileRef.current.classList.add("flip")
        }
    },[isFlipped])
  return (
    <div className="tile" onClick={clicked} ref={tileRef}>{value}</div>
  )
}

export default Tile