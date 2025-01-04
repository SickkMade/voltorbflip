import GameBoard from "./components/GameBoard"
import Stats from "./components/Stats"
import { useState, createContext, useEffect } from "react"

export const AppContext = createContext();

function App() {
  const [level, setLevel] = useState(1);

  


  return (
    <AppContext.Provider value={[level, setLevel]}>
      <Stats />
      <GameBoard />
      <div>Memo</div>
    </AppContext.Provider>
  )
}

export default App