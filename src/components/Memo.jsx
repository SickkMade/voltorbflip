import '../css/Memo.css'
import { useContext } from 'react'
import { AppContext } from '../App';
import MemoActionsMenu from './MemoActionsMenu';

function Memo() {

    const {isMemoOpened, setIsMemoOpened} = useContext(AppContext);

    const invertIsMemoOpened = () => setIsMemoOpened(prevValue => !prevValue)

  return (
    <>
    <div className="memo" onClick={invertIsMemoOpened}>
        <span className="memo-action">
            ACTION
        </span>
        <span className="memo-text">
            <span>Open</span>
            <span>Memo</span>
        </span>
    </div>
    {isMemoOpened && <MemoActionsMenu />}
    </>
  )
}

export default Memo