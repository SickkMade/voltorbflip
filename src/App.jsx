import GameBoard from "./components/GameBoard"
import GameLostContainer from "./components/GameLostContainer";
import Sidebar from "./components/Sidebar";
import NewLevelContainer from "./components/NewLevelContainer";
import GameWinContainer from "./components/GameWinContainer";
import { useState, createContext, useEffect } from "react"
import Memo from "./components/Memo";

export const AppContext = createContext();

function App() {
  const [currentActiveCell, setCurrentActiveCell] = useState('0-0');
  const [isMemoOpened, setIsMemoOpened] = useState(false);
  const [level, setLevel] = useState(1);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'lost', 'revealAll'
  const [maxMoney, setMaxMoney] = useState(0); //max money to get each round
  const [gameBoard, setGameBoard] = useState(Array.from(Array(5), () => new Array(5).fill(1)))

  const [isBombMemoActive, setIsBombMemoActive] = useState(false);
  const [is1MemoActive, setIs1MemoActive] = useState(false);
  const [is2MemoActive, setIs2MemoActive] = useState(false);
  const [is3MemoActive, setIs3MemoActive] = useState(false);

  const increaseScore = (value) => {
    setCurrentCoins(prevValue => {
      if(prevValue === 0) return value
      else if(value === -1) return prevValue
      return value*prevValue
    });

  }

  useEffect(() => {
    if (currentCoins === maxMoney && currentCoins > 1) {
      handleWin();
    }
  }, [currentCoins, maxMoney]);

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
      console.log(newMaxMoney)

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
    setCurrentActiveCell,
    currentActiveCell,
    setIsMemoOpened,
    isMemoOpened,
    isBombMemoActive,
    setIsBombMemoActive,
    is1MemoActive,
    setIs1MemoActive,
    is2MemoActive,
    setIs2MemoActive,
    is3MemoActive,
    setIs3MemoActive,
  }

  const handleClick = () => {
    if(gameState=="lost"){
      setCurrentCoins(0)
      setGameState("revealAll")
      setLevel(prevValue => Math.max(1, prevValue-1))
    }
    else if(gameState=="win"){
      setLevel(prevValue => Math.min(prevValue+1,8))
      setGameState("revealAll")
      setEarnedCoins(prevValue => prevValue+currentCoins)
      setCurrentCoins(0)
    }
    else if(gameState=="revealAll"){
      setGameState("playing")
      switch(level){
        case 1:
          populateGameBoard(6,2);
          break;
        case 2:
          populateGameBoard(6,6);
          break;
        case 3:
          populateGameBoard(7,8);
          break;
        case 4:
          populateGameBoard(7,10);
          break;
        case 5:
          populateGameBoard(8,10);
          break;
        case 6:
          populateGameBoard(8,12);
          break;
        case 7:
          populateGameBoard(8,14);
          break;
        case 8:
          populateGameBoard(10,14);
          break;
      }
    }
  }

  useEffect(()=>{
    
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  },[gameState])

  const handleKeyDown = (e) => {
    const [currentRow, currentCol] = currentActiveCell.split('-').map(Number)
    let newRow = currentRow;
    let newCol = currentCol;
    if(gameState !== "playing"){
      if(e.key === " "){
        handleClick()
      }
    }
    switch(e.key){
      case 'ArrowUp':
        newRow = currentRow - 1;
        if(newRow < 0) newRow = 4
        break;
      case 'ArrowDown':
        newRow = (currentRow + 1) % 5;
        break;
      case 'ArrowLeft':
        newCol = currentCol - 1;
        if(newCol < 0) newCol = 4
        break;
      case 'ArrowRight':
        newCol = (currentCol + 1)%5;
        break;
      default:
        return; 
    }
    setCurrentActiveCell(`${newRow}-${newCol}`)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentActiveCell, gameState]);


  return (
    <AppContext.Provider value={appContextValue}>
      <section id="app-main-container">
        <Sidebar />
        <GameBoard />
        {gameState == "lost" && <GameLostContainer />}
        {gameState == "win" && <GameWinContainer />}
        {gameState == "playing" && <NewLevelContainer />}
      <Memo />
      </section>
      
    </AppContext.Provider>
  )
}

export default App