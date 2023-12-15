let config = {
    type: Phaser.CANVAS,
    type: Phaser.WEBGL, //tinting
    width: 800,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade:{
            debug: true, 
            /*gravity: {
                y: 200
            }*/
        }
    },
    scene: [ Load, Play]
}

let game = new Phaser.Game(config);

let { height, width } = game.config
let playerDirection
//reserve keyboard vars
let keyLEFT;
let keyRIGHT;
let keySHIFT;
let keySPACE;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
