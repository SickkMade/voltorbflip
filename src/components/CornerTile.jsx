
function CornerTile({GameBoard}) {

    const getCornerTile = () => {
        let counts = {coins: 0, bombs: 0}
        for(let i = 0; i < 5; i++){
            if (GameBoard[i][i] === -1) counts.bombs++;
          else counts.coins += GameBoard[i][i];
        }
        return counts
      }; //need to memoize?


  return (
    <div className="row-tile tile row-tile-6">
        <img src="miku.png"></img>
        <div>{getCornerTile().coins <= 9 ? 0 : ''}{getCornerTile().coins}</div>
        <div>{getCornerTile().bombs}</div>
    </div>
    
  )
}

export default CornerTile