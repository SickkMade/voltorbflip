import { AppContext } from '../App'
import '../css/Stats.css'
import { useContext } from 'react'

function Stats() {
    const {level, currentCoins, earnedCoins} = useContext(AppContext)
  return (
    <section className="container">
        <h4>Your coins</h4>
        {/* need to float to 5 chars */}
        <h2>{currentCoins}</h2>
        <h4>Earned coins</h4>
        <h2>{earnedCoins}</h2>
        <h4>Level {level}</h4>
    </section>
  )
}

export default Stats