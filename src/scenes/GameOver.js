class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(){
        this.bgimage = this.add.image(0, 0, '').setOrigin(0,0);
        console.log("its joever");
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let gameOverConfig = {
            fontFamily: 'Palatino',
            fontSize: '36px',
            backgroundColor: '#ADD2E8',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let creditsConfig = {
            fontFamily: 'Palatino',
            fontSize: '20px',
            backgroundColor: '#ADD2E8',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'GAME OVER', gameOverConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height/2 + 30, "Press 'R' to restart", gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 80, "Credits: ", creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 110, "Programming and Art: Lily Chen", creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 140, "Music: Pixabay.com", creditsConfig).setOrigin(0.5);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            //console.log("bruh")
            //this.sound.play('button')
            this.scene.start('playScene')
        }
    }
}