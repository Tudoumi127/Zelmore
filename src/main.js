/*
Name: Lily Chen
Class CMPM 120
Professor: Nathan Altice

So I'll be the first to admit I should have spent more time on this assignment, it has not been a
kind couple weeks to me*/

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
