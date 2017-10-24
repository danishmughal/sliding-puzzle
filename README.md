
# sliding-puzzle

Sliding puzzle (9-puzzle) implementation in vanilla JS and CSS.

<img src="https://i.imgur.com/nYcAClT.png" />

## Live Demo

A live demo for the app can be found here: [A Sliding Puzzle](http://breakfasthack.com/projects/sliding_puzzle/)

## Features
* Shuffle function that performs 20 valid random moves.
* Solve function that (naively) solves the puzzle. To be improved!
* Mobile-friendly
  * CSS `translateXY()` animations for mobile performance
  * Optimized for both smaller and larger screen sizes
* Pure vanilla Javascript. No external libraries used. 
  
### Tile Behavior
#### Correct State

<div  align="center">
<img src="https://i.imgur.com/MIUKPp4.png[/img" />
</div>
<br>
When a tile is in the correct position, it glows blue. 

#### Incorrect State

<div  align="center">
<img src="https://i.imgur.com/Lf59WRC.png" /></div>
<br>
When a tile is not in its correct final position, it glows red. 
<br>
<br>
In order to win the game, the user must first shuffle the tiles and then get them back into the original order, with the bottom right tile slot unoccupied and all tiles glowing blue.
