import { AppContext } from '../App'
import '../css/Stats.css'
import { useContext } from 'react'

function Stats() {
    const [level, setLevel] = useContext(AppContext)
  return (
    <section className="container">
        <h4>Your coins</h4>
        <h2>00000</h2>
        <h4>Earned coins</h4>
        <h2>00000</h2>
        <h4>Level {level}</h4>
    </section>
  )
}

export default Stats