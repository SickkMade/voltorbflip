import '../css/Tile.css'
import { useState, useEffect, useRef, useContext } from 'react'
import { AppContext } from '../App';

function Tile({value, id}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isBombIndicatorActive, setIsBombIndicatorActive] = useState(false);
    const [is1IndicatorActive, setIs1IndicatorActive] = useState(false);
    const [is2IndicatorActive, setIs2IndicatorActive] = useState(false);
    const [is3IndicatorActive, setIs3IndicatorActive] = useState(false);
    const tileRef = useRef(null)
    const {setCurrentActiveCell, currentActiveCell, increaseScore, handleLose, gameState} = useContext(AppContext);

    const handleClick = () => {
        //increase coins if first flip
        setCurrentActiveCell(id)
        if(gameState != "playing") return //only click if game is runnign
        if(!isFlipped) increaseScore(value)
        if(value === -1) handleLose();
        setIsFlipped(true);
        setIsBombIndicatorActive(false)
        setIs3IndicatorActive(false)
        setIs2IndicatorActive(false)
        setIs1IndicatorActive(false)
    }

    useEffect(()=>{
        const onKeyboard = (e) => {
            if(gameState==='revealAll')return
            if(e.key === ' ' && currentActiveCell === id){
                handleClick()
            }
            if(e.key==='`' && currentActiveCell === id){
                setIsBombIndicatorActive(prevValue => !prevValue)
            }
            if(e.key==='1' && currentActiveCell === id){
                setIs1IndicatorActive(prevValue => !prevValue)
            }
            if(e.key==='2' && currentActiveCell === id){
                setIs2IndicatorActive(prevValue => !prevValue)
            }
            if(e.key==='3' && currentActiveCell === id){
                setIs3IndicatorActive(prevValue => !prevValue)
            }
        }

        window.addEventListener('keydown', onKeyboard);
        return () => window.removeEventListener('keydown', onKeyboard);

    },[currentActiveCell])

    useEffect(()=>{
        if(gameState==="revealAll"){
            setIsFlipped(true);
            setIsBombIndicatorActive(false)
            setIs3IndicatorActive(false)
            setIs2IndicatorActive(false)
            setIs1IndicatorActive(false)
        }
        if(gameState==="playing"){
            setIsFlipped(false);
        }
    },[gameState])
  return (
    <div className={`tile ${isFlipped ? 'flip' : ''} ${currentActiveCell === id ? 'active-tile' : ''}`} onClick={handleClick} ref={tileRef}>
        {value===-1?<img className="bomb" src="miku.png"></img>:value}
        {isBombIndicatorActive && <span className="indicator indicator-bomb"></span>}
        {is1IndicatorActive && <span className="indicator indicator-1">1</span>}
        {is2IndicatorActive && <span className="indicator indicator-2">2</span>}
        {is3IndicatorActive && <span className="indicator indicator-3">3</span>}
    </div>
  )
}

export default Tile