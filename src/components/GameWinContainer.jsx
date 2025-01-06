import { useContext } from "react"
import { AppContext } from "../App"
import '../css/PopupContainer.css'
useContext
function GameWinContainer() {
    const {currentCoins} = useContext(AppContext) 
  return (
    <div className="popup-container">Great job! You won {currentCoins} coins! </div>
  )
}

export default GameWinContainer