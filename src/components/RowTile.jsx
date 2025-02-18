
function RowTile({GameBoard, index}) {

    const getRowCounts = (row) => {
        return row.reduce((counts, value) => {
          if (value === -1) counts.bombs++;
          else counts.coins += value;
          return counts;
        }, { coins: 0, bombs: 0 });
      };


  return (
    <div className={`row-tile tile row-tile-${index+1}`}>
        <img src="miku.png"></img>
        <div>{getRowCounts(GameBoard[index]).coins <= 9 ? 0 : ''}{getRowCounts(GameBoard[index]).coins}</div>
        <div>{getRowCounts(GameBoard[index]).bombs}</div>
    </div>
    
  )
}

export default RowTile