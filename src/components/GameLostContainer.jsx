import { useContext } from "react"
import { AppContext } from "../App"
import '../css/PopupContainer.css'
useContext
function GameLostContainer() {
    const {currentCoins} = useContext(AppContext) 
  return (
    <div className="popup-container">Oh no! You lost {currentCoins} coins! </div>
  )
}

export default GameLostContainer