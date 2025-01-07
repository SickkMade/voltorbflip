import { AppContext } from "../App"
import { useContext } from "react"
function MemoActionsMenu() {
    const {isBombMemoActive, is1MemoActive, is2MemoActive, is3MemoActive} = useContext(AppContext)
  return (
    <div className="memo memo-actionmenu">
        <img className={`memo-actionmenu-container memo-actionmenu-bomb ${isBombMemoActive ? 'memo-actionmenu-container__active' : ''}`} src="miku.png"></img>
        <span className={`memo-actionmenu-container memo-actionmenu-1 ${is1MemoActive ? 'memo-actionmenu-container__active' : ''}`}>1</span>
        <span className={`memo-actionmenu-container memo-actionmenu-2 ${is2MemoActive ? 'memo-actionmenu-container__active' : ''}`}>2</span>
        <span className={`memo-actionmenu-container memo-actionmenu-3 ${is3MemoActive ? 'memo-actionmenu-container__active' : ''}`}>3</span>
    </div>
  )
}

export default MemoActionsMenu