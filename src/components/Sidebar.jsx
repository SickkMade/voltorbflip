import Stats from "./Stats"
import Memo from "./Memo"
import '../css/sidebar.css'

function Sidebar() {
  return (
    <section className="sidebar">
    <Stats />
    <Memo />
    </section>
  )
}

export default Sidebar