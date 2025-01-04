import Tile from "./Tile"
import RowTile from "./RowTile"
import ColTile from "./ColTile"
import { useState, useEffect, useContext } from "react"
import '../css/GameBoard.css'
import { AppContext } from "../App"

function GameBoard() {

    const {populateGameBoard, gameBoard, setGameBoard} = useContext(AppContext)

    useEffect(()=>{
        setGameBoard(populateGameBoard(5, 5))
    }, [])



  return (
    <section className="GameBoard">
        {gameBoard.map((value, i)=>(
            <div className="Row" key={i}>
                {gameBoard[i].map((value, i) => (
                    <Tile key={`tile ${i}`} value={value}/>
                ))}
                <RowTile GameBoard={gameBoard} index={i}/>
            </div>
        ))}
        <div className="Row">
        {gameBoard[0].map((value,i)=>(
            <ColTile key={`col ${i}`} GameBoard={gameBoard} index={i} />
        ))}
        </div>
    </section>
    
  )
}

export default GameBoard