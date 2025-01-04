import Tile from "./Tile"
import { useState } from "react"
import '../css/GameBoard.css'

function GameBoard() {

    const [gameBoard, setGameBoard] = useState(Array.from(Array(5), () => new Array(5).fill(0)))

  return (
    <section className="GameBoard">
        {gameBoard.map((value, i)=>(
            <div className="Row" key={i}>
                {gameBoard[i].map((value, i) => (
                    <Tile key={`tile ${i}`} value={value}/>
                ))}
            </div>
        ))}
    </section>
    
  )
}

export default GameBoard