// Begin game once DOM loaded
document.addEventListener("DOMContentLoaded", game);

function game() {

  // Data structure to hold positions of tiles
  var tileMap = {
    1: {
      position: 1,
      top: '0',
      left: '0'
    },
    2: {
      position: 2,
      top: '0',
      left: '200'
    },
    3: {
      position: 3,
      top: '0',
      left: '400'
    },
    4: {
      position: 4,
      top: '200',
      left: '0'
    },
    5: {
      position: 5,
      top: '200',
      left: '200'
    },
    6: {
      position: 6,
      top: '200',
      left: '400'
    },
    7: {
      position: 7,
      top: '400',
      left: '0'
    },
    8: {
      position: 8,
      top: '400',
      left: '200'
    },
    empty: {
      position: 9,
      top: '400',
      left: '400'
    }
  }

  // Board setup according to the tileMap
  var tiles = document.querySelectorAll('.tile');
  for(var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', tileClicked ,true );

    var tileId = tiles[i].innerHTML;

    tiles[i].style.left = tileMap[tileId].left + 'px';
    tiles[i].style.top = tileMap[tileId].top + 'px';
  }

  function tileClicked(event) {
    var tileNumber = event.target.innerHTML;
    console.log("Tile " + tileNumber + " clicked.");
    moveTile(event.target);

    if (checkSolution()) {
      console.log("You win!");
    }
  }

  // Moves tile to empty spot
  // Returns error message if tile cannot be moved
  function moveTile(tile) {
    // Check if Tile can be moved 
    // (must be touching empty tile)
    // (must be directly perpendicular to empty tile)
    var tileNumber = tile.innerHTML;
    if (!tileMovable(tileNumber)) {
      console.log("Tile " + tileNumber + " can't be moved.");
      return;
    }

    // Swap tile with empty tile
    var emptyTop = tileMap.empty.top;
    var emptyLeft = tileMap.empty.left;
    var emptyPosition = tileMap.empty.position;
    tileMap.empty.top = tileMap[tileNumber].top;
    tileMap.empty.left = tileMap[tileNumber].left;
    tileMap.empty.position = tileMap[tileNumber].position;

    tile.style.top = emptyTop  + 'px'; 
    tile.style.left = emptyLeft  + 'px';
    tileMap[tileNumber].top = emptyTop;
    tileMap[tileNumber].left = emptyLeft;
    tileMap[tileNumber].position = emptyPosition;
  }


  // Determines whether a given tile can be moved
  function tileMovable(tileNumber) {
    var selectedTile = tileMap[tileNumber];
    var emptyTile = tileMap.empty;

    var leftDifference = selectedTile.left - emptyTile.left
    var topDifference = selectedTile.top - emptyTile.top

    return (Math.abs(leftDifference + topDifference) == 200);
  }

  // Returns true/false based on if the puzzle has been solved
  function checkSolution() {
    if (tileMap.empty.position !== 9) return false;

    for (var key in tileMap) {
      if ((key != 1) && (key != "empty")) {
        if (tileMap[key].position < tileMap[key-1].position) return false;
      }
    }
    return true;
  }

  // Shuffles the current tiles
  function shuffle() {

  }


}