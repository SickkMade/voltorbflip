import GameBoard from "./components/GameBoard"
import Stats from "./components/Stats"
import { useState, createContext } from "react"

export const AppContext = createContext();

function App() {
  const [level, setLevel] = useState(1);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [gameBoard, setGameBoard] = useState(Array.from(Array(5), () => new Array(5).fill(1)))
  const [resetCounter, setResetCounter] = useState(0)

  const increaseScore = (value) => {
    setCurrentCoins(prevValue => {
      if(prevValue === 0) return value
      else if(value === -1) return 0
      return value*prevValue
    });
  }

  const populateGameBoard = (bombsNum, valueTilesNum) => {
      //board to return
      let newBoard = [...gameBoard]
      //flatten 
      let flatboard = gameBoard.flat(2)
      //add values to flat board
      flatboard = flatboard.map(()=>{
          if(bombsNum > 0){
              bombsNum--
              return -1
          }
          else if(valueTilesNum > 0){
              valueTilesNum--
              return Math.random() < 0.5 ? 2 : 3
          }
          else{
              return 1
          }
      })

      //fisher-yates my goat (i dont think i spelled it right)
      for (let i = flatboard.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [flatboard[i], flatboard[j]] = [flatboard[j], flatboard[i]];
      }

      //unflatten
      newBoard.forEach((row,i) => {
          row.forEach((value,j) => {
              newBoard[i][j] = flatboard[i*5+j];
          })
      });
      //return new board
      return newBoard
  }

  const handleLose = () => {
    populateGameBoard(5, 5)
    setResetCounter(prevValue => prevValue+1)
  }

  const appContextValue = {
    level,
    setLevel,
    increaseScore,
    currentCoins,
    earnedCoins,
    handleLose,
    populateGameBoard,
    gameBoard,
    setGameBoard,
    resetCounter,
  }


  return (
    <AppContext.Provider value={appContextValue}>
      <Stats />
      <GameBoard />
      <div>Memo</div>
    </AppContext.Provider>
  )
}

export default App