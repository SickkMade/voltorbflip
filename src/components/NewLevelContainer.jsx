import { useContext } from "react"
import { AppContext } from "../App"
import '../css/PopupContainer.css'
useContext
function NewLevelContainer() {
    const {level} = useContext(AppContext) 
  return (
    <div className="popup-container popup-fade">Ready to Play Game Lv. {level}! </div>
  )
}

export default NewLevelContainer