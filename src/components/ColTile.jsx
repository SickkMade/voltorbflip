
function ColTile({GameBoard, index}) {

    const getColTiles = (colIndex) => {
        return GameBoard.reduce((counts, row) => {
          if (row[colIndex] === -1) counts.bombs++;
          else counts.coins += row[colIndex];
          return counts;
        }, { coins: 0, bombs: 0 });
      };


  return (
    <div className="row-tile tile">
        <div>{getColTiles(index).coins}</div>
        <div>{getColTiles(index).bombs}</div>
    </div>
    
  )
}

export default ColTile