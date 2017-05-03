var tileMap = {
  1: {
    top: '0',
    left: '0'
  },
  2: {
    top: '0',
    left: '200px'
  },
  3: {
    top: '0',
    left: '400px'
  },
  4: {
    top: '200px',
    left: '0'
  },
  5: {
    top: '200px',
    left: '200px'
  },
  6: {
    top: '200px',
    left: '400px'
  },
  7: {
    top: '400px',
    left: '0'
  },
  8: {
    top: '400px',
    left: '200px'
  },
  empty: {
    top: '400px',
    left: '400px'
  }
}

// Board setup according to the tileMap
var tiles = document.querySelectorAll('.tile');
for(var i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener('click', tileClicked ,true );

  var tileId = tiles[i].innerHTML;

  tiles[i].style.left = tileMap[tileId].left;
  tiles[i].style.top = tileMap[tileId].top;
}

function tileClicked(event) {
  var tileNumber = event.target.innerHTML;
  console.log("Tile " + tileNumber + " clicked.");
  moveTile(event.target);
}


function moveTile(tile) {
  // Check if Tile can be moved 
  // (must be touching empty tile)
  // (must be directly perpendicular to empty tile)

  // Swap tile with empty tile
  var tileNumber = tile.innerHTML;

  var emptyTop = tileMap.empty.top
  var emptyLeft = tileMap.empty.left

  tileMap.empty.top = tile.style.top;
  tileMap.empty.left = tile.style.left;

  tile.style.top = emptyTop;
  tile.style.left = emptyLeft;

  tileMap[tileNumber].top = emptyTop;
  tileMap[tileNumber].left = emptyLeft;
}