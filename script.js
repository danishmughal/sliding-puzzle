// Begin game once DOM loaded
document.addEventListener("DOMContentLoaded", game);

function game() {

  // Data structure to hold positions of tiles
  var baseDistance = 33.5;
  var tileMap = {
    1: {
      position: 1,
      top: 0,
      left: 0
    },
    2: {
      position: 2,
      top: 0,
      left: baseDistance * 1
    },
    3: {
      position: 3,
      top: 0,
      left: baseDistance * 2
    },
    4: {
      position: 4,
      top: baseDistance,
      left: 0
    },
    5: {
      position: 5,
      top: baseDistance,
      left: baseDistance
    },
    6: {
      position: 6,
      top: baseDistance,
      left: baseDistance * 2
    },
    7: {
      position: 7,
      top: baseDistance * 2,
      left: 0
    },
    8: {
      position: 8,
      top: baseDistance * 2,
      left: baseDistance
    },
    empty: {
      position: 9,
      top: baseDistance * 2,
      left: baseDistance * 2
    }
  }

  // Movement map
  function movementMap(emptyPosition) {
    if (emptyPosition == 9) return [6, 8];
    if (emptyPosition == 8) return [5, 7, 9];
    if (emptyPosition == 7) return [4, 8];
    if (emptyPosition == 6) return [3, 5, 9];
    if (emptyPosition == 5) return [2, 4, 6, 8];
    if (emptyPosition == 4) return [1, 5, 7];
    if (emptyPosition == 3) return [2, 6];
    if (emptyPosition == 2) return [1, 3, 5];
    if (emptyPosition == 1) return [2, 4];
  }

  // Board setup according to the tileMap
  document.querySelector('#shuffle').addEventListener('click', shuffle , true);
  var tiles = document.querySelectorAll('.tile');
  var delay = -50;
  for(var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', tileClicked ,true );

    var tileId = tiles[i].innerHTML;
    delay += 50;
    setTimeout(setup, delay, tiles[i]);
  }

  function setup(tile) {
    console.log(tile);
    var tileId = tile.innerHTML;
    tile.style.left = tileMap[tileId].left + '%';
    tile.style.top = tileMap[tileId].top + '%';
    recolorTile(tile, tileId);
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

    tile.style.top = emptyTop  + '%'; 
    tile.style.left = emptyLeft  + '%';
    tileMap[tileNumber].top = emptyTop;
    tileMap[tileNumber].left = emptyLeft;
    tileMap[tileNumber].position = emptyPosition;

    recolorTile(tile, tileNumber);
  }


  // Determines whether a given tile can be moved
  function tileMovable(tileNumber) {
    var selectedTile = tileMap[tileNumber];
    var emptyTile = tileMap.empty;

    var leftDifference = selectedTile.left - emptyTile.left
    var topDifference = selectedTile.top - emptyTile.top
    return (Math.abs(leftDifference + topDifference) == baseDistance);
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

  // Check if tile is in correct place!
  function recolorTile(tile, tileId) {
    if (tileId == tileMap[tileId].position) {
      tile.classList.remove("error");
    } else {
      tile.classList.add("error");
    }
  }

  // var shuffleCounter = 0;
  // function shuffleLoop(tile) {
  //   console.log(tile);
  //   console.log(shuffleCounter);
  //   if (tileMovable(tile.innerHTML)) {
  //     moveTile(tile);
  //     shuffleCounter += 1;
  //     return true;
  //   } 
  //   return false;
  // }

  // Shuffles the current tiles
  function shuffle() {
    var boardTiles = document.querySelectorAll('.tile');
    var shuffleDelay = -100;
    // while (shuffleCounter < 2) {
      // shuffleDelay += 100;
      // setTimeout(shuffleLoop, shuffleDelay, tile);
      for (var i = 0; i < 30; i++){ 
        var tile = boardTiles[Math.floor(Math.random()*boardTiles.length)];
        moveTile(tile);
      }
  }


}