/*
Name: Lily Chen
Class CMPM 120
Professor: Nathan Altice

So I'll be the first to admit I should have spent more time on this assignment, it has not been a
kind couple weeks for me and unfortunately this project has come to suffer the consequences for it.

The game I have adapted is "The Tale of Zelmore" from "The Amazing World of Gumball"-
theres not much of it shown in the TV show but a couple screenshots show that it seems to be a
2d side scroller with a boss fight. 

This project is extremely bare bones and hardly feels like agame but it does meet requirements-
For the 5 major components I used physics systems, cameras, animations, tilemaps, and text objects
(theres a tiny score counter in the upper left hand corner)

The idea for this game was originally to be a simple platformer with a boss fight at the end like
hot it was shown in the show- however I ran out of time for the boss fight.

Art wise I think the game is pretty close to how I would envision it in my head at least.

As for polish-

There is none.
Don't look at it too closely.
The game is a scam.


*/

let config = {
    //type: Phaser.CANVAS,
    type: Phaser.WEBGL, //tinting
    width: 800,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade:{
            debug: false, 
        }
    },
    scene: [ Load, Menu, Play, GameOver, YouWin]
}

let game = new Phaser.Game(config);

let { height, width } = game.config
let playerDirection

//reserve keyboard vars
let keyR;
let keyLEFT;
let keyRIGHT;
let keySHIFT;
let keySPACE;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
