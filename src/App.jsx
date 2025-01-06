import GameBoard from "./components/GameBoard"
import Stats from "./components/Stats"
import GameLostContainer from "./components/GameLostContainer";
import NewLevelContainer from "./components/NewLevelContainer";
import GameWinContainer from "./components/GameWinContainer";
import { useState, createContext, useEffect } from "react"

export const AppContext = createContext();

function App() {
  const [level, setLevel] = useState(1);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'lost', 'revealAll'
  const [maxMoney, setMaxMoney] = useState(0); //max money to get each round
  const [gameBoard, setGameBoard] = useState(Array.from(Array(5), () => new Array(5).fill(1)))

  const increaseScore = (value) => {
    setCurrentCoins(prevValue => {
      if(prevValue === 0) return value
      else if(value === -1) return prevValue
      if(value*prevValue === maxMoney) handleWin();
      return value*prevValue
    });

  }

  const populateGameBoard = (bombsNum, valueTilesNum) => {
      //board to return
      let newMaxMoney = 1;
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
              let currentTile = Math.random() < 0.5 ? 2 : 3
              newMaxMoney *= currentTile
              return currentTile
          }
          else{
              return 1
          }
      })

      setMaxMoney(newMaxMoney);

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
    // puts in bottom of stack
    setTimeout(() => {
      setGameState("lost");
    }, 0);
  }

  const handleWin = () => {
    setTimeout(() => {
      setGameState("win"); //ADD WIN LOGIC
    }, 0)
    
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
    gameState,
  }

  useEffect(()=>{
    const handleClick = () => {
      if(gameState=="lost"){
        setCurrentCoins(0)
        setGameState("revealAll")
        setLevel(prevValue => Math.max(1, prevValue-1))
      }
      else if(gameState=="win"){
        setLevel(prevValue => prevValue+1)
        setGameState("revealAll")
        setEarnedCoins(prevValue => prevValue+currentCoins)
        setCurrentCoins(0)
      }
      else if(gameState=="revealAll"){
        setGameState("playing")
        populateGameBoard(5,10);
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  },[gameState])


  return (
    <AppContext.Provider value={appContextValue}>
      <Stats />
      <GameBoard />
      {gameState == "lost" && <GameLostContainer />}
      {gameState == "win" && <GameWinContainer />}
      {gameState == "playing" && <NewLevelContainer />}
      <div>Memo</div>
    </AppContext.Provider>
  )
}

export default App