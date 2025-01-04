
function RowTile({GameBoard, index}) {

    const getRowCounts = (row) => {
        return row.reduce((counts, value) => {
          if (value === -1) counts.bombs++;
          else counts.coins += value;
          return counts;
        }, { coins: 0, bombs: 0 });
      };


  return (
    <div className="row-tile tile">
        <div>{getRowCounts(GameBoard[index]).coins}</div>
        <div>{getRowCounts(GameBoard[index]).bombs}</div>
    </div>
    
  )
}

export default RowTile