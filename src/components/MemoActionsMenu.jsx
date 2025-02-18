import { AppContext } from "../App"
import { useContext } from "react"
function MemoActionsMenu() {
    const {isMemoOpened, setIsBombMemoActive, setIs1MemoActive, setIs2MemoActive, setIs3MemoActive, isBombMemoActive, is1MemoActive, is2MemoActive, is3MemoActive} = useContext(AppContext)
  return (
    <div className={`memo memo-actionmenu ${isMemoOpened ? '' : 'invisible'}`}>
        <img onClick={() => setIsBombMemoActive(prevValue => !prevValue)} className={`memo-actionmenu-container memo-actionmenu-bomb ${isBombMemoActive ? 'memo-actionmenu-container__active' : ''}`} src="miku.png"></img>
        <span onClick={() => setIs1MemoActive(prevValue => !prevValue)} className={`memo-actionmenu-container memo-actionmenu-1 ${is1MemoActive ? 'memo-actionmenu-container__active' : ''}`}>1</span>
        <span onClick={() => setIs2MemoActive(prevValue => !prevValue)} className={`memo-actionmenu-container memo-actionmenu-2 ${is2MemoActive ? 'memo-actionmenu-container__active' : ''}`}>2</span>
        <span onClick={() => setIs3MemoActive(prevValue => !prevValue)} className={`memo-actionmenu-container memo-actionmenu-3 ${is3MemoActive ? 'memo-actionmenu-container__active' : ''}`}>3</span>
    </div>
  )
}

export default MemoActionsMenu